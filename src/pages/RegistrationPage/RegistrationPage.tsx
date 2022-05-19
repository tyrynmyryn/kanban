import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { Link, Navigate } from 'react-router-dom';
import { IUser } from '../../types/user';
import { createUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.scss'

interface Errors {
    username: string[] | null;
    email: string[] | null;
    password: string[] | null;
}

const RegistrationPage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>({
        username: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState<Errors>({
        username: null,
        email: null,
        password: null
    })

    const signUp = async () => {
        const response = await createUser(user)
        if (!response.ok) {
            const err = await response.json()
            setErrors(err)
        }
        if (response.ok) {
            navigate('/auth')
        }
    }

    if (window.localStorage.getItem("token")) {
        return <Navigate to="/" />
    }

    return (
        <div className="registration">
            <Input
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Введите логин"
                error={errors.username?.length ? true : false}
            />
            {errors.username && 
                <div className="errors">
                    {errors.username.map(item => <p key={item} className='error'>{item}</p>)}
                </div>
            }
            
            <Input 
                type='text'
                value={user.email ?? ''}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Введите email (необязательно)"
                error={errors.email?.length ? true : false}
            />
            {errors.email && 
                <div className="errors">
                    {errors.email.map(item => <p key={item} className='error'>{item}</p>)}
                </div>
            }
            <Input 
                type='text'
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Введите пароль"
                error={errors.password?.length ? true : false}
            />
            {errors.password && 
                <div className="errors">
                    {errors.password.map(item => <p key={item} className='error'>{item}</p>)}
                </div>
            }
            <div className='registration__buttons'>
                <Button onClick={signUp}>Регистрация</Button>
                <Link to="/auth" className="link registration__link">Назад</Link>
            </div>
        </div>
    );
};

export default RegistrationPage;