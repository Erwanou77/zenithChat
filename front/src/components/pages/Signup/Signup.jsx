import React from 'react';
import './_signup.scss';

const Signup = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black-100">
            <form className="signup-form flex flex-col p-6 w-96 bg-black-200 rounded-lg shadow-lg">
                <h1 className="text-white text-center text-2xl mb-6">Créez votre compte</h1>
                <input type="text" placeholder="Nom d'utilisateur" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <input type="email" placeholder="Email" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <input type="password" placeholder="Mot de passe" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <input type="password" placeholder="Confirmez le mot de passe" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <button type="submit" className="p-3 bg-blurple text-white rounded hover:bg-blurple-dark">S'inscrire</button>
            </form>
        </div>
    );
};

export default Signup;
