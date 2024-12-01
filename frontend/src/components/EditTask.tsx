import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { updateTask } from '../redux/taskSlice';
import Modal from 'react-modal';
import { EditTaskProps } from '../interfaces/EditTaskProps';

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

const EditTask: React.FC<EditTaskProps> = ({
    taskId,
    currentTitle,
    currentDescription,
    currentStatus,
    onClose,
}) => {
    const [title, setTitle] = useState(currentTitle);
    const [description, setDescription] = useState(currentDescription);
    // eslint-disable-next-line
    const [completed, setCompleted] = useState(currentStatus);
    const [modalIsOpen, setIsOpen] = React.useState(true);
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateTask({ id: taskId, title, description, completed }));
        onClose();
    };

    const handleFinalize = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateTask({ id: taskId, title, description, completed: true }));
        onClose();
    };

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div className="container">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal para editar tarea"
            >
                <div className="text-center pt-3 pb-2">
                    <h2 className="my-4">Editar Tarea</h2>
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
                    <button className='btn btn-primary' type="submit"> Actualizar</button>
                    <button className='btn btn-success ml-5' onClick={handleFinalize}> Finalizar</button>
                    <button className='btn btn-warning ml-5' onClick={closeModal}> Cancelar</button>
                </form>
            </Modal>
        </div>
    );
};

export default EditTask;
