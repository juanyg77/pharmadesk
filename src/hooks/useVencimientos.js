import { useMemo } from 'react';
import useStockStore from '../store/stockStore';

function useVencimientos() {
  const productos = useStockStore((state) => state.productos);

  const resultado = useMemo(() => {
    const hoy = new Date();
    const vencidos = [];
    const porVencer = [];
    const stockBajo = [];

    productos.forEach((prod) => {
      if (prod.cantidad <= prod.stock_minimo) {
        stockBajo.push(prod);
      }

      if (!prod.vencimiento) return;

      const fecha = new Date(prod.vencimiento);
      const dias = Math.floor((fecha - hoy) / (1000 * 60 * 60 * 24));

      if (dias < 0) {
        vencidos.push({ ...prod, dias });
      } else if (dias <= 90) {
        porVencer.push({ ...prod, dias });
      }
    });

    return { vencidos, porVencer, stockBajo };
  }, [productos]);

  return resultado;
}

export default useVencimientos;
