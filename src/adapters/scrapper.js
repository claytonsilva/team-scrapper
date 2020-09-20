/**
 * Reference only imports (for documentation)
*/

// eslint-disable-next-line no-unused-vars
import { Logger } from 'log4js'

/**
 * code imports
 */

import {
  // eslint-disable-next-line no-unused-vars
  CustomError,
  EClassError,
  throwCustomError
} from '../utils'

import { } from '../business/scrapper'

/**
 * @description Scrapper adapter factory
 * @memberof adapters
 * @function
 * @param {Logger} escriba instance of escriba logger
 * @param {string} url url to scrap
 * @returns {ScrapperAdapter} scrapper adapter instantied
 */
const todoAdapterFactory = (escriba, url) => ({
  extract: extract(escriba, url)
})

export default todoAdapterFactory

/**
 * @description Handler function to get data from website .
 * @memberof adapters
 * @async
 * @function
 * @throws {CustomError}
 * @param {Logger} escriba instance of escriba logger
 * @param {string} url url to scrap
 * @returns {extractReturn} GetDocument method ready to execute.
 */
const extract = (repository, url) => async () => {
  const methodPath = 'adapters.scrapper.extract'
  try {
    return await Promise.resolve(null)
  } catch (error) {
    throwCustomError(error, methodPath, EClassError.INTERNAL)
  }
}

/**
 * complex callbacks documentation
 *
 */

/**
 * This callback is displayed as part of the extract function.
 * @memberof adapters
 * @callback extractReturn
 * @returns {Promise<PlayerList>} task from repository
 */
