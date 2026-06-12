import Layout from '../components/Layout';
import { useState } from 'react';
import useFacturasStore from '../store/facturasStore';
import ModalFacturas from './modalFacturas';
import styles from './Facturas.module.css';

function Facturas() {
  const facturas = useFacturasStore((state) => state.facturas);
  const eliminarFactura = useFacturasStore((state) => state.eliminarFactura);
  const editarFactura = useFacturasStore((state) => state.editarFactura);
  const agregarFactura = useFacturasStore((state) => state.agregarFactura);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [facturaEditando, setFacturaEditando] = useState(null);

  const facturasMedicamentos = facturas
    .filter((f) => f.categoria === 'medicamentos')
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const facturasPerfumeria = facturas
    .filter((f) => f.categoria === 'perfumeria')
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const handleGuardar = (datos) => {
    if (facturaEditando) {
      editarFactura(facturaEditando.id, datos);
    } else {
      agregarFactura(datos);
    }
    setModalAbierto(false);
    setFacturaEditando(null);
  };

  const handleCerrar = () => {
    setModalAbierto(false);
    setFacturaEditando(null);
  };

  const handleEditar = (prod) => {
    setFacturaEditando(prod);
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

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1>Facturas</h1>
          <button className={styles.btnAgregar} onClick={() => setModalAbierto(true)}>
            + Agregar factura
          </button>
        </div>

        <div className={styles.seccion}>
          <div className={styles.seccionHeader}>
            <h2 className={styles.seccionTitulo}>Medicamentos</h2>
            <span className={styles.seccionBadge}>{facturasMedicamentos.length}</span>
          </div>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Nro. Factura</th>
                <th>Droguería</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facturasMedicamentos.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.vacio}>Sin facturas de medicamentos registradas</td>
                </tr>
              ) : (
                facturasMedicamentos.map((factura) => (
                  <tr key={factura.id}>
                    <td>{factura.nroFactura}</td>
                    <td>{factura.drogueria}</td>
                    <td>{formatFecha(factura.fecha)}</td>
                    <td className={styles.monto}>{formatMonto(factura.monto)}</td>
                    <td>
                      <button className={styles.btnEditar} onClick={() => handleEditar(factura)}>
                        Editar
                      </button>
                      <button className={styles.btnEliminar} onClick={() => eliminarFactura(factura.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.seccion}>
          <div className={styles.seccionHeader}>
            <h2 className={styles.seccionTitulo}>Perfumería</h2>
            <span className={styles.seccionBadge}>{facturasPerfumeria.length}</span>
          </div>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Nro. Factura</th>
                <th>Droguería</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facturasPerfumeria.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.vacio}>Sin facturas de perfumería registradas</td>
                </tr>
              ) : (
                facturasPerfumeria.map((factura) => (
                  <tr key={factura.id}>
                    <td>{factura.nroFactura}</td>
                    <td>{factura.drogueria}</td>
                    <td>{formatFecha(factura.fecha)}</td>
                    <td className={styles.monto}>{formatMonto(factura.monto)}</td>
                    <td>
                      <button className={styles.btnEditar} onClick={() => handleEditar(factura)}>
                        Editar
                      </button>
                      <button className={styles.btnEliminar} onClick={() => eliminarFactura(factura.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {modalAbierto && (
          <ModalFacturas
            facturaEditando={facturaEditando}
            onGuardar={handleGuardar}
            onCerrar={handleCerrar}
          />
        )}
      </div>
    </Layout>
  );
}

export default Facturas;
