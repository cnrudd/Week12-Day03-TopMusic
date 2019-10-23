
/**
 * @see {@link https://www.npmjs.com/package/promise-mysql}
 */
const mysql = require('promise-mysql');
const inquirer = require('inquirer');

/**
 * Bring DB config in from separate file
 * to keep logic clean.
 */
const conf = require('./config.js');

/**
 * A DB connection with the needed queries
 */
class DB {
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

    return this.conn.query(
        'SELECT * FROM `songs` WHERE ?',
        {
          artist: artist.answer,
        }
    ).then((res) => {
      console.log(res);
      return null;
    });
  }

  /**
   * Find all artists who have more than one hit song
   * @return {Promise}
   */
  async getMultiHitArtists() {
    return this.conn.query(
        `SELECT artist, COUNT(*) AS \`count\`
        FROM songs
        GROUP BY artist
        HAVING COUNT(*) > 1;`
    ).then((res) => {
      console.log(res);
      return null;
    });
  }

  /**
   * Find all songs that are in the top ten in the world
   * @return {Promise}
   */
  async getTopTen() {
    return this.conn.query(
        `SELECT * FROM songs
        ORDER BY raw_total DESC
        LIMIT 10;`
    ).then((res) => {
      console.log(res);
      return null;
    });
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

    return this.conn.query(
        `SELECT * FROM songs
        WHERE song LIKE ?`,
        [`%${song.answer}%`]
    ).then((res) => {
      console.log(res);
      return null;
    });
  }
}

module.exports = DB;


