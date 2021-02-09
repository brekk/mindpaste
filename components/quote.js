import PropTypes from 'prop-types'
import { api } from 'utils/api'
import blem from 'blem'
import { formatWithOptions } from 'date-fns/fp'
import { de } from 'date-fns/locale'
import {
  TagEl,
  TagList,
  Author,
  Quote as RawQuote,
  Figure,
  Tag,
  Footer,
  BlockQuote
} from './quote.styled'

const bem = blem('Quote')

const formatter = formatWithOptions({ locale: de }, 'MM/dd/yyyy')

const Quote = ({ quote: $quote }) => {
  const link = 'api.quotable.io/quotes/' + $quote._id
  return (
    $quote.length && (
      <RawQuote className={bem(false, $quote.id)} id={$quote.id}>
        <Figure className={bem('figure')}>
          <BlockQuote className={bem('quote')} cite={link}>
            {$quote.content}
          </BlockQuote>
          <Author className={bem('author')}>{$quote.author}</Author>
        </Figure>
        <Footer className={bem('footer')}>
          {$quote && $quote.tags && (
            <TagList className={bem('tags')}>
              {$quote.tags.map(c => (
                <TagEl key={c} className={bem('tag', c)}>
                  <Tag className={bem('tag-value')}>{c}</Tag>
                </TagEl>
              ))}
            </TagList>
          )}
          <a href={'//' + link}>Share: {link}</a>
        </Footer>
      </RawQuote>
    )
  )
}
Quote.propTypes = {
  quote: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  })
}

export default Quote
