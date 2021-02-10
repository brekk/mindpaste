import blem from 'blem'
import { map, head, join, prop, splitEvery } from 'ramda'
import React, { useState } from 'react'
import {
  Location,
  Header,
  Footer,
  Page,
  PagerButton,
  Pagination as Styled
} from './pagination.styled'
import Quote from './quote'

const bem = 'Pagination'

const MAX_PER_PAGE = 10

const uniquePageId = map(prop('id'), join(''))
const Pager = ({ allQuotes: $allQuotes }) => {
  const splits = splitEvery(MAX_PER_PAGE, $allQuotes)
  const [$page, setPage] = useState(0)
  const [pageLeft, pageRight] = [-1, 1].map(x => e => {
    e.preventDefault()
    const plan = $page + x
    if (plan < splits.length && plan > -1) {
      setPage(plan)
    } else {
      setPage(0)
    }
  })
  return (
    <Styled>
      {splits.map((page, i) => {
        const context = (
          <>
            <PagerButton onClick={pageLeft}>&larr;</PagerButton>
            <Location>
              Page {i + 1} of {splits.length}
            </Location>
            <PagerButton onClick={pageRight}>&rarr;</PagerButton>
          </>
        )
        return (
          <Page
            index={i}
            active={i === $page}
            key={uniquePageId(page)}
          >
            <Header>{context}</Header>
            {page.map(quote => (
              <Quote quote={quote} key={quote.id} />
            ))}
            <Footer>{context}</Footer>
          </Page>
        )
      })}
    </Styled>
  )
}

export default Pager
