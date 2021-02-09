import axios from 'axios'
import { pathOr, map, curry, pipe, propOr } from 'ramda'
import { log } from './trace'
import { trace } from 'xtrace'

const BACKEND = `https://api.chucknorris.io/jokes`
const endpoint = map(z => BACKEND + z, {
  random: '/random',
  search: '/search?query='
})

export const bad = curry((fn, x) => x.catch(fn))
export const good = curry((fn, x) => x.then(fn))

const throwHard = e => {
  throw e
}

export const api = {
  getJokes: pipe(
    s => ({ url: endpoint.search + s, method: 'get' }),
    log.detail('API REQUEST'),
    trace('API REQUEST'),
    axios,
    trace('API RESPONSE'),
    bad(throwHard),
    good(propOr([], 'data'))
  ),
  getJoke: pipe(
    category => ({
      url: !category
        ? endpoint.random
        : endpoint.random + '?category=' + category,
      method: 'get'
    }),
    log.detail('API REQUEST'),
    axios,
    log.info('singular raw'),
    bad(throwHard),
    good(propOr({}, 'data'))
  )
}
