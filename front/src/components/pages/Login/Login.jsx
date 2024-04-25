import React from 'react';
import './_login.scss';

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black-100">
            <form className="login-form flex flex-col p-6 w-96 bg-black-200 rounded-lg shadow-lg">
                <h1 className="text-white text-center text-2xl mb-6">Connectez-vous</h1>
                <input type="text" placeholder="Email ou nom d'utilisateur" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <input type="password" placeholder="Mot de passe" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <button type="submit" className="p-3 bg-blurple text-white rounded hover:bg-blurple-dark">Connexion</button>
            </form>
        </div>
    );
};

export default Login;
