import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStockStore = create(
  persist(
    (set) => ({
      productos: [
        { id: 1,  nombre: 'Ibuprofeno 400mg',         laboratorio: 'Droguería del Sud',      droga: 'Ibuprofeno',      cantidad: 50,  stock_minimo: 10,  vencimiento: '2027-08-15', precio_costo: 800,   precio_venta: 1200,  categoria: 'analgésicos'    },
        { id: 2,  nombre: 'Amoxicilina 500mg',         laboratorio: 'Suizo Argentina',        droga: 'Amoxicilina',     cantidad: 8,   stock_minimo: 15,  vencimiento: '2026-07-01', precio_costo: 1500,  precio_venta: 2200,  categoria: 'antibióticos'   },
        { id: 3,  nombre: 'Paracetamol 500mg',         laboratorio: 'Droguería del Sud',      droga: 'Paracetamol',     cantidad: 3,   stock_minimo: 20,  vencimiento: '2027-12-30', precio_costo: 600,   precio_venta: 900,   categoria: 'analgésicos'    },
        { id: 4,  nombre: 'Loratadina 10mg',           laboratorio: 'Suizo Argentina',        droga: 'Loratadina',      cantidad: 35,  stock_minimo: 8,   vencimiento: '2027-03-20', precio_costo: 950,   precio_venta: 1400,  categoria: 'antihistamínico'},
        { id: 5,  nombre: 'Omeprazol 20mg',            laboratorio: 'Droguería del Sud',      droga: 'Omeprazol',       cantidad: 12,  stock_minimo: 10,  vencimiento: '2026-11-15', precio_costo: 1100,  precio_venta: 1600,  categoria: 'gastro'         },
        { id: 6,  nombre: 'Enalapril 10mg',            laboratorio: 'Suizo Argentina',        droga: 'Enalapril',       cantidad: 6,   stock_minimo: 12,  vencimiento: '2027-05-10', precio_costo: 700,   precio_venta: 1050,  categoria: 'cardiovascular' },
        { id: 7,  nombre: 'Metformina 500mg',          laboratorio: 'Droguería del Sud',      droga: 'Metformina',      cantidad: 20,  stock_minimo: 15,  vencimiento: '2027-09-01', precio_costo: 850,   precio_venta: 1250,  categoria: 'diabetes'       },
        { id: 8,  nombre: 'Diclofenac Gel 50g',        laboratorio: 'Suizo Argentina',        droga: 'Diclofenac',      cantidad: 28,  stock_minimo: 10,  vencimiento: '2027-06-30', precio_costo: 1800,  precio_venta: 2600,  categoria: 'analgésicos'    },
        { id: 9,  nombre: 'Ciprofloxacina 500mg',      laboratorio: 'Droguería del Sud',      droga: 'Ciprofloxacina',  cantidad: 4,   stock_minimo: 10,  vencimiento: '2026-08-20', precio_costo: 2200,  precio_venta: 3200,  categoria: 'antibióticos'   },
        { id: 10, nombre: 'Alprazolam 0.5mg',          laboratorio: 'Suizo Argentina',        droga: 'Alprazolam',      cantidad: 15,  stock_minimo: 5,   vencimiento: '2027-02-14', precio_costo: 1300,  precio_venta: 1900,  categoria: 'psiquiátrico'   },
        { id: 11, nombre: 'Crema Nivea 200ml',         laboratorio: 'Cosméticos SA',          droga: '',                cantidad: 40,  stock_minimo: 10,  vencimiento: '2028-01-01', precio_costo: 2500,  precio_venta: 3800,  categoria: 'perfumeria'     },
        { id: 12, nombre: 'Shampoo Pantene 400ml',     laboratorio: 'Belleza y Más Dist.',    droga: '',                cantidad: 22,  stock_minimo: 8,   vencimiento: '2028-06-01', precio_costo: 3200,  precio_venta: 4800,  categoria: 'perfumeria'     },
        { id: 13, nombre: 'Desodorante Rexona 150ml',  laboratorio: 'Belleza y Más Dist.',    droga: '',                cantidad: 30,  stock_minimo: 10,  vencimiento: '2028-03-15', precio_costo: 1900,  precio_venta: 2800,  categoria: 'perfumeria'     },
        { id: 14, nombre: 'Protector Solar FPS50 120g',laboratorio: 'Cosméticos SA',          droga: '',                cantidad: 7,   stock_minimo: 6,   vencimiento: '2027-11-30', precio_costo: 4500,  precio_venta: 6500,  categoria: 'perfumeria'     },
        { id: 15, nombre: 'Alcohol en Gel 500ml',      laboratorio: 'Droguería del Sud',      droga: '',                cantidad: 55,  stock_minimo: 15,  vencimiento: '2027-10-01', precio_costo: 1200,  precio_venta: 1800,  categoria: 'higiene'        },
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
    }),
    { name: 'pharma-stock-v2' }
  )
);

export default useStockStore;
