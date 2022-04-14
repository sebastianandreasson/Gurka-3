import { useAtom } from 'jotai'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { exploringAtom } from './state'

const Container = styled.div`
  z-index: 1;
  color: #252525;

  > h1 {
    margin: 0;
    padding: 0;
    height: 7rem;
    font-size: 8rem;
    // font-weight: 900;
    font-family: 'Playfair Display', serif;
  }

  > * {
    transition: all 0.5s ease-in-out;
  }
`

const MainTitle = styled.h1`
  left: 2rem;
  top: 0;
  position: absolute;
  font-style: italic;
  font-weight: 200;

  opacity: ${(props) => (props.visible ? 1 : 0)};
`
const SubTitle = styled.h1`
  position: absolute;
  left: 2rem;
  top: 7rem;
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`

const ExploreButton = styled.span`
  position: absolute;
  margin: 4rem 1rem;
  left: 2rem;
  bottom: 0;

  font-size: 2rem;
  font-weight: 300;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);

  opacity: ${(props) => (props.visible ? 1 : 0)};
`
const EscapeText = styled.span`
  position: absolute;
  left: 2rem;
  top: 1.5rem;
  width: 200px;
  font-size: 1rem;
  font-weight: 300;

  opacity: ${(props) => (props.visible ? 1 : 0)};
`
const Logo = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  right: 0px;
  top: 0;

  margin: 2rem;
`

const Page = () => {
  const [exploring, setExploring] = useAtom(exploringAtom)
  const escFunction = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setExploring(false)
      }
    },
    [setExploring]
  )

  return (
    <Container>
      <EscapeText visible={exploring}>Press escape to exit</EscapeText>
      <MainTitle visible={!exploring}>Gurk</MainTitle>
      <SubTitle visible={!exploring}>Galleri</SubTitle>

      <ExploreButton
        visible={!exploring}
        onClick={() => setExploring(!exploring)}
      >
        Explore as gurka
      </ExploreButton>
      <Logo src="/logo.png" />
    </Container>
  )
}
export default Page
