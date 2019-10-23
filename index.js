require('dotenv').config();
const inquirer = require('inquirer');

const DB = require('./DB');


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
  const db = new DB();
  await db.createConnection();

  console.log('Welcome to the Top 5000 Songs DB.');
  interact(db);
}

/**
 *
 * @param {Object} db Our DB class with connection and queries
 */
async function interact(db) {
  const choices = [
    {
      name: 'Find all songs by artist',
      value: () => db.getAllSongsByArtist(),
    },
    {
      name: 'Find all artists who have more than one hit song',
      value: () => db.getMultiHitArtists(),
    },
    {
      name: 'Find all songs that are in the top ten in the world',
      value: () => db.getTopTen(),
    },
    {
      name: 'Find info about a specific song',
      value: () => db.getSongByName(),
    },
    {
      name: 'Quit',
      value: () => process.exit(0),
    },
  ];


  const doWhat = await inquirer.prompt(
      {
        name: 'choice',
        message: 'What would you like to know?',
        type: 'list',
        choices,
        default: choices[0],
      }
  );

  await doWhat.choice();

  interact(db);
}

run();
