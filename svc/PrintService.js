/**
 * @module PrintService
 */

/**
 * cli-table prints arrays or objects in nicely formatted tables
 * to the console
 * @see {@link https://www.npmjs.com/package/@lvchengbin/cli-table}
 */
const Table = require( '@lvchengbin/cli-table' );

/**
 * The PrintService takes care of formatting and styling data
 * before logging it to the console.
 */
class PrintService {
  /**
   * Set some class properties in the constructor
   */
  constructor() {
    /**
     * @property {Object} consoleTableStyle The colors used in the output tables.
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
   * The table printed by most queries, shows all columns.
   * @param {(album|song)} column The name of the subject's column
   * @param {Array.<string[]>} data Array of array of strings
   */
  printDefaultTable(column, data) {
    const headers = [
      'ARTIST', column.toUpperCase(), 'YEAR', 'GLOBAL POSITION', 'GLOBAL',
      'USA', 'UK', 'EUR', 'REST OF WORLD',
    ];
    const vals = data.map((it) => Object.values(it));
    this.printArray(headers, vals);
  }

  /**
   * The lower level table printer
   * @param {String[]} headers Header names
   * @param {Array.<string[]>} data Array of array of strings
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
};

module.exports = PrintService;
