import React, { useState } from 'react';
import './Cadastro.css';
import { cirurgiaoSchema, distribuidorSchema } from './Validacao.jsx'
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('cirurgiao');
    const [formData, setFormData] = useState({}); // State para armazenar os dados do formulário.
    const [errors, setErrors] = useState({});
    const [cadastroSucesso, setCadastroSucesso] = useState(false);

    const validateForm = async () => {
        let schema;
        if (userType === 'cirurgiao') {
          schema = cirurgiaoSchema;
        } else if (userType === 'distribuidor') {
          schema = distribuidorSchema;
        }
      
        try {
          // Valida os dados do formulário
          await schema.validate(formData, {
            abortEarly: false, // Isso permite que você colete todos os erros de uma vez
          });
      
          // Limpa quaisquer erros anteriores
          setErrors({});
          return true; // Retorna true se não houver erros de validação
        } catch (error) {
          // Obtém todos os erros do Yup
          const yupErrors = {};
          error.inner.forEach((e) => {
            yupErrors[e.path] = e.message;
          });
      
          // Define os erros no estado de erros
          setErrors(yupErrors);
          return false; // Retorna false se houver erros de validação
        }
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleChange = (e) => {
        console.log(`Campo ${e.target.name} alterado. Novo valor: ${e.target.value}`);
        // Atualiza o state do formulário quando um campo é alterado.
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Valida o formulário
        const isValid = await validateForm();

        if (isValid) {
        try {
        // Envie os dados para o servidor
        const response = await fetch(`http://localhost:3003/users/cadastro${userType}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log(`Cadastro de ${userType} realizado com sucesso!`);
            setCadastroSucesso(true);
            // Inicia um temporizador para redirecionar após alguns segundos (por exemplo, 3 segundos)
            setTimeout(() => {
            // Redireciona o usuário para a página de login
            navigate('/');
            }, 3000); // 3000 milissegundos = 3 segundos
        } else {
            console.error('Erro durante o cadastro.');
            // Exibe uma mensagem de erro para o usuário, se necessário.
        }
        } catch (error) {
        console.error('Erro:', error);
        }
    } else {
        console.error('Formulário inválido');
    }

    console.log('handleSubmit foi finalizado!');
    };

    return (
        <div className="login-page">
          <div className="background-image">
            <div className='filter'>
              <img src="/logo_traumec.png" alt="Logo da Empresa" className='logo'/>
            </div>
          </div>

          <div className='campo-direito'>
            <h1 className='plataform-name'>Controle de Produtos Customizados</h1>

            <div className="login-form">

                <form className='log-form' onSubmit={handleSubmit}>
                    <h2>Selecione seu cadastro como cirurgião ou distribuidor:</h2>
                    {cadastroSucesso && (
                        <div className="mensagem-sucesso">
                            <p>Cadastrado realizado com sucesso!</p>
                            <p>Redirecionando para Login...</p>
                        </div>
                    )}

                    <div className='usertype'>

                        <div>
                        <label>
                            <input
                            type="radio"
                            value="cirurgiao"
                            checked={userType === 'cirurgiao'}
                            onChange={handleUserTypeChange}
                            />
                            Cirurgião
                        </label>
                        </div>

                        <div>
                        <label>
                            <input
                            type="radio"
                            value="distribuidor"
                            checked={userType === 'distribuidor'}
                            onChange={handleUserTypeChange}
                            />
                            Distribuidor
                        </label>
                        </div>

                    </div>

                    {/* Formulário para Cirurgião */}
                    {userType === 'cirurgiao' && (

                    <div id="formCirurgiao" name="formCirurgiao">

                        <div className='bloco-cadastro-align'>
                            <div className='bloco-cadastro'>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Nome:</label> 
                                        {errors.nomeSurgeon && <div className='error-message'>{errors.nomeSurgeon}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="nomeSurgeon" onChange={handleChange}/>                                   
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Telefone:</label> 
                                        {errors.telSurgeon && <div className='error-message'>{errors.telSurgeon}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="telSurgeon" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Número do conselho CRO/CRM:</label> 
                                        {errors.numCRO && <div className='error-message'>{errors.numCRO}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="numCRO" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>CPF:</label> 
                                        {errors.cpf && <div className='error-message'>{errors.cpf}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="cpf" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Nome de Usuário:</label>
                                        {errors.nomeUsuario && <div className='error-message'>{errors.nomeUsuario}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="nomeUsuario" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='bloco-cadastro'>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>E-mail:</label> 
                                        {errors.emailSurgeon && <div className='error-message'>{errors.emailSurgeon}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="emailSurgeon" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Confirmação do e-mail:</label> 
                                        {errors.emailConfirm && <div className='error-message'>{errors.emailConfirm}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="emailConfirm" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Senha:</label> 
                                        {errors.senhaSurgeon && <div className='error-message'>{errors.senhaSurgeon}</div>}
                                    </div>
                                    <input className='cadastro-input' type="password" name="senhaSurgeon" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Confirmação de senha:</label> 
                                        {errors.senhaConfirm && <div className='error-message'>{errors.senhaConfirm}</div>}
                                    </div>
                                    <input className='cadastro-input' type="password" name="senhaConfirm" onChange={handleChange}/>
                                </div>
                            </div>
                        </div>

                    </div>

                    )}

                    {/* Formulário para Distribuidor */}
                    {userType === 'distribuidor' && (

                    <div id="formDistribuidor" name="formDistribuidor">
                        <div className='bloco-cadastro-align'>
                            <div className='bloco-cadastro'>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Nome do Representante:</label> 
                                        {errors.nomeRepresentante && <div className='error-message'>{errors.nomeRepresentante}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="nomeRepresentante" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Telefone:</label> 
                                        {errors.telRepresentante && <div className='error-message'>{errors.telRepresentante}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="telRepresentante" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Nome da empresa:</label> 
                                        {errors.nomeEmpresa && <div className='error-message'>{errors.nomeEmpresa}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="nomeEmpresa" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Endereço da Empresa:</label> 
                                        {errors.enderecoEmpresa && <div className='error-message'>{errors.enderecoEmpresa}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="enderecoEmpresa" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Nome de Usuário:</label>
                                        {errors.nomeUsuario && <div className='error-message'>{errors.nomeUsuario}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="nomeUsuario" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='bloco-cadastro'>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>E-mail do Representante:</label> 
                                        {errors.emailRepresentante && <div className='error-message'>{errors.emailRepresentante}</div>}
                                    </div>
                                    <input className='cadastro-input' type="text" name="emailRepresentante" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'><label>Confirmação do email:</label> {errors.emailRepresentanteConfirm && <div className='error-message'>{errors.emailRepresentanteConfirm}</div>}</div>
                                    <input className='cadastro-input' type="text" name="emailRepresentanteConfirm" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Senha:</label> 
                                        {errors.senhaRepresentante && <div className='error-message'>{errors.senhaRepresentante}</div>}
                                    </div>
                                    <input className='cadastro-input' type="password" name="senhaRepresentante" onChange={handleChange}/>
                                </div>
                                <div className='cadastro'>
                                    <div className='tag'>
                                        <label>Confirmação de senha:</label> 
                                        {errors.senhaRepresentanteConfirm && <div className='error-message'>{errors.senhaRepresentanteConfirm}</div>}
                                    </div>
                                    <input className='cadastro-input' type="password" name="senhaRepresentanteConfirm" onChange={handleChange}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    )}
                    <div className='aling-button'>
                        <button className="login-button" type="submit">
                            {userType === 'cirurgiao' ? 'Cadastrar Cirurgião' : 'Cadastrar Distribuidor'}
                        </button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      );
    };

export default Cadastro;
