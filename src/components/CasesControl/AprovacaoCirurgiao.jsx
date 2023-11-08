import React, { useState, useEffect, useRef } from 'react';
import HeaderB from '../Header/HeaderB';
import Timeline from '../Timeline/Timeline';
import Comentario from '../Comentario/Comentario';
import './AprovacaoCirurgiao.css';

function AprovacaoCirurgiao() {
  const [recusaDialogAberta, setRecusaDialogAberta] = useState(false);
  const [motivoRecusa, setMotivoRecusa] = useState('');
  const [comentario, setComentario] = useState('');

  const abrirRecusaDialog = () => {
    setRecusaDialogAberta(true);
  };

  const fecharRecusaDialog = () => {
    setRecusaDialogAberta(false);
  };

  const handleMotivoRecusaChange = (e) => {
    setMotivoRecusa(e.target.value);
  };

  const enviarMotivoRecusa = (e) => {
    // Obtém o valor de idcaso da localStorage do navegador
    const idcaso = localStorage.getItem('idcaso');

    if (idcaso) {
      // Crie um objeto com o conteúdo do motivo da recusa
      const motivoRecusaObj = {
        recusaRelatorioCaso: motivoRecusa, // Conteúdo da textarea
      };

      // Realize uma solicitação POST para a rota com o ID do caso
      fetch(`https://traumec-customprotolab.com.br/cases/recusarelatoriocaso/${idcaso}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(motivoRecusaObj),
      })
      .then((response) => response.json())
      .then((data) => {
        // Lógica para lidar com a resposta, se necessário
        console.log('Motivo de recusa do relatório enviado com sucesso:', data);
        // Após o envio bem-sucedido, você pode fechar a caixa de diálogo
        fecharRecusaDialog();
      })
      .catch((error) => {
        console.error('Erro ao enviar motivo de recusa do relatório:', error);
      });
    }
    fecharRecusaDialog();
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
    // Recupere o valor de idcaso da localStorage do navegador
    const idcaso = localStorage.getItem('idcaso');

    if (idcaso) {
      // Realize uma solicitação GET para obter o valor de 'comentario'
      fetch(`https://traumec-customprotolab.com.br/cases/recusarelatoriocaso/${idcaso}`)
      .then((response) => response.json())
      .then((data) => {
        // Atualize o estado 'comentario' com os dados obtidos
        setComentario(data.recusaRelatorioCaso);
      })
      .catch((error) => {
        console.error('Erro ao buscar o comentário:', error);
      });
    }
  }, []);

  return (
    <div className='centralizar-page'>
      <HeaderB />
      <Timeline />
      
        <form>
          <div className='bloco-aprov-cirurgiao'>
            <div className='box-button-seguimentacao'>
              <div className='relatorio-export'>
                <button className='botao-selecionar-relatorio' onClick={handleFileSelection}>Download relatório de caso</button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".zip"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
              </div>
              <div className='box-button-aprov-recuse-aprov-cirurgiao'>
                <button className='botao-orcamento-aprov'>Aprovar</button>
                <button type='button' className='botao-orcamento-seg-recuse' onClick={abrirRecusaDialog}>Recusar</button>
              </div>
              <div className='dialogo-recusa'>
                {recusaDialogAberta && (
                  <div className="recusa-dialog">
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

export default AprovacaoCirurgiao;