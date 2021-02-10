import PropTypes from 'prop-types'
import { api } from 'utils/api'
import blem from 'blem'
import { formatWithOptions } from 'date-fns/fp'
import { de } from 'date-fns/locale'
import {
  Author,
  BlockQuote,
  Figure,
  Footer,
  Link,
  Quote as RawQuote,
  Tag,
  TagEl,
  TagList,
} from './quote.styled'

const bem = blem('Quote')

const formatter = formatWithOptions({ locale: de }, 'MM/dd/yyyy')

const Quote = ({ quote: $quote, email: $email, setEmail }) => {
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
                  <Tag className={bem('tag-value', c)} value={c}>{c}</Tag>
                </TagEl>
              ))}
            </TagList>
          )}
          Share with a friend?
          <input defaultValue={$email} onChange={e => 
            setEmail(e.target.value)}
/>
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
