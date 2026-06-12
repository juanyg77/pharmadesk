import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useFacturasStore = create(
  persist(
    (set) => ({
      facturas: [
        { id: 1,  nroFactura: 'F-0001', drogueria: 'Droguería del Sud',        fecha: '2026-06-03', monto: 850000,  categoria: 'medicamentos' },
        { id: 2,  nroFactura: 'F-0002', drogueria: 'Suizo Argentina',           fecha: '2026-06-07', monto: 620000,  categoria: 'medicamentos' },
        { id: 3,  nroFactura: 'F-0003', drogueria: 'Droguería del Sud',         fecha: '2026-06-11', monto: 430000,  categoria: 'medicamentos' },
        { id: 4,  nroFactura: 'F-0004', drogueria: 'Cosméticos SA',             fecha: '2026-06-05', monto: 180000,  categoria: 'perfumeria'   },
        { id: 5,  nroFactura: 'F-0005', drogueria: 'Belleza y Más Dist.',       fecha: '2026-06-10', monto: 95000,   categoria: 'perfumeria'   },
        { id: 6,  nroFactura: 'F-0006', drogueria: 'Droguería del Sud',         fecha: '2026-05-15', monto: 1200000, categoria: 'medicamentos' },
        { id: 7,  nroFactura: 'F-0007', drogueria: 'Suizo Argentina',           fecha: '2026-05-20', monto: 980000,  categoria: 'medicamentos' },
        { id: 8,  nroFactura: 'F-0008', drogueria: 'Cosméticos SA',             fecha: '2026-05-12', monto: 320000,  categoria: 'perfumeria'   },
        { id: 9,  nroFactura: 'F-0009', drogueria: 'Belleza y Más Dist.',       fecha: '2026-05-18', monto: 280000,  categoria: 'perfumeria'   },
        { id: 10, nroFactura: 'F-0010', drogueria: 'Droguería del Sud',         fecha: '2026-04-20', monto: 1100000, categoria: 'medicamentos' },
        { id: 11, nroFactura: 'F-0011', drogueria: 'Suizo Argentina',           fecha: '2026-04-14', monto: 760000,  categoria: 'medicamentos' },
        { id: 12, nroFactura: 'F-0012', drogueria: 'Cosméticos SA',             fecha: '2026-04-18', monto: 250000,  categoria: 'perfumeria'   },
      ],

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
