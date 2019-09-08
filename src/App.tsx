import React, { useReducer, useCallback } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import "./App.css";
import { dndReducer } from "./dndReducer";
import { Grid } from "./Grid";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

import { gifs } from "./gifs";

interface Item {
  id: string;
  imageUrl: string;
  color: string;
}

const INITIAL_CARDS: Item[] = [...Array(100)].map((_, i) => ({
  id: i.toString(),
  imageUrl: "",
  // imageUrl: gifs[i],
  color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
}));

const App: React.FC = () => {
  const [{ items, dragging, hoverIndex }, dispatch] = useReducer(dndReducer, {
    items: INITIAL_CARDS,
    dragging: false,
    hoverIndex: null,
  });

  const handleDragStart = useCallback((dragIndex: number) => {
    dispatch({ type: "DRAG_START", dragIndex });
  }, []);

  const handleDragStop = useCallback(() => {
    dispatch({ type: "DRAG_STOP" });
  }, []);

  const handleMove = useCallback((from: number, to: number) => {
    dispatch({ type: "MOVE", from, to });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="GridContainer">
        <Grid>
          {items.map((_, i) => (
            <Droppable
              key={i}
              index={i}
              highlighted={hoverIndex === i}
              onDragOver={handleMove}
            />
          ))}
        </Grid>
        <Grid className={dragging ? "passthrough" : ""}>
          {items.map((item, i) => (
            <Draggable
              key={item.id}
              index={i}
              id={item.id}
              imageUrl={item.imageUrl}
              color={item.color}
              onDragStart={handleDragStart}
              onDragStop={handleDragStop}
            />
          ))}
        </Grid>
      </div>
    </DndProvider>
  );
};

export default App;
