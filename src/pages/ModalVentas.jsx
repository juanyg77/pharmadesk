import { useState, useEffect } from 'react';
import styles from './Stock.module.css';

function ModalVentas({ ventaEditando, onGuardar, onCerrar }) {
  const [fecha, setFecha] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');

  const [errorFecha, setErrorFecha] = useState('');
  const [errorMonto, setErrorMonto] = useState('');
  const [errorCategoria, setErrorCategoria] = useState('');

  useEffect(() => {
    if (ventaEditando) {
      setFecha(ventaEditando.fecha);
      setMonto(ventaEditando.monto);
      setCategoria(ventaEditando.categoria);
    } else {
      setFecha('');
      setMonto('');
      setCategoria('');
    }
  }, [ventaEditando]);

  const handleGuardar = () => {
    setErrorFecha('');
    setErrorMonto('');
    setErrorCategoria('');

    let valido = true;

    if (!fecha) {
      setErrorFecha('La fecha es obligatoria');
      valido = false;
    }

    if (fecha && new Date(fecha) > new Date()) {
      setErrorFecha('La fecha no puede ser futura');
      valido = false;
    }

    if (!monto || Number(monto) < 0) {
      setErrorMonto('Ingresá un monto válido');
      valido = false;
    }

    if (!categoria) {
      setErrorCategoria('Seleccioná una categoría');
      valido = false;
    }

    if (!valido) return;

    onGuardar({
      fecha,
      monto: Number(monto),
      categoria,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{ventaEditando ? 'Editar venta' : 'Agregar venta del día'}</h2>
          <button className={styles.btnCerrar} onClick={onCerrar}>✕</button>
        </div>

        <div className={styles.grilla}>
          <div>
            <label className={styles.label}>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            {errorFecha && <p className={styles.error}>{errorFecha}</p>}
          </div>
          <div>
            <label className={styles.label}>Monto</label>
            <input
              type="number"
              placeholder="0"
              min="0"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
            {errorMonto && <p className={styles.error}>{errorMonto}</p>}
          </div>
          <div>
            <label className={styles.label}>Categoría</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Seleccioná una categoría</option>
              <option value="medicamentos">Medicamentos</option>
              <option value="perfumeria">Perfumería</option>
            </select>
            {errorCategoria && <p className={styles.error}>{errorCategoria}</p>}
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

export default ModalVentas;
