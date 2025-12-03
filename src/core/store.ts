import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Todo } from "./types";

type todoStateType = {
  todos: Todo[];
};

const initialState: todoStateType = {
  todos: [],
};

// ================== SLICE

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // add(data: Todo)
    add(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },

    // remove(id: string)
    remove(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((x) => x.id !== action.payload);
    },

    // update(data: Todo)
    update(state, action: PayloadAction<Todo>) {
      state.todos = state.todos.map((x) => {
        if (x.id === action.payload.id) return action.payload;
        return x;
      });
    },

    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
  },
});

// ================== STORE

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// ================== EXPORT
export const { add, remove, update, setTodos } = todoSlice.actions;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
