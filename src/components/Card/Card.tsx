import React, { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBoards } from '../../store/board';
import { setCurrentCard, setDroppedCard } from '../../store/card';
import { ICard, IBoard } from '../../types/card';
import { deleteCard, fetchCards, updateCard } from '../../api/api'
import { RootState } from '../../store/store';
import { filterBoardByRow } from '../../helpers/helpers';
import './Card.scss';

interface Props {
    card: ICard;
    board: IBoard | null
}

const Card: React.FC<Props> = ({card, board}) => {
    const dispatch = useDispatch();
    const {currentCard, droppedCard} = useSelector((state: RootState) => state.card)
    const { currentBoard } = useSelector((state: RootState) => state.board)

    const [del, setDel] = useState(false)

    const remove = (id: number) => {
        const idx = board?.board?.findIndex(card => card.id === id)
        setDel(true)
        setTimeout(async () => {
            await deleteCard(id)
            const response = await fetchCards()
            const currentBoardArray = filterBoardByRow(response, board?.row!)?.slice(idx)
            currentBoardArray?.forEach((item: ICard) => {
                updateCard({
                    id: item.id,
                    row: item.row,
                    text: item.text,
                    seq_num: item.seq_num! - 1
                })
            })
            await fetchCards().then(res => {
                dispatch(updateBoards(res))
            })
        }, 200)
    }

    const dragStartHandler = (e: MouseEvent<HTMLDivElement>) => {
        dispatch(setCurrentCard(card))
    }

    const dragOverHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.currentTarget.className === 'card') {
            e.currentTarget.classList.add('card_hover')
        }
        if (card !== droppedCard) {
            dispatch(setDroppedCard(card))
        }
    }

    const dragLeaveHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget.classList.contains('card_hover')) {
            e.currentTarget.classList.remove('card_hover')
        }
    }

    const dropHandler = async (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (e.currentTarget.classList.contains('card_hover')) {
            e.currentTarget.classList.remove('card_hover')
        }

        if (currentCard && droppedCard) {
            if (currentCard.row === droppedCard.row) {
                await updateCard({
                    id: currentCard.id,
                    row: droppedCard.row,
                    text: currentCard.text,
                    seq_num: droppedCard.seq_num!
                })
                await updateCard({
                    id: droppedCard.id,
                    row: droppedCard.row,
                    text: droppedCard.text,
                    seq_num: currentCard.seq_num!
                })
                await fetchCards().then((res => dispatch(updateBoards(res))))
            }

            if (currentCard.row !== droppedCard.row) {
                await updateCard({
                    id: currentCard.id,
                    row: droppedCard.row,
                    text: currentCard.text,
                    seq_num: droppedCard.seq_num!
                })
                await fetchCards().then((res => {
                    currentBoard?.board?.slice(droppedCard.seq_num! + 1).forEach(item => {
                        updateCard({
                            id: item.id,
                            row: item.row,
                            text: item.text,
                            seq_num: item.seq_num! + 1
                        })
                    })
                    dispatch(updateBoards(res))
                }))
            }
        }
    }

    return (
        <div
            draggable
            onDragStart={(e) => dragStartHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDrop={(e) => dropHandler(e)}
            className={`card${del ? ' card_delete' : ''}`}
        >
            <div className="card__row">id: {card.id}</div>
            <div className="card__row">{card.text}</div>
            <button className='delete-card-button' onClick={() => remove(card.id!)}/>
        </div>
    );
};

export default Card;