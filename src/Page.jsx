import { useAtom, useAtomValue } from 'jotai'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { exploringAtom, selectedGurkAtom } from './state'

const Container = styled.div`
  z-index: 1;
  color: #252525;

  > h1 {
    margin: 0;
    padding: 0;
    height: 7rem;
    font-size: 8rem;
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

  display: flex;
  flex-direction: column;

  > span {
    font-style: italic;
    font-weight: 200;
  }
  > strong {
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    line-height: 4rem;
  }

  opacity: ${(props) => (props.visible ? 1 : 0)};
`
const SmallTitle = styled.h1`
  left: 2rem;
  top: 2rem;
  position: absolute;
  display: flex;
  flex-direction: row;

  > span {
    font-size: 3rem;
    font-style: italic;
    font-weight: 200;
  }
  > strong {
    margin-left: 0.5rem;
    font-size: 3rem;
    font-family: 'Playfair Display', serif;
    font-weight: 900;
  }

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
  const selectedGurka = useAtomValue(selectedGurkAtom)

  return (
    <Container>
      <EscapeText visible={exploring}>Press escape to exit</EscapeText>
      <MainTitle visible={!exploring && !selectedGurka}>
        <span>Gurk</span>
        <strong>Galleri</strong>
      </MainTitle>
      <SmallTitle visible={!exploring && !!selectedGurka}>
        <span>Gurk</span>
        <strong>Galleri</strong>
      </SmallTitle>

      <ExploreButton visible={!exploring} onClick={() => setExploring(true)}>
        Explore as gurka
      </ExploreButton>
      <Logo src="/logo.png" />
    </Container>
  )
}
export default Page
