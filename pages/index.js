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
import { Fetch } from 'components/button'

const uniqById = uniqBy(prop('_id'))

const bem = blem('Index')

const addIndices = addIndex(map)((raw, index) =>
  merge(raw, { index })
)

const Index = () => {
  const [$email, setEmail] = useState('')
  const [$page, setPage] = useState(0)
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
      // logic here is broken, come back if we have time
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
  return (
    <article className={bem()}>
      <Fetch
        onClick={e => {
          e.preventDefault()
          api
            .getRandomQuote()
            .catch(setError)
            .then(raw => {
              return pipe(uniqById, addIndices, setAllQuotes, () =>
                setPage(0)
              )([raw].concat($allQuotes))
            })
        }}
      >
        Fetch a new Quote
      </Fetch>
      <Pagination
        allQuotes={$allQuotes}
        page={$page}
        setPage={setPage}
        setEmail={setEmail}
        email={$email}
      />
    </article>
  )
}

export default Index
