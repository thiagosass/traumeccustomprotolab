import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Cases from '../Cases/Cases';
import './Home.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function HomePage() {
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar casos do banco de dados
    const fetchCasos = async () => {
      try {
        // Recupere o token do localStorage
        const token = localStorage.getItem('token');
        
        if (token) {
          // Decodifique o token para obter o tipo_usuario
          const decodedToken = jwt_decode(token);
          const tipoUsuario = decodedToken.userType;
          const idUsuario = decodedToken.userId
          
          let rota = 'https://traumec-customprotolab.com.br/cases/listadecasos';
          
          if (tipoUsuario === 1 || tipoUsuario === 2) {
            // Se o tipo_usuario for 1 ou 2, use a rota alternativa
            rota = `https://traumec-customprotolab.com.br/cases/listadecasos/${idUsuario}`;
          }

          const response = await axios.get(rota);
          setCasos(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar casos:', error);
      } finally {
        setLoading(false);
      }
    };

    // Chame a função de busca ao montar o componente
    fetchCasos();
  }, []);

  return (
    <div>
      <Header />
      <div className='listagem-casos-title'>
        <div className='lista-casos-box'>
          <h1>Lista de Casos</h1>
        </div>
      </div>
      <main>        
        <div>
          {casos.length === 0 ? (
            <div className='sem-casos-cadastrados-box'>
              <label className='sem-casos-cadastrados'>Nenhum caso foi cadastrado.</label>
              <p className='mensagem-sem-casos-cadastrados'>Para cadastrar um novo caso, clique no ícone "+" no canto superior esquerdo da tela.</p>
            </div>
          ) : (
            casos.map((caso, index) => (
              <Cases key={index} caso={caso} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default HomePage;