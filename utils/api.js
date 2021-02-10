import axios from 'axios'
import { pathOr, map, curry, pipe, propOr } from 'ramda'
import { log } from './trace'
import { trace } from 'xtrace'

// since the chuck norris API has a free search text functionality,
// and quotable does not, let's make one up
const BACKEND = `https://api.quotable.io`
const endpoint = pipe(
  map(z => BACKEND + z),
  Object.freeze
)({
  random: '/random',
  quotes: '/quotes',
  tags: '/tags',
  authors: '/authors'
})

export const bad = curry((fn, x) => x.catch(fn))
export const good = curry((fn, x) => x.then(fn))

const throwHard = e => {
  throw e
}

export const api = {
  getQuotes: pipe(
    (skip = 0) => ({
      url: endpoint.quotes,
      method: 'get',
      params: {
        limit: 100,
        skip
      }
    }),
    log.detail('API REQUEST'),
    axios,
    log.info('plural raw'),
    bad(throwHard),
    good(propOr({}, 'data'))
  ),
  getRandomQuote: pipe(
    () => ({
      url: endpoint.random,
      method: 'get'
    }),
    log.detail('API REQUEST'),
    axios,
    log.info('singular raw')
  )
}
