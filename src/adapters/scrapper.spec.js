import scrapperAdapterFactory, { extractPlayeInfo } from './scrapper'
import { throwCustomError, EClassError } from '../utils/errors'
import axios from 'axios'
import { appConfig } from '../config'
import fs from 'fs'
import { range } from 'ramda'

/** mock error generation to validate signature */
jest.mock('../utils/errors')

/**
 * jest invocation for axios
 */
jest.mock('axios')

throwCustomError.mockImplementation((error) => {
  throw error
})

// mock escriba calls
const escribaMock = {
  info: jest.fn((args) => (args)).mockReturnValue(undefined),
  error: jest.fn((args) => (args)).mockReturnValue(undefined)
}

const urlMock = appConfig.scrapper.url
// mock instantiated adapter
const adapterInstiated = scrapperAdapterFactory(escribaMock, urlMock)

describe('extract', () => {
  const methodPath = 'adapters.scrapper.extract'
  beforeEach(() => {
    axios.mockReset()
  })

  test('default case', async () => {
    const axiosCallMock = jest.fn().mockResolvedValue({
      status: 200,
      data: fs.readFileSync('mocks/siteMock.html', 'utf8')
    })

    const axiosCallInnerElement = jest.fn().mockResolvedValue({
      status: 200,
      data: fs.readFileSync('mocks/singlePlayerSiteMock.html', 'utf8')
    })
    axios.mockImplementationOnce((args) => axiosCallMock(args))

    // mock inner objects
    range(1, 30).forEach(() => {
      axios.mockImplementationOnce((args) => axiosCallInnerElement(args))
    })

    await expect(adapterInstiated.extract())
      .resolves.toHaveLength(27)

    expect(axios).toHaveBeenCalledWith({
      method: 'get',
      url: appConfig.scrapper.url
    })
  })

  test('override url', async () => {
    const axiosCallMock = jest.fn().mockResolvedValue({
      status: 200,
      data: fs.readFileSync('mocks/siteMock.html', 'utf8')
    })
    axios.mockImplementationOnce((args) => axiosCallMock(args))

    const axiosCallInnerElement = jest.fn().mockResolvedValue({
      status: 200,
      data: fs.readFileSync('mocks/singlePlayerSiteMock.html', 'utf8')
    })
    axios.mockImplementationOnce((args) => axiosCallMock(args))

    // mock inner objects
    range(1, 30).forEach(() => {
      axios.mockImplementationOnce((args) => axiosCallInnerElement(args))
    })

    const callUrl = 'https://some-url'

    await expect(adapterInstiated.extract(callUrl))
      .resolves.toHaveLength(27)

    expect(axios).toHaveBeenCalledWith({
      method: 'get',
      url: callUrl
    })
  })

  test('throw error with invalid status', async () => {
    const axiosCallMock = jest.fn().mockResolvedValue({
      status: 404,
      data: 'someTextError'
    })
    axios.mockImplementationOnce((args) => axiosCallMock(args))

    await expect(adapterInstiated.extract())
      .rejects.toThrowError('invalid status for this call')
  })

  test('throw error with reject call', async () => {
    const errorMessage = 'error on call'
    const axiosCallMock = jest.fn().mockRejectedValue(errorMessage)
    axios.mockImplementationOnce((args) => axiosCallMock(args))

    await expect(adapterInstiated.extract()).rejects.toBe(errorMessage)

    expect(throwCustomError).toHaveBeenCalledWith(errorMessage, methodPath, EClassError.INTERNAL)
  })
})

describe('extractPlayeInfo', () => {
  const methodPath = 'adapters.scrapper.extractPlayeInfo'
  beforeEach(() => {
    axios.mockReset()
  })

  test('default case', async () => {
    const axiosCallMock = jest.fn().mockResolvedValue({
      status: 200,
      data: fs.readFileSync('mocks/singlePlayerSiteMock.html', 'utf8')
    })

    axios.mockImplementationOnce((args) => axiosCallMock(args))

    await expect(extractPlayeInfo(escribaMock, { error: null, moreInfo: 'some-url', name: 'some-name', photoUrl: 'some-photo-url' }))
      .resolves.toMatchObject({
        playerName: 'Diego Alves Carreira',
        playerPosition: 'Goleiros',
        photoUrl: 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/1/1593711836.png',
        error: null
      })

    expect(axios).toHaveBeenCalledWith({
      method: 'get',
      url: 'some-url'
    })
  })

  test('throw error with invalid status', async () => {
    const axiosCallMock = jest.fn().mockResolvedValue({
      status: 404,
      data: 'someTextError'
    })
    axios.mockImplementationOnce((args) => axiosCallMock(args))

    await expect(extractPlayeInfo(escribaMock, { error: 'some-error', moreInfo: 'some-url', name: 'some-name', photoUrl: 'some-photo-url' }))
      .resolves.toMatchObject({
        playerName: 'some-name',
        playerPosition: '',
        photoUrl: 'some-photo-url',
        error: new Error('invalid status for this call. url: some-url')
      })
  })

  test('throw error with reject call', async () => {
    const errorMessage = 'error on call'
    const axiosCallMock = jest.fn().mockRejectedValue(errorMessage)
    axios.mockImplementationOnce((args) => axiosCallMock(args))

    await expect(extractPlayeInfo(escribaMock, { error: 'some-error', moreInfo: 'some-url', name: 'some-name', photoUrl: 'some-photo-url' }))
      .resolves.toMatchObject({
        playerName: 'some-name',
        playerPosition: '',
        photoUrl: 'some-photo-url',
        error: 'error on call'
      })

    expect(escribaMock.error).toHaveBeenCalledWith(errorMessage, methodPath, EClassError.INTERNAL)
  })
})
