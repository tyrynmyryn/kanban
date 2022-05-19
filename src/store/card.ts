import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../types/card";

interface State {
    currentCard: ICard | null,
    droppedCard: ICard | null
}

const initialState: State = {
    currentCard: null,
    droppedCard: null
}

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCurrentCard: (state, action: PayloadAction<ICard>) => {
            state.currentCard = action.payload
        },
        setDroppedCard: (state, action: PayloadAction<ICard>) => {
            state.droppedCard = action.payload
        }
    }
})

export const {setCurrentCard, setDroppedCard} = cardSlice.actions

export default cardSlice.reducer