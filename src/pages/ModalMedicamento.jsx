import { useState, useEffect } from 'react';
import styles from './Stock.module.css';

function ModalMedicamento({ productoEditando, onGuardar, onCerrar }) {
  const [nombre, setNombre] = useState('');
  const [laboratorio, setLaboratorio] = useState('');
  const [droga, setDroga] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [stockMinimo, setStockMinimo] = useState('');
  const [precioCosto, setPrecioCosto] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');

  const [errorNombre, setErrorNombre] = useState('');
  const [errorCantidad, setErrorCantidad] = useState('');
  const [errorVencimiento, setErrorVencimiento] = useState('');
  const [errorPrecioCosto, setErrorPrecioCosto] = useState('');
  const [errorPrecioVenta, setErrorPrecioVenta] = useState('');
  const [errorStockMinimo, setErrorStockMinimo] = useState('');

  // Cuando productoEditando cambia, carga sus datos en los campos (o los limpia si es null)
  useEffect(() => {
    if (productoEditando) {
      setNombre(productoEditando.nombre);
      setLaboratorio(productoEditando.laboratorio);
      setDroga(productoEditando.droga);
      setVencimiento(productoEditando.vencimiento);
      setCantidad(productoEditando.cantidad);
      setStockMinimo(productoEditando.stock_minimo);
      setPrecioCosto(productoEditando.precio_costo);
      setPrecioVenta(productoEditando.precio_venta);
    } else {
      setNombre('');
      setLaboratorio('');
      setDroga('');
      setVencimiento('');
      setCantidad('');
      setStockMinimo('');
      setPrecioCosto('');
      setPrecioVenta('');
    }
  }, [productoEditando]);

  const handleGuardar = () => {
    setErrorNombre('');
    setErrorCantidad('');
    setErrorVencimiento('');
    setErrorPrecioCosto('');
    setErrorPrecioVenta('');
    setErrorStockMinimo('');

    let valido = true;

    if (!nombre || nombre.trim().length < 3) {
      setErrorNombre('El nombre debe tener al menos 3 caracteres');
      valido = false;
    }
    if (!cantidad || cantidad <= 0) {
      setErrorCantidad('La cantidad debe ser mayor a 0');
      valido = false;
    }
    if (precioCosto < 0) {
      setErrorPrecioCosto('El precio de costo no puede ser negativo');
      valido = false;
    }
    if (precioVenta < 0) {
      setErrorPrecioVenta('El precio de venta no puede ser negativo');
      valido = false;
    }
    if (!vencimiento) {
      setErrorVencimiento('La fecha de vencimiento es obligatoria');
      valido = false;
    }
    if (vencimiento && new Date(vencimiento) < new Date() && !productoEditando) {
      setErrorVencimiento('La fecha ya está vencida');
      valido = false;
    }
    if (stockMinimo < 0) {
      setErrorStockMinimo('El stock mínimo no puede ser negativo');
      valido = false;
    }

    if (!valido) return;

    onGuardar({
      nombre,
      laboratorio,
      droga,
      vencimiento,
      cantidad: Number(cantidad),
      stock_minimo: Number(stockMinimo),
      precio_costo: Number(precioCosto),
      precio_venta: Number(precioVenta),
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{productoEditando ? 'Editar medicamento' : 'Agregar medicamento'}</h2>
          <button className={styles.btnCerrar} onClick={onCerrar}>✕</button>
        </div>

        <div className={styles.grilla}>
          <div>
            <input
              type="text"
              placeholder="Nombre del medicamento"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errorNombre && <p className={styles.error}>{errorNombre}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Laboratorio"
              value={laboratorio}
              onChange={(e) => setLaboratorio(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Droga"
              value={droga}
              onChange={(e) => setDroga(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              value={vencimiento}
              onChange={(e) => setVencimiento(e.target.value)}
            />
            {errorVencimiento && <p className={styles.error}>{errorVencimiento}</p>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            {errorCantidad && <p className={styles.error}>{errorCantidad}</p>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Stock mínimo"
              value={stockMinimo}
              onChange={(e) => setStockMinimo(e.target.value)}
            />
            {errorStockMinimo && <p className={styles.error}>{errorStockMinimo}</p>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Precio de costo"
              value={precioCosto}
              onChange={(e) => setPrecioCosto(e.target.value)}
            />
            {errorPrecioCosto && <p className={styles.error}>{errorPrecioCosto}</p>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Precio de venta"
              value={precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value)}
            />
            {errorPrecioVenta && <p className={styles.error}>{errorPrecioVenta}</p>}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnCancelar} onClick={onCerrar}>Cancelar</button>
          <button className={styles.btnGuardar} onClick={handleGuardar}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalMedicamento;
