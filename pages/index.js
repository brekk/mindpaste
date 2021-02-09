import React, { useEffect, useState } from 'react'
import { trace } from 'xtrace'
import { propOr, pipe, head } from 'ramda'
import blem from 'blem'
import { throttle, debounce } from 'throttle-debounce'
import { api } from 'utils/api'
import Pagination from 'components/pagination'
import Menu from 'components/menu'

const bem = blem('Index')

const Index = () => {
  const [$search, setSearch] = useState('')
  const [$allQuotes, setAllQuotes] = useState([])
  const [$requests, setRequests] = useState(0)
  const [$error, setError] = useState(false)
  useEffect(() => {
    if ($allQuotes.length === 0 && $requests === 0) {
      setRequests($requests + 1)
      api
        .getQuotes()
        .catch(setError)
        .then(pipe(propOr([], 'results'), setAllQuotes))
    }
  }, [$allQuotes, $error])
  console.log('...', $allQuotes)
  return (
    <article className={bem()}>
      <Menu search={$search} setSearch={setSearch} />
      <Pagination allQuotes={$allQuotes} />
    </article>
  )
}

export default Index
