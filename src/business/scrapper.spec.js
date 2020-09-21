import { throwCustomError } from '../utils/errors'
import cheerio from 'cheerio'
import { extractPropertiesFromNodes, filterPlayersRef, extractPlayerInfo } from './scrapper'
import { head } from 'ramda'
import fs from 'fs'

/** mock error generation to validate signature */
jest.mock('../utils/errors')

throwCustomError.mockImplementation((error) => {
  throw error
})

describe('extractPropertiesFromNodes', () => {
  const defaultObject = head(cheerio.load(`<a class="1" href="https://www.flamengo.com.br/elencos/elenco-profissional/diego-alves-carreira">
<div class="content">
    <div class="front">
        <figure class="d-inline-block mb-5">
            <div class="molde">
                <div class="capsule">
                    <img src="https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/1/1593711836.png" alt="Diego Alves" class="img-fluid rounded-0">
                </div>
            </div>
            <figcaption class="text-light text-uppercase d-flex flex-column text-center align-items-center bg-danger">
                <p class="mb-0 font-weight-bold">Diego Alves</p>
                                                                <span class="see-more font-weight-bold text-decoration-none text-white">1</span>
                                                            </figcaption>
        </figure>
    </div>
    <div class="back d-flex justify-content-center align-items-center">
        <h2 class="text-white "><span class="d-block">1</span>Diego Alves</h2>
    </div>
</div>
</a>`)('a.1'))

  const invalidObject = head(cheerio.load(`<a class="1" href="https://www.flamengo.com.br/elencos/elenco-profissional/diego-alves-carreira">
<div class="content">
    <div class="front">
        <figure class="d-inline-block mb-5">
                <div class="capsule">
                    <img src="https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/1/1593711836.png" alt="Diego Alves" class="img-fluid rounded-0">
                </div>
            <figcaption class="text-light text-uppercase d-flex flex-column text-center align-items-center bg-danger">
                <p class="mb-0 font-weight-bold">Diego Alves</p>
                                                                <span class="see-more font-weight-bold text-decoration-none text-white">1</span>
                                                            </figcaption>
        </figure>
    </div>
    <div class="back d-flex justify-content-center align-items-center">
        <h2 class="text-white "><span class="d-block">1</span>Diego Alves</h2>
    </div>
</div>
</a>`)('a.1'))

  test('default case', () => {
    expect(extractPropertiesFromNodes(defaultObject)).toMatchObject({
      name: 'Diego Alves',
      photoUrl: 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/1/1593711836.png',
      error: null
    })
  })

  test('invalid struct', () => {
    expect(extractPropertiesFromNodes(invalidObject)).toMatchObject({
      name: '',
      photoUrl: '',
      error: `Cannot read property 'children' of undefined`
    })
  })
})

describe('filterPlayersRef', () => {
  const defaultObject = fs.readFileSync('mocks/siteMock.html', 'utf8')

  test('default case', () => {
    const extratectData = filterPlayersRef(defaultObject)
    expect(head(extratectData)).toMatchObject({
      name: 'Diego Alves',
      photoUrl: 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/1/1593711836.png',
      moreInfo: 'https://www.flamengo.com.br/elencos/elenco-profissional/diego-alves-carreira',
      error: null
    })

    expect(extratectData).toHaveLength(27)
  })
})

describe('extractPlayerInfo', () => {
  const invalidObject = head(cheerio.load(`<div class="banner-atleta mt-3">
  <div class="container">
  </div>
</div>`)('div.banner-atleta'))

  const defaultObject = fs.readFileSync('mocks/singlePlayerSiteMock.html', 'utf8')

  test('default case', () => {
    const extratectData = extractPlayerInfo(defaultObject)
    expect(extratectData).toMatchObject({
      playerName: 'Diego Alves Carreira',
      photoUrl: 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/1/1593711836.png',
      playerPosition: 'Goleiros',
      error: null
    })
  })

  test('catch error', () => {
    const extratectData = extractPlayerInfo(invalidObject)
    expect(extratectData).toMatchObject({
      playerName: '',
      photoUrl: '',
      playerPosition: '',
      error: `Cannot read property 'children' of undefined`
    })
  })
})
