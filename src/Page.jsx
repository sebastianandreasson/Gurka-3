import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;

  padding: 0 1.5rem;
  color: #252525;

  > h1 {
    margin: 0;
    padding: 0;
    height: 7rem;
    font-size: 8rem;
    // font-weight: 900;
    font-family: 'Playfair Display', serif;
  }
`

const MainTitle = styled.h1`
  font-style: italic;
  font-weight: 200;
`
const SubTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 900;
`

const Page = () => {
  return (
    <Container>
      <MainTitle>Gurk</MainTitle>
      <SubTitle>Galleri</SubTitle>
    </Container>
  )
}
export default Page
