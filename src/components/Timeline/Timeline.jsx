import React, { useState, useEffect } from 'react';
import './Timeline.css';
import axios from 'axios';
import { getCaseId } from '../CaseContext/CaseContext';

function Timeline() {
    const [timelineData, setTimelineData] = useState({
        statusOrcamento: 'Aguardando orçamento',
        statusAprovacaoOrcamento: 'Não iniciada',
        statusSeguimentacao: 'Não iniciada',
        statusQualidadeSeguimentacao: 'Não iniciada',
        statusPlanejamento: 'Não iniciada',
        statusDesenvolvimento: 'Não iniciada',
        statusAprovacaoCirurgiao: 'Não iniciada',
        statusPreparo: 'Não iniciada',
        statusDesenhoTecnico: 'Não iniciada',
    });
  
    useEffect(() => {
        const idcaso = getCaseId(); // Obter o idcaso do localStorage
    
        if (idcaso) {
          const apiUrl = `https://traumec-customprotolab.com.br/timeline/status/${idcaso}`; // Atualize com a URL correta da sua API
    
          axios.get(apiUrl)
            .then(response => {
              const responseData = response.data;

              // Atualiza o estado com os dados obtidos
              setTimelineData({
                statusOrcamento: responseData.status_orcamento,
                statusAprovacaoOrcamento: responseData.status_orcamento_aprov || 'Não iniciada',
                statusSeguimentacao: responseData.status_seguimentacao || 'Não iniciada',
                statusQualidadeSeguimentacao: responseData.status_seguimentacao_quality || 'Não iniciada',
                statusPlanejamento: responseData.status_planejamento || 'Não iniciada',
                statusDesenvolvimento: responseData.status_desenvolvimento || 'Não iniciada',
                statusAprovacaoCirurgiao: responseData.status_aprovacao_cirurgiao || 'Não iniciada',
                statusPreparo: responseData.status_preparo || 'Não iniciada',
                statusDesenhoTecnico: responseData.status_desenho_tecnico || 'Não iniciada',
              });
            })
            .catch(error => {
              console.error('Erro na requisição:', error);
            });
        } else {
          console.error('idcaso não encontrado no localStorage');
        }
    }, []);// Este efeito só é executado uma vez (equivalente ao componentDidMount)

    const getClassForStatus = (status) => {
        if (status === 'Concluído!') {
            return 'timeline-arrow-etapa-concluida';
        } else if (status === 'Não iniciada') {
            return 'timeline-arrow';
        } else {
            return 'timeline-arrow-aguardando';
        }
    };
  
    return(
        <div className='timeline'>
            <div className='timeline-arrow-concluido'>
                <div className="conteudo">
                    <p >Criação do caso:</p>
                    <span >Concluído!</span>              
                </div>
            </div>
            <div className={getClassForStatus(timelineData.statusOrcamento)}>
                <div className="conteudo">
                    <p>Orçamento:</p>
                    <span >{timelineData.statusOrcamento}</span>                    
                </div>
            </div>
            <div className={getClassForStatus(timelineData.statusAprovacaoOrcamento)}>
                <div className="conteudo">
                    <p >Aprovação do orçamento:</p>
                    <span >{timelineData.statusAprovacaoOrcamento}</span>                    
                </div>
            </div>
            <div className={getClassForStatus(timelineData.statusSeguimentacao)}>
                <div className="conteudo">
                    <p >Seguimentação:</p>
                    <span >{timelineData.statusSeguimentacao}</span>                 
                </div>
            </div>
            <div className={getClassForStatus(timelineData.statusQualidadeSeguimentacao)}>
                <div className="conteudo">
                    <p>Qualidade seguimentação </p>
                    <span >{timelineData.statusQualidadeSeguimentacao}</span>                    
                </div>
            </div>
            <div className={getClassForStatus(timelineData.statusPlanejamento)}>
                <div className="conteudo">
                    <p >Planejamento:</p>
                    <span >{timelineData.statusPlanejamento}</span>                    
                </div>
            </div>
            <div className={getClassForStatus(timelineData.statusDesenvolvimento)}>
                <div className="conteudo">
                    <p >Desenvolvimento:</p>
                    <span >{timelineData.statusDesenvolvimento}</span>                    
                </div>
            </div>
            <div className={getClassForStatus(timelineData.statusAprovacaoCirurgiao)}>
                <div className="conteudo">
                    <p >Aprovação do cirurgião:</p>
                    <span >{timelineData.statusAprovacaoCirurgiao}</span>                    
                </div>
            </div>
            <div className={getClassForStatus(timelineData.statusPreparo)}>
                <div className="conteudo">
                    <p >Preparo:</p>
                    <span >{timelineData.statusPreparo}</span>                    
                </div>
            </div>
            <div className={getClassForStatus(timelineData.statusDesenhoTecnico)}>
                <div className="conteudo">
                    <p >Desenho Técnico:</p>
                    <span >{timelineData.statusDesenhoTecnico}</span>                    
                </div>
            </div>             
        </div>
    )
}

export default Timeline