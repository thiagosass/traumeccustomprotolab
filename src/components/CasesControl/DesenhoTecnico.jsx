import React, { useState, useEffect, useRef } from 'react';
import HeaderB from '../Header/HeaderB';
import Timeline from '../Timeline/Timeline';
import Comentario from '../Comentario/Comentario';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DesenhoTecnico() {
    function ExportButton() {
      const fileInputRef = useRef(null);
  
      const handleFileSelection = () => {
        // Simula um clique no input de arquivo para abrir o seletor de arquivo
        fileInputRef.current.click();
      };
  
      const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
  
        if (selectedFile) {
          // Crie um objeto FormData para enviar o arquivo para o servidor
          const formData = new FormData();
          formData.append('file', selectedFile);
  
          // Faça uma requisição para o servidor para enviar o arquivo
          fetch('URL_DO_SERVIDOR', {
            method: 'POST',
            body: formData,
          })
            .then((response) => {
              // Lide com a resposta do servidor, por exemplo, exiba uma mensagem de sucesso
              console.log('Arquivo enviado com sucesso:', response);
            })
            .catch((error) => {
              console.error('Erro ao enviar o arquivo:', error);
            });
        }
      };
  
      return (
        <div className='centralizar-page'>
          <HeaderB />
          <Timeline />
          <form> 
            <div className='bloco-seguimentacao'>

              <div className='bloco-temporizador'>
                <div className='tempo-registro'>
                    <label>Registro de Tempo de Execução:</label>
                    <span> 0 dias, 00:00:00 horas</span>
                </div>
                <div className='data-inicio-etapa'>
                    <label>Inicio da Etapa:</label>
                    <span> 00/00/0000, 00:00:00 horas</span>
                </div>
              </div>                              

              <div className='caixa-upload-arquivos'>   

                <label>Upload arquivo Desenho Técnico.pdf (obrigatório):</label>                                    
                <input
                    className='upload-arquivos'
                    type="file"
                    name="zipFile"
                    accept=".zip"
                    onChange={handleFileUpload}
                    required
                />

                <div className='seguimentacao-upload'>
                  <button className='botao-selecionar-zip'>Enviar para Eng. Processos</button>                    
                </div> 

              </div> 

            </div>
          </form>         
          <Comentario/>
        </div>
      );
    }
  
    return <ExportButton />;
  }
  
  export default DesenhoTecnico;