import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import './_login.scss';

const Login = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault()
    api.post('login', formData)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100">
      <form className="login-form flex flex-col p-6 w-96 bg-black-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h1 className="text-white text-center text-2xl mb-6">Connectez-vous</h1>
        <input type="text" name='email' onChange={handleInputChange} required placeholder="Email ou nom d'utilisateur" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white" />
        <input type="password" name='password' onChange={handleInputChange} required placeholder="Mot de passe" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white" />
        <button type="submit" className="p-3 bg-blurple text-white rounded hover:bg-blurple-dark">Connexion</button>
      </form>
    </div>
  );
};

export default Login;
