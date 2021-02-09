import styled from '@emotion/styled'

export const Quote = styled.div`
  display: flex;
  flex-direction: column;
  border: 1rem solid black;
  margin: 1rem;
  max-width: 30rem;
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

export const Tag = styled.div`
  background-color: #555;
  color: #fc0;
  border: 2px solid #777;
  display: inline-block;
  padding: 0.5rem;
  text-transform: uppercase;
  border-radius: 10rem;
  font-size: 0.8rem;
`

export const Footer = styled.footer`
  display: flex;
  padding: 0.5rem;
  background-color: #ccc;
  flex-direction: column;
  align-content: center;
`

export const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: space-around;
`

export const TagEl = styled.li`
  list-style: none;
  padding: 0;
  margin-bottom: 0.5rem;
`
