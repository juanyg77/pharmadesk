import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const navigate = useNavigate();
  const [errorUsuario, setErrorUsuario] = useState('');
  const [errorContrasenia, setErrorContrasenia] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    setErrorUsuario('');
    setErrorContrasenia('');
    setErrorGeneral('');

    let loginValido = true;


    if (!usuario) {
      setErrorUsuario('El usuario es obligatorio');
      loginValido = false;
    }
    if (!contrasenia) {
      setErrorContrasenia('La contraseña es obligatoria');
      loginValido = false;
    }

    if (!loginValido) {
      return;
    }
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado === usuario && localStorage.getItem('contrasenia') === contrasenia) {
      localStorage.setItem('logueado', 'true');
      navigate('/dashboard');
    } else {
      setErrorGeneral('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>PharmaDesk</h1>
        <p>Sistema de gestión de farmacia</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          {errorUsuario && <p className={styles.errorCampo}>{errorUsuario}</p>}
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          {errorContrasenia && <p className={styles.errorCampo}>{errorContrasenia}</p>}
          <button type="submit">Ingresar</button>
        </form>

        {errorGeneral && (
          <div className={styles.errorGeneral}>
            <span></span>
            {errorGeneral}
          </div>
        )}

        <p>
          ¿Primera vez? <span onClick={() => navigate('/registro')}>Crear cuenta</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
