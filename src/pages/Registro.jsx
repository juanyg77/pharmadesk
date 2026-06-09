import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Registro.module.css';

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
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Crear cuenta</h1>
        <p>Completá tus datos para registrarte</p>

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
    </div>
  );
}

export default Registro;
