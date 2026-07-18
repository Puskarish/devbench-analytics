require('dotenv').config(); // This must be at the very top!
const express = require('express');
const mongoose = require('mongoose'); // Import mongoose to talk to MongoDB
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Test = require('./models/Test');
const TestScore = require('./models/TestScore');

const app = express();
const cors = require('cors');
app.use(cors())
const PORT = 3000;

app.use(express.json());

const JWT_SECRET = 'super-secret-key-do-not-share';

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Local MongoDB'))
  .catch((err) => console.error('Database connection error:', err));


// --- SIGNUP ROUTE ---
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    });

    await newUser.save(); // Now that we have a DB, we can actually save!
    res.status(201).send('User successfully registered!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

// --- LOGIN ROUTE ---
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful!', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

// --- GET CURRENT USER PROFILE ---
app.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access denied. No token provided.');

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(404).send('User not found.');

    res.json({
      username: user.username,
      email: user.email,
      memberSince: user._id.getTimestamp(),
      unlockedTests: user.unlockedTests
    });
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid token.');
  }
});

// --- FETCH ALL TESTS ENDPOINT ---
app.get('/tests', async (req, res) => {
  try {
    // Fetch tests but exclude the questions array so users can't cheat on the hub page
    const tests = await Test.find().select('-questions');
    res.json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tests');
  }
});

// --- FETCH SINGLE TEST ENDPOINT ---
app.get('/tests/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access denied. No token provided.');

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET);

    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).send('Test not found');

    // Send the test data (including questions) to the authenticated user taking the test
    res.json(test);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching test');
  }
});

// --- MOCK PAYMENT ENDPOINT ---
app.post('/payment/mock-checkout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access denied. No token provided.');

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const { testId } = req.body;

    // Use $addToSet (similar to $push, but prevents duplicates) to add the testId
    await User.findByIdAndUpdate(decoded.userId, {
      $addToSet: { unlockedTests: testId }
    });

    res.status(200).json({ message: 'Payment simulated successfully and test unlocked!' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing mock payment');
  }
});

// --- GET USER SCORES ENDPOINT ---
app.get('/scores', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access denied. No token provided.');

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const userScores = await TestScore.find({ userId: decoded.userId }).sort({ createdAt: -1 });
    
    const formattedScores = userScores.map(score => ({
      _id: score._id,
      testName: score.testId,
      score: score.score,
      totalPossible: score.totalPossible,
      date: score.createdAt
    }));

    res.json(formattedScores);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching scores');
  }
});

// --- SUBMIT TEST SCORE ENDPOINT ---
app.post('/scores', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access denied. No token provided.');

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const { testId, answers } = req.body;
    
    // Fetch the true test and its answers directly from the database
    const test = await Test.findById(testId);
    if (!test) return res.status(404).send('Test not found');

    const trueScore = test.questions.reduce((currentScore, question) => {
      const userAnswer = answers[question.id];
      console.log(`User selected: [${userAnswer}], Correct answer is: [${question.correctAnswer}]`);

      if (userAnswer === question.correctAnswer) {
        return currentScore + 1;
      }
      return currentScore;
    }, 0);

    const newScore = new TestScore({
      userId: decoded.userId, 
      testId: test.title, // Save the actual title so the dashboard graph looks nice!
      score: trueScore, 
      totalPossible: test.questions.length
    });

    await newScore.save(); 
    res.status(201).json({ message: 'Score successfully graded and saved!', data: newScore, testDetails: test });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving score');
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the DevBench Analytics Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
