import React, { useState } from 'react';
import './LoginPage.css';
import PasswordIcon from '../../assets/password.svg';
import EmailIcon from '../../assets/user2.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loginInvalido, setLoginInvalido] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário de recarregar a página

    try {
        // Faça a solicitação POST para a rota de login no backend
        const response = await axios.post('https://traumec-customprotolab.com.br/users/login', {
          nomeUsuario,
          senha,
        });

        // Se a solicitação for bem-sucedida, você pode redirecionar para a página de home ou fazer qualquer outra ação necessária
        if (response.status === 200 && response.data.token) {

          // O token está em response.data.token
          const token = response.data.token;

          // Agora você pode armazenar o token no localStorage ou em algum outro meio de armazenamento no lado do cliente, como mencionado anteriormente.
          localStorage.setItem('token', token);
            // Redirecione para a página de home (ou qualquer outra ação que desejar)
          navigate('/home')
        }
    } catch (error) {
      if (error.response.status === 401) {
        // Credenciais inválidas, exiba uma mensagem de erro para o usuário
        setLoginInvalido(true);
        console.error("Login inválido");
      } else {
          // Se houver um erro na solicitação (por exemplo, credenciais inválidas), você pode exibir uma mensagem de erro para o usuário
          console.error(error);
      }
    }
  };

  const handleAccessWithoutLogin = () => {
    // Redirecionar para a página home sem autenticação
    navigate('/home');
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
          <form className='log-form' onSubmit={handleLogin}>
            <h2>Entre com seu nome de usuário e senha:</h2>
            {loginInvalido && (
              <div className="log-error">
                <p>Login inválido! Verifique suas credenciais.</p>
              </div>
            )}

            <div className="input-with-icon">
              <img src={EmailIcon} alt="Email Icon" className="icon"/>
              <input className="login-input" type="text" placeholder="nome de usuário" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)}/>
            </div>

            <div className="input-with-icon">
              <img src={PasswordIcon} alt="Password Icon" className="icon"/>
              <input className="login-input" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
            </div>

            {/* Novo link para acesso sem login */}
            <button className="login-button" onClick={handleAccessWithoutLogin}>
              Acesso provisório sem login
            </button>

            <button className="login-button" type="submit">Entrar</button>
            <p className="login-link">Não tem uma conta? <a href="/cadastro" className="cadastre-se-button">Cadastre-se</a></p>
            <p className="login-link">Esqueceu a senha? <a href="/recuperar-senha" className="recuperar-senha-button">Recuperar senha</a></p>
          </form>
        </div>

      </div>

    </div>
  );
};

export default LoginPage;

