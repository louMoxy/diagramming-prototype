import * as React from 'react';

interface RectContext {
  rects: RectProps[];
  setRects: (rects: RectProps[]) => void;
};

export const RectanglesContext = React.createContext<RectContext>({rects: [], setRects: () => null});

export interface RectProps {
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;
    xScale?: number;
    yScale?: number;
    rotation?: number;
}

interface Props {
    children: React.ReactNode;
}

export const RectanglesContextProvider = ({children}: Props) => {
  const [rects, setRects] = React.useState<RectProps[]>([]);

  return (
    <RectanglesContext.Provider value={{rects, setRects}}>
      {children}
    </RectanglesContext.Provider>
  );
};