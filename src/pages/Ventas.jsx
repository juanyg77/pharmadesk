import { useState } from 'react';
import Layout from '../components/Layout';
import useVentasStore from '../store/ventasStore';
import ModalVentas from './ModalVentas';
import styles from './Ventas.module.css';

function Ventas() {
  const ventas = useVentasStore((state) => state.ventas);
  const eliminarVenta = useVentasStore((state) => state.eliminarVenta);
  const editarVenta = useVentasStore((state) => state.editarVenta);
  const agregarVenta = useVentasStore((state) => state.agregarVenta);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [ventaEditando, setVentaEditando] = useState(null);

  const ventasMedicamentos = ventas
    .filter((v) => v.categoria === 'medicamentos')
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const ventasPerfumeria = ventas
    .filter((v) => v.categoria === 'perfumeria')
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const handleGuardar = (datos) => {
    if (ventaEditando) {
      editarVenta(ventaEditando.id, datos);
    } else {
      agregarVenta(datos);
    }
    setModalAbierto(false);
    setVentaEditando(null);
  };

  const handleCerrar = () => {
    setModalAbierto(false);
    setVentaEditando(null);
  };

  const handleEditar = (venta) => {
    setVentaEditando(venta);
    setModalAbierto(true);
  };

  const formatFecha = (fecha) => {
    if (!fecha) return '—';
    const [y, m, d] = fecha.split('-');
    return `${d}/${m}/${y}`;
  };

  const formatMonto = (monto) => {
    return `$${Number(monto).toLocaleString('es-AR')}`;
  };

  const TablaVentas = ({ filas, nombreVacio }) => (
    <table className={styles.tabla}>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filas.length === 0 ? (
          <tr>
            <td colSpan={3} className={styles.vacio}>{nombreVacio}</td>
          </tr>
        ) : (
          filas.map((venta) => (
            <tr key={venta.id}>
              <td>{formatFecha(venta.fecha)}</td>
              <td className={styles.monto}>{formatMonto(venta.monto)}</td>
              <td>
                <button className={styles.btnEditar} onClick={() => handleEditar(venta)}>
                  Editar
                </button>
                <button className={styles.btnEliminar} onClick={() => eliminarVenta(venta.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1>Ventas</h1>
          <button className={styles.btnAgregar} onClick={() => setModalAbierto(true)}>
            + Agregar venta del día
          </button>
        </div>

        <div className={styles.seccion}>
          <div className={styles.seccionHeader}>
            <h2 className={styles.seccionTitulo}>Medicamentos</h2>
            <span className={styles.seccionBadge}>{ventasMedicamentos.length}</span>
          </div>
          <TablaVentas filas={ventasMedicamentos} nombreVacio="Sin ventas de medicamentos registradas" />
        </div>

        <div className={styles.seccion}>
          <div className={styles.seccionHeader}>
            <h2 className={styles.seccionTitulo}>Perfumería</h2>
            <span className={styles.seccionBadge}>{ventasPerfumeria.length}</span>
          </div>
          <TablaVentas filas={ventasPerfumeria} nombreVacio="Sin ventas de perfumería registradas" />
        </div>

        {modalAbierto && (
          <ModalVentas
            ventaEditando={ventaEditando}
            onGuardar={handleGuardar}
            onCerrar={handleCerrar}
          />
        )}
      </div>
    </Layout>
  );
}

export default Ventas;
