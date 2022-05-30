import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const todoCol = collection(db, 'ToDos');


export const fetchToDos = createAsyncThunk('fetchToDos', async () => {
    const response = await getDocs(todoCol);
    return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
})


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
            state.item = state.item.filter(todo => todo.id != action.payload);
            console.log('removeToDo', action.payload, state.item)
        },
        clearTodo: (state, action) => {
            state.item = [];
        },
        moveToInprogress: (state, action) => {
            const updatedToDo = state.item.find(todo => todo.id == action.payload);
            updatedToDo.status = 1;
        },
        moveToDone: (state, action) => {
            const done = state.item.find(todo => todo.id == action.payload);
            done.status = 2;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchToDos.fulfilled, (state, action) => {
            return { item: action.payload };
        })
    }
});

//TODO: döp om addTodo osv till addItem?
export const addTodo = toDoSlice.actions.addTodo;
export const removeTodo = toDoSlice.actions.removeTodo;
export const clearTodo = toDoSlice.actions.clearTodo;
export const setItems = toDoSlice.actions.setItems;
export const moveToInprogress = toDoSlice.actions.moveToInprogress;
export const moveToDone = toDoSlice.actions.moveToDone;
//TODO: döp om toDoSlice till itemSlice?
export default toDoSlice.reducer;