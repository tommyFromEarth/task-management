import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchTasks, deleteTask } from '../redux/taskSlice';
import EditTask from './EditTask';
import CreateTask from './CreateTask';
import { Task } from '../interfaces/Task';

 

const TaskList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editingTaskTitle, setEditingTaskTitle] = useState<string>("");
    const [editingTaskDescription, setEditingTaskDescription] = useState<string>("");
    const [editingStatus, setEditingStatus] = useState<boolean>(false);
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDelete = (taskId: number) => {
        dispatch(deleteTask(taskId));
    };


    const handleEdit = (task: Task) => {
        setEditingTaskId(task.id);
        setEditingTaskDescription(task.description);
        setEditingTaskTitle(task.title)
        setEditingStatus(task.completed)
    };

    const handleCloseEdit = () => {
        setEditingTaskId(null);
    };

    if (loading) return <p>Cargando tareas...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container py-5 h-100 mt-150x">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-12 col-xl-10">
                    <div className="card mask-custom">
                        <div className="card-body p-4 text-white">
                            <CreateTask />
                            <div className="text-center pt-3 pb-2">
                                <table className="table text-white mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Título</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">Estatus</th>
                                            <th scope="col">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task) => (
                                            <tr className="fw-normal" key={task.id}>
                                                <th>
                                                    <span className="ms-2">{task.title}</span>
                                                </th>
                                                <td className="align-middle">
                                                    <span>{task.description}</span>
                                                </td>

                                                <td className="align-middle">
                                                    <span>{(task.completed === true) ? 'Completada' : 'No Completada'}</span>
                                                </td>

                                                <td className="align-middle">
                                                    <a href="#!" data-mdb-tooltip-init title="Edit" onClick={() => handleEdit(task)}><i
                                                        className="fas fa-pencil fa-lg text-warning me-3"></i></a>
                                                    <a href="#!" data-mdb-tooltip-init title="Remove" onClick={() => handleDelete(task.id)}><i
                                                        className="fas fa-trash-alt fa-lg text-warning "></i> </a>

                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                                {editingTaskId !== null && (
                                    <EditTask
                                        taskId={editingTaskId}
                                        currentTitle={editingTaskTitle}
                                        currentDescription={editingTaskDescription}
                                        currentStatus = {editingStatus}
                                        onClose={handleCloseEdit}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
