
/**
 * @see {@link https://www.npmjs.com/package/promise-mysql}
 */
const mysql = require('promise-mysql');
const inquirer = require('inquirer');


/**
 * Bring DB config in from separate file
 * to keep logic clean.
 */
const conf = require('../config.js');
const PrinterService = require('./PrintService');

/**
 * A service with a DB connection and the needed queries
 */
class QueryService {
  /**
   * Set some properties in the class constructor
   */
  constructor() {
    /**
     * The printer that would output DB data
     */
    this.prtSvc = new PrinterService();
  }

  /**
   * Creates a connection if one does not already exist
   * @return {Promise} the connection object
 */
  async createConnection() {
    if (this.conn) return this.conn;
    this.conn = await mysql.createConnection(conf);
    return this.conn;
  }

  /**
   * Reads all songs by artist
   * @return {Promise}
   */
  async getAllSongsByArtist() {
    const artist = await inquirer.prompt(
        {
          name: 'answer',
          message: 'Enter artist\'s name:',
        }
    );

    const orderBy = await this.orderByPrompt();

    // see 'array/object deconstruction'
    const [data] = await this.conn.query(
        `SELECT * FROM songs
        WHERE artist LIKE ?
        ORDER BY ?? DESC`,
        [`%${artist.answer}%`, orderBy.answer]
    );

    // see https://github.com/CodeFoodPixels/node-promise-mysql/issues/64
    // console.log(query.sql);

    this.prtSvc.printDefaultTable(data);
    return null;
  }

  /**
   * Find all artists who have more than one hit song
   * @return {Promise}
   */
  async getMultiHitArtists() {
    const [data] = await this.conn.query(
        `SELECT artist, COUNT(*) AS hits
        FROM songs
        GROUP BY artist
        HAVING COUNT(*) > 1
        ORDER BY hits DESC;`
    );

    const headers = ['ARTIST', 'HITS'];
    const vals = data.map((it) => Object.values(it));
    this.prtSvc.printArray(headers, vals);
    return null;
  }

  /**
   * Find all songs that are in the top ten
   * @return {Promise}
   */
  async getTopTen() {
    const orderBy = await this.orderByPrompt();
    const [data] = await this.conn.query(
        `SELECT * FROM songs
        ORDER BY ?? DESC
        LIMIT 10;`,
        [orderBy.answer]
    );
    this.prtSvc.printDefaultTable(data);
    return null;
  }

  /**
   * Find info about a specific song
   * @return {Promise}
   */
  async getSongByName() {
    const song = await inquirer.prompt(
        {
          name: 'answer',
          message: 'Enter song name:',
        }
    );
    const orderBy = await this.orderByPrompt();
    const [data] = await this.conn.query(
        `SELECT * FROM songs
        WHERE song LIKE ?
        ORDER BY ?? DESC;`,
        [`%${song.answer}%`, orderBy.answer]
    );
    this.prtSvc.printDefaultTable(data);
    return null;
  }

  /**
   * @return {Promise} Promise resolved to prompt answer
   */
  orderByPrompt() {
    const choices = [
      {
        name: 'GLOBAL',
        value: 'raw_total',
      },
      {
        name: 'USA',
        value: 'raw_usa',
      },
      {
        name: 'UK',
        value: 'raw_uk',
      },
      {
        name: 'EUR',
        value: 'raw_eur',
      },
      {
        name: 'REST OF WORLD',
        value: 'raw_row',
      },
      {
        name: 'YEAR of Publication',
        value: 'year',
      },
    ];

    return inquirer.prompt(
        {
          name: 'answer',
          message: 'Order by:',
          type: 'list',
          default: choices[0],
          choices,
        }
    );
  }
}

module.exports = QueryService;


