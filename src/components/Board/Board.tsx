import React, { useState } from 'react';
import { IBoard } from '../../types/card';
import { fetchCards, postCard, updateCard } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateBoards, setCurrentBoard } from '../../store/board';
import { RootState } from '../../store/store';
import Card from '../Card/Card';
import './Board.scss';

interface Props {
    board: IBoard;
}

const Board: React.FC<Props> = ({ board }) => {
    const dispatch = useDispatch()
    const { currentBoard } = useSelector((state: RootState) => state.board)
    const { currentCard } = useSelector((state: RootState) => state.card)

    const [active, setActive] = useState(false)
    const [value, setValue] = useState('')

    const addCard = async () => {
        await postCard({
            row: board.row,
            text: value
        })
        await fetchCards().then(res => dispatch(updateBoards(res)))
        setValue('')
        setActive(false)
    }

    const addCardByEnter = async (e: React.KeyboardEvent) => {
        if (e.code === "Enter" && !e.ctrlKey  && !e.shiftKey) {
            e.preventDefault()
            addCard() 
        }
    }

    const reset = () => {
        setValue('')
        setActive(!active)
    }

    const dragOverHandler = (e: React.SyntheticEvent, board: IBoard) => {
        e.preventDefault();
        if (currentBoard !== board) {
            dispatch(setCurrentBoard(board))
        }
    }

    const dropHandler = async (e: React.SyntheticEvent, board: IBoard) => {
        e.preventDefault();
        if (!(currentBoard?.board?.length) && currentCard) {
            await updateCard({
                id: currentCard?.id,
                row: board.row,
                text: currentCard.text,
                seq_num: 0
            })
            await fetchCards().then((res => {dispatch(updateBoards(res))}))
        }
    }

    return (
        <div
            onDragOver={(e) => dragOverHandler(e, board)}
            onDrop={(e) => dropHandler(e, board)}
            className='board'
        >
            <div
                className={`board__header ${board.color}`}
            >
                {board.title} ({board.board?.length})
            </div>
            <div className='board__body'>
                {board?.board?.map(card => 
                   <Card key={card.id} card={card} board={board}/>)}
                {active
                    ? 
                        <>
                            <textarea 
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={(e) => addCardByEnter(e)}
                                className="textarea"
                            />
                            <button 
                                onClick={addCard} 
                                className="add-card-button"
                            >
                                Добавить
                            </button>
                            <button className="add-card-button" onClick={reset}>Отменить</button>
                        </>
                    : 
                        <button className="add-card-button" onClick={() => setActive(!active)}>+ Добавить карточку</button>
                }
            </div>
        </div>
    );
};

export default Board;