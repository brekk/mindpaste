import styled from '@emotion/styled'
import { equals, cond } from 'ramda'

export const Quote = styled.div`
  display: flex;
  flex-direction: column;
  border: 1rem solid black;
  margin: 0.5rem 1rem;
  width: 100%;
  justify-content: space-between;
  @media (min-width: 36rem) {
    width: calc(50% - 1.5rem);
    &:nth-of-type(odd) {
      margin-right: 0;
    }
  }
`

export const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`
export const BlockQuote = styled.blockquote`
  margin: 0;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
`

export const Author = styled.figcaption`
  align-self: flex-end;
  margin-left: 1rem;
  &::before {
    content: '— ';
  }
`

export const Footer = styled.footer`
  display: flex;
  padding: 0.5rem;
  background-color: #ccc;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`

export const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: space-around;
`

export const TagEl = styled.li`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0.25rem;
`

const tags = [
  'business',
  'education',
  'faith',
  'famous-quotes',
  'friendship',
  'future',
  'happiness',
  'history',
  'inspirational',
  'life',
  'love',
  'nature',
  'politics',
  'proverb',
  'religion',
  'science',
  'success',
  'technology',
  'wisdom'
]

const colorTags = cond([
  [equals('business'), () => '#0c0'],
  [equals('education'), () => '#00a'],
  [equals('faith'), () => 'linear-gradient(0deg, white, black)'],
  [equals('famous-quotes'), () => '#fc0'],
  [equals('friendship'), () => '#419d41'],
  [equals('future'), () => '#444'],
  [equals('politics'), () => '#d04949'],
  [equals('inspirational'), () => '#6eade6'],
  [equals('community'), () => '#e13990'],
  [equals('social-justice'), () => '#7fb026'],
  [equals('love'), () => '#b02626'],
  [equals('happiness'), () => '#f30'],
  [equals('history'), () => '#888'],
  [equals('religion'), () => '#900'],
  [equals('technology'), () => '#0cf'],
  [equals('wisdom'), () => '#409'],
  [() => true, () => '#ccc']
])
const textColor = cond([
  [equals('wisdom'), () => '#fff'],
  [equals('religion'), () => '#ccc'],
  [() => true, () => '#000']
])

export const Tag = styled.div`
  background: ${p => colorTags(p.value)};
  color: ${p => textColor(p.value)};
  border: 2px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.4);
  display: inline-block;
  padding: 0.5rem;
  text-transform: uppercase;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-shadow: 0 1px rgba(255, 255, 255, 0.3);
`

export const Link = styled.a`
  font-size: 0.75rem;
`
