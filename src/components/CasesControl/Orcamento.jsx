import React, { useState, useEffect } from 'react';
import HeaderB from '../Header/HeaderB';
import Timeline from '../Timeline/Timeline';
import Comentario from '../Comentario/Comentario';
import './Orcamento.css';
import axios from 'axios';
import { getCaseId } from '../CaseContext/CaseContext';
import { useNavigate } from 'react-router-dom';

function Orcamento() {
    const idcaso = getCaseId();
    const [comentario, setRecusaOrcamento] = useState('');
    const [envioSucesso, setEnvioSucesso] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Realize a solicitação GET para obter o valor de recusaOrcamento
        fetch(`https://traumec-customprotolab.com.br/cases/recusaorcamento/${idcaso}`)
            .then((response) => response.json())
            .then((data) => {
                setRecusaOrcamento(data.recusaOrcamento); // Substitua 'recusaOrcamento' pelo nome do campo que você espera receber
            })
            .catch((error) => {
                console.error('Erro ao buscar recusaOrcamento:', error);
            });
    }, []);

    const enviarOrcamento = async (event) => {
        event.preventDefault();
        try {
          await axios.post('https://traumec-customprotolab.com.br/timeline/atualizarOrcamento', { idcaso });
          setEnvioSucesso(true); // Ativa a mensagem de sucesso
          setTimeout(() => {
            // Redireciona para a página inicial após 3 segundos
            navigate('/home');
          }, 3000);
        } catch (error) {
          console.error('Erro ao enviar o orçamento:', error);
          // Lidar com erros, mostrar mensagem de erro, etc.
        }
      };

    return (
        <div className='centralizar-page'>
            <HeaderB idcaso={idcaso}/>
            <Timeline/>
            <div className='bloco-form'>
                <div className='bloco-teste'>                    
                    <form>
                        <div className='tabela'>
                            <div className='coluna-codigo'>
                                <label>Código</label>
                                <input className="tabela-input"/>
                                <input className="tabela-input"/>
                            </div>
                            <div className='coluna-descricao'>
                                <label>Descrição</label>
                                <input className="tabela-input"/>
                                <input className="tabela-input"/>
                            </div>
                            <div className='coluna-valor'>
                                <label>Valor</label>
                                <input className="tabela-input"/>
                                <input className="tabela-input"/>
                            </div>
                        </div>
                        <div className='box-button'>
                            <div>
                                {envioSucesso && (
                                    <div className='sucesso-envio-orçamento'>Orçamento enviado com sucesso!</div>
                                )}
                            </div>
                            <button className='botao-orcamento' onClick={enviarOrcamento}>Enviar Orçamento</button>
                        </div>
                    </form>
                </div>
            </div>               
            <Comentario comentario={comentario}/>              
        </div>        
    );
} 

export default Orcamento;