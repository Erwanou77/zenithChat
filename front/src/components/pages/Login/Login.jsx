import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const Login = () => {
    const [dataApi, setDataApi] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await api.get('users');
            setDataApi(result.message);
          } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
          }
        };
        fetchData();
      }, []);
    return (
        <div>
            {dataApi && dataApi.map((element) => (
                <h1>{element.username}</h1>
            ))}
        </div>
    );
};

export default Login;