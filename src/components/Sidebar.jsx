import { useNavigate, NavLink } from 'react-router-dom';
import {
  IconLayoutDashboard,
  IconPackages,
  IconFileInvoice,
  IconCashRegister,
  IconChartBar,
  IconLogout,
  IconX,
} from '@tabler/icons-react';
import styles from './Sidebar.module.css';

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const nombreFarmacia = localStorage.getItem('nombreFarmacia');

  const cerrarSesion = () => {
    localStorage.setItem('logueado', 'false');
    navigate('/login');
  };

  return (
    <div className={`${styles.sidebar}${isOpen ? ` ${styles.open}` : ''}`}>
      <div className={styles.header}>
        <div>
          <h2>PharmaDesk</h2>
          <p>{nombreFarmacia}</p>
        </div>
        <button className={styles.btnCerrar} onClick={onClose} aria-label="Cerrar menú">
          <IconX size={18} />
        </button>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? styles.active : ''}
          onClick={onClose}
        >
          <IconLayoutDashboard size={18} stroke={1.5} />
          Inicio
        </NavLink>
        <NavLink
          to="/stock"
          className={({ isActive }) => isActive ? styles.active : ''}
          onClick={onClose}
        >
          <IconPackages size={18} stroke={1.5} />
          Stock
        </NavLink>
        <NavLink
          to="/ventas"
          className={({ isActive }) => isActive ? styles.active : ''}
          onClick={onClose}
        >
          <IconCashRegister size={18} stroke={1.5} />
          Ventas
        </NavLink>
        <NavLink
          to="/facturas"
          className={({ isActive }) => isActive ? styles.active : ''}
          onClick={onClose}
        >
          <IconFileInvoice size={18} stroke={1.5} />
          Facturas
        </NavLink>
        <NavLink
          to="/analisis"
          className={({ isActive }) => isActive ? styles.active : ''}
          onClick={onClose}
        >
          <IconChartBar size={18} stroke={1.5} />
          Análisis
        </NavLink>
      </nav>

      <div className={styles.footer}>
        <button onClick={cerrarSesion}>
          <IconLogout size={16} stroke={1.5} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
