import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setCaseId } from '../CaseContext/CaseContext';
import  './Cases.css';       
    
function Cases({ caso }) {
    const navigate = useNavigate();
    
    function redirecionarParaRota() {
      setCaseId(caso.idcaso); // Define o valor do idcaso no localStorage
      navigate('./orcamento');
    }

    return (
      <div className='medical-cases' onClick={redirecionarParaRota}>
        <div className='data-cases'>
          <label>Código do paciente: </label>
          <span>{caso.codigoPaciente}</span>
        </div>
        <div className='data-cases'>
          <label>Iniciais do paciente: </label>
          <span>{caso.iniciaisPaciente}</span>
        </div>
        <div className='data-cases'>
          <label>Nome do cirurgião: </label>
          <span>{caso.nomeCirurgiao}</span>
        </div>
        <div className='data-cases'>
          <label>Tipo de produto: </label>
          <span>{caso.tipoProduto}</span>
        </div>
        <div className='data-cases'>
          <label>Empresa representante: </label>
          <span>{caso.empresaRepresentante}</span>
        </div>
        <div className='data-cases'>
          <label>Status: </label>
          <span className='status'>{caso.status}</span>
        </div>
      </div>
    );
  }  
    
export default Cases;