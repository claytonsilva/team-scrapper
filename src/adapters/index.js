/**
 * Adapters  Namespace.
 * @namespace adapters
 *
 *
 * @description this namespace control communication between business and state-machines
 */

/**
 * @typedef {Object} Adapter
 * @property {ScrapperAdapter} scrapper scraper adapter instantied
 */

// code imports
import scrapperAdapterFactory,
// eslint-disable-next-line no-unused-vars
{ ScrapperAdapter } from './scrapper'

/**
 * @description dynamo repository for state machine
 *
 * @memberof ports/state-machines
 * @function
 * @param {Logger} escriba - Instance of escriba.
 * @param {string} url - url from site to scrap
 * @returns {Adapter}
 */
export const adapter = (escriba, url) => {
  return {
    scrapper: scrapperAdapterFactory(escriba, url)
  }
}
