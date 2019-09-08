interface State {
  items: any[];
  dragging: boolean;
  hoverIndex: number | null;
}

type Action =
  | { type: "DRAG_START"; dragIndex: number }
  | { type: "DRAG_STOP" }
  | { type: "MOVE"; to: number; from: number };

export const dndReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "DRAG_START": {
      const { dragIndex } = action;
      return {
        ...state,
        dragging: true,
        hoverIndex: dragIndex,
      };
    }
    case "DRAG_STOP": {
      return {
        ...state,
        dragging: false,
        hoverIndex: null,
      };
    }
    case "MOVE": {
      const { to, from } = action;

      const newItems = [...state.items];
      const [itemToMove] = newItems.splice(from, 1);
      newItems.splice(to, 0, itemToMove);

      return {
        ...state,
        items: newItems,
        hoverIndex: to,
      };
    }
    default:
      return state;
  }
};
