import * as React from "react";
import {Node} from "konva/types/Node";
import {Transformer} from "react-konva";

export const RectTransformer = ({selectedRectId}: { selectedRectId: string[] | undefined }) => {
    let transformer: any;

    React.useEffect(() => {
        if (selectedRectId) {
            const stage = transformer.getStage();
            const rectangle = stage.find((node: Node) => selectedRectId.includes(node.attrs.id));
            transformer.nodes(rectangle);
            transformer.getLayer().batchDraw();
        } else {
            transformer.nodes([]);
        }
    }, [transformer, selectedRectId]);

    return (
        <Transformer
            ref={node => {
                transformer = node;
            }}
        />
    )
};