import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Stock from './pages/Stock'
import Facturas from './pages/Facturas'
import Analisis from './pages/Analisis'
import Login from './pages/Login'
import Registro from './pages/Registro'

function RutaProtegida({ children }) {
  const logueado = localStorage.getItem('logueado') === 'true';
  return logueado ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
        <Route path="/stock" element={<RutaProtegida><Stock /></RutaProtegida>} />
        <Route path="/facturas" element={<RutaProtegida><Facturas /></RutaProtegida>} />
        <Route path="/analisis" element={<RutaProtegida><Analisis /></RutaProtegida>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App