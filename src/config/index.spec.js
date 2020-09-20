import { appConfig, escribaConf, envProdName } from './index'

describe('config', () => {
  test('envProdName', () => {
    expect(envProdName).toBe('production')
  })
  test('appConfig', () => {
    expect(appConfig).toHaveProperty('appName', 'team-scrapper')
    expect(appConfig).toHaveProperty('isProduction', false)
    expect(appConfig.isProduction).not.toBeUndefined()
    expect(appConfig.isProduction).not.toBeNull()
    expect(appConfig).toHaveProperty('envName', 'test')
    expect(appConfig).toHaveProperty('scrapper')
    expect(appConfig.scrapper).toHaveProperty('url', 'https://www.flamengo.com.br/elencos/elenco-profissional')
  })
  test('escribaConf', () => {
    expect(escribaConf).toHaveProperty('log4jsConf')
    expect(escribaConf.log4jsConf).toHaveProperty('appenders')
    expect(escribaConf.log4jsConf.appenders).toHaveProperty('out', {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '[%d] %m'
      }
    })
    expect(escribaConf.log4jsConf.categories).toHaveProperty('default', {
      appenders: [
        'out'
      ],
      level: 'info'
    })
    expect(escribaConf).toHaveProperty('sensitiveConf')
    expect(escribaConf.sensitiveConf).toHaveProperty('password', {
      paths: ['message.password'],
      pattern: /\w.*/g,
      replacer: '*'
    })
  })
})
