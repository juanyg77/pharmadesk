import { useNavigate, NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
  const navigate = useNavigate();
  const nombreFarmacia = localStorage.getItem('nombreFarmacia');

  const cerrarSesion = () => {
    localStorage.setItem('logueado', 'false');
    navigate('/login');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2>PharmaDesk</h2>
        <p>{nombreFarmacia}</p>
      </div>

      <nav className={styles.nav}>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ''}>Dashboard</NavLink>
        <NavLink to="/stock" className={({ isActive }) => isActive ? styles.active : ''}>Stock</NavLink>
        <NavLink to="/facturas" className={({ isActive }) => isActive ? styles.active : ''}>Facturas</NavLink>
        <NavLink to="/analisis" className={({ isActive }) => isActive ? styles.active : ''}>Análisis</NavLink>
      </nav>

      <div className={styles.footer}>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Sidebar;
