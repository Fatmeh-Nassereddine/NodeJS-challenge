
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
let tasks=["git add","git commit","git push"]

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
  console.log('Received:', text);  // Add a console log to test user input
  const cleanedText = text.trim(); // Remove newlines and extra spaces

  if (cleanedText === 'quit' || cleanedText === 'exit') {
    quit();
  } else if (cleanedText.startsWith('hello')) {
    hello(cleanedText);  // Pass the whole text to the hello function
  } else if (cleanedText === 'list') {
    list();  // Call the list function when the user types "list"
  }else if (cleanedText.startsWith('add ')) {
    const task = cleanedText.slice(4).trim(); // Remove "add " and trim spaces
    add(task);  // Add the task if provided
  }else if (cleanedText.startsWith('remove')) {
  const args = cleanedText.split(' ').slice(1);
  if (args.length === 0) {
    remove();  // Remove the last task if no number is provided
  } else {
    remove(args[0]);  // Remove the specified task by index
  }
}  else if (cleanedText === 'help') {
  help();
}else {
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
function list() {
  if (tasks.length === 0) {
    console.log("No tasks available.");
  } else {
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
  }
}
function add(task) {
  if (task.trim()) {
    tasks.push(task.trim());
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
  console.log("  quit / exit - Quits the application");
  console.log("  help - Displays this help message");
}


// The following line starts the application
startApp("Fatmeh Nassereddine")
