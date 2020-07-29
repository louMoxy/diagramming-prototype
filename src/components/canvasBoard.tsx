import * as React from 'react';
import {Layer, Rect, Stage} from "react-konva";
import styled from "styled-components";
import {KonvaEventObject} from "konva/types/Node";
import {RectTransformer} from "./transformer";
import {RectanglesContext, RectProps} from '../context/rect-context';

const Container = styled.div`
  flex: 3;
`;

const STAGE = 'stage';
const DRAWINGRECT = 'drawing_rect';

interface Props {
    isSelecting: boolean;
}

const isIntersected = (r1: RectProps, r2: RectProps): boolean => {
    return !((r2.x > r1.x + r1.width || r2.x + r2.width < r1.x) &&
        (r2.y > r1.y + r1.height || r2.y + r2.height < r1.y));
};


export const CanvasBoard = ({isSelecting}: Props) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number>(0);
    const [width, setWidth] = React.useState<number>(0);
    const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
    const {rects, setRects} = React.useContext(RectanglesContext);
    const [selectedId, setSelectedId] = React.useState<string[] | undefined>();
    const [drawingRect, setDrawingRect] = React.useState<RectProps | undefined>();

    React.useEffect(() => {
        setHeight(containerRef.current!.clientHeight);
        setWidth(containerRef.current!.clientWidth);
    }, []);

    React.useEffect(() => {
        setDrawingRect(undefined);
        setIsDrawing(false);
    }, [isSelecting]);


    const addRect = (event: KonvaEventObject<MouseEvent>) => {
        if(event.target.attrs.id === DRAWINGRECT) {
            if(!isSelecting) {
                setIsDrawing(false);
                if (drawingRect) {
                    setRects([...rects, drawingRect]);
                }
                setDrawingRect(undefined);
            } else {
                const selectedRect = rects.filter((rect) => isIntersected(rect, event.target.attrs)).map(rect => rect.id);
                setSelectedId(selectedRect);
                setDrawingRect(undefined);
            }
        }
    };

    const createDrawingRect = (event: KonvaEventObject<MouseEvent>) => {
        if(event.target.attrs.id === STAGE) {
            setIsDrawing(true);
            setDrawingRect({
                x: event.evt.clientX,
                y:event.evt.clientY,
                height: 0,
                width: 0,
                id: Date.now().toString(),
            });
        }
    };

    const dragDrawingRect = (event: KonvaEventObject<MouseEvent>) => {
        if (isDrawing && event.target.attrs.id === STAGE && drawingRect) {
            setDrawingRect({
                ...drawingRect,
                height: event.evt.clientY - drawingRect.y,
                width: event.evt.clientX - drawingRect.x
            });
        }
    };

    const updateRectState = (event: KonvaEventObject<MouseEvent>) => {
        event.currentTarget.to({
            shadowOpacity: 0
        });
        const otherRects = rects.filter((rect) => rect.id !== event.currentTarget.attrs.id);
        setRects([...otherRects, event.currentTarget.attrs]);
    };

    const rectStartMoving = (event: KonvaEventObject<MouseEvent>) => {
        event.currentTarget.to({
            shadowOpacity: 0.6
        })
    };

    const rectTransformed = (event: KonvaEventObject<MouseEvent>) => {
        const node = event.currentTarget;
        const currentXScale = node.scaleX();
        const currentYScale = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        const updateRectAttr = {
            ...event.currentTarget.attrs,
            xScale: 1,
            yScale: 1,
            x: node.x(),
            y: node.y(),
            width: node.width() * currentXScale,
            height: node.height() * currentYScale
        };
        const otherRects = rects.filter((rect) => rect.id !== event.currentTarget.attrs.id);
        setRects([...otherRects, updateRectAttr]);
    };

    return (
        <Container ref={containerRef}>
        <Stage
            width={width}
            height={height}
            id={STAGE}
            onMouseDown={createDrawingRect}
            onMouseMove={dragDrawingRect}
            onMouseUp={addRect}
        >
            <Layer>
                <RectTransformer selectedRectId={selectedId} />
                {rects.map(({x, y, height, width, id, xScale = 1, yScale = 1} ) => (
                    <Rect
                        onClick={() => setSelectedId([id])}
                        key={id}
                        x={x}
                        y={y}
                        xScale={xScale}
                        yScale={yScale}
                        id={id.toString()}
                        fill={'red'}
                        width={width}
                        height={height}
                        draggable
                        shadowColor="black"
                        shadowOffsetX={5}
                        shadowOffsetY={5}
                        shadowBlur={10}
                        shadowOpacity={0}
                        onDragend={updateRectState}
                        onDragStart={rectStartMoving}
                        onTransformEnd={rectTransformed}
                    />
                ))}
                {drawingRect && <Rect
                    id={DRAWINGRECT}
                    x={drawingRect.x}
                    y={drawingRect.y}
                    stroke={isSelecting ? 'blue': 'red'}
                    dash={[2,1]}
                    width={drawingRect.width}
                    height={drawingRect.height}
                />}
            </Layer>
        </Stage>
        </Container>
    )
};

