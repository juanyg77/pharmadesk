import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useFacturasStore = create(
  persist(
    (set) => ({
      facturas: [],

      agregarFactura: (factura) => set((state) => ({
        facturas: [...state.facturas, { ...factura, id: Date.now() }]
      })),

      eliminarFactura: (id) => set((state) => ({
        facturas: state.facturas.filter((f) => f.id !== id)
      })),

      editarFactura: (id, datos) => set((state) => ({
        facturas: state.facturas.map((f) => f.id === id ? { ...f, ...datos } : f)
      }))
    }),
    { name: 'pharmadesk-facturas-v2' }
  )
)

export default useFacturasStore
