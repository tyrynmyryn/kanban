import { configureStore } from "@reduxjs/toolkit";
import boardReducer from './board';
import cardReducer from './card'

export const store = configureStore({
    reducer: {
        board: boardReducer,
        card: cardReducer
    }
})

export type RootState = ReturnType<typeof store.getState>