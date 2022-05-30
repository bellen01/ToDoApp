import { configureStore } from "@reduxjs/toolkit";

import toDoReducer from './allData';


export const store = configureStore({
    reducer: {
        toDo: toDoReducer,
    }
});

