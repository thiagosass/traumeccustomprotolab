import React, { useState, useRef, useEffect } from 'react';
import HeaderB from '../Header/HeaderB';
import Timeline from '../Timeline/Timeline';
import Comentario from '../Comentario/Comentario';
import './QualidadeSeguimentacao.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function QualidadeSeguimentacao() {
  const [recusaDialogAberta, setRecusaDialogAberta] = useState(false);
  const [motivoRecusa, setMotivoRecusa] = useState('');
  const [comentario, setComentario] = useState('sem comentário');
  const navigate = useNavigate();

  const abrirRecusaDialog = () => {
    setRecusaDialogAberta(true);
  };

  const fecharRecusaDialog = () => {
    setRecusaDialogAberta(false);
  };

  const handleMotivoRecusaChange = (e) => {
    // Mantenha o estado do motivoRecusa atualizado conforme o usuário digita,
    // mas não envie o motivo até que o botão "Enviar Motivo" seja clicado.
    setMotivoRecusa(e.target.value);
  };

  const enviarMotivoRecusa = () => {
    // Aqui você pode fazer a lógica para enviar o motivo para o backend (Node.js) e e-mail.
    // Certifique-se de que o servidor backend está configurado para receber e-mails e armazenar no banco de dados.
    const motivoRecusaObj = {
      recusaSeguimentacao: motivoRecusa,
    };

    // Recupere o valor de idcaso da storage do navegador
    const idcaso = localStorage.getItem('idcaso');

    if (idcaso) {
      // Realize uma requisição POST para a rota com o ID do caso
      fetch(`http://localhost:3003/cases/recusaseguimentacao/${idcaso}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(motivoRecusaObj),
      })
      .then((response) => response.json())
      .then((data) => {
        // Lógica para lidar com a resposta, se necessário
        console.log('Motivo de recusa enviado com sucesso:', data);
        // Após o envio bem-sucedido, você pode fechar a caixa de diálogo
        fecharRecusaDialog();
      })
      .catch((error) => {
        console.error('Erro ao enviar motivo de recusa:', error);
      });
    }
  };

  const fileInputRef = useRef(null);

  const handleFileSelection = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('URL_DO_SERVIDOR', {
        method: 'POST',
        body: formData,
      })
      .then((response) => {
        console.log('Arquivo enviado com sucesso:', response);
      })
      .catch((error) => {
        console.error('Erro ao enviar o arquivo:', error);
      });
    }
  }; 

  useEffect(() => {
    // Recupere o valor de idcaso da storage do navegador
    const idcaso = localStorage.getItem('idcaso');

    if (idcaso) {
      // Realize a solicitação GET para obter o valor do comentário
      fetch(`http://localhost:3003/cases/recusaorcamento/${idcaso}`)
      .then((response) => response.json())
      .then((data) => {
        setComentario(data.recusaSeguimentacao);
      })
      .catch((error) => {
        console.error('Erro ao buscar comentário:', error);
      });
    }
  }, []);

  return (
    <div className='centralizar-page'>
      <HeaderB />
      <Timeline />      
      <form>

        <div className='bloco-form-seguimentacao'> 

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

          <div className='box-button-qualidade-seguimentacao'>

            <div className='seguimentacao-export'>
              <button className='botao-selecionar-zip' onClick={handleFileSelection}>
                Download arquivos seguimentados.zip
              </button>
              <input
                ref={fileInputRef}
                type='file'
                accept='.zip'
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </div>

            <div className='box-button-aprov-recuse'>
              <div className='box-button-aprova-reprova'>
                <button className='botao-orcamento-aprov'>
                  Aprovar
                </button>
                <button type="button" className='botao-orcamento-seg-recuse' onClick={abrirRecusaDialog}>
                  Recusar
                </button>
              </div>
            </div>

            <div className='dialogo-recusa'>
              {recusaDialogAberta && (
                <div className='recusa-dialog'>
                  <div className='caixa-de-dialogo-recusa'>
                    <label>Por favor, informe o motivo da recusa:</label>
                    <textarea
                      value={motivoRecusa}
                      onChange={handleMotivoRecusaChange}
                    />
                  </div>
                  <div className='caixa-de-dialogo-submit'>
                    <button onClick={enviarMotivoRecusa}>Enviar Motivo</button>
                    <button onClick={fecharRecusaDialog}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div> 
      </form>
      
      <Comentario comentario={comentario}/>
    </div>
  );
}

export default QualidadeSeguimentacao;