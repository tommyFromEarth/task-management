import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProfile, logout } from '../redux/authSlice';

const Profile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    };
    return (
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-12 col-xl-10">
                    <div className="card mask-custom">
                        <div className="card-body p-4 text-white">
                            <h1>Perfil del Usuario</h1>
                            {user && (
                                <>
                                    <p>Nombre de Usuario: {user.username}</p>
                                    <p>Email: {user.email}</p>
                                </>
                            )}
                            <button className='btn btn-dark' onClick={() => handleLogout()}>Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
