import scrapperAdapterFactory from './scrapper'
import { throwCustomError } from '../utils/errors'

/** mock error generation to validate signature */
jest.mock('../utils/errors')

throwCustomError.mockImplementation((error) => {
  throw error
})

// mock escriba calls
const escribaMock = {
  info: jest.fn((args) => (args)).mockReturnValue(undefined)
}

const urlMock = 'https://some-url'

// mock instantiated adapter
const adapterInstiated = scrapperAdapterFactory(escribaMock, urlMock)

describe('extract', () => {
  // const methodPath = 'adapters.scrapper.extract'

  test('default case', async () => {
    await expect(adapterInstiated.extract())
      .resolves.toBe(null)
    // mock axios
    // expect(getDocument).toHaveBeenCalled()
  })

  test('throw error', async () => {

  })
})
