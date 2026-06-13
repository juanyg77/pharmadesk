import { useState } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

function Layout({ children }) {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={sidebarAbierto} onClose={() => setSidebarAbierto(false)} />
      {sidebarAbierto && (
        <div className={styles.overlay} onClick={() => setSidebarAbierto(false)} />
      )}
      <main className={styles.contenido}>
        <button
          className={styles.menuHamburguesa}
          onClick={() => setSidebarAbierto(true)}
          aria-label="Abrir menú"
        >
          <IconMenu2 size={20} />
        </button>
        {children}
      </main>
    </div>
  );
}

export default Layout;
