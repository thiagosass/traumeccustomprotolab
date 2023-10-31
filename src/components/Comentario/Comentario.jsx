import React from 'react';
import './Comentario.css';

function Comentario({ comentario }) {
    return(        
            <div className='comentario'>
                <label>Comentario:</label><span>{comentario}</span>                       
            </div>       
    )
}

export default Comentario