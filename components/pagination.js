import blem from 'blem'
import { splitEvery } from 'ramda'
import React, { useState } from 'react'
import Joke from './joke'

const bem = 'Pagination'

const MAX_PER_PAGE = 10
const Page = ({ allJokes: $allJokes }) => {
  const splits = splitEvery(MAX_PER_PAGE, $allJokes)
  const [$page, setPage] = useState(0)
  const [pageLeft, pageRight] = [-1, 1].map(x => () =>
    setPage($page + x)
  )
  console.log('SPLITS', splits)
/*
        {splits.length &&
          splits.map(group => group.map(joke => (<pre><code>{JSON.stringify(joke, null, 2)}</code></pre>)))
*/
  const paginationButtons = (
    <>
      {$page - 1 > 0 && <button onClick={pageLeft()}>Prev</button>}
      {$page + 1 < splits.length && (
        <button onClick={pageRight()}>Next</button>
      )}
    </>
  )
  return (
    <section>
      <div>
      <pre><code>{JSON.stringify(splits, null, 2)}</code></pre>
      </div>
    </section>
  )
}

export default Page
