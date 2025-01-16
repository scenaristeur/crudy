import { input } from '@inquirer/prompts';
import { Command } from 'commander';
import { FileSystem } from './lib/FileSystem.js';
import { DataManager } from './lib/DataManager.js';

const program = new Command();

// COMMANDES
// [ ] debug, show cv variables
// [ ] ls

// crudy vars
let cv = {
  debug: true,
  crudy_admin_path: "~./crudy/",
  prompt: 'crudy>',
  input: null,
  history: [],
  options: null
}

// cli gestion
process.stdout.write("\u001b[2J\u001b[0;0H");
process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('👋 until next time!');
  } else {
    // Rethrow unknown errors
    throw error;
  }
});

// commander
program
  .name('crudy')
  .description('CRUDY is the json and yaml CRUD.')
  .version('0.0.1');

program
  .option('-b, --base <location>', 'specify the base path, local like "~/crudy" or a remote Solid POD like "https://academy-cdr.solidcommunity.net/public/"', process.env.HOME + '/crudy_base/');

// program.command('split')
// .description('Split a string into substrings and display as an array')
// .argument('<string>', 'string to split')
// .option('--first', 'display just the first substring')
// .option('-s, --separator <char>', 'separator character', ',')
// .action((str, options) => {
//   const limit = options.first ? 1 : undefined;
//   console.log(str.split(options.separator, limit));
// });

program.parse();
cv.options = program.opts();
console.log("CRUDY", "'exit' to quit")

const init = async (cv) => {
  cv.fs = new FileSystem({ path: cv.options.base })
  cv.dm = new DataManager(cv)
}

const process_input = async (cv) => {
  let status = 200

  cv.inputArray = cv.input.trim().split(/\s+/); // split multi-spaces https://bobbyhadz.com/blog/javascript-split-string-multiple-spaces
  if (cv.debug == true) {
    console.log(cv.inputArray)
  }
  let cmd = cv.inputArray[0]
  let result = null
  switch (cmd) {
    case "ls":
    case "touch":
    case "cd":
    case "rm":
    case "use":
    case "echo":
      result = await cv.fs[cmd](cv)
      // console.log(result)
      break;
    default:
      // console.log("NOT IMPLEMENTED YET")
      if (cv.fs.currentFilename != undefined) {
        result = await cv.dm.execute(cv)
      } else {
        console.log("You must first define a file/db with 'use xxx' command, you can show avaailable with ls or create with 'touch my_db'")
      }
      break;
  }



  let message = "unknown"
  switch (status) {
    case 200:
      message = 'OK'
      break;
    default:
      break;
  }
  let output = { status: status, message: message, input: cv.input, inputArray: cv.inputArray, result: result }
  if (cv.debug == true) {
    console.log(output)
  }
  return output
}

const main = async (cv) => {
  while (cv.input != "exit") {
    cv.input = await input({ message: cv.prompt });
    console.log(cv.input)
    if (cv.input == "debug") {
      console.log(cv)
    }
    cv.history.push({ "cmd": cv.input, "ts": Date.now() })
    cv.output = await process_input(cv)
    console.log(">>[" + cv.output.message + "] " + cv.output.input)
  }
  if (cv.debug == true) {
    console.log(cv)
  }
}

init(cv)
main(cv)


