import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './components/Login/LoginPage'; 
import Cadastro from './components/Cadastro/Cadastro';
import Home from './components/Home/Home';
import CreateCase from './components/CreateCase/CreateCase';
import Orcamento from './components/CasesControl/Orcamento';
import OrcamentoAprov from './components/CasesControl/OrcamentoAprov';
import Seguimentacao from './components/CasesControl/Seguimentacao';
import QualidadeSeguimentacao from './components/CasesControl/QualidadeSeguimentacao';
import AgendaPlanejamento from './components/CasesControl/AgendaPlanejamento';
import Desenvolvimento from './components/CasesControl/Desenvolvimento';
import AprovacaoCirurgiao from './components/CasesControl/AprovacaoCirurgiao';
import Preparo from './components/CasesControl/Preparo';
import DesenhoTecnico from './components/CasesControl/DesenhoTecnico';
import './App.css';

function App() {
  
  return (
    <Router>
        <div className="App">

          <header className="App-header"></header>

          <div className="App-content">
            <Routes>
              <Route path="/" element={<LoginPage/>}/> 
              <Route path="/cadastro" element={<Cadastro/>}/> 
              <Route path="/home" element={<Home />}/> 
              <Route path="/createcase" element={<CreateCase/>}/>             
              <Route path="/home/orcamento" element={<Orcamento/>}/> 
              <Route path="/home/orcamentoaprov" element={<OrcamentoAprov/>}/>
              <Route path="/home/seguimentacao" element={<Seguimentacao/>}/>
              <Route path="/home/qualidadeseguimentacao" element={<QualidadeSeguimentacao/>}/>
              <Route path="/home/agendaplanejamento" element={<AgendaPlanejamento/>}/>
              <Route path="/home/desenvolvimento" element={<Desenvolvimento/>}/>
              <Route path="/home/aprovacaocirurgiao" element={<AprovacaoCirurgiao/>}/>
              <Route path="/home/preparo" element={<Preparo/>}/>
              <Route path="/home/desenhotecnico" element={<DesenhoTecnico/>}/>
              {/* ... adicionar rotas ... */}
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
