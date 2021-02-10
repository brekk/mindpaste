import styled from '@emotion/styled'
import {css} from '@emotion/react'

export const Pagination = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 10rem;
`

export const Page = styled.div`
  display: ${p => (p.active ? 'flex' : 'none')};
  flex-direction: row;
  flex-wrap: wrap;
`

export const headerFooter = css`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6rem;
  align-items: center;
  justify-content: space-between;
`

export const Header = styled.header`
  ${headerFooter}
`
export const Footer = styled.footer`
  ${headerFooter}
`

export const Location = styled.strong`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 3rem;
`

export const PagerButton = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 3rem;
  height: 3rem;
  background-color: #0c0;
  text-align: center;
  font-size: 2rem;
  border-radius: 10rem;
  justify-content: center;
  align-items: center;
`
