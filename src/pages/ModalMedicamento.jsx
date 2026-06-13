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
  const [errorDroga, setErrorDroga] = useState('');
  const [errorCantidad, setErrorCantidad] = useState('');
  const [errorVencimiento, setErrorVencimiento] = useState('');
  const [errorPrecioCosto, setErrorPrecioCosto] = useState('');
  const [errorPrecioVenta, setErrorPrecioVenta] = useState('');
  const [errorStockMinimo, setErrorStockMinimo] = useState('');

  const [sugerencias, setSugerencias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [errorApi, setErrorApi] = useState('');

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

  useEffect(() => {
    if (droga.trim().length < 3) {
      return;
    }

    const timer = setTimeout(() => {
      const buscar = async () => {
        setCargando(true);
        setErrorApi('');
        setSugerencias([]);

        try {
          const respuesta = await fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${droga}`);
          if (!respuesta.ok) throw new Error('HTTP error');
          const data = await respuesta.json();

          const grupos = data.drugGroup?.conceptGroup ?? [];
          const listaMedicamentos = [];

          grupos.forEach((grupo) => {
            if (grupo.conceptProperties) {
              listaMedicamentos.push(...grupo.conceptProperties);
            }
          });

          setSugerencias(listaMedicamentos);
        } catch {
          setErrorApi('No se pudo conectar con la API');
        } finally {
          setCargando(false);
        }
      };
      buscar();
    }, 500);

    return () => clearTimeout(timer);
  }, [droga]);

  const handleGuardar = () => {
    setErrorNombre('');
    setErrorDroga('');
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
    if (!droga || droga.trim().length < 3) {
      setErrorDroga('La droga debe tener al menos 3 caracteres');
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
          <button className={styles.btnCerrar} onClick={onCerrar}>
            ✕
          </button>
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
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Droga"
              value={droga}
              onChange={(e) => setDroga(e.target.value)}
            />
            {errorDroga && <p className={styles.error}>{errorDroga}</p>}
            {cargando && <p className={styles.error}>Buscando...</p>}
            {!cargando && errorApi && <p className={styles.error}>{errorApi}</p>}
            {!cargando && sugerencias.length > 0 && (
              <ul className={styles.sugerencias}>
                {sugerencias.slice(0, 5).map((s) => (
                  <li
                    key={s.rxcui}
                    className={styles.sugerenciaItem}
                    onClick={() => {
                      setNombre(s.name);
                      setSugerencias([]);
                    }}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
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
          <button className={styles.btnCancelar} onClick={onCerrar}>
            Cancelar
          </button>
          <button className={styles.btnGuardar} onClick={handleGuardar}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMedicamento;
