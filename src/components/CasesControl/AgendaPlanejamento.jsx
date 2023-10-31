import React, { useState, useEffect, useRef } from 'react';
import HeaderB from '../Header/HeaderB';
import Timeline from '../Timeline/Timeline';
import Comentario from '../Comentario/Comentario';
import './AgendaPlanejamento.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function formatarData(data) {
  const partes = data.split('-'); // Divide a data em partes [ano, mês, dia]
  const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`; // Formata como dd/mm/aaaa
  return dataFormatada;
}

function AgendaPlanejamento() {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const formattedDate = formatarData(date);

  const [time, setTime] = useState('00:00'); // Variável para armazenar o horário selecionado
  const [endTime, setEndTime] = useState('01:30'); // Variável para armazenar o horário final inicial

  function ExportButton() {
    const fileInputRef = useRef(null);

    const handleFileSelection = () => {
      // Simula um clique no input de arquivo para abrir o seletor de arquivo
      fileInputRef.current.click();
    };

    const handleFileUpload = async (event) => {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        // Crie um objeto FormData para enviar o arquivo para o servidor
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Faça uma requisição para o servidor para enviar o arquivo
        const response = await fetch('URL_DO_SERVIDOR', {
          method: 'POST',
          body: formData,
        });

        // Lide com a resposta do servidor, por exemplo, exiba uma mensagem de sucesso
        console.log('Arquivo enviado com sucesso:', response);
      }
    };

    useEffect(() => {
      if (time) {
        // Calcula o horário final somando 1 hora e 30 minutos ao horário selecionado
        const calculatedEndTime = (
          new Date(`2023-09-14T${time}:00`).getTime() +
          1 * 60 * 60 * 1000 +
          30 * 60 * 1000
        );
        const formattedEndTime = new Date(calculatedEndTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        setEndTime(formattedEndTime);
      }
    }, [time]);

    return (
      <div className='centralizar-page'>
        <HeaderB />
        <Timeline />
        <form>
          <div className='bloco-planejamento'>
            
            <div className='bloco-data-planejamento'>

              <div className='select-date'>
                <label className='selecao-data-label'>Selecione a data do planejamento: </label>
                <input
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <div className='select-time'>
                  <input
                    type='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>   

              <div className='data-planejamento'>
                <label>Data do Planejamento:</label>
                <div className='dados-data-planejamento'>
                  <span>{formattedDate}</span>
                  <span>das {time} às {endTime} horas</span>
                </div>
              </div>

            </div>

            <div className='caixa-upload-arquivos-planejamento'>

              <label>Upload arquivo Planejamento.zip (obrigatório):</label>                          
              <input
                  className='upload-arquivos'
                  type="file"
                  name="zipFile"
                  accept=".zip"
                  onChange={handleFileUpload}
                  required
              />

              <div className='planejameto-upload'>
                <button className='botao-selecionar-zip'>Agendar e Enviar arquivo para Desenvolvimento</button>                    
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

export default AgendaPlanejamento;