import blem from 'blem'
import { splitEvery } from 'ramda'
import React, { useState } from 'react'
import Quote from './quote'

const bem = 'Pagination'

const MAX_PER_PAGE = 10
const Page = ({ allQuotes: $allQuotes }) => {
  const splits = splitEvery(MAX_PER_PAGE, $allQuotes)
  const [$page, setPage] = useState(0)
  const [pageLeft, pageRight] = [-1, 1].map(x => () =>
    setPage($page + x)
  )
  console.log('SPLITS', splits)
  return <div>
    {$allQuotes.map(quote => <Quote quote={quote} key={quote.id} />)}
  </div>
}

export default Page
