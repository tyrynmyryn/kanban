import { ICard } from '../types/card';
import { IUser } from '../types/user';

const _baseUrl = 'https://trello.backend.tests.nekidaem.ru/api/v1/';

async function refreshToken(value: string | null) {
    const response = await fetch(`${_baseUrl}users/refresh_token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            token: value
        })
    })
    const { token } = await response.json()
    return token
}

export const createUser = async (user: IUser) => {
    const response = await fetch(`${_baseUrl}users/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    })
    return response
}

export async function auth(user: IUser) {
    const response = await fetch(`${_baseUrl}users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    })
    if (response.ok) {
        const { token } = await response.json();
        window.localStorage.setItem('token', `${token}`)
    }
    return response
}

export async function fetchCards() {
    const response = await fetch(`${_baseUrl}cards/`, {
        method: 'GET',
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem("token")}`
        }
    })
    if (response.status === 401) {
        await refreshToken(window.localStorage.getItem("token"))
            .then(res => {
                const { token } = res.json()
                window.localStorage.setItem("token", `${token}`)
            })
            .then(() => fetchCards())
    }
    return await response.json()
}

export async function postCard(card: ICard) {
    const response = await fetch(`${_baseUrl}cards/`, {
        method: 'POST',
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem("token")}`,
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(card),
    })
    return await response.json()
}

export async function deleteCard(id: number) {
    await fetch(`${_baseUrl}cards/${id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem("token")}`,
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export async function updateCard(card: ICard) {
    const response = await fetch(`${_baseUrl}cards/${card.id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem("token")}`,
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(card),
    })
    return await response.json()
}