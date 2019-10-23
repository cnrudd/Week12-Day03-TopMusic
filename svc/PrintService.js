/**
 * cli-table prints arrays or objects in nicely formatted tables
 * to the console
 * @see {@link https://www.npmjs.com/package/@lvchengbin/cli-table}
 */
const Table = require( '@lvchengbin/cli-table' );

module.exports = class PrintService {
  /**
   * Set some class properties in the constructor
   */
  constructor() {
    /**
     * The colors used in the output tables.
     * Chosen to be readable in both dark and light themes.
     */
    this.consoleTableStyle = {
      style: {
        header: {
          color: 'blue',
        },
        cell: {
          color: 'green',
        },
        border: {
          color: 'orange',
        },
      },
    };
  }

  /**
   * @param {[String[]]} data Array of array of strings
   */
  printDefaultTable(data) {
    const headers = [
      'ARTIST', 'SONG', 'YEAR', 'GLOBAL',
      'USA', 'UK', 'EUR', 'REST OF WORLD',
    ];
    const vals = data.map((it) => Object.values(it).slice(1));
    this.printArray(headers, vals);
  }

  /**
   *
   * @param {String[]} headers Header names
   * @param {[String[]]} data Array of array of strings
   */
  printArray(headers, data) {
    // add row count to row data
    data = data.map((it, idx) => [++idx].concat(it));
    // add column header for row counter to left side
    headers.unshift('');

    const table = new Table(data, this.consoleTableStyle);
    table.setHeader(headers);
    console.log(table);
    console.log('\n');
  }
}
;
