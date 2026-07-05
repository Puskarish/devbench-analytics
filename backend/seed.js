require('dotenv').config();
const mongoose = require('mongoose');
const Test = require('./models/Test');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Test.deleteMany({});
    console.log('Cleared existing tests from the database.');

    const tests = [
      {
        title: 'JavaScript Basics',
        description: 'Test your knowledge of core JavaScript concepts and syntax.',
        category: 'Web',
        price: 0,
        isFree: true,
        questionsCount: 10,
        questions: [
          { id: 1, text: 'Which keyword is used to declare a variable that cannot be reassigned?', options: ['var', 'let', 'const', 'static'], correctAnswer: 'const' },
          { id: 2, text: 'What is the output of typeof null?', options: ['"null"', '"undefined"', '"object"', '"number"'], correctAnswer: '"object"' },
          { id: 3, text: 'Which of the following is NOT a JavaScript data type?', options: ['String', 'Boolean', 'Float', 'Symbol'], correctAnswer: 'Float' },
          { id: 4, text: 'What does the "===" operator do in JavaScript?', options: ['Assigns a value', 'Compares value and type', 'Compares only value', 'Checks for memory reference'], correctAnswer: 'Compares value and type' },
          { id: 5, text: 'How do you write a comment in JavaScript?', options: ['<!-- comment -->', '# comment', '/* comment */', '// comment'], correctAnswer: '// comment' },
          { id: 6, text: 'Which function is used to parse a string into an integer?', options: ['parseInt()', 'toInteger()', 'Number.parse()', 'Int.parse()'], correctAnswer: 'parseInt()' },
          { id: 7, text: 'What is the correct syntax to create an array in JavaScript?', options: ['var arr = (1, 2, 3)', 'var arr = [1, 2, 3]', 'var arr = {1, 2, 3}', 'var arr = <1, 2, 3>'], correctAnswer: 'var arr = [1, 2, 3]' },
          { id: 8, text: 'What does the Array.prototype.push() method do?', options: ['Removes the last element', 'Adds one or more elements to the end', 'Adds an element to the beginning', 'Sorts the array'], correctAnswer: 'Adds one or more elements to the end' },
          { id: 9, text: 'Which keyword is used to return a value from a function?', options: ['give', 'send', 'return', 'yield'], correctAnswer: 'return' },
          { id: 10, text: 'What is a closure in JavaScript?', options: ['A closed loop', 'A function that has access to its outer scope', 'A syntax error', 'A compiled block of code'], correctAnswer: 'A function that has access to its outer scope' }
        ]
      },
      {
        title: 'React Hooks Masterclass',
        description: 'Advanced assessment on React functional components and hooks.',
        category: 'Web',
        price: 20,
        questionsCount: 10,
        questions: [
          { id: 1, text: 'Which hook should be used to fetch data when a component mounts?', options: ['useState', 'useEffect', 'useMemo', 'useContext'], correctAnswer: 'useEffect' },
          { id: 2, text: 'What does the dependency array in useEffect do?', options: ['Controls when the effect re-runs', 'Stores variables securely', 'Prevents memory leaks', 'Replaces Redux'], correctAnswer: 'Controls when the effect re-runs' },
          { id: 3, text: 'Which hook returns a memoized callback function?', options: ['useCallback', 'useMemo', 'useRef', 'useReducer'], correctAnswer: 'useCallback' },
          { id: 4, text: 'What does useState return?', options: ['An array with the state value and an updater function', 'A single state object', 'A boolean indicating success', 'A string with the current state'], correctAnswer: 'An array with the state value and an updater function' },
          { id: 5, text: 'Which hook is best used for accessing DOM elements directly?', options: ['useState', 'useDOM', 'useRef', 'useContext'], correctAnswer: 'useRef' },
          { id: 6, text: 'How do you share state globally across the component tree without prop drilling?', options: ['useGlobal', 'useContext', 'useState', 'useEffect'], correctAnswer: 'useContext' },
          { id: 7, text: 'Which hook is typically used as an alternative to useState for complex state logic?', options: ['useReducer', 'useComplexState', 'useMemo', 'useCallback'], correctAnswer: 'useReducer' },
          { id: 8, text: 'What happens if you leave the dependency array completely empty [] in useEffect?', options: ['It runs on every render', 'It only runs once on mount', 'It never runs', 'It throws an error'], correctAnswer: 'It only runs once on mount' },
          { id: 9, text: 'What is the purpose of useLayoutEffect?', options: ['To fetch data asynchronously', 'To read layout from the DOM and synchronously re-render', 'To design the CSS layout', 'To memoize a React component'], correctAnswer: 'To read layout from the DOM and synchronously re-render' },
          { id: 10, text: 'Can you call a React Hook conditionally (e.g., inside an if-statement)?', options: ['Yes, always', 'Only if the condition is true', 'No, hooks must be called at the top level', 'Only inside custom hooks'], correctAnswer: 'No, hooks must be called at the top level' }
        ]
      },
      {
        title: 'Node.js & Express Fundamentals',
        description: 'Evaluate your backend routing and middleware skills.',
        category: 'Backend',
        price: 15,
        questionsCount: 10,
        questions: [
          { id: 1, text: 'What is Express.js?', options: ['A database', 'A frontend framework', 'A minimal web framework for Node.js', 'A testing tool'], correctAnswer: 'A minimal web framework for Node.js' },
          { id: 2, text: 'How do you define a route that handles GET requests in Express?', options: ['app.get()', 'app.post()', 'app.listen()', 'app.fetch()'], correctAnswer: 'app.get()' },
          { id: 3, text: 'What is the default package manager for Node.js?', options: ['yarn', 'npm', 'pnpm', 'nvm'], correctAnswer: 'npm' },
          { id: 4, text: 'What is middleware in Express.js?', options: ['A hardware layer', 'Functions that have access to the request and response objects', 'A database schema', 'The core V8 engine'], correctAnswer: 'Functions that have access to the request and response objects' },
          { id: 5, text: 'Which object represents the HTTP response that an Express app sends when it gets an HTTP request?', options: ['req', 'res', 'app', 'next'], correctAnswer: 'res' },
          { id: 6, text: 'How do you parse incoming JSON payloads in Express?', options: ['app.use(express.json())', 'app.use(json.parse())', 'req.parseJSON()', 'res.json()'], correctAnswer: 'app.use(express.json())' },
          { id: 7, text: 'What global Node object gives information about the current working directory?', options: ['global', 'window', 'process', 'console'], correctAnswer: 'process' },
          { id: 8, text: 'Which core Node module is used to work with the file system?', options: ['http', 'fs', 'path', 'os'], correctAnswer: 'fs' },
          { id: 9, text: 'What does the "next()" function do in an Express middleware?', options: ['Ends the request', 'Throws an error', 'Passes control to the next middleware function', 'Redirects the user'], correctAnswer: 'Passes control to the next middleware function' },
          { id: 10, text: 'Which method is used to start an Express server and listen for connections?', options: ['app.start()', 'app.run()', 'app.init()', 'app.listen()'], correctAnswer: 'app.listen()' }
        ]
      },
      {
        title: 'Data Structures & Algorithms',
        description: 'Hardcore DSA assessment for software engineering interviews.',
        category: 'DSA',
        price: 25,
        questionsCount: 10,
        questions: [
          { id: 1, text: 'What is the time complexity of searching in a perfectly balanced binary search tree?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 'O(log n)' },
          { id: 2, text: 'Which data structure uses LIFO (Last In, First Out)?', options: ['Queue', 'Stack', 'Linked List', 'Array'], correctAnswer: 'Stack' },
          { id: 3, text: 'What is the worst-case time complexity of QuickSort?', options: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(1)'], correctAnswer: 'O(n^2)' },
          { id: 4, text: 'Which algorithm is used to find the shortest path in a weighted graph?', options: ['Depth First Search', 'Breadth First Search', "Dijkstra's Algorithm", 'Merge Sort'], correctAnswer: "Dijkstra's Algorithm" },
          { id: 5, text: 'What data structure is typically used to implement a priority queue?', options: ['Stack', 'Heap', 'Linked List', 'Hash Table'], correctAnswer: 'Heap' },
          { id: 6, text: 'What is the time complexity of accessing an element by index in an array?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 'O(1)' },
          { id: 7, text: 'Which traversal visits the root node first in a binary tree?', options: ['Inorder', 'Preorder', 'Postorder', 'Level-order'], correctAnswer: 'Preorder' },
          { id: 8, text: 'What handles collisions in a Hash Table?', options: ['Chaining', 'Re-hashing', 'Open Addressing', 'All of the above'], correctAnswer: 'All of the above' },
          { id: 9, text: 'A completely connected graph with n vertices has how many edges?', options: ['n-1', 'n(n-1)/2', 'n^2', 'n(n+1)/2'], correctAnswer: 'n(n-1)/2' },
          { id: 10, text: 'What is the space complexity of an iterative Depth First Search using a Stack?', options: ['O(1)', 'O(V)', 'O(E)', 'O(V+E)'], correctAnswer: 'O(V)' }
        ]
      },
      {
        title: 'C++ Programming Fundamentals',
        description: 'Test your knowledge of memory management and OOP in C++.',
        category: 'Software',
        price: 15,
        questionsCount: 10,
        questions: [
          { id: 1, text: 'Which operator is used to allocate memory dynamically in C++?', options: ['malloc', 'alloc', 'new', 'create'], correctAnswer: 'new' },
          { id: 2, text: 'What is a virtual function in C++?', options: ['A function without a body', 'A function that can be overridden in derived classes', 'A static function', 'An inline function'], correctAnswer: 'A function that can be overridden in derived classes' },
          { id: 3, text: 'Which of the following is NOT an access specifier in C++?', options: ['public', 'private', 'protected', 'internal'], correctAnswer: 'internal' },
          { id: 4, text: 'What does the "this" pointer refer to?', options: ['The base class', 'The global scope', 'The current object instance', 'The parent object'], correctAnswer: 'The current object instance' },
          { id: 5, text: 'How do you destroy a dynamically allocated array in C++?', options: ['delete array;', 'delete[] array;', 'free(array);', 'destroy array;'], correctAnswer: 'delete[] array;' },
          { id: 6, text: 'What is a friend function?', options: ['A function that can access private and protected members of a class', 'A standard library function', 'A function that inherits from multiple classes', 'A function without return type'], correctAnswer: 'A function that can access private and protected members of a class' },
          { id: 7, text: 'Which header file is required for standard input/output streams in C++?', options: ['<stdio.h>', '<iostream>', '<math.h>', '<conio.h>'], correctAnswer: '<iostream>' },
          { id: 8, text: 'What is polymorphism in C++?', options: ['Hiding data', 'Multiple inheritance', 'The ability to take many forms', 'Encapsulating variables'], correctAnswer: 'The ability to take many forms' },
          { id: 9, text: 'Which keyword is used to prevent a class from being inherited?', options: ['final', 'sealed', 'static', 'const'], correctAnswer: 'final' },
          { id: 10, text: 'What is the size of an int pointer on a 64-bit architecture?', options: ['4 bytes', '8 bytes', '2 bytes', 'Depends on the compiler'], correctAnswer: '8 bytes' }
        ]
      },
      {
        title: 'Assembly & Microarchitecture',
        description: 'Low-level systems programming and CPU architecture concepts.',
        category: 'Systems',
        price: 20,
        questionsCount: 10,
        questions: [
          { id: 1, text: 'What is the purpose of the Program Counter (PC) register?', options: ['To perform arithmetic operations', 'To store the address of the next instruction to execute', 'To store local variables', 'To manage cache memory'], correctAnswer: 'To store the address of the next instruction to execute' },
          { id: 2, text: 'Which of the following is typically the fastest memory?', options: ['L1 Cache', 'Main Memory (RAM)', 'L3 Cache', 'SSD'], correctAnswer: 'L1 Cache' },
          { id: 3, text: 'What is an opcode?', options: ['A memory address', 'A CPU register', 'The portion of a machine language instruction that specifies the operation to be performed', 'A cache miss error'], correctAnswer: 'The portion of a machine language instruction that specifies the operation to be performed' },
          { id: 4, text: 'Which of the following describes Pipelining in CPUs?', options: ['Executing multiple instructions simultaneously by dividing them into stages', 'Cooling the CPU with liquid', 'Increasing clock speed', 'Adding more cores'], correctAnswer: 'Executing multiple instructions simultaneously by dividing them into stages' },
          { id: 5, text: 'What does CISC stand for?', options: ['Centralized Instruction Set Computer', 'Complex Instruction Set Computer', 'Calculated Instruction Set CPU', 'Core Instruction Speed Controller'], correctAnswer: 'Complex Instruction Set Computer' },
          { id: 6, text: 'What happens during a branch misprediction?', options: ['The CPU halts', 'The cache is completely cleared', 'The CPU discards pipelined instructions and fetches the correct path', 'The RAM fails'], correctAnswer: 'The CPU discards pipelined instructions and fetches the correct path' },
          { id: 7, text: 'In x86 assembly, what does the "MOV" instruction do?', options: ['Multiplies variables', 'Moves the cursor', 'Copies data from one location to another', 'Moves the memory address'], correctAnswer: 'Copies data from one location to another' },
          { id: 8, text: 'What is a cache miss?', options: ['When data requested by the CPU is not found in the cache memory', 'When the hard drive fails', 'When a register is full', 'When the CPU overheats'], correctAnswer: 'When data requested by the CPU is not found in the cache memory' },
          { id: 9, text: 'What is the purpose of the ALU (Arithmetic Logic Unit)?', options: ['To store data permanently', 'To handle integer arithmetic and logical operations', 'To fetch instructions from RAM', 'To control I/O devices'], correctAnswer: 'To handle integer arithmetic and logical operations' },
          { id: 10, text: 'What is Endianness?', options: ['The speed of the CPU', 'The physical size of the chip', 'The sequential order in which bytes are arranged in memory', 'The final instruction in a program'], correctAnswer: 'The sequential order in which bytes are arranged in memory' }
        ]
      },
      {
        title: 'Database Design & SQL',
        description: 'Assess your skills in relational databases and normalization.',
        category: 'Backend',
        price: 15,
        questionsCount: 10,
        questions: [
          { id: 1, text: 'What does ACID stand for in database systems?', options: ['Atomicity, Consistency, Isolation, Durability', 'Accuracy, Concurrency, Integrity, Data', 'Array, Cache, Integer, Decimal', 'Automatic, Continuous, Indexed, Dynamic'], correctAnswer: 'Atomicity, Consistency, Isolation, Durability' },
          { id: 2, text: 'Which SQL statement is used to retrieve data from a database?', options: ['GET', 'EXTRACT', 'PULL', 'SELECT'], correctAnswer: 'SELECT' },
          { id: 3, text: 'What is a Primary Key?', options: ['A password for the database', 'A unique identifier for each record in a table', 'The first column in a table', 'A foreign key relationship'], correctAnswer: 'A unique identifier for each record in a table' },
          { id: 4, text: 'Which command is used to remove a table from a database completely?', options: ['DELETE', 'REMOVE', 'DROP', 'TRUNCATE'], correctAnswer: 'DROP' },
          { id: 5, text: 'What is the purpose of database normalization?', options: ['To increase data redundancy', 'To reduce data redundancy and improve data integrity', 'To make queries slower', 'To encrypt data'], correctAnswer: 'To reduce data redundancy and improve data integrity' },
          { id: 6, text: 'Which type of JOIN returns all rows from the left table and matched rows from the right table?', options: ['INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'FULL OUTER JOIN'], correctAnswer: 'LEFT JOIN' },
          { id: 7, text: 'What does the GROUP BY statement do?', options: ['Groups rows that have the same values into summary rows', 'Sorts the results alphabetically', 'Joins two tables together', 'Filters rows based on a condition'], correctAnswer: 'Groups rows that have the same values into summary rows' },
          { id: 8, text: 'Which keyword is used to filter records AFTER a GROUP BY clause?', options: ['WHERE', 'FILTER', 'HAVING', 'ORDER BY'], correctAnswer: 'HAVING' },
          { id: 9, text: 'What is a Foreign Key?', options: ['A key originating from another database', 'A field that links two tables together by referencing the primary key of another table', 'An encrypted field', 'An external API token'], correctAnswer: 'A field that links two tables together by referencing the primary key of another table' },
          { id: 10, text: 'What does the TRUNCATE command do?', options: ['Deletes a specific row', 'Deletes all rows in a table without logging individual row deletions', 'Drops the table schema', 'Updates a column'], correctAnswer: 'Deletes all rows in a table without logging individual row deletions' }
        ]
      },
      {
        title: 'Modern CSS & UI Design',
        description: 'Test your knowledge of Flexbox, Grid, and responsive design.',
        category: 'Frontend',
        price: 10,
        questionsCount: 5,
        questions: [
          { id: 1, text: 'Which property is used to change the background color?', options: ['color', 'bgcolor', 'background-color', 'bg'], correctAnswer: 'background-color' },
          { id: 2, text: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets', 'Colorful Style Sheets'], correctAnswer: 'Cascading Style Sheets' },
          { id: 3, text: 'Which Flexbox property aligns items horizontally in a row?', options: ['align-items', 'justify-content', 'flex-direction', 'align-content'], correctAnswer: 'justify-content' },
          { id: 4, text: 'What is the default position value in CSS?', options: ['relative', 'absolute', 'static', 'fixed'], correctAnswer: 'static' },
          { id: 5, text: 'How do you select an element with id="demo"?', options: ['.demo', '#demo', '*demo', 'demo'], correctAnswer: '#demo' }
        ]
      },
      {
        title: 'Docker & Containers',
        description: 'Validate your DevOps knowledge regarding images and containers.',
        category: 'DevOps',
        price: 20,
        questionsCount: 5,
        questions: [
          { id: 1, text: 'What is a Dockerfile?', options: ['A running container', 'A text document that contains all the commands to build an image', 'A volume mount', 'A network bridge'], correctAnswer: 'A text document that contains all the commands to build an image' },
          { id: 2, text: 'Which command is used to start a container?', options: ['docker start', 'docker build', 'docker run', 'docker init'], correctAnswer: 'docker run' },
          { id: 3, text: 'What is Docker Hub?', options: ['A local caching server', 'A cloud registry for Docker images', 'A CI/CD tool', 'A Linux kernel feature'], correctAnswer: 'A cloud registry for Docker images' },
          { id: 4, text: 'How do you list all running containers?', options: ['docker ps', 'docker ls', 'docker show', 'docker list'], correctAnswer: 'docker ps' },
          { id: 5, text: 'What does Docker use to provide isolation?', options: ['Virtual Machines', 'Hypervisors', 'Linux Namespaces and Cgroups', 'Emulators'], correctAnswer: 'Linux Namespaces and Cgroups' }
        ]
      },
      {
        title: 'Python for Beginners',
        description: 'Learn the syntax and core concepts of Python.',
        category: 'Backend',
        price: 15,
        questionsCount: 5,
        questions: [
          { id: 1, text: 'How do you create a variable with the numeric value 5?', options: ['x = 5', 'int x = 5', 'val x = 5', 'let x = 5'], correctAnswer: 'x = 5' },
          { id: 2, text: 'What is the correct file extension for Python files?', options: ['.pyth', '.pt', '.py', '.pyt'], correctAnswer: '.py' },
          { id: 3, text: 'How do you output "Hello World" in Python?', options: ['echo("Hello World")', 'p("Hello World")', 'print("Hello World")', 'console.log("Hello World")'], correctAnswer: 'print("Hello World")' },
          { id: 4, text: 'Which collection is ordered, changeable, and allows duplicate members?', options: ['List', 'Tuple', 'Set', 'Dictionary'], correctAnswer: 'List' },
          { id: 5, text: 'How do you start a while loop in Python?', options: ['while x > y:', 'while (x > y)', 'while x > y {', 'x > y while'], correctAnswer: 'while x > y:' }
        ]
      },
      {
        title: 'Machine Learning Basics',
        description: 'Understand core concepts in AI and model training.',
        category: 'AI',
        price: 30,
        questionsCount: 5,
        questions: [
          { id: 1, text: 'What is Supervised Learning?', options: ['Training without labels', 'Training with labeled data', 'Reinforcement learning', 'Unsupervised clustering'], correctAnswer: 'Training with labeled data' },
          { id: 2, text: 'What is overfitting?', options: ['Model learns the training data too well and performs poorly on new data', 'Model underperforms on training data', 'Model stops training early', 'Model is perfectly balanced'], correctAnswer: 'Model learns the training data too well and performs poorly on new data' },
          { id: 3, text: 'Which library is most commonly used for data manipulation in Python?', options: ['TensorFlow', 'PyTorch', 'Pandas', 'Flask'], correctAnswer: 'Pandas' },
          { id: 4, text: 'What does a loss function measure?', options: ['Execution speed', 'Memory usage', 'The difference between predicted and actual values', 'The number of neurons'], correctAnswer: 'The difference between predicted and actual values' },
          { id: 5, text: 'What is an epoch?', options: ['One full pass through the entire training dataset', 'A type of neural network layer', 'The final output of a model', 'The learning rate step'], correctAnswer: 'One full pass through the entire training dataset' }
        ]
      },
      {
        title: 'React Native Mobile',
        description: 'Build native iOS and Android apps using React.',
        category: 'Mobile',
        price: 25,
        questionsCount: 5,
        questions: [
          { id: 1, text: 'Which component is used to display text in React Native?', options: ['<p>', '<Text>', '<span>', '<Typography>'], correctAnswer: '<Text>' },
          { id: 2, text: 'How do you handle touches/clicks in React Native?', options: ['onClick', 'onPress', 'onTouch', 'onTap'], correctAnswer: 'onPress' },
          { id: 3, text: 'What acts as the primary layout engine in React Native?', options: ['CSS Grid', 'Bootstrap', 'Flexbox', 'Tailwind'], correctAnswer: 'Flexbox' },
          { id: 4, text: 'Which component replaces the traditional <div> in React Native?', options: ['<Container>', '<Section>', '<View>', '<Box>'], correctAnswer: '<View>' },
          { id: 5, text: 'What is Expo?', options: ['A backend framework', 'A set of tools built around React Native', 'An animation library', 'A state management tool'], correctAnswer: 'A set of tools built around React Native' }
        ]
      }
    ];

    await Test.insertMany(tests);
    console.log(`Successfully seeded ${tests.length} tests into the Assessments collection!`);

    mongoose.disconnect();
    console.log('Database connection closed.');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
