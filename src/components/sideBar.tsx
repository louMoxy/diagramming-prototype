import * as React from 'react';
import {RectanglesContext} from "../context/rect-context";
import styled from "styled-components";

const Container = styled.div`
  width: 200px;
  background: lightgray;
  height: 100vh;
  overflow: scroll;
  div {
    padding: 20px;
    border-bottom: solid 1px #eee;
  }
`;

export const SideBar = () => {
    const {rects} = React.useContext(RectanglesContext);
    return (
        <Container>
            {rects.map(({x, y, height, width, id, rotation}) => (
                <div key={id}>
                    <p>X: {x.toFixed(2)}</p>
                    <p>Y: {y.toFixed(2)}</p>
                    <p>Height: {height.toFixed(2)}</p>
                    <p>Width: {width.toFixed(2)}</p>
                    <p>Rotation: {rotation ? rotation.toFixed(2) : 0}</p>
                </div>
            ))}
        </Container>
    )
};