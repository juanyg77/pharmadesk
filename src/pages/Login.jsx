import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarioGuardado = localStorage.getItem('usuario');

    if (!usuarioGuardado) {
      navigate('/registro');
      return;
    }
    if (usuarioGuardado === usuario && localStorage.getItem('contrasenia') === contrasenia) {
      localStorage.setItem('logueado', 'true');
      navigate('/dashboard');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
      <h1>PharmaDesk</h1>
      <p>Sistema de gestión de farmacia</p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>

      <p>
        ¿Primera vez? <span onClick={() => navigate('/registro')}>Crear cuenta</span>
      </p>
    </div>
  );
}

export default Login;
