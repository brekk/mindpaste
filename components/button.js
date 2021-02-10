import styled from '@emotion/styled'

export const Fetch = styled.div`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bolder;
  padding: 0.5rem 0.25rem;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease-out,
              border 0.3s ease-out;
  margin: 2rem;
  &:hover {
    background-color: lime;
    border: 2px solid rgba(255,255,255,0.3);
    cursor: pointer;
  }
`
