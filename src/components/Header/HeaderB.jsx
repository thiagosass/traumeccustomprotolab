import React, { useEffect, useState } from 'react';
import './HeaderB.css';
import userPerfil from '../../assets/user2.svg';
import jwt_decode from 'jwt-decode';
import { getCaseId } from '../CaseContext/CaseContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HeaderB() {
  const [userName, setUserName] = useState('');
  const idcaso = getCaseId();
  const [caseDetails, setCaseDetails] = useState({
    codigoPaciente: '',
    iniciaisPaciente: '',
    nomeCirurgiao: '',
    empresaRepresentante: '',
    tipoProduto: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Recupere o token do localStorage
    const token = localStorage.getItem('token');

    // Decodifique o token para obter as informações do usuário
    if (token) {
      const decodedToken = jwt_decode(token);

      // Defina o nome do usuário com base nas informações do token
      setUserName(decodedToken.userName);
    }
  }, []);

  useEffect(() => {
    // Realize a solicitação para obter os detalhes do caso
    axios
      .get(`http://localhost:3003/cases/caso/${idcaso}`)
      .then((response) => {
        const caseData = response.data;
        setCaseDetails(caseData);
      })
      .catch((error) => {
        console.error('Erro ao obter detalhes do caso:', error);
      });
  }, []);

  const handleMenuChange = (event) => {
    const selectedRoute = event.target.value;
    if (selectedRoute) {
      navigate(selectedRoute); // Use navigate para navegar para a rota selecionada
    }
  };

  return (
    <header className="header-b">
      <div className="registro-caso-header">
        <div className="registro-caso-header-b">
          <div className="dados-caso-header">
            <label>Código do Paciente:</label>
            <span>{caseDetails.codigoPaciente}</span>
          </div>
          <div className="dados-caso-header">
            <label>Cirurgião:</label>
            <span>{caseDetails.nomeCirurgiao}</span>
          </div>
          <div className="dados-caso-header">
            <label>Empresa Representante:</label>
            <span>{caseDetails.empresaRepresentante}</span>
          </div>
          <div className="dados-caso-header">
            <label>Tipo do Produto:</label>
            <span>{caseDetails.tipoProduto}</span>
          </div>
        </div>
      </div>
      <div className="paciente">
        <h3>Paciente</h3>
        <span>{caseDetails.iniciaisPaciente}</span>
      </div>
      <div className="box-right">
            <div className="box-user">
                <div className="filter-logo-header-b">
                    <img
                    className="logo-header-b"
                    src="/logo_traumec.png"
                    alt="Logo da Empresa"
                    />
                </div>
                <div className="user-profile-log">
                    <a href="http://localhost:3000/home">
                    <img
                        className="icone-header-b"
                        src={userPerfil}
                        alt="perfil"
                    />
                    </a>
                    <span className="font-usuario">{userName}</span>            
                </div>
                <div className='menu-paginas'>
                    {/* Menu suspenso */}
                    <select className='menu-select-paginas' onChange={handleMenuChange}>
                        <option value="">Etapas do processo</option>
                        <option value="/home/orcamento">Orçamento</option>
                        <option value="/home/orcamentoaprov">Aprovação do Orçamento</option>
                        <option value="/home/seguimentacao">Seguimentação</option>
                        <option value="/home/qualidadeseguimentacao">Qualidade da Seguimentação</option>
                        <option value="/home/agendaplanejamento">Planejamento</option>
                        <option value="/home/desenvolvimento">Desenvolvimento</option>
                        <option value="/home/aprovacaocirurgiao">Aprovação Cirurgião</option>
                        <option value="/home/preparo">Preparo</option>
                        <option value="/home/desenhotecnico">Desenho Técnico</option>
                    </select>  
                </div>
            </div>                      
      </div>
    </header>
  );
}

export default HeaderB;