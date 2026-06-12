import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useVentasStore = create(
  persist(
    (set) => ({
      ventas: [
        { id: 1,  fecha: '2026-06-04', monto: 1200000, categoria: 'medicamentos' },
        { id: 2,  fecha: '2026-06-08', monto: 950000,  categoria: 'medicamentos' },
        { id: 3,  fecha: '2026-06-12', monto: 740000,  categoria: 'medicamentos' },
        { id: 4,  fecha: '2026-06-06', monto: 350000,  categoria: 'perfumeria'   },
        { id: 5,  fecha: '2026-06-11', monto: 220000,  categoria: 'perfumeria'   },
        { id: 6,  fecha: '2026-05-16', monto: 1800000, categoria: 'medicamentos' },
        { id: 7,  fecha: '2026-05-22', monto: 1500000, categoria: 'medicamentos' },
        { id: 8,  fecha: '2026-05-13', monto: 650000,  categoria: 'perfumeria'   },
        { id: 9,  fecha: '2026-05-19', monto: 480000,  categoria: 'perfumeria'   },
        { id: 10, fecha: '2026-04-22', monto: 1600000, categoria: 'medicamentos' },
        { id: 11, fecha: '2026-04-17', monto: 1200000, categoria: 'medicamentos' },
        { id: 12, fecha: '2026-04-19', monto: 550000,  categoria: 'perfumeria'   },
      ],

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
