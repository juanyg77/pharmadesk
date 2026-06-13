import styles from './Analisis.module.css';
import Layout from '../components/Layout';
import useFacturasStore from '../store/facturasStore';
import useVentasStore from '../store/ventasStore';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

const cssVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const formatARS = (val) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(val);

function Analisis() {
  const facturas = useFacturasStore((state) => state.facturas);
  const ventas = useVentasStore((state) => state.ventas);

  const COLOR_PRIMARY = cssVar('--pd-primary');
  const COLOR_ALERT = cssVar('--pd-alert-soon-text');
  const COLOR_SECONDARY = cssVar('--pd-secondary');

  const calcularTotales = (facturas, ventas) => {
    let gastoMedicamentos = 0;
    let gastoPerfumeria = 0;
    let ventaMedicamentos = 0;
    let ventaPerfumeria = 0;

    for (let i = 0; i < facturas.length; i++) {
      if (facturas[i].categoria === 'medicamentos') {
        gastoMedicamentos += facturas[i].monto;
      } else {
        gastoPerfumeria += facturas[i].monto;
      }
    }

    for (let i = 0; i < ventas.length; i++) {
      if (ventas[i].categoria === 'medicamentos') {
        ventaMedicamentos += ventas[i].monto;
      } else {
        ventaPerfumeria += ventas[i].monto;
      }
    }

    const gananciaMedicamentos = ventaMedicamentos - gastoMedicamentos;
    const gananciaPerfumeria = ventaPerfumeria - gastoPerfumeria;

    const ivaDebito = (ventaPerfumeria * 0.21) / 1.21;
    const ivaCredito = (gastoPerfumeria * 0.21) / 1.21;
    const ivaAPagar = ivaDebito - ivaCredito;
    const gananciaNetaPerfumeria = gananciaPerfumeria - ivaAPagar;

    return {
      gananciaMedicamentos,
      gananciaPerfumeria,
      gananciaNetaPerfumeria,
      ivaAPagar,
      ventaMedicamentos,
      ventaPerfumeria,
      gastoMedicamentos,
      gastoPerfumeria,
    };
  };

  const totalHistorico = calcularTotales(facturas, ventas);

  const esDelMesActual = (fecha) => {
    const hoy = new Date();
    const fechaItem = new Date(fecha);
    return fechaItem.getMonth() === hoy.getMonth() && fechaItem.getFullYear() === hoy.getFullYear();
  };

  const facturasMes = facturas.filter((f) => esDelMesActual(f.fecha));
  const ventasMes = ventas.filter((v) => esDelMesActual(v.fecha));
  const totalesMes = calcularTotales(facturasMes, ventasMes);

  const datosGrafico = [
    {
      categoria: 'Medicamentos',
      ventas: totalesMes.ventaMedicamentos,
      gastos: totalesMes.gastoMedicamentos,
    },
    {
      categoria: 'Perfumería',
      ventas: totalesMes.ventaPerfumeria,
      gastos: totalesMes.gastoPerfumeria,
    },
  ];

  const datosTorta = [
    { name: 'Medicamentos', value: totalesMes.ventaMedicamentos },
    { name: 'Perfumería', value: totalesMes.ventaPerfumeria },
  ];

  const datosHistorico = [
    {
      categoria: 'Medicamentos',
      mes: totalesMes.gananciaMedicamentos,
      historico: totalHistorico.gananciaMedicamentos,
    },
    {
      categoria: 'Perfumería',
      mes: totalesMes.gananciaNetaPerfumeria,
      historico: totalHistorico.gananciaNetaPerfumeria,
    },
  ];

  const gananciaTotal = totalesMes.gananciaMedicamentos + totalesMes.gananciaNetaPerfumeria;
  const hayVentasMes = totalesMes.ventaMedicamentos > 0 || totalesMes.ventaPerfumeria > 0;

  const tickY = (v) => `$${(v / 1000).toFixed(0)}k`;
  const tooltipFmt = (value) => [formatARS(value)];

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Análisis</h1>

        <div className={styles.tarjetasFinancieras}>
          <div className={styles.tarjetaFinanciera}>
            <span className={styles.etiquetaFinanciera}>Ganancia Medicamentos</span>
            <span className={`${styles.valorFinanciero} ${totalesMes.gananciaMedicamentos < 0 ? styles.negativo : styles.positivo}`}>
              {formatARS(totalesMes.gananciaMedicamentos)}
            </span>
          </div>
          <div className={styles.tarjetaFinanciera}>
            <span className={styles.etiquetaFinanciera}>Ganancia Neta Perfumería</span>
            <span className={`${styles.valorFinanciero} ${totalesMes.gananciaNetaPerfumeria < 0 ? styles.negativo : styles.positivo}`}>
              {formatARS(totalesMes.gananciaNetaPerfumeria)}
            </span>
          </div>
          <div className={styles.tarjetaFinanciera}>
            <span className={styles.etiquetaFinanciera}>IVA a Pagar Estimado</span>
            <span className={styles.valorFinanciero}>
              {formatARS(totalesMes.ivaAPagar)}
            </span>
          </div>
          <div className={styles.tarjetaFinanciera}>
            <span className={styles.etiquetaFinanciera}>Ganancia Total del Mes</span>
            <span className={`${styles.valorFinanciero} ${gananciaTotal < 0 ? styles.negativo : styles.positivo}`}>
              {formatARS(gananciaTotal)}
            </span>
          </div>
        </div>

        <div className={styles.seccionGraficos}>
          <div className={styles.panelGrafico}>
            <h2 className={styles.tituloPanel}>Ventas vs Gastos del mes</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={datosGrafico} barCategoryGap="30%">
                <XAxis dataKey="categoria" tick={{ fill: '#4A5E56', fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7A8C84', fontSize: 12 }} tickFormatter={tickY} axisLine={false} tickLine={false} />
                <Tooltip formatter={tooltipFmt} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                <Legend />
                <Bar dataKey="ventas" name="Ventas" fill={COLOR_PRIMARY} radius={[4, 4, 0, 0]} />
                <Bar dataKey="gastos" name="Gastos" fill={COLOR_ALERT} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.panelGrafico}>
            <h2 className={styles.tituloPanel}>Distribución de ventas del mes</h2>
            {hayVentasMes ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={datosTorta}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    <Cell fill={COLOR_PRIMARY} />
                    <Cell fill={COLOR_SECONDARY} />
                  </Pie>
                  <Tooltip formatter={(value) => [formatARS(value)]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className={styles.sinDatos}>Sin ventas registradas este mes</div>
            )}
          </div>

          <div className={`${styles.panelGrafico} ${styles.panelGraficoAncho}`}>
            <h2 className={styles.tituloPanel}>Ganancias: mes actual vs histórico acumulado</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={datosHistorico} barCategoryGap="30%">
                <XAxis dataKey="categoria" tick={{ fill: '#4A5E56', fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7A8C84', fontSize: 12 }} tickFormatter={tickY} axisLine={false} tickLine={false} />
                <Tooltip formatter={tooltipFmt} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                <Legend />
                <Bar dataKey="mes" name="Mes actual" fill={COLOR_PRIMARY} radius={[4, 4, 0, 0]} />
                <Bar dataKey="historico" name="Histórico acumulado" fill={COLOR_ALERT} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Analisis;
