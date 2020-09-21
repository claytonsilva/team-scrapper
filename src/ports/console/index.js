import { adapter } from '../../adapters'
import { appConfig } from '../../config'
import { handleLogger } from '../logger/logger'

/**
 * main function handler
 * more about: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
 *
 * @memberof ports/aws/lambda
 * @param {*} event event object information from lambda (https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-s3.html)
 * @param {*} context information from direct call with params
 * @param {*} circuit breaker function
 */

const main = async () => {
  // Escriba configuration.
  const escriba = handleLogger(appConfig.appName, appConfig.envName)

  // inject adapters
  const adapterInstance = adapter(escriba, appConfig.scrapper.url)

  return adapterInstance.scrapper.extract()
}

main().then((result) => {
  console.info(result)
  process.exit(0)
})
