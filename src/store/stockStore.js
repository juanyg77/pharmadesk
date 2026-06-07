import { create } from 'zustand';

const useStockStore = create((set) => ({
  productos: [
    {
      id: 1,
      nombre: 'Ibuprofeno 400mg',
      laboratorio: 'Droguería del Sud',
      droga: 'Ibuprofeno',
      cantidad: 50,
      stock_minimo: 10,
      vencimiento: '2025-08-15',
      precio_costo: 800,
      precio_venta: 1200,
      categoria: 'analgésicos',
    },
    {
      id: 2,
      nombre: 'Amoxicilina 500mg',
      laboratorio: 'Droguería Suizo Argentina',
      droga: 'Amoxicilina',
      cantidad: 8,
      stock_minimo: 15,
      vencimiento: '2025-07-01',
      precio_costo: 1500,
      precio_venta: 2200,
      categoria: 'antibióticos',
    },
    {
      id: 3,
      nombre: 'Paracetamol 500mg',
      laboratorio: 'Droguería del Sud',
      droga: 'Paracetamol',
      cantidad: 3,
      stock_minimo: 20,
      vencimiento: '2026-12-30',
      precio_costo: 600,
      precio_venta: 900,
      categoria: 'analgésicos',
    },
  ],

  agregarProducto: (producto) =>
    set((state) => ({
      productos: [...state.productos, { ...producto, id: Date.now() }],
    })),

  eliminarProducto: (id) =>
    set((state) => ({
      productos: state.productos.filter((p) => p.id !== id),
    })),

  editarProducto: (id, datos) =>
    set((state) => ({
      productos: state.productos.map((p) => (p.id === id ? { ...p, ...datos } : p)),
    })),
}));

export default useStockStore;
