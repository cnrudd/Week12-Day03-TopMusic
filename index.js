require('dotenv').config();
const inquirer = require('inquirer');

const QueryService = require('./svc/QueryService');


/**
 * Main entry point to script
 * @see {@link https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await}
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
  const product = await inquirer.prompt(
      {
        name: 'type',
        message: 'Search albums or songs?',
        type: 'list',
        choices: [
          {
            name: 'Albums',
            value: {
              table: 'albums',
              column: 'album',
            },
          },
          {
            name: 'Songs',
            value: {
              table: 'songs',
              column: 'song',
            },
          },
        ],
      }
  );

  const choices = makeChoices(product.type);

  const query = await inquirer.prompt(
      {
        name: 'funcName',
        message: 'What would you like to know?',
        type: 'list',
        choices,
        default: choices[0],
      }
  );

  await qSvc[query.funcName](product.type);

  const next = await inquirer.prompt(
      {
        name: 'step',
        message: 'Search again?',
        type: 'list',
        choices: [
          {
            name: 'Yes',
            value: () => interact(qSvc),
          },
          {
            name: 'Quit',
            value: () => process.exit(0),
          },
        ],
      }
  );

  next.step();
}

/**
 * Build the userAction choices with the chosen table
 * @param {Object} subject Table to search
 * @return {Object[]}  An array of prompt choices
 */
function makeChoices(subject) {
  return [
    {
      name: `Find all ${subject.table} by artist`,
      value: 'getAllWorksByArtist',
    },
    {
      name: `Find all artists who have more than one hit ${subject.column}`,
      value: 'getMultiHitArtists',
    },
    {
      name: `Find info about a specific ${subject.column}`,
      value: 'getWorkByName',
    },
    {
      name: `Find top ten ${subject.table}`,
      value: 'getTopTen',
    },
    {
      name: `Find how many hit ${subject.table} in each year`,
      value: 'getHitsCountByYear',
    },
    {
      name: `Find hit ${subject.table} in a particular year`,
      value: 'getHitsInYear',
    },
  ];
}

run();
