import React, { useEffect, useState } from 'react'
import { trace } from 'xtrace'
import {
  merge,
  prop,
  map,
  addIndex,
  uniqBy,
  propOr,
  pipe,
  head
} from 'ramda'
import blem from 'blem'
import { throttle, debounce } from 'throttle-debounce'
import { api } from 'utils/api'
import Pagination from 'components/pagination'
import Menu from 'components/menu'

const uniqById = uniqBy(prop('_id'))

const bem = blem('Index')

const addIndices = addIndex(map)((raw, index) =>
  merge(raw, { index })
)

const Index = () => {
  const [$search, setSearch] = useState('')
  const [$allQuotes, setAllQuotes] = useState([])
  const [$newQuote, setNewQuote] = useState(false)
  const [$requests, setRequests] = useState(0)
  const [$lastRequestTime, setRequestTime] = useState(Date.now())
  const [$error, setError] = useState(false)
  const [$refreshInterval, setRefreshInterval] = useState(false)
  useEffect(() => {
    const effectTime = Date.now()
    const callSparingly = () => {
      setRequestTime(effectTime)
      setRequests($requests + 1)
    }
    // initial hook, request paginated quotes
    if ($allQuotes.length === 0 && $requests === 0) {
      api
        .getQuotes()
        .catch(setError)
        .then(pipe(propOr([], 'results'), addIndices, setAllQuotes))
      // if ($refreshInterval === false) {
      //   setRefreshInterval(
      //     setInterval(
      //       () =>
      //         api
      //           .getRandomQuote()
      //           .catch(setError)
      //           .then(raw => {
      //             console.log('raw', raw, '$all', $allQuotes)
      //             callSparingly()
      //             return pipe(
      //               uniqById,
      //               addIndices,
      //               setAllQuotes
      //             )([raw].concat($allQuotes))
      //           })
      //       10e3
      //     )
      //   )
      // }
    }
    return function cancel() {
      setRefreshInterval(false)
      setRequestTime(Date.now())
      setRequests(0)
      setError(false)
    }
  }, [$allQuotes, $refreshInterval])
  console.log('...', $allQuotes)
  return (
    <article className={bem()}>
      <Menu search={$search} setSearch={setSearch} />
      <Pagination allQuotes={$allQuotes} />
    </article>
  )
}

export default Index
