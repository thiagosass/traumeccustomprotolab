import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  './Header.css';
import notificationIcon from '../../assets/sino.svg';
import medicalCases from '../../assets/caseAdd2.svg';
import userPerfil from '../../assets/user2.svg';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
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

    const handleMenuChange = (event) => {
        const selectedRoute = event.target.value;
        if (selectedRoute) {
            navigate(selectedRoute); // Use navigate para navegar para a rota selecionada
        }
    };


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
            
            <div className='menu-paginas'>
                    {/* Menu suspenso */}
                    <select className='menu-select-paginas' onChange={handleMenuChange}>
                        <option value="">Navegação pelas páginas</option>
                        <option value="/home/orcamento">Orçamento</option>
                        <option value="/home/orcamentoaprov">Aprovação do Orçamento</option>
                        <option value="/home/seguimentacao">Seguimentação</option>
                        <option value="/home/qualidadeseguimentacao">Qualidade da Seguimentação</option>
                        <option value="/home/agendaplanejamento">Planejamento</option>
                        <option value="/home/desenvolvimento">Desenvolvimento</option>
                        <option value="/home/aprovacaocirurgiao">Aprovação Cirurgião</option>
                        <option value="/home/preparo">Preparo</option>
                        <option value="/home/desenhotecnico">Desenho Técnico</option>
                    </select>  
                </div>
            
            <div className='box-user-header'>            
                <div className="user-profile">
                    {/* Perfil do usuário no canto direito */}
                    <a href="http://localhost:3000/home"><img className='icone' src={userPerfil} alt="perfil" /></a>
                    <span>{userName}Usuário em testes</span>
                </div>                
            </div>            

        </header>
    );
}

export default Header;