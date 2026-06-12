import { useNavigate, NavLink } from 'react-router-dom';
import {
  IconLayoutDashboard,
  IconPackages,
  IconFileInvoice,
  IconCashRegister,
  IconChartBar,
  IconLogout,
} from '@tabler/icons-react';
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
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ''}>
          <IconLayoutDashboard size={18} stroke={1.5} />
          Dashboard
        </NavLink>
        <NavLink to="/stock" className={({ isActive }) => isActive ? styles.active : ''}>
          <IconPackages size={18} stroke={1.5} />
          Stock
        </NavLink>
        <NavLink to="/ventas" className={({ isActive }) => isActive ? styles.active : ''}>
          <IconCashRegister size={18} stroke={1.5} />
          Ventas
        </NavLink>
        <NavLink to="/facturas" className={({ isActive }) => isActive ? styles.active : ''}>
          <IconFileInvoice size={18} stroke={1.5} />
          Facturas
        </NavLink>
        <NavLink to="/analisis" className={({ isActive }) => isActive ? styles.active : ''}>
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
