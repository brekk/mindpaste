import React, { useEffect, useState } from 'react'
import { trace } from 'xtrace'
import { pipe, head } from 'ramda'
import blem from 'blem'
import { throttle, debounce } from 'throttle-debounce'
import { api } from 'utils/api'
import Pagination from 'components/pagination'
import Menu from 'components/menu'

const bem = blem('Index')

const Index = () => {
  const [$allJokes, setAllJokes] = useState([])
  const [$error, setError] = useState(false)
  const [$joke, setJoke] = useState(false)
  const [$lastRequest, setLastRequest] = useState(0)
  const [$search, setRawSearch] = useState('test')
  const [$lastSearch, setLastSearch] = useState($search)
  const setSearch = debounce(
    100,
    pipe(trace('setting search'), setRawSearch)
  )
  useEffect(() => {
    const searching = $search !== '' && $lastSearch !== $search
    const overlong = Math.abs($lastRequest - Date.now()) > 3e3
    console.log('searching', searching)
    console.log('overlong', overlong)
    console.log('$ALLJOKES', $allJokes)
    if (
      $allJokes.length === 0 ||
      ((searching || overlong) && $search.length > 3)
    ) {
      api
        .getJokes($search)
        .catch(setError)
        .then(raw => {
          if (raw) {
            console.log('RAW', raw)
            const { total, result } = raw
            if (total) {
              console.log('totes', total, 'rez', result)
              setLastSearch($search)
              if (total > 0 && $allJokes !== result)
                setAllJokes(result)
            }
          }
        })
    }
    if (!$joke && $allJokes.length) {
      pipe(head, setJoke)($allJokes)
    }
    setLastRequest(Date.now())
    return function cleanup() {
      setError(false)
      setSearch('')
      setLastSearch('')
    }
  }, [$allJokes, $error, $joke, $lastRequest, $lastSearch, $search])
  console.log('jokes', $allJokes)

  return (
    <article className={bem()}>
      <Menu search={$search} setSearch={setSearch} />
      <Pagination allJokes={$allJokes} />
    </article>
  )
}

export default Index
