import { createSlice } from "@reduxjs/toolkit";

const toDoSlice = createSlice({
    name: 'allData',
    initialState: {
        item: []
    },
    reducers: {
        setItems: (state, action) => {
            state.item = action.payload;
        },
        addTodo: (state, action) => {
            state.item.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.item = state.item.filter(todo => todo.id != action.payload.id);
        },
        clearTodo: (state, action) => {
            state.item = [];
        }
    }
});

//TODO: döp om addTodo osv till addItem
export const addTodo = toDoSlice.actions.addTodo;
export const removeTodo = toDoSlice.actions.removeTodo;
export const clearTodo = toDoSlice.actions.clearTodo;
export const setItems = toDoSlice.actions.setItems;
export default toDoSlice.reducer;