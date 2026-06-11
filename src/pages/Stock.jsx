import { useState } from 'react';
import Layout from '../components/Layout';
import useStockStore from '../store/stockStore';
import ModalMedicamento from './ModalMedicamento';
import styles from './Stock.module.css';

function Stock() {
  const productos = useStockStore((state) => state.productos);
  const eliminarProducto = useStockStore((state) => state.eliminarProducto);
  const editarProducto = useStockStore((state) => state.editarProducto);
  const agregarProducto = useStockStore((state) => state.agregarProducto);

  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const getClaseFila = (prod) => {
    const hoy = new Date();
    const fecha = new Date(prod.vencimiento);
    const dias = Math.floor((fecha - hoy) / (1000 * 60 * 60 * 24));
    if (dias < 0) return styles.filaVencida;
    if (dias <= 90) return styles.filaPorVencer;
    return '';
  };

  const handleGuardar = (datos) => {
    if (productoEditando) {
      editarProducto(productoEditando.id, datos);
    } else {
      agregarProducto(datos);
    }
    setModalAbierto(false);
    setProductoEditando(null);
  };

  const handleCerrar = () => {
    setModalAbierto(false);
    setProductoEditando(null);
  };

  const handleEditar = (prod) => {
    setProductoEditando(prod);
    setModalAbierto(true);
  };

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1>Stock</h1>
          <button className={styles.btnAgregar} onClick={() => setModalAbierto(true)}>
            + Agregar medicamento
          </button>
        </div>

        <input
          className={styles.buscador}
          type="text"
          placeholder="Buscar medicamento..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Laboratorio</th>
              <th>Droga</th>
              <th>Vencimiento</th>
              <th>Cantidad</th>
              <th>Precio Costo</th>
              <th>Precio Venta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((prod) => (
              <tr key={prod.id} className={getClaseFila(prod)}>
                <td>{prod.nombre}</td>
                <td>{prod.laboratorio}</td>
                <td>{prod.droga}</td>
                <td>{prod.vencimiento ? prod.vencimiento.split('-').reverse().join('/') : ''}</td>
                <td>{prod.cantidad}</td>
                <td>{prod.precio_costo}</td>
                <td>{prod.precio_venta}</td>
                <td>
                  <button className={styles.btnEditar} onClick={() => handleEditar(prod)}>
                    Editar
                  </button>
                  <button className={styles.btnEliminar} onClick={() => eliminarProducto(prod.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalAbierto && (
          <ModalMedicamento
            productoEditando={productoEditando}
            onGuardar={handleGuardar}
            onCerrar={handleCerrar}
          />
        )}
      </div>
    </Layout>
  );
}

export default Stock;
