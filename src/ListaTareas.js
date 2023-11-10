import React from 'react';
import Tarea from "./Tarea";
import List from '@mui/material/List';

function ListaTareas({tareas, eliminarTarea, editarTarea, toggleCompletada}) {
    return (
        <List>
            {tareas.map((tarea, index) => (
                <Tarea 
                    key={index} 
                    tarea={tarea} 
                    completada={tarea.completada} 
                    onDelete={() => eliminarTarea(index)}
                    onEdit={(nuevoTexto) => editarTarea(index, nuevoTexto)}
                    onToggleCompletada={() => toggleCompletada(index)}
                />
            ))}
        </List>
    );
}

export default ListaTareas;