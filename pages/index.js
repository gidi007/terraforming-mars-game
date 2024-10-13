// pages/index.js
import React from 'react';
import GameBoard from '../components/GameBoard';
import PlayerBoard from '../components/PlayerBoard';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20px;
  background-color: #121212;
  min-height: 100vh;
`;

export default function Home() {
  return (
    <Container>
      <GameBoard />
      <PlayerBoard />
    </Container>
  );
}
