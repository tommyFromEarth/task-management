import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { createTask } from '../redux/taskSlice';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        backgroundColor: 'rgb(35, 0, 106'
    },
};

const CreateTask: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createTask({ title, description }));
        setTitle('');
        setDescription('');
        closeModal();
    };

    const openModal = () =>{
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-warning' onClick={openModal}>Crear Tarea</button>

            </div>
            <div className="container">
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    
                    contentLabel="Modal Para Crear Tareas"
                >
                    <div className="text-center pt-3 pb-2">
                        <h2 className="my-4">Tareas</h2>
                    </div> 
                 
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                placeholder="Título"
                                className='form-control'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="input-group mb-3">
                        <textarea
                            placeholder="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='form-control'
                        ></textarea>
                        </div>
                        <button className='btn btn-primary' type="submit"> Crear Tarea</button>
                        <button className='btn btn-warning ml-50' onClick={closeModal}> Cancelar</button>
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default CreateTask;
