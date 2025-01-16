import { input } from '@inquirer/prompts';
import { Command } from 'commander';
const program = new Command();

// crudy vars
let cv =  {

  debug: true,
  crudy_admin_path: "~./crudy/",
  prompt: 'crudy>',
  answer: null,
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

if (cv.debug == true) {
  console.log(cv)

}

const main = async () => {
  while (cv.answer != "exit") {
    cv.answer = await input({ message: cv.prompt });
    console.log(cv.answer)
    cv.history.push({ "cmd": cv.answer, "ts": Date.now() })
  }

  console.log(cv.history)

}

main()