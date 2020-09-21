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
import axios from 'axios'
import bluebird from 'bluebird'
import {
  // eslint-disable-next-line no-unused-vars
  NodeProperties, Player, PlayerInfo,
  filterPlayersRef, extractPlayerInfo
} from '../business/scrapper'

/**
 * @description Scrapper adapter factory
 * @memberof adapters
 * @function
 * @param {Logger} escriba instance of escriba logger
 * @param {string} url url to scrap
 * @returns {ScrapperAdapter} scrapper adapter instantied
 */
const scrapperAdapterFactory = (escriba, url) => ({
  extract: extract(escriba, url)
})

export default scrapperAdapterFactory

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
const extract = (escriba, url) => async (overrideUrl = url) => {
  const methodPath = 'adapters.scrapper.extract'
  try {
    const requestResult = await axios({
      method: 'get',
      url: overrideUrl
    }).then((response) => {
      if (response.status >= 399) {
        throw new Error('invalid status for this call')
      }

      return bluebird
        .map(filterPlayersRef(response.data), (item) => extractPlayeInfo(escriba, item))
    })

    return requestResult
  } catch (error) {
    throwCustomError(error, methodPath, EClassError.INTERNAL)
  }
}

/**
 * @description Handler function to get data from singlePlayer .
 * @memberof adapters
 * @async
 * @function
 * @throws {CustomError}
 * @param {Logger} escriba instance of escriba logger
 * @param {string} url url to scrap
 * @param {PlayerInfo} overrideData data to override in error case
 * @returns {Promise<Array<Player>>} GetDocument method ready to execute.
 */
export const extractPlayeInfo = async (escriba, overrideData) => {
  const methodPath = 'adapters.scrapper.extractPlayeInfo'

  try {
    const requestResult = await axios({
      method: 'get',
      url: overrideData.moreInfo
    }).then((response) => {
      if (response.status >= 399) {
        throw new Error(`invalid status for this call. url: ${overrideData.moreInfo}`)
      }
      return extractPlayerInfo(response.data)
    })

    return requestResult
  } catch (error) {
    escriba.error(error, methodPath, EClassError.INTERNAL)

    return {
      playerName: overrideData.name,
      photoUrl: overrideData.photoUrl,
      playerPosition: '',
      error: error
    }
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
 * @param {string} overrideUrl to scrap (default from env config if null)
 * @returns {Promise<Player>} task from repository
 */

/**
* @typedef {Object} ScrapperAdapter
* @property {extractReturn} extract  extract info from site
*/
