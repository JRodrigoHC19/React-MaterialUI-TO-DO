import React, { useState } from "react";

import {Paper, InputBase, Divider, IconButton, Tooltip, Snackbar} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


function TareaForm({agregarTarea}) {
    const [texto, setTexto] = useState("");
        
    const [alert, setAlert] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: ''
      });
      const { vertical, horizontal, message, open } = alert;
    
      const handleClose = () => {
        setAlert({ ...alert, open: false });
      };

    const handleSubmit = (newAlert) => (e) => {
        e.preventDefault();
        if (texto.trim() === "") return;
        if (texto.length > 30){
            setAlert({ ...newAlert,  message: 'La tarea debe contener máximo 30 crácteres.', open: true });
            return;
        } else if (texto.length < 3 ) {
            setAlert({ ...newAlert,  message: 'La tarea debe contener mínimo 3 carácteres.', open: true });
            return;
        }
        setTexto("");
        agregarTarea(texto);
    };
    return (
        <form onSubmit={handleSubmit({ vertical: 'top', horizontal: 'right'})}>
            <Paper sx={{ p: '0px 4px', display: 'flex', alignItems: 'center' }}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    size="small"
                    placeholder="Añadir Tarea"
                    onChange={(e) => setTexto(e.target.value)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip title='Agregar'>
                    <IconButton type="submit" color="primary" sx={{ p: '10px' }} >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={message}
                key={vertical + horizontal}
            />
        </form>
    );
}

export default TareaForm;
