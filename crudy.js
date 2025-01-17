import fs from 'fs'
import { input } from '@inquirer/prompts';
import { Command } from 'commander';
import { FileSystem } from './lib/FileSystem.js';
import { DataManager } from './lib/DataManager.js';

const program = new Command();

// COMMANDES
// [ ] debug, show cv variables
// [ ] ls
console.log(process.env.HOME)
// crudy vars
let cv = {
  debug: true,
  crudy_admin_path: process.env.HOME + "/.crudy/",
  core_prompt: 'crud',
  input: null,
  history: [],
  options: null,
  base: []
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

try {
  let lb_filename = cv.crudy_admin_path + 'last_base.json'
  if (!fs.existsSync(cv.crudy_admin_path)) {
    fs.mkdirSync(cv.crudy_admin_path)
  }
  if (fs.existsSync(lb_filename)) {
    let last_base = await fs.readFileSync(lb_filename, 'utf8');
    console.log("last_base", last_base)
    if (last_base != undefined) {
      cv.base = JSON.parse(last_base)
    }
  }

} catch (e) {
  console.log(e)
}


// commander
program
  .name('crudy')
  .description('CRUDY is the json and yaml CRUD.')
  .version('0.0.1');

program
  .option('-p, --path <location>', 'specify the path path, local like "~/crudy/data" or a remote Solid POD like "https://academy-cdr.solidcommunity.net/public/"', process.env.HOME + '/crudy/data/')
  .option('-b, --base <base>', 'the db that you want to use, can be a file or a folder in the path', "default")
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
  cv.fs = new FileSystem({ path: cv.options.path })
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
const inq_prompt = (cv) => {
  let p = cv.core_prompt
  p += "["
  p += cv.base[0]
  p += "]"
  p += "> "
  return p
}

const saveCvLastBase = async (cv) => {
  try {
    await fs.writeFileSync(cv.crudy_admin_path + 'last_base.json', JSON.stringify(cv.base), 'utf8');
  } catch (e) { console.log(e) }
}


const main = async (cv) => {
  while (cv.input != "exit") {

    cv.input = await input({ message: inq_prompt(cv) });
    console.log(cv.input)
    if (cv.input == "debug") {
      console.log(cv)
    }
    cv.history.push({ "cmd": cv.input, "ts": Date.now() })
    cv.output = await process_input(cv)
    console.log(">>[" + cv.output.message + "] " + cv.output.input)
    saveCvLastBase(cv)
  }
  if (cv.debug == true) {
    console.log(cv)
  }
}

init(cv)
main(cv)


