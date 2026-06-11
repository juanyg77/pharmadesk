import { useState, useEffect } from 'react';
import styles from './Stock.module.css';

function ModalFacturas({ facturaEditando, onGuardar, onCerrar }) {
  const [nroFactura, setNroFactura] = useState('');
  const [drogueria, setDrogueria] = useState('');
  const [fecha, setFecha] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');

  const [errorNroFactura, setErrorNroFactura] = useState('');
  const [errorDrogueria, setErrorDrogueria] = useState('');
  const [errorFecha, setErrorFecha] = useState('');
  const [errorMonto, setErrorMonto] = useState('');
  const [errorCategoria, setErrorCategoria] = useState('');

  useEffect(() => {
    if (facturaEditando) {
      setNroFactura(facturaEditando.nroFactura);
      setDrogueria(facturaEditando.drogueria);
      setFecha(facturaEditando.fecha);
      setMonto(facturaEditando.monto);
      setCategoria(facturaEditando.categoria);
    } else {
      setNroFactura('');
      setDrogueria('');
      setFecha('');
      setMonto('');
      setCategoria('');
    }
  }, [facturaEditando]);

  const handleGuardar = () => {
    setErrorNroFactura('');
    setErrorDrogueria('');
    setErrorFecha('');
    setErrorMonto('');
    setErrorCategoria('');

    let valido = true;

    if (!nroFactura || nroFactura.trim().length < 4) {
      setErrorNroFactura('Ingresá un número de factura válido');
      valido = false;
    }

    if (!drogueria || drogueria.trim().length < 3) {
      setErrorDrogueria('Ingresá el nombre de la droguería');
      valido = false;
    }

    if (!monto || Number(monto) < 0) {
      setErrorMonto('Ingresá un monto válido');
      valido = false;
    }

    if (!fecha) {
      setErrorFecha('La fecha es obligatoria');
      valido = false;
    }

    if (fecha && new Date(fecha) > new Date()) {
      setErrorFecha('La fecha no puede ser futura');
      valido = false;
    }

    if (!categoria) {
      setErrorCategoria('Seleccioná una categoría');
      valido = false;
    }

    if (!valido) return;

    onGuardar({
      nroFactura,
      drogueria,
      fecha,
      categoria,
      monto: Number(monto),
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{facturaEditando ? 'Editar factura' : 'Agregar factura'}</h2>
          <button className={styles.btnCerrar} onClick={onCerrar}>✕</button>
        </div>

        <div className={styles.grilla}>
          <div>
            <label className={styles.label}>Nro. Factura</label>
            <input
              type="text"
              placeholder="Ej: 0001-00012345"
              value={nroFactura}
              onChange={(e) => setNroFactura(e.target.value)}
            />
            {errorNroFactura && <p className={styles.error}>{errorNroFactura}</p>}
          </div>
          <div>
            <label className={styles.label}>Droguería</label>
            <input
              type="text"
              placeholder="Nombre de la droguería"
              value={drogueria}
              onChange={(e) => setDrogueria(e.target.value)}
            />
            {errorDrogueria && <p className={styles.error}>{errorDrogueria}</p>}
          </div>
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

export default ModalFacturas;
