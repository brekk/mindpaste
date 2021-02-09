import PropTypes from 'prop-types'
import { api } from 'utils/api'
import blem from 'blem'
import { formatWithOptions } from 'date-fns/fp'
import { de } from 'date-fns/locale'

const bem = blem('Joke')

const formatter = formatWithOptions({ locale: de }, 'MM/dd/yyyy')

const Joke = ({ joke: $joke }) => (
  <div className={bem(false, $joke.id)} id={$joke.id}>
    <header className={bem('header')}>
    </header>
    <blockquote className={bem('value')}>{$joke.value}</blockquote>
    <footer className={bem('footer')}>
      {$joke && $joke.categories && (
        <ul className={bem('categories')}>
          {$joke.categories.map(c => (
            <li key={c} className={bem('category', c)}>
              <span className={bem('category-value')}>{c}</span>
            </li>
          ))}
        </ul>
      )}
      <span>
      {$joke.id}
      </span>
    </footer>
  </div>
)
Joke.propTypes = {
  joke: PropTypes.shape({
    created_at: PropTypes.string,
    icon_url: PropTypes.string,
    value: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string)
  })
}

export default Joke
