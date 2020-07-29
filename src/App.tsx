import * as React from 'react';
import styled from 'styled-components';
import {Toolbar} from "./components/toolbar";
import {CanvasBoard} from "./components/canvasBoard";
import { RectanglesContextProvider } from './context/rect-context';
import {SideBar} from './components/sideBar';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const App = () => {
    const [isSelecting, setIsSelecting] = React.useState<boolean>(false);
  return (
      <RectanglesContextProvider>
        <Container>
            <Toolbar isSelecting={isSelecting} setIsSelecting={setIsSelecting}/>
          <CanvasBoard isSelecting={isSelecting}/>
          <SideBar/>
        </Container>
      </RectanglesContextProvider>
  );
};
