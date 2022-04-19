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
    font-size: 8rem;
    font-weight: 200;
  }
  > strong {
    height: 7rem;
    font-size: 8rem;
    font-weight: 900;
    line-height: 4rem;
  }

  opacity: ${(props) => (props.visible ? 1 : 0)};

  @media (max-width: 768px) {
    top: 2rem;
    left: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    > span {
      font-size: 1.5em;
    }
    > strong {
      margin-left: 0rem;
      font-size: 2em;
    }
  }
`
const SmallTitle = styled.h1`
  left: 2rem;
  top: 2rem;
  position: absolute;
  display: flex;
  flex-direction: row;

  > span {
    font-size: 3em;
    font-style: italic;
    font-weight: 200;
  }
  > strong {
    margin-left: 0.5rem;
    font-size: 3em;
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

  font-size: 2em;
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
  font-size: 1em;
  font-weight: 300;

  opacity: ${(props) => (props.visible ? 1 : 0)};
`
const Logo = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  right: 0px;
  top: 0;

  margin: 2em;

  @media (max-width: 768px) {
    display: none;
  }
`
const ComingSoon = styled.h2`
  width: 200px;
  text-align: center;

  margin: 0;
  position: absolute;
  left: calc(50% - 100px);
  top: 50%;

  font-size: 2em;
  font-family: 'Playfair Display', serif;
  font-weight: 100;

  @media (max-width: 768px) {
    top: 60%;
  }
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

      <ComingSoon>Coming soon.</ComingSoon>

      {/* <ExploreButton visible={!exploring} onClick={() => setExploring(true)}>
        Explore as gurka
      </ExploreButton> */}
      <Logo src="/logo.png" />
    </Container>
  )
}
export default Page
