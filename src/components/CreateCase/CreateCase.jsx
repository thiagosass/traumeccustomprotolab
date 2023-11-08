import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './CreateCase.css';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function CreateCase() {
    const navigate = useNavigate();
    const [cirurgioes, setCirurgioes] = useState([]);
    const [distribuidores, setDistribuidores] = useState([]);
    const [tipoProduto, setTipoProduto] = useState([]);
    const [selectedCirurgiao, setSelectedCirurgiao] = useState(null);
    const [selectedDistribuidor, setSelectedDistribuidor] = useState(null);
    const [selectedTipoProduto, setSelectedTipoProduto] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formError, setFormError] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedIntraOralFile, setSelectedIntraOralFile] = useState(null);
    const [selectedClinicalImagesFile, setSelectedClinicalImagesFile] = useState(null);

    useEffect(() => {
        // Função para buscar os nomes de cirurgiões
        const fetchCirurgioes = async () => {
            try {
                const token = localStorage.getItem('token');
    
                if (token) {
                    const decodedToken = jwt_decode(token);
                    const userType = decodedToken.userType;
                    const userId = decodedToken.userId;

                    console.log('User Type:', userType); // Adicionando um log para userType
                    console.log('User ID:', userId);                    
                    console.log('Decoded Token:', decodedToken);
    
                    let cirurgioesRoute = 'https://traumec-customprotolab.com.br/select-options/cirurgioes';
    
                    if (userType === 1) {
                        cirurgioesRoute = `https://traumec-customprotolab.com.br/select-options/cirurgioes/${userId}`;
                    }

                    console.log('Requesting URL:', cirurgioesRoute);
    
                    const response = await axios.get(cirurgioesRoute);
                    setCirurgioes(response.data);
                } else {
                    console.error('Token não encontrado no localStorage.');
                }
            } catch (error) {
                console.error('Erro ao buscar nomes de cirurgiões', error);
            }
        };
    
        // Função para buscar os nomes de distribuidores
        const fetchDistribuidores = async () => {
            try {
                const token = localStorage.getItem('token');
    
                if (token) {
                    const decodedToken = jwt_decode(token);
                    const userType = decodedToken.userType;
                    const userId = decodedToken.userId;
    
                    let distribuidoresRoute = 'https://traumec-customprotolab.com.br/select-options/distribuidores';
    
                    if (userType === 2) {
                        distribuidoresRoute = `https://traumec-customprotolab.com.br/select-options/distribuidores/${userId}`;
                    }
    
                    const response = await axios.get(distribuidoresRoute);
                    setDistribuidores(response.data);
                } else {
                    console.error('Token não encontrado no localStorage.');
                }
            } catch (error) {
                console.error('Erro ao buscar nomes de distribuidores', error);
            }
        };
    
        // Função para buscar os tipos de produtos
        const fetchTipoProduto = async () => {
            try {
                const response = await axios.get('https://traumec-customprotolab.com.br/select-options/tipodeproduto');
                setTipoProduto(response.data);
            } catch (error) {
                console.error('Erro ao buscar nomes de distribuidores', error);
            }
        };
    
        // Chame as funções de busca ao montar o componente
          fetchCirurgioes();
        fetchDistribuidores();
        fetchTipoProduto();
    }, []);

    // Função para lidar com a seleção de cirurgião no select
    const handleCirurgiaoChange = (event) => {
        const selectedIndex = event.target.value;
        setSelectedCirurgiao(cirurgioes[selectedIndex]);
    };

    // Função para lidar com a seleção de distribuidor no select
    const handleDistribuidorChange = (event) => {
        const selectedIndex = event.target.value;
        setSelectedDistribuidor(distribuidores[selectedIndex]);
    };

    // Função para lidar com a seleção de distribuidor no select
    const handleTipoProdutoChange = (event) => {
        const selectedIndex = event.target.value;
        setSelectedTipoProduto(tipoProduto[selectedIndex]);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('Selected DICOM File:', file);
        setSelectedFile(file);
    };

    const handleIntraOralFileChange = (event) => {
        const file = event.target.files[0];
        console.log('Selected intra-oral File:', file);
        setSelectedIntraOralFile(file);
    };
    
    const handleClinicalImagesFileChange = (event) => {
        const file = event.target.files[0];
        console.log('Selected imagens clínicas File:', file);
        setSelectedClinicalImagesFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Verifique se os campos obrigatórios foram preenchidos
        if (
            selectedCirurgiao &&
            selectedDistribuidor &&
            selectedTipoProduto &&
            document.querySelector('input[name="nomePaciente"]').value
        ) {
            try {
                // Verifique se o token está presente no localStorage
                const token = localStorage.getItem('token');
    
                if (token) {
                    // Decodifique o token para obter o ID do usuário
                    const decodedToken = jwt_decode(token);
                    const userId = decodedToken.userId;
    
                    // Crie um novo FormData para o arquivo .zip
                    const formData = new FormData();
                    formData.append('zipFile', selectedFile); // Arquivo DICOM
    
                    // Adicione os arquivos ZIP adicionais, se forem fornecidos
                    if (selectedIntraOralFile) {
                        formData.append('intraOralZipFile', selectedIntraOralFile);
                    }
    
                    if (selectedClinicalImagesFile) {
                        formData.append('clinicalImagesZipFile', selectedClinicalImagesFile);
                    }
    
                    // Dados a serem enviados como JSON
                    const jsonData = {
                        nomePaciente: document.querySelector('input[name="nomePaciente"]').value,
                        tipoProduto: selectedTipoProduto.tipoProduto,
                        nomeCirurgiao: selectedCirurgiao.nome,
                        empresaRepresentante: selectedDistribuidor.nome_empresa,
                        status: 'Aguardando Orçamento',
                        userId: userId, // Adicione o ID do usuário ao objeto jsonData
                    };
    
                    // Combine os dados do JSON com o FormData
                    for (const [key, value] of Object.entries(jsonData)) {
                        formData.append(key, value);
                    }
    
                    // Realize a solicitação POST para o endpoint da API do servidor
                    const response = await axios.post('https://traumec-customprotolab.com.br/select-options/inserircaso', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data', // Define o tipo de conteúdo como FormData
                        },
                    });
    
                    if (response.status === 200) {
                        console.log('Dados inseridos com sucesso.');
                        // Exiba a mensagem de sucesso
                        setShowSuccessMessage(true);
    
                        // Após 3 segundos, redirecione para a página home
                        setTimeout(() => {
                            navigate('/home');
                        }, 3000);
                    } else {
                        console.error('Erro ao inserir dados.');
                    }
                } else {
                    console.error('Token não encontrado no localStorage.');
                }
            } catch (error) {
                console.error('Erro ao enviar a solicitação:', error);
            }
        } else {
            console.error('Por favor, preencha todos os campos obrigatórios.');
            setFormError('Por favor, preencha todos os campos obrigatórios.');
        }
    };

        return (
            <div className='corpo'>
                <Header />
                <div className='case-request-title'>
                    <h1>Solicitação de Produto Personalizado</h1>
                </div>
                <main>                    
                    <form className='form-caso' onSubmit={handleSubmit}>
                        <div className='case-request'>
                            <div className='left-side'>
                                <div className='registro-caso-sub'>
                                    <h1>Registro de caso</h1>
                                </div>
                                <div className='container-align'>
                                    <div className='bloco-dados-solicitante' name="surgeon">
                                        <div className='select-data'>
                                            <select onChange={handleCirurgiaoChange}>
                                                <option value={null}>Selecione um cirurgião:</option>
                                                {cirurgioes.map((cirurgiao, index) => (
                                                    <option key={index} value={index}>
                                                        {cirurgiao.nome}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {selectedCirurgiao && (
                                            <div className='dados-solicitante'>
                                                <label>Nome do cirurgião:</label>
                                                <span>{selectedCirurgiao.nome}</span> 
                                            </div>
                                        )}
                                        {selectedCirurgiao && (
                                            <div className='dados-solicitante'>
                                                <label>Telefone:</label>
                                                <span>{selectedCirurgiao.telefone}</span>
                                            </div>
                                        )}
                                        {selectedCirurgiao && (
                                            <div className='dados-solicitante'>
                                                <label>Número CRO/CRM:</label>
                                                <span>{selectedCirurgiao.cro_crm}</span> 
                                            </div>
                                        )}
                                        {selectedCirurgiao && (
                                            <div className='dados-solicitante'>
                                                <label>E-mail:</label>
                                                <span>{selectedCirurgiao.email}</span> 
                                            </div>
                                        )}
                                    </div>
                                    <div className='bloco-dados-solicitante' name="distributor"> 
                                        <div className='select-data'>                                            
                                            <select onChange={handleDistribuidorChange}>
                                                <option value={null}>Selecione um distribuidor:</option>
                                                {distribuidores.map((distribuidor, index) => (
                                                    <option key={index} value={index}>
                                                        {distribuidor.nome_empresa}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {selectedDistribuidor && (
                                            <div className='dados-solicitante'>
                                                <label>Nome Representante:</label>
                                                <span>{selectedDistribuidor.nome}</span> 
                                            </div>
                                        )}
                                        {selectedDistribuidor && (
                                            <div className='dados-solicitante'>
                                                <label>Email do Representante:</label>
                                                <span>{selectedDistribuidor.email}</span> 
                                            </div>
                                        )}
                                        {selectedDistribuidor && (
                                            <div className='dados-solicitante'>
                                                <label>Telefone:</label>
                                                <span>{selectedDistribuidor.telefone}</span> 
                                            </div>
                                        )}
                                        {selectedDistribuidor && (
                                            <div className='dados-solicitante'>
                                                <label>Nome da Empresa:</label>
                                                <span>{selectedDistribuidor.nome_empresa}</span> 
                                            </div>
                                        )}
                                        {selectedDistribuidor && (
                                            <div className='dados-solicitante'>
                                                <label>Endereço da Empresa:</label>
                                                <span>{selectedDistribuidor.endereco_empresa}</span> 
                                            </div>
                                        )}
                                    </div>
                                    <div className='select-data'>                                        
                                        <select onChange={handleTipoProdutoChange}>
                                            <option value={null}>Selecione o tipo de produto:</option>
                                            {tipoProduto.map((tipoProduto, index) => (
                                                <option key={index} value={index}>
                                                    {tipoProduto.tipoProduto}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {selectedTipoProduto && (
                                        <div className='dados-solicitante'>
                                            <label>Tipo de produto:</label>
                                            <span>{selectedTipoProduto.tipoProduto}</span> 
                                        </div>
                                    )}

                                    <div className='containner'>                                                                           
                                        <div className='cadastro'>
                                            <div className='tag'>
                                                <label>Nome completo do paciente:</label>                                            
                                            </div>
                                            <input className='cadastro-input2' type="text" name="nomePaciente"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='right-side'>
                                <h1>Carregar Arquivos</h1>   
                                <div className='containner-upload-arquivos'>                                    
                                    <label>Upload arquivo DICOM .zip (obrigatório):</label>                                    
                                    <input
                                        className='upload-arquivos'
                                        type="file"
                                        name="zipFile"
                                        accept=".zip"
                                        required
                                        onChange={handleFileChange}
                                    />
                                </div>    
                                <div className='containner-upload-arquivos'> 
                                    <label>Upload arquivo escaneamento intra-oral .zip (opcional):</label>
                                    <input
                                        className="upload-arquivos"
                                        type="file"
                                        name="intraOralZipFile"
                                        accept=".zip"
                                        onChange={handleIntraOralFileChange}
                                    />
                                </div>     
                                <div className='containner-upload-arquivos'> 
                                    <label>Upload arquivo imagens clínicas .zip (opcional):</label>
                                    <input
                                        className="upload-arquivos"
                                        type="file"
                                        name="clinicalImagesZipFile"
                                        accept=".zip"
                                        onChange={handleClinicalImagesFileChange}
                                    />
                                </div>                  
                            </div>
                        </div>
                        {showSuccessMessage && (
                            <div className="success-message">
                                <span>Caso criado com sucesso! Redirecionando para página Home...</span>
                            </div>
                        )}   
                        {formError && (
                            <div className="error-message">
                                {formError}
                            </div>
                        )}                         
                        <div className='buttons-orcamento'>                            
                            <button className='solicitar'type="submit">Solicitar Orçamento</button>
                            <button className='cancelar'>Cancelar Solicitação</button>
                        </div>                        
                    </form>
                </main>
            </div>
        );
}
    
export default CreateCase;