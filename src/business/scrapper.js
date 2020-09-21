import cheerio from 'cheerio'
import { head, last, range } from 'ramda'

/**
 * @description return filter function to extract all players page from main staff page
 * @memberof business
 * @function
 * @param {string} content content html to parse
 * @returns {Array<PlayerInfo>} array of players url reference
 */
export const filterPlayersRef = (content) => {
  const playerList = cheerio
    .load(content)('div.container.py-5 div.row div.col-12 div.elenco.mb-4 div.elenco-atleta a.1')
    .map((index, node) => {
      const { photoUrl, name, error } = extractPropertiesFromNodes(node)
      return {
        moreInfo: node.attribs['href'],
        photoUrl,
        name,
        error
      }
    })

  return range(0, playerList.length).map((val, index) => playerList[index])
}

/**
 * @description return extratect info from node struct in main page
 * @memberof business
 * @throws {CustomError}
 * @function
 * @param {Object} DOM element to extract info
 * @returns {Array<NodeProperties>} array of players url reference
 */

export const extractPropertiesFromNodes = (node) => {
  try {
    const attribs = head(
      head(
        head(
          head(
            head(
              head(node.children.filter(d => d.name === 'div')) // content
                .children.filter(d => d.name === 'div')) // front
              .children.filter(d => d.name === 'figure')) // figure
            .children.filter(d => d.name === 'div')) // molde
          .children.filter(d => d.name === 'div')) // capsule
        .children.filter(d => d.name === 'img')) // img inner capsule
      .attribs

    return {
      name: attribs['alt'],
      photoUrl: attribs['src'],
      error: null
    }
  } catch (error) {
    return {
      name: '',
      photoUrl: '',
      error: error.message
    }
  }
}

/**
 * @description return scrap info from single player page
 * @memberof business
 * @function
 * @param {string} content content html to parse
 * @returns {Player} player info
 */
export const extractPlayerInfo = (content) => {
  try {
    const playerInfoDOM = cheerio.load(content)
    const playerName = head(head(playerInfoDOM('div.banner-atleta div.card-body p.text-white span')).children).data
    const playerPosition = last(head(playerInfoDOM('div.banner-atleta div.card-body ul.list-unstyled li')).children).data.trim()
    const photoUrl = head(playerInfoDOM('div.banner-atleta img.img-persona')).attribs['src']

    return {
      playerName,
      playerPosition,
      photoUrl,
      error: null
    }
  } catch (error) {
    return {
      playerName: '',
      playerPosition: '',
      photoUrl: '',
      error: error.message
    }
  }
}

/**
* @typedef {Object} Player final player information
* @property {string} playerName  id of the task
* @property {string} playerPosition  order of activity
* @property {string} photoUrl description of taks
* @property {Object} error if has error to extract, this object will be sent with more info
*/

/**
* @typedef {Object} NodeProperties properties from main page extraction
* @property {string} name  id of the task
* @property {string} photoUrl description of taks
* @property {string} error details of the error on extraction
*/

/**
* @typedef {Object} PlayerInfo
* @property {string} name  id of the task
* @property {string} photoUrl description of taks
* @property {string} moreInfo url to extract  more data from player
* @property {string} error details of the error on extraction
*/
