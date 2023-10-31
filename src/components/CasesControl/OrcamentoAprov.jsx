import React, { useState, useEffect } from 'react';
import HeaderB from '../Header/HeaderB';
import Timeline from '../Timeline/Timeline';
import Comentario from '../Comentario/Comentario';
import './OrcamentoAprov.css';

function OrcamentoAprov() {
  const [recusaDialogAberta, setRecusaDialogAberta] = useState(false);
  const [motivoRecusa, setMotivoRecusa] = useState('');
  const [motivoCancelamento, setMotivoCancelamento] = useState('');
  const [comentario, setComentario] = useState('');
  const [acao, setAcao] = useState(null);

  const abrirRecusaDialog = () => {
    setRecusaDialogAberta(true);
    setAcao('recusa');
  };

  const abrirCancelamentoDialog = () => {
    setRecusaDialogAberta(true); // Abra o diálogo de recusa (mesmo diálogo)
    setAcao('cancelamento');
    setMotivoRecusa(''); // Limpe o motivo de recusa
    setMotivoCancelamento(''); // Limpe o motivo de cancelamento
  };

  const fecharRecusaDialog = () => {
    setRecusaDialogAberta(false);
  };

  const handleMotivoRecusaChange = (e) => {
    setMotivoRecusa(e.target.value);
  };

  const handleMotivoCancelamentoChange = (e) => {
    setMotivoCancelamento(e.target.value);
  };

  const enviarMotivoRecusa = () => {
    // Lógica para enviar o motivo de recusa
    if (acao === 'recusa') {
      const motivoRecusaObj = {
        recusaOrcamento: motivoRecusa,
      };
      
      // Recupere o valor de idcaso da storage do navegador
      const idcaso = localStorage.getItem('idcaso');

      // Realize a requisição POST para a rota com o ID do caso
      if (idcaso) {
          // Realize uma requisição POST para a rota com o ID do caso
          fetch(`http://localhost:3003/cases/recusaorcamento/${idcaso}`, {
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
    }

    // Fechar o diálogo
    fecharRecusaDialog();
  };

  const enviarMotivoCancelamento = () => {
    // Lógica para enviar o motivo de cancelamento
    
    if (acao === 'cancelamento') { // Certifique-se de verificar a ação correta
      const motivoCancelamentoObj = {
        casoCancelado: motivoCancelamento, // Use o motivo de cancelamento
      };
  
      // Recupere o valor de idcaso da storage do navegador
      const idcaso = localStorage.getItem('idcaso');
  
      if (idcaso) {
        // Realize uma requisição POST para a rota com o ID do caso
        fetch(`http://localhost:3003/cases/casocancelado/${idcaso}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(motivoCancelamentoObj),
        })
          .then((response) => response.json())
          .then((data) => {
            // Lógica para lidar com a resposta, se necessário
            console.log('Motivo de cancelamento enviado com sucesso:', data);
            // Após o envio bem-sucedido, você pode fechar a caixa de diálogo
            fecharRecusaDialog();
          })
          .catch((error) => {
            console.error('Erro ao enviar motivo de cancelamento:', error);
          });
      }
  
      // Fechar o diálogo
      fecharRecusaDialog();
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
          setComentario(data.recusaOrcamento);
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
        <div className='bloco-form-aprov'>

          <div className='tabela-aprov'>
            
            <div className='coluna-codigo-aprov'>
              <label>Código</label>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
            </div>

            <div className='coluna-descricao-aprov'>
              <label>Descrição</label>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
            </div>

            <div className='coluna-valor-aprov'>
              <label>Valor</label>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
            </div>
            
          </div> 

          <div className='box-button-aprov'>

            <div className='valor-orcamento'>
              <label>Valor Total:</label>
              <span> 0.000.000,00 R$</span>
            </div>

            <button className='botao-orcamento-aprovar' onClick={enviarMotivoRecusa}>
                Aprovar
            </button>

            <div className='box-button-aprov-recuse'>              
              <button type='button' className='botao-orcamento-aprov-recuse' onClick={abrirRecusaDialog}>
                Recusar
              </button>
              <button type='button' className='botao-orcamento-aprov-cancel' onClick={abrirCancelamentoDialog}>
                Cancelar
              </button>
            </div>

            <div className='dialogo-recusa'>

              {recusaDialogAberta && (
                <div className='recusa-dialog'>

                  <div className='caixa-de-dialogo-recusa'>
                    <label>Por favor, informe o motivo:</label>
                    <textarea
                      value={acao === 'recusa' ? motivoRecusa : motivoCancelamento}
                      onChange={acao === 'recusa' ? handleMotivoRecusaChange : handleMotivoCancelamentoChange}
                    />
                  </div>

                  <div className='caixa-de-dialogo-submit'>
                    {acao === 'recusa' ? (
                      <>
                        <button onClick={enviarMotivoRecusa}>Enviar Motivo de Recusa</button>
                        <button onClick={fecharRecusaDialog}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={enviarMotivoCancelamento}>Enviar Motivo de Cancelamento</button>
                        <button onClick={fecharRecusaDialog}>Cancelar</button>
                      </>
                    )}
                  </div>

                </div>
              )}
            
            </div>
          
          </div>
        
        </div>
      </form>      
      <Comentario comentario={comentario} />
    </div>
  );
}

export default OrcamentoAprov;