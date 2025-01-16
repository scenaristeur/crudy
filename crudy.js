import { input } from '@inquirer/prompts';
import { Command } from 'commander';
const program = new Command();

// crudy vars
let cv =  {

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
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program
  .option('-b, --base <location>', 'specify the base path, local like "~/crudy" or remote like "https://academy-cdr.solidcommunity.net/public/"', '~/crudy/');

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




const process_input = async (input) =>{
let status = 200  
let inputArray = input.trim().split(/\s+/); // split multi-spaces https://bobbyhadz.com/blog/javascript-split-string-multiple-spaces
if (cv.debug == true) {
  console.log(inputArray)
}




let message = "unknown"
switch (status) {
  case 200:
    message = 'OK'
    break;

  default:
    break;
}
  return {status: status, message: message, input:input, inputArray:inputArray}
}

const main = async () => {
  while (cv.input != "exit") {
    cv.input = await input({ message: cv.prompt });
    console.log(cv.input)
    cv.history.push({ "cmd": cv.input, "ts": Date.now() })
    cv.output = await process_input(cv.input)
    console.log(">>",cv.output ) 
  }

  if (cv.debug == true) {
    console.log(cv)
  }
}

main()


