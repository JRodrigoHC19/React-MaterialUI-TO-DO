import React from 'react';
import {ToggleButtonGroup, ToggleButton} from '@mui/material';

function Filtros({filtrarTareas}) {

    const [alignment, setAlignment] = React.useState('todas');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    
    return (
        <div>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                size='small'
                >
                <ToggleButton value="todas" onClick={() => filtrarTareas("Todas")}>Todas</ToggleButton>
                <ToggleButton value="pendientes" onClick={() => filtrarTareas("Pendientes")}>Pendientes</ToggleButton>
                <ToggleButton value="completadas" onClick={() => filtrarTareas("Completadas")}>Completadas</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export default Filtros;
