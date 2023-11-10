import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton, Checkbox, Tooltip, Typography, ListItem, Divider, Grid, TextField } from '@mui/material';

function Tarea({ tarea, onDelete, onEdit, completada, onToggleCompletada }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(tarea.texto);

  useEffect(() => {
    setEditedText(tarea.texto);
  }, [tarea.texto]);

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleSaveClick = () => {
    onEdit(editedText);
    setIsEditing(false);
  }

  return (
    <div>
      <ListItem>
        <Checkbox checked={completada} onChange={onToggleCompletada} />
        {isEditing ? (
          <>
            <Grid container>
              <Grid item xs={10.3}>
                <Typography>
                  <TextField fullWidth hiddenLabel variant="filled" size='small' value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                </Typography>
              </Grid>
              <Grid item xs={1.7}>
                <Tooltip title='Guardar'>
                  <IconButton type="submit" onClick={handleSaveClick} >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container>
              <Grid item xs={10.3}>
                <Typography variant='h5'>{tarea.texto}</Typography>
              </Grid>
              <Grid item xs={1.7}>
                <Tooltip title='Eliminar' >
                  <IconButton variant="primary" size='small' onClick={onDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title='Editar'>
                  <IconButton variant="primary" size='small' onClick={handleEditClick}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </>
        )}
      </ListItem>
      <Divider variant="middle" />
    </div>
  );
}

export default Tarea;
