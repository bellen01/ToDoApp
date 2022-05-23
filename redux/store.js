import { configureStore } from "@reduxjs/toolkit";

import toDoReducer from './allData';
// import inProgressReducer from './inProgressSlice'


export const store = configureStore({
    reducer: {
        toDo: toDoReducer,
        // inProgress: inProgressReducer
    }
});

