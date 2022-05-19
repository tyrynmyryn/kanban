import React, { useState } from 'react';
import { auth } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './AuthPage.scss';

interface User {
    username: string;
    password: string;
}

interface Errors {
    username: string[] | null;
    non_field_errors: string[] | null;
    password: string[] | null;
}

const AuthForm = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })


    const [errors, setErrors] = useState<Errors>({
        username: null,
        non_field_errors: null,
        password: null
    })

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const login = async () => {
        const response = await auth(user);
        if (!response.ok) {
            const err = await response.json()
            setErrors(err)
        }
        if (response.ok) {
            navigate('/')
        }
    }

    if (window.localStorage.getItem("token")) {
        return <Navigate to="/" />
    }

    return (
        <div className="form">
            <Input 
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Введите логин"
                error={errors.username?.length ? true : false}
            />
            {errors.username && 
                errors.username.map(item => <p key={item} className='error'>{item}</p>)
            }
            <Input 
                type={showPassword ? 'text' : 'password'}
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Введите пароль"
                error={errors.password?.length ? true : false}
            />
            {errors.password && 
                errors.password.map(item => <p key={item} className='error'>{item}</p>)
            }
            <div className='form__bottom'>
                <div className="checkbox">
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        id='checkbox-show-password'
                        className='checkbox__input'
                    />
                    <label
                        htmlFor='checkbox-show-password'
                        className='checkbox__label'
                    >
                        {showPassword ? "Скрыть" : "Показать"} пароль
                    </label>
                </div>
                <Link to="/registration" className="reg-link">Регистрация</Link>
            </div>
            <Button onClick={login} className="auth-button">Войти</Button>
            {errors.non_field_errors && 
                errors.non_field_errors.map(item => <p key={item} className='error'>{item}</p>)
            }
        </div>
    );
};

export default AuthForm;