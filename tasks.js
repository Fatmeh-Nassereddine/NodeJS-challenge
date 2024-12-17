
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}
let tasks = [
  { task: "git add", done: true },
  { task: "git commit", done: false },
  { task: "git push", done: false }
];


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  const cleanedText = text.trim(); // Clean input

  if (cleanedText === 'quit' || cleanedText === 'exit') {
    quit();
  } else if (cleanedText.startsWith('hello')) {
    hello(cleanedText);
  } else if (cleanedText === 'list') {
    list();
  } else if (cleanedText.startsWith('add ')) {
    const task = cleanedText.slice(4).trim(); // Remove "add " and trim spaces
    add(task);
  } else if (cleanedText.startsWith('remove')) {
    const args = cleanedText.split(' ').slice(1);
    remove(args[0]);
  } else if (cleanedText.startsWith('edit ')) {
    const args = cleanedText.split(' ').slice(1);
    if (args.length === 1) {
      edit(0, args[0]);  // Edit the last task
    } else if (args.length > 1) {
      const taskNumber = args[0];
      const newText = args.slice(1).join(' ');
      edit(taskNumber, newText);  // Edit specific task
    }
  } else if (cleanedText.startsWith('check ')) {
    const args = cleanedText.split(' ').slice(1);
    if (args.length === 1) {
      check(args[0]);  // Check the specified task
    } else {
      console.log("Error: You must provide a task number to check.");
    }
  } else if (cleanedText.startsWith('uncheck ')) {
    const args = cleanedText.split(' ').slice(1);
    if (args.length === 1) {
      uncheck(args[0]);  // Uncheck the specified task
    } else {
      console.log("Error: You must provide a task number to uncheck.");
    }
  }else if (cleanedText === 'help') {
    help();
  } else {
    unknownCommand(text);
  }
}

function hello(text) {
  const words = text.split(' ');  // Split the input into words
  const name = words[1];  // The second word (after "hello") is the argument
  if (name) {
    console.log(`hello ${name}!`);  // If there's an argument, say hello <name>!
  } else {
    console.log('hello!');  // If there's no argument, just say hello!
  }
}
//  Lists all tasks with task numbers//

function list() {
  if (tasks.length === 0) {
    console.log("No tasks available.");
  } else {
    tasks.forEach((task, index) => {
      const status = task.done ? "[✓]" : "[ ]";
      console.log(`${index + 1}. ${status} ${task.task}`);
    });
  }
}
//Adds a task to the task list//
function add(task) {
  if (task.trim()) {
    tasks.push({ task: task.trim(), done: false });
    console.log(`Task added: ${task}`);
  } else {
    console.log("Error: You must provide a task.");
  }
}

/* Removes a task from the task list by index.
 *
 * @param {number} index the index of the task to be removed
 * @returns {void}
 */
function remove(index) {
  if (index) {
    index = parseInt(index, 10) - 1;  // Convert to zero-based index
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      console.log(`Task ${index + 1} removed.`);
    } else {
      console.log("Error: Task number does not exist.");
    }
  } else {
    if (tasks.length > 0) {
      tasks.pop();  // Remove the last task if no index is provided
      console.log("Last task removed.");
    } else {
      console.log("Error: No tasks to remove.");
    }
  }
}
//check function//
function check(index) {
  index = parseInt(index, 10) - 1;  // Convert to zero-based index
  if (index >= 0 && index < tasks.length) {
    tasks[index].done = true;
    console.log(`Task ${index + 1} marked as done.`);
  } else {
    console.log("Error: Task number does not exist.");
  }
}
//uncheck function//
function uncheck(index) {
  index = parseInt(index, 10) - 1;  // Convert to zero-based index
  if (index >= 0 && index < tasks.length) {
    tasks[index].done = false;
    console.log(`Task ${index + 1} marked as undone.`);
  } else {
    console.log("Error: Task number does not exist.");
  }
}

/**
 * Edits a task from the task list by index.
 *
 * @param {number} index the index of the task to be edited
 * @param {string} newText the new text for the task
 * @returns {void}
 */
function edit(index, newText) {
  if (newText.trim()) {
    if (index) {
      index = parseInt(index, 10) - 1;  // Convert to zero-based index
      if (index >= 0 && index < tasks.length) {
        tasks[index] = newText.trim();
        console.log(`Task ${index + 1} edited: ${newText.trim()}`);
      } else {
        console.log("Error: Task number does not exist.");
      }
    } else {
      if (tasks.length > 0) {
        tasks[tasks.length - 1] = newText.trim();  // Edit the last task
        console.log(`Last task edited: ${newText.trim()}`);
      } else {
        console.log("Error: No tasks to edit.");
      }
    }
  } else {
    console.log("Error: You must provide new text for the task.");
  }
}












/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(){
  console.log('hello!')
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
/**
 * /**
 * Displays a list of available commands.
 *
 * This function is called when the user types "help". It will display a list of all the available commands that the user can execute in the application.
 * 
 * Available commands:
 * - hello [name]: Says hello to the user with the provided name
 * - hello: Says hello without a name
 * - list: Lists all tasks
 * - add <task>: Adds a task to the list
 * - remove [index]: Removes a task from the list. If no index is provided, removes the last task
 * - quit / exit: Exits the application
 * - help: Displays this help message
 * 
 * @returns {void}
 */
function help() {
  console.log("Available commands:");
  console.log("  hello [name] - Says hello to the user with the provided name");
  console.log("  hello - Says hello without a name");
  console.log("  list - Lists all tasks");
  console.log("  add <task> - Adds a task to the list");
  console.log("  remove [index] - Removes a task from the list");
  console.log("  edit [index] [new text] - Edits a task by index");
  console.log("  quit / exit - Quits the application");
  console.log("  help - Displays this help message");
}


// The following line starts the application
startApp("Fatmeh Nassereddine")
