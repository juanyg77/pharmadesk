import { useState } from 'react';
import { IconCalendarX, IconCalendarTime, IconPackageOff, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import Layout from '../components/Layout';
import useVencimientos from '../hooks/useVencimientos';
import useVentasStore from '../store/ventasStore';
import useFacturasStore from '../store/facturasStore';
import useStockStore from '../store/stockStore';
import styles from './Dashboard.module.css';

const formatARS = (val) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(val);

const esDelMesActual = (fecha) => {
  const hoy = new Date();
  const f = new Date(fecha);
  return f.getMonth() === hoy.getMonth() && f.getFullYear() === hoy.getFullYear();
};

function Dashboard() {
  const [abierto, setAbierto] = useState({
    vencidos: false,
    porVencer: false,
    stockBajo: false,
  });

  const toggle = (seccion) =>
    setAbierto((prev) => ({ ...prev, [seccion]: !prev[seccion] }));

  const { vencidos, porVencer, stockBajo } = useVencimientos();
  const nombreFarmacia = localStorage.getItem('nombreFarmacia');

  const ventas = useVentasStore((state) => state.ventas);
  const facturas = useFacturasStore((state) => state.facturas);
  const productos = useStockStore((state) => state.productos);

  const ventasMes = ventas
    .filter((v) => esDelMesActual(v.fecha))
    .reduce((acc, v) => acc + v.monto, 0);

  const gastosMes = facturas
    .filter((f) => esDelMesActual(f.fecha))
    .reduce((acc, f) => acc + f.monto, 0);

  const gananciaMes = ventasMes - gastosMes;
  const unidadesStock = productos.reduce((acc, p) => acc + p.cantidad, 0);
  const mesActual = new Date().toLocaleString('es-AR', { month: 'long', year: 'numeric' });

  return (
    <Layout>
      <div className={styles.page}>

        <div className={styles.header}>
          <div>
            <h1 className={styles.titulo}>Inicio</h1>
            <p className={styles.bienvenida}>
              Bienvenido, <strong>{nombreFarmacia}</strong>
            </p>
          </div>
          <span className={styles.fechaHoy}>
            {new Date().toLocaleDateString('es-AR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </span>
        </div>

        <h2 className={styles.seccionTitulo}>Alertas operativas</h2>

        {vencidos.length === 0 && porVencer.length === 0 && stockBajo.length === 0 && (
          <p className={styles.sinAlertas}>Todo en orden, no hay alertas.</p>
        )}

        <div className={styles.tarjetas}>
          <div className={`${styles.tarjeta} ${styles.rojo}`}>
            <h3 className={styles.tarjetaTitulo} onClick={() => toggle('vencidos')}>
              <span className={styles.tarjetaLeft}>
                <IconCalendarX size={18} />
                Vencidos
              </span>
              <span className={styles.tarjetaRight}>
                <span className={styles.badge}>{vencidos.length}</span>
                {abierto.vencidos ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}
              </span>
            </h3>
            {abierto.vencidos && vencidos.map((prod) => (
              <div key={prod.id} className={styles.item}>
                <p className={styles.itemNombre}>{prod.nombre}</p>
                <p className={styles.itemDetalle}>Venció hace {Math.abs(prod.dias)} días</p>
              </div>
            ))}
          </div>

          <div className={`${styles.tarjeta} ${styles.amarillo}`}>
            <h3 className={styles.tarjetaTitulo} onClick={() => toggle('porVencer')}>
              <span className={styles.tarjetaLeft}>
                <IconCalendarTime size={18} />
                Por vencer
              </span>
              <span className={styles.tarjetaRight}>
                <span className={styles.badge}>{porVencer.length}</span>
                {abierto.porVencer ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}
              </span>
            </h3>
            {abierto.porVencer && porVencer.map((prod) => (
              <div key={prod.id} className={styles.item}>
                <p className={styles.itemNombre}>{prod.nombre}</p>
                <p className={styles.itemDetalle}>Vence en {prod.dias} días</p>
              </div>
            ))}
          </div>

          <div className={`${styles.tarjeta} ${styles.naranja}`}>
            <h3 className={styles.tarjetaTitulo} onClick={() => toggle('stockBajo')}>
              <span className={styles.tarjetaLeft}>
                <IconPackageOff size={18} />
                Stock bajo
              </span>
              <span className={styles.tarjetaRight}>
                <span className={styles.badge}>{stockBajo.length}</span>
                {abierto.stockBajo ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}
              </span>
            </h3>
            {abierto.stockBajo && stockBajo.map((prod) => (
              <div key={prod.id} className={styles.item}>
                <p className={styles.itemNombre}>{prod.nombre}</p>
                <p className={styles.itemDetalle}>
                  {prod.cantidad} uds. · mínimo {prod.stock_minimo}
                </p>
              </div>
            ))}
          </div>
        </div>

        <h2 className={styles.seccionTitulo}>Resumen del mes — {mesActual}</h2>

        <div className={styles.seccionResumen}>
          <div className={styles.fichaResumen}>
            <span className={styles.etiquetaFicha}>Ventas del mes</span>
            <span className={styles.valorFicha}>{formatARS(ventasMes)}</span>
          </div>
          <div className={styles.fichaResumen}>
            <span className={styles.etiquetaFicha}>Gastos del mes</span>
            <span className={styles.valorFicha}>{formatARS(gastosMes)}</span>
          </div>
          <div className={styles.fichaResumen}>
            <span className={styles.etiquetaFicha}>Ganancia estimada</span>
            <span className={`${styles.valorFicha} ${gananciaMes >= 0 ? styles.positivo : styles.negativo}`}>
              {formatARS(gananciaMes)}
            </span>
          </div>
          <div className={styles.fichaResumen}>
            <span className={styles.etiquetaFicha}>Unidades en stock</span>
            <span className={styles.valorFicha}>{unidadesStock.toLocaleString('es-AR')}</span>
            <span className={styles.detalleFicha}>{productos.length} productos distintos</span>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;
