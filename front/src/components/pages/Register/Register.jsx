import { useState } from 'react';
import './_register.scss';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        api.post('registration', formData)
        navigate('/login');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black-100">
            <form className="signup-form flex flex-col p-6 w-96 bg-black-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <h1 className="text-white text-center text-2xl mb-6">Créez votre compte</h1>
                <input type="text" name='username' onChange={handleInputChange} placeholder="Nom d'utilisateur" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <input type="text" name='firstname' onChange={handleInputChange} placeholder="Prénom" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <input type="text" name='lastname' onChange={handleInputChange} placeholder="Nom de famille" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <input type="email" name='email' onChange={handleInputChange} placeholder="Email" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <input type="password" name='password' onChange={handleInputChange} placeholder="Mot de passe" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <input type="password" placeholder="Confirmez le mot de passe" className="mb-4 p-3 rounded bg-greyple text-white placeholder-white"/>
                <button type="submit" className="p-3 bg-blurple text-white rounded hover:bg-blurple-dark">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;