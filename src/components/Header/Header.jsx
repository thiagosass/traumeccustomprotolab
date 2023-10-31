import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  './Header.css';
import notificationIcon from '../../assets/sino.svg';
import medicalCases from '../../assets/caseAdd2.svg';
import userPerfil from '../../assets/user2.svg';
import jwt_decode from 'jwt-decode';

function Header() {

    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Recupere o token do localStorage
        const token = localStorage.getItem('token');

        // Decodifique o token para obter as informações do usuário
        if (token) {
        const decodedToken = jwt_decode(token); // Certifique-se de importar jwt_decode

        // Defina o nome do usuário com base nas informações do token
        setUserName(decodedToken.userName);
        }
    }, []); // Este efeito é executado uma vez após a montagem do componente


    return (
        <header className="headerA">  
            <div className='box-icons'>
                <div className="icons">
                    {/* Ícones no canto esquerdo */}
                    <Link to="/algum-link"><img className='icone' src={notificationIcon} alt="Ícone 1" /></Link>
                    <Link to="/createcase"><img className='icone' src={medicalCases} alt="Ícone 2" /></Link>
                    {/* Adicione mais ícones conforme necessário */}
                </div>
            </div>

            <div className='logo_empresa'>
                <div className='filter-logo'>
                    <img className="logo" src="/logo_traumec.png" alt="Logo da Empresa" />
                </div>
            </div>
            <div className='box-user-header'>
                <div className="user-profile">
                    {/* Perfil do usuário no canto direito */}
                    <a href="http://localhost:3000/home"><img className='icone' src={userPerfil} alt="perfil" /></a>
                    <span>{userName}</span>
                </div>
            </div>

        </header>
    );
}

export default Header;