// Fecha de referencia del demo: junio 2026
// Vencidos: < hoy | Por vencer: 0–90 días | Stock bajo: cantidad ≤ stock_minimo

const MES = '2026-06';

const productos = [
  {
    id: 1001,
    nombre: 'Ibuprofeno 400mg',
    laboratorio: 'Bayer',
    droga: 'Ibuprofen',
    vencimiento: '2027-12-31',
    cantidad: 48,
    stock_minimo: 10,
    precio_costo: 1850,
    precio_venta: 2900,
  },
  {
    id: 1002,
    nombre: 'Amoxicilina 500mg',
    laboratorio: 'Roemmers',
    droga: 'Amoxicillin',
    vencimiento: '2026-08-22', // por vencer en ~65 días → fila amarilla
    cantidad: 24,
    stock_minimo: 5,
    precio_costo: 3200,
    precio_venta: 5100,
  },
  {
    id: 1003,
    nombre: 'Metformina 850mg',
    laboratorio: 'Bagó',
    droga: 'Metformin',
    vencimiento: '2027-08-15',
    cantidad: 8,
    stock_minimo: 12, // stock bajo: 8 ≤ 12
    precio_costo: 890,
    precio_venta: 1500,
  },
  {
    id: 1004,
    nombre: 'Paracetamol 500mg',
    laboratorio: 'Gador',
    droga: 'Acetaminophen',
    vencimiento: '2027-06-30',
    cantidad: 120,
    stock_minimo: 20,
    precio_costo: 650,
    precio_venta: 1050,
  },
  {
    id: 1005,
    nombre: 'Atorvastatina 20mg',
    laboratorio: 'Pfizer',
    droga: 'Atorvastatin',
    vencimiento: '2028-03-31',
    cantidad: 36,
    stock_minimo: 8,
    precio_costo: 4200,
    precio_venta: 6800,
  },
  {
    id: 1006,
    nombre: 'Loratadina 10mg',
    laboratorio: 'Montpellier',
    droga: 'Loratadine',
    vencimiento: '2027-11-30',
    cantidad: 60,
    stock_minimo: 10,
    precio_costo: 1100,
    precio_venta: 1850,
  },
  {
    id: 1007,
    nombre: 'Omeprazol 20mg',
    laboratorio: 'Elea',
    droga: 'Omeprazole',
    vencimiento: '2026-03-15', // VENCIDO → fila roja
    cantidad: 18,
    stock_minimo: 5,
    precio_costo: 920,
    precio_venta: 1600,
  },
  {
    id: 1008,
    nombre: 'Losartán 50mg',
    laboratorio: 'Roux Ocefa',
    droga: 'Losartan',
    vencimiento: '2026-08-02', // por vencer en ~45 días → fila amarilla
    cantidad: 30,
    stock_minimo: 10,
    precio_costo: 2100,
    precio_venta: 3500,
  },
  {
    id: 1009,
    nombre: 'Vitamina C 1000mg',
    laboratorio: 'Phoenix',
    droga: 'Ascorbic Acid',
    vencimiento: '2027-09-30',
    cantidad: 4,
    stock_minimo: 8, // stock bajo: 4 ≤ 8
    precio_costo: 750,
    precio_venta: 1250,
  },
  {
    id: 1010,
    nombre: 'Complejo B Forte',
    laboratorio: 'Holliday Scott',
    droga: 'Thiamine',
    vencimiento: '2027-05-31',
    cantidad: 25,
    stock_minimo: 6,
    precio_costo: 1200,
    precio_venta: 2100,
  },
  {
    id: 1011,
    nombre: 'Crema Hidratante Corporal',
    laboratorio: 'Nivea',
    droga: 'Glycerin',
    vencimiento: '2028-01-31',
    cantidad: 15,
    stock_minimo: 4,
    precio_costo: 1800,
    precio_venta: 3200,
  },
  {
    id: 1012,
    nombre: 'Shampoo Anticaspa 2 en 1',
    laboratorio: 'Head & Shoulders',
    droga: 'Pyrithione Zinc',
    vencimiento: '2027-10-31',
    cantidad: 8,
    stock_minimo: 3,
    precio_costo: 2200,
    precio_venta: 3800,
  },
];

const ventas = [
  // Medicamentos — junio 2026
  { id: 2001, fecha: `${MES}-01`, monto: 45000, categoria: 'medicamentos' },
  { id: 2002, fecha: `${MES}-03`, monto: 32500, categoria: 'medicamentos' },
  { id: 2003, fecha: `${MES}-05`, monto: 67800, categoria: 'medicamentos' },
  { id: 2004, fecha: `${MES}-08`, monto: 28400, categoria: 'medicamentos' },
  { id: 2005, fecha: `${MES}-10`, monto: 55200, categoria: 'medicamentos' },
  { id: 2006, fecha: `${MES}-12`, monto: 41700, categoria: 'medicamentos' },
  { id: 2007, fecha: `${MES}-15`, monto: 73600, categoria: 'medicamentos' },
  { id: 2008, fecha: `${MES}-17`, monto: 38900, categoria: 'medicamentos' },
  // Perfumería — junio 2026
  { id: 2009, fecha: `${MES}-02`, monto: 18500, categoria: 'perfumeria' },
  { id: 2010, fecha: `${MES}-06`, monto: 24200, categoria: 'perfumeria' },
  { id: 2011, fecha: `${MES}-09`, monto: 16800, categoria: 'perfumeria' },
  { id: 2012, fecha: `${MES}-13`, monto: 31400, categoria: 'perfumeria' },
  { id: 2013, fecha: `${MES}-16`, monto: 22700, categoria: 'perfumeria' },
  // Mayo 2026 (para el gráfico histórico)
  { id: 2020, fecha: '2026-05-05', monto: 52300, categoria: 'medicamentos' },
  { id: 2021, fecha: '2026-05-12', monto: 41800, categoria: 'medicamentos' },
  { id: 2022, fecha: '2026-05-19', monto: 63500, categoria: 'medicamentos' },
  { id: 2023, fecha: '2026-05-26', monto: 37200, categoria: 'medicamentos' },
  { id: 2024, fecha: '2026-05-08', monto: 19600, categoria: 'perfumeria' },
  { id: 2025, fecha: '2026-05-20', monto: 28400, categoria: 'perfumeria' },
];

const facturas = [
  // Medicamentos — junio 2026
  {
    id: 3001,
    nroFactura: '0001-00023456',
    drogueria: 'Farmacoop',
    fecha: `${MES}-02`,
    monto: 145000,
    categoria: 'medicamentos',
  },
  {
    id: 3002,
    nroFactura: '0001-00034567',
    drogueria: 'Droguería del Sud',
    fecha: `${MES}-09`,
    monto: 89500,
    categoria: 'medicamentos',
  },
  {
    id: 3003,
    nroFactura: '0002-00012789',
    drogueria: 'Rofina',
    fecha: `${MES}-16`,
    monto: 112300,
    categoria: 'medicamentos',
  },
  // Perfumería — junio 2026
  {
    id: 3004,
    nroFactura: '0001-00008921',
    drogueria: 'Distribuidora Cosmética',
    fecha: `${MES}-04`,
    monto: 42800,
    categoria: 'perfumeria',
  },
  {
    id: 3005,
    nroFactura: '0003-00005432',
    drogueria: 'Belcosul',
    fecha: `${MES}-11`,
    monto: 35600,
    categoria: 'perfumeria',
  },
  // Mayo 2026 (para histórico)
  {
    id: 3010,
    nroFactura: '0001-00021100',
    drogueria: 'Farmacoop',
    fecha: '2026-05-06',
    monto: 132000,
    categoria: 'medicamentos',
  },
  {
    id: 3011,
    nroFactura: '0001-00031200',
    drogueria: 'Droguería del Sud',
    fecha: '2026-05-15',
    monto: 78900,
    categoria: 'medicamentos',
  },
  {
    id: 3012,
    nroFactura: '0001-00007800',
    drogueria: 'Distribuidora Cosmética',
    fecha: '2026-05-10',
    monto: 38200,
    categoria: 'perfumeria',
  },
];

export function seedDemoData() {
  localStorage.setItem(
    'pharma-stock-v2',
    JSON.stringify({ state: { productos }, version: 0 })
  );
  localStorage.setItem(
    'pharmadesk-ventas-v2',
    JSON.stringify({ state: { ventas }, version: 0 })
  );
  localStorage.setItem(
    'pharmadesk-facturas-v2',
    JSON.stringify({ state: { facturas }, version: 0 })
  );
  localStorage.setItem('nombreFarmacia', 'Farmacia Demo');
  localStorage.setItem('logueado', 'true');
}
