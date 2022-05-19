import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Board from '../Board/Board';
import './Boards.scss';

const Boards = () => {

    const { boards } = useSelector((state: RootState) => state.board)

    return (
        <div className="boards">
            {boards?.map(item =>
                <Board
                    key={item.title}
                    board={item}
                />
            )}
        </div>
    );
};

export default Boards;