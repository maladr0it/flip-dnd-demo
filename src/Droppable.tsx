import React, { memo } from "react";
import { useDrop } from "react-dnd";

import "./Droppable.css";
import { CARD } from "./ItemTypes";

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface Props {
  index: number;
  highlighted: boolean;
  onDragOver: (dragIndex: number, hoverIndex: number) => void;
}

export const Droppable: React.FC<Props> = memo(
  ({ index, highlighted, onDragOver }) => {
    const [, drop] = useDrop({
      accept: CARD,
      hover(item: DragItem) {
        const dragIndex = item.index;
        const hoverIndex = index;

        // Don't swap positions with itself
        if (dragIndex === hoverIndex) {
          return;
        }

        onDragOver(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    return (
      <div
        ref={drop}
        className={`Droppable ${highlighted ? "Droppable--highlighted" : ""}`}
      />
    );
  },
);
