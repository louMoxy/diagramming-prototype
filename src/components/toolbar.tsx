import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  top: 20px;
  position: absolute;
  left: 20px;
  z-index: 2;
`;

interface Props {
    setIsSelecting: (selecting: boolean) => void;
    isSelecting: boolean;
}

export const Toolbar = ({setIsSelecting, isSelecting}: Props) => {
    return(
        <Container>
            <div onClick={() =>setIsSelecting(!isSelecting)}>
                <p style={{color: isSelecting ? 'red': 'black'}}>Multi-select</p>
            </div>
        </Container>
    )
};