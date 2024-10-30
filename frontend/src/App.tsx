import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserContainer from './components/UserContainer';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';

function App() {
  return (
    <section>
      <Header/>
      <AppRoutes /> {/* Renderiza as rotas definidas no AppRoutes */}
    </section>
  );
}

export default App;
