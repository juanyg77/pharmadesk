import Layout from '../components/Layout';
import { useState } from 'react';
import useStockStore from '../store/stockStore';
import useVencimientos from '../hooks/useVencimientos';

function Stock() {
  const productos = useStockStore((state) => state.productos);
  const eliminarProducto = useStockStore((state) => state.eliminarProducto);
  const editarProducto = useStockStore((state) => state.editarProducto);
  const agregarProducto = useStockStore((state) => state.agregarProducto);

  const [busqueda, setBusqueda] = useState('');
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [laboratorio, setLaboratorio] = useState('');
  const [droga, setDroga] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [stockMinimo, setStockMinimo] = useState('');
  const [precioCosto, setPrecioCosto] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');

  const handleGuardar = () => {
    if (!nombre || !cantidad || !vencimiento) {
      alert('Nombre, cantidad y vencimiento son obligatorios.');
      return;
    }

    const datos = {
      nombre,
      laboratorio,
      droga,
      vencimiento,
      cantidad: Number(cantidad),
      stock_minimo: Number(stockMinimo),
      precio_costo: Number(precioCosto),
      precio_venta: Number(precioVenta),
    };

    if (productoEditando) {
      editarProducto(productoEditando.id, datos);
    } else {
      agregarProducto(datos);
    }

    setModalAbierto(false);
    setProductoEditando(null);
    setNombre('');
    setLaboratorio('');
    setDroga('');
    setVencimiento('');
    setCantidad('');
    setStockMinimo('');
    setPrecioCosto('');
    setPrecioVenta('');
  };

  return (
    <Layout>
      <h1>Stock</h1>

      <input
        type="text"
        placeholder="Buscar medicamento..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <button onClick={() => setModalAbierto(true)}>+ Agregar medicamento</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Laboratorio</th>
            <th>Droga</th>
            <th>Vencimiento</th>
            <th>Cantidad</th>
            <th>Costo</th>
            <th>Venta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>{prod.laboratorio}</td>
              <td>{prod.droga}</td>
              <td>{prod.vencimiento}</td>
              <td>{prod.cantidad}</td>
              <td>{prod.precio_costo}</td>
              <td>{prod.precio_venta}</td>
              <td>
                <button
                  onClick={() => {
                    setProductoEditando(prod);
                    setNombre(prod.nombre);
                    setLaboratorio(prod.laboratorio);
                    setDroga(prod.droga);
                    setVencimiento(prod.vencimiento);
                    setCantidad(prod.cantidad);
                    setStockMinimo(prod.stock_minimo);
                    setPrecioCosto(prod.precio_costo);
                    setPrecioVenta(prod.precio_venta);
                    setModalAbierto(true);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAbierto && (
        <div className="overlay">
          <div className="modal">
            <h2>{productoEditando ? 'Editar medicamento' : 'Agregar medicamento'}</h2>
            <button onClick={() => setModalAbierto(false)}>X</button>

            <input
              type="text"
              placeholder="Nombre del medicamento"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Laboratorio"
              value={laboratorio}
              onChange={(e) => setLaboratorio(e.target.value)}
            />
            <input
              type="text"
              placeholder="Droga"
              value={droga}
              onChange={(e) => setDroga(e.target.value)}
            />
            <input
              type="date"
              value={vencimiento}
              onChange={(e) => setVencimiento(e.target.value)}
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <input
              type="number"
              placeholder="Stock mínimo"
              value={stockMinimo}
              onChange={(e) => setStockMinimo(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio de costo"
              value={precioCosto}
              onChange={(e) => setPrecioCosto(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio de venta"
              value={precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value)}
            />

            <button onClick={handleGuardar}>Guardar</button>
            <button onClick={() => setModalAbierto(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Stock;
