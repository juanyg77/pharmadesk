import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Registro.module.css';

function Registro() {
  const [nombreFarmacia, setNombreFarmacia] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const navigate = useNavigate();

  const [errorNombreFarmacia, setErrorNombreFarmacia] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorUsuario, setErrorUsuario] = useState('');
  const [errorContrasenia, setErrorContrasenia] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleRegistro = (e) => {
    e.preventDefault();

    setErrorNombreFarmacia('');
    setErrorEmail('');
    setErrorUsuario('');
    setErrorContrasenia('');

    let registroValido = true;

    if (!nombreFarmacia) {
      setErrorNombreFarmacia('El nombre de la farmacia es obligatorio');
      registroValido = false;
    } else if (nombreFarmacia.trim().length < 3) {
      setErrorNombreFarmacia('El nombre debe tener al menos 3 caracteres');
      registroValido = false;
    }

    if (!email) {
      setErrorEmail('El email es obligatorio');
      registroValido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorEmail('El email no es válido');
      registroValido = false;
    }

    if (!usuario) {
      setErrorUsuario('El usuario es obligatorio');
      registroValido = false;
    } else if (usuario.trim().length < 4) {
      setErrorUsuario('El usuario debe tener al menos 4 caracteres');
      registroValido = false;
    } else if (usuario.includes(' ')) {
      setErrorUsuario('El usuario no puede tener espacios');
      registroValido = false;
    }

    if (!contrasenia) {
      setErrorContrasenia('La contraseña es obligatoria');
      registroValido = false;
    } else if (contrasenia.length < 6) {
      setErrorContrasenia('La contraseña debe tener al menos 6 caracteres');
      registroValido = false;
    } else if (contrasenia.includes(' ')) {
      setErrorContrasenia('La contraseña no puede tener espacios');
      registroValido = false;
    }

    if (!registroValido) return;

    localStorage.setItem('usuario', usuario);
    localStorage.setItem('contrasenia', contrasenia);
    localStorage.setItem('email', email);
    localStorage.setItem('nombreFarmacia', nombreFarmacia);
    localStorage.setItem('logueado', 'true');

    setRegistroExitoso(true);
    setTimeout(() => navigate('/dashboard'), 2000);
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
          {errorNombreFarmacia && <p className={styles.errorCampo}>{errorNombreFarmacia}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && <p className={styles.errorCampo}>{errorEmail}</p>}
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
          <button type="submit">Registrarse</button>
        </form>

        {registroExitoso && (
          <div className={styles.exitoCard}>
            <span>✓</span>
            ¡Cuenta creada! Redirigiendo al dashboard...
          </div>
        )}

        <p>
          ¿Ya tenés cuenta? <span onClick={() => navigate('/login')}>Iniciá sesión</span>
        </p>
      </div>
    </div>
  );
}

export default Registro;
