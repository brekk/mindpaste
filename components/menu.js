import React from 'react'
import PropTypes from 'prop-types'
import { Label, Input } from '@rebass/forms'
import blem from 'blem'

const bem = blem('Menu')

const Menu = ({ search, setSearch }) => (
  <nav className={bem()}>
    <Label className={bem('label', 'search')}>
      Search:
      <input
        className={bem('input', 'search')}
        defaultValue={search}
        onChange={e => setSearch(e.target.value)}
      />
    </Label>
  </nav>
)

Menu.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func
}

export default Menu
