import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useVentasStore = create(
  persist(
    (set) => ({
      ventas: [],

      agregarVenta: (venta) => set((state) => ({
        ventas: [...state.ventas, { ...venta, id: Date.now() }]
      })),

      eliminarVenta: (id) => set((state) => ({
        ventas: state.ventas.filter((v) => v.id !== id)
      })),

      editarVenta: (id, datos) => set((state) => ({
        ventas: state.ventas.map((v) => v.id === id ? { ...v, ...datos } : v)
      }))
    }),
    { name: 'pharmadesk-ventas-v2' }
  )
)

export default useVentasStore
