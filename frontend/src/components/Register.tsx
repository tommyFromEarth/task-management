import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { registerUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
      });
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, email, password } = formData;
    
        if (!username || !email || !password) {
          setErrorMessage('Por favor, complete todos los campos.');
          return;
        }
    
        try {
          await dispatch(registerUser(formData)).unwrap();
          setErrorMessage('');
        //   alert('Cuenta creada exitosamente');
        navigate('/login');
        } catch (err: any) {
          setErrorMessage(err.message || 'Error al registrar la cuenta');
        }
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    return (
        <div className="container py-5">
            <div className="text-center pt-3 pb-2 mt-150x">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-6 col-xl-4">
                        <div className="card mask-custom">
                            <div className="card-body p-4 text-white">
                                <h2 className='text-white'>Crear Cuenta</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-3 mt-5">
                                        <input
                                            type="text"
                                            name='username'
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Nombre de usuario"
                                            className='form-control'
                                        />
                                    </div>
                                    <div className="input-group mb-3">

                                        <input
                                            type="email"
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Correo electrónico"
                                            className='form-control'
                                        />
                                    </div>

                                    <div className="input-group mb-3">

<input
    type="password"
    name='password'
    value={formData.password}
    onChange={handleChange}
    placeholder="Contraseña"
    className='form-control'
/>
</div>
                                    {errorMessage ? (

                                        <div className="input-group mb-2  d-flex justify-content-center align-items-center h-100">
                                            <span className='alert alert-danger'>{errorMessage}</span>
                                        </div>
                                    ) : <></>}
                                    <button className='btn btn-dark mb-3' type="submit">Registrarse</button>
                                    <p>Ya tiene una cuenta? <a href='/login'>Iniciar Sesión</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
