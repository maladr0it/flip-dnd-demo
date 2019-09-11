import React, { memo, useRef } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

import "./Draggable.css";
import { CARD } from "./ItemTypes";

interface Props {
  id: string;
  index: number;
  color: string;
  onDragStart: (dragIndex: number) => void;
  onDragStop: () => void;
}

export const Draggable: React.FC<Props> = memo(
  ({ id, index, color, onDragStart, onDragStop }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
      item: { id, type: CARD, index },
      collect(monitor: DragSourceMonitor) {
        return {
          isDragging: monitor.isDragging(),
        };
      },
      begin() {
        onDragStart(index);
      },
      end() {
        onDragStop();
      },
    });

    // create ref callback from ref, to connect to the HTML dnd back-end
    drag(ref);

    return (
      <div
        ref={ref}
        className={`Draggable ${isDragging ? "Draggable--dragging" : ""}`}
        style={{ backgroundColor: color }}
      >
        {id}
      </div>
    );
  },
);
