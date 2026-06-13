import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStockStore = create(
  persist(
    (set) => ({
      productos: [],

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
    }),
    { name: 'pharma-stock-v2' }
  )
);

export default useStockStore;
