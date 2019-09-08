import React, { memo, useRef, useLayoutEffect } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

import "./Draggable.css";
import { CARD } from "./ItemTypes";

interface Props {
  id: string;
  index: number;
  imageUrl: string;
  color: string;
  onDragStart: (dragIndex: number) => void;
  onDragStop: () => void;
}

export const Draggable: React.FC<Props> = memo(
  ({ id, index, imageUrl, color, onDragStart, onDragStop }) => {
    const ref = useRef<HTMLDivElement>(null);
    const rect = useRef<DOMRect | ClientRect | null>(null);

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

    useLayoutEffect(() => {
      if (ref.current && rect.current) {
        const newRect = ref.current.getBoundingClientRect();
        const dx = newRect.left - rect.current.left;
        const dy = newRect.top - rect.current.top;

        ref.current.animate(
          [
            { transform: `translate(${-dx}px, ${-dy}px)` },
            { transform: `translate(0, 0)` },
          ],
          {
            duration: 150,
            easing: "ease-out",
          },
        );
      }
    }, [index]);

    if (ref.current) {
      rect.current = ref.current.getBoundingClientRect();
    }

    // create ref callback from ref, to connect to the HTML dnd back-end
    drag(ref);

    return (
      <div
        ref={ref}
        className={`Draggable ${isDragging ? "Draggable--dragging" : ""}`}
        style={{ backgroundColor: color }}
        // style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {id}
      </div>
    );
  },
);
