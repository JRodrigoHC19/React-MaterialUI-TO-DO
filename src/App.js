import { Card, CardContent, Typography, InputLabel, MenuItem, Select, FormControl, Grid,  } from "@mui/material";
import React, {useState, useEffect} from 'react';
import TareaForm from "./TareaForm";
import ListaTareas from "./ListaTareas";
import Filtros from "./Filtros";
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [filtro, setFiltro] = useState("Todas");
  const [accion, setAccion] = React.useState('');
  const [tareasFiltradas, setTareasFiltradas] = useState([]);

  const agregarTarea = (texto) => {
    setTareas([...tareas, {texto, completada:false, fecha: new Date().toLocaleString()}]);
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index,1);
    setTareas(nuevasTareas);
  };

  const editarTarea = (index, nuevoTexto) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].texto = nuevoTexto;
    setTareas(nuevasTareas);
  };

  const toggleCompletada = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);
  };

  const filtrarTareas = (filtro) => {
    setFiltro(filtro);
  };

  const ordenarTareas = () => {
    let tareasOrdenadas = [...tareasFiltradas];

    if (accion === '1') {
      tareasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
    } else if (accion === '2') {
      tareasOrdenadas.sort((a, b) => b.texto.localeCompare(a.texto));
    } else if (accion === '3') {
      tareasOrdenadas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    } else if (accion === '4') {
      tareasOrdenadas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    }

    setTareasFiltradas(tareasOrdenadas);
  };

  const handleChange = (event) => {
    setAccion(event.target.value);

    let newTareasFiltradas;
  
    if (event.target.value === '1') {
      newTareasFiltradas = [...tareasFiltradas].sort((a, b) => a.texto.localeCompare(b.texto));
    } else if (event.target.value === '2') {
      newTareasFiltradas = [...tareasFiltradas].sort((a, b) => b.texto.localeCompare(a.texto));
    } else if (event.target.value === '3') {
      newTareasFiltradas = [...tareasFiltradas].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    } else if (event.target.value === '4') {
      newTareasFiltradas = [...tareasFiltradas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    }
  
    setTareasFiltradas(newTareasFiltradas);
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#ddeedd';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    let tareasFiltradas = [...tareas];

    if (filtro === "Pendientes") {
      tareasFiltradas = tareasFiltradas.filter((tarea) => !tarea.completada);
    } else if (filtro === "Completadas") {
      tareasFiltradas = tareasFiltradas.filter((tarea) => tarea.completada);
    }

    setTareasFiltradas(tareasFiltradas);
  }, [tareas, filtro]);

  useEffect(() => {
    ordenarTareas();
  }, [accion, tareasFiltradas]);

  return (
    <div className='App' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Card sx={{ minWidth: 650 }} >
        <CardContent>
          <Typography variant='h2' gutterBottom>
            Lista de Tareas
          </Typography>

          <Typography variant="h4" component="div" gutterBottom>
            <TareaForm agregarTarea={agregarTarea} />
          </Typography>

          <Typography gutterBottom>
            <Filtros filtrarTareas={filtrarTareas} />
          </Typography>

          <Typography sx={{ paddingTop: 2, textAlign: "left" }}>
            <Grid container>
              <Grid item xs={7}></Grid>
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Ordenar</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Ordenar"
                    value={accion}
                    size='small'
                    onChange={handleChange}
                  >
                    <MenuItem value='1'>Por nombre (A-Z)</MenuItem>
                    <MenuItem value='2'>Por nombre (Z-A)</MenuItem>
                    <MenuItem value='3'>Por fecha de creación (ASC)</MenuItem>
                    <MenuItem value='4'>Por fecha de creación (DEC)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <ListaTareas
              tareas={tareasFiltradas}
              eliminarTarea={eliminarTarea}
              editarTarea={editarTarea}
              toggleCompletada={toggleCompletada}
            />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
