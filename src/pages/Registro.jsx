import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [nombreFarmacia, setNombreFarmacia] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('contrasenia', contrasenia);
    localStorage.setItem('email', email);
    localStorage.setItem('nombreFarmacia', nombreFarmacia);
    localStorage.setItem('logueado', 'true');
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>PharmaDesk</h1>
      <p>Sistema de gestión de farmacia</p>

      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre de la farmacia"
          value={nombreFarmacia}
          onChange={(e) => setNombreFarmacia(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <button type="submit">Registrarse</button>
      </form>

      <p>
        ¿Ya tenés cuenta? <span onClick={() => navigate('/login')}>Iniciá sesión</span>
      </p>
    </div>
  );
}

export default Registro;
