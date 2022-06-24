import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://62a9d80d3b314385543cca25.mockapi.io/items/' + id)
                setPizza(data)
            } catch (err) {
                alert('Ошибка при получении пиццы')
                navigate('/')
            }
        }
        fetchPizza();
    }, [id])

    if (!pizza) {
        return <>Загрузка...
        </>
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    );
};

export default FullPizza;