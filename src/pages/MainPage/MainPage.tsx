import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCards } from '../../api/api';
import Boards from '../../components/Boards/Boards';
import { updateBoards } from '../../store/board';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import './MainPage.scss'

const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCards().then((res => {
            dispatch(updateBoards(res))
            setLoading(false)
        }))
    }, [])

    const logout = () => {
        window.localStorage.clear()
        navigate('/auth')
    }

    return (
        <>
            <Button 
                onClick={logout}
                className="logout-button"
            >
                Выйти
            </Button>
            {!loading ? <Boards /> : <Loader />}
        </>
    );
};

export default App;