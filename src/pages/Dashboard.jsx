import { useState } from 'react';
import { IconCalendarX, IconCalendarTime, IconPackageOff } from '@tabler/icons-react';
import Layout from '../components/Layout';
import useVencimientos from '../hooks/useVencimientos';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [abierto, setAbierto] = useState({
    vencidos: false,
    porVencer: false,
    stockBajo: false,
  });

  const toggle = (seccion) => {
    setAbierto((prev) => ({ ...prev, [seccion]: !prev[seccion] }));
  };

  const { vencidos, porVencer, stockBajo } = useVencimientos();
  const nombreFarmacia = localStorage.getItem('nombreFarmacia');

  return (
    <Layout>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Dashboard</h1>
        <p className={styles.bienvenida}>Bienvenido, <strong>{nombreFarmacia}</strong></p>
      </div>

      {vencidos.length === 0 && porVencer.length === 0 && stockBajo.length === 0 && (
        <p className={styles.sinAlertas}>Todo en orden, no hay alertas.</p>
      )}

      <div className={styles.tarjetas}>
        <div className={`${styles.tarjeta} ${styles.rojo}`}>
          <h2 className={styles.tarjetaTitulo} onClick={() => toggle('vencidos')}>
            <IconCalendarX size={20} />
            Vencidos ({vencidos.length})
          </h2>
          {abierto.vencidos && vencidos.map((prod) => (
            <div key={prod.id} className={styles.item}>
              <p className={styles.nombre}>{prod.nombre}</p>
              <p className={styles.fecha}>Venció hace {Math.abs(prod.dias)} días</p>
            </div>
          ))}
        </div>

        <div className={`${styles.tarjeta} ${styles.amarillo}`}>
          <h2 className={styles.tarjetaTitulo} onClick={() => toggle('porVencer')}>
            <IconCalendarTime size={20} />
            Por vencer ({porVencer.length})
          </h2>
          {abierto.porVencer && porVencer.map((prod) => (
            <div key={prod.id} className={styles.item}>
              <p className={styles.nombre}>{prod.nombre}</p>
              <p className={styles.fecha}>Vence en {prod.dias} días</p>
            </div>
          ))}
        </div>

        <div className={`${styles.tarjeta} ${styles.naranja}`}>
          <h2 className={styles.tarjetaTitulo} onClick={() => toggle('stockBajo')}>
            <IconPackageOff size={20} />
            Stock bajo ({stockBajo.length})
          </h2>
          {abierto.stockBajo && stockBajo.map((prod) => (
            <div key={prod.id} className={styles.item}>
              <p className={styles.nombre}>{prod.nombre}</p>
              <p className={styles.fecha}>
                {prod.cantidad} unidades (mínimo {prod.stock_minimo})
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
