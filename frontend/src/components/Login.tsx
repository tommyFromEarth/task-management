import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(login({ username, password }));
        if (login.fulfilled.match(result)) {
            navigate('/tasks');
        } else {
            setErrorMessage('Error al iniciar sesión');
        }
    };

    return (
        <div className="container py-5">
            <div className="text-center pt-3 pb-2 mt-150x">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-6 col-xl-4">
                        <div className="card mask-custom">
                            <div className="card-body p-4 text-white">
                                <h2 className='text-white'>Iniciar Sesión</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-3 mt-5">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Correo electrónico"
                                            className='form-control'
                                        />
                                    </div>
                                    <div className="input-group mb-3">

                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Contraseña"
                                            className='form-control'
                                        />
                                    </div>
                                    {errorMessage ? (

                                        <div className="input-group mb-2  d-flex justify-content-center align-items-center h-100">
                                            <span className='alert alert-danger'>{errorMessage}</span>
                                        </div>
                                    ) : <></>}
                                    <button className='btn btn-dark mb-3' type="submit">Iniciar Sesión</button>
                                    <p>No tiene una cuenta? <a href='/register'>Crear cuenta.</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
