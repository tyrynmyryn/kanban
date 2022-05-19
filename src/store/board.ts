import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard, Row, IBoard, Colors } from "../types/card";
import { filterBoardByRow } from "../helpers/helpers";

interface State {
    boards: IBoard[] | null,
    currentBoard: IBoard | null
}

const initialState: State = {
    boards: null,
    currentBoard: null
}

const boardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        updateBoards: (state, action: PayloadAction<ICard[] | null>) => {
            state.boards = [
                {
                    title: 'ON HOLD',
                    color: Colors.ORANGE,
                    board: filterBoardByRow(action.payload, Row.HOLD) ?? null,
                    row: Row.HOLD,
                },
                {
                    title: 'IN PROGRESS',
                    color: Colors.BLUE,
                    board: filterBoardByRow(action.payload, Row.PROGRESS) ?? null,
                    row: Row.PROGRESS,
                },
                {
                    title: 'NEED REVIEW',
                    color: Colors.YELLOW,
                    board: filterBoardByRow(action.payload, Row.REVIEW) ?? null,
                    row: Row.REVIEW,
                },
                {
                    title: 'APPROVED',
                    color: Colors.GREEN,
                    board: filterBoardByRow(action.payload, Row.APROVED) ?? null,
                    row: Row.APROVED,
                }
            ]  
        },
        setCurrentBoard: (state, action: PayloadAction<IBoard>) => {
            state.currentBoard = action.payload
        }
    }
})

export const { updateBoards, setCurrentBoard } = boardSlice.actions
export default boardSlice.reducer