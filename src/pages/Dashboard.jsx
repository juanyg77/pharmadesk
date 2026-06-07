import Layout from '../components/Layout';
import useVencimientos from '../hooks/useVencimientos';

function Dashboard() {
  const { vencidos, porVencer, stockBajo } = useVencimientos();

  return (
    <Layout>
      <h1>Dashboard</h1>

      {vencidos.length === 0 && porVencer.length === 0 && stockBajo.length === 0 && (
        <p>Todo en orden, no hay alertas.</p>
      )}

      <div className="tarjetas">
        {vencidos.length > 0 && (
          <div className="tarjeta rojo">
            <h2>Vencidos ({vencidos.length})</h2>
            {vencidos.map((prod) => (
              <div key={prod.id} className="item">
                <p className="nombre">{prod.nombre}</p>
                <p className="fecha">Venció hace {Math.abs(prod.dias)} días</p>
              </div>
            ))}
          </div>
        )}

        {porVencer.length > 0 && (
          <div className="tarjeta amarillo">
            <h2>Por vencer ({porVencer.length})</h2>
            {porVencer.map((prod) => (
              <div key={prod.id} className="item">
                <p className="nombre">{prod.nombre}</p>
                <p className="fecha">Vence en {prod.dias} días</p>
              </div>
            ))}
          </div>
        )}

        {stockBajo.length > 0 && (
          <div className="tarjeta naranja">
            <h2>Stock bajo ({stockBajo.length})</h2>
            {stockBajo.map((prod) => (
              <div key={prod.id} className="item">
                <p className="nombre">{prod.nombre}</p>
                <p className="fecha">
                  {prod.cantidad} unidades (mínimo {prod.stock_minimo})
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;
