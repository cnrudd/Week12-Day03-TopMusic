require('dotenv').config();
const inquirer = require('inquirer');

const QueryService = require('./svc/QueryService');


/**
 * Main entry point to script
 * This is an 'async' function
 * @see {@link https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await}
 */


/**
  * Main entry point to app
  */
async function run() {
  const qSvc = new QueryService();
  await qSvc.createConnection();

  console.log('Welcome to the Top 5000 Songs DB.');
  interact(qSvc);
}

/**
 *
 * @param {Object} qSvc Instance of QueryService class
 *                      with connection and queries
 */
async function interact(qSvc) {
  const choices = [
    {
      name: 'Find all songs by artist',
      value: () => qSvc.getAllSongsByArtist(),
    },
    {
      name: 'Find all artists who have more than one hit song',
      value: () => qSvc.getMultiHitArtists(),
    },
    {
      name: 'Find all songs that are in the top ten',
      value: () => qSvc.getTopTen(),
    },
    {
      name: 'Find info about a specific song',
      value: () => qSvc.getSongByName(),
    },
    {
      name: 'Quit',
      value: () => process.exit(0),
    },
  ];


  const userAction = await inquirer.prompt(
      {
        name: 'doIt',
        message: 'What would you like to know?',
        type: 'list',
        choices,
        default: choices[0],
      }
  );

  await userAction.doIt();

  interact(qSvc);
}

run();
