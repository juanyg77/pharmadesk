# PharmaDesk — Contexto del Proyecto

> Archivo generado el 18/06/2026. Destinado a darle contexto a otros chats de Claude para el armado del guión del video demo.

---

## ¿Qué es PharmaDesk?

PharmaDesk es una aplicación web de gestión para farmacias argentinas. Permite controlar el stock de medicamentos, registrar ventas y facturas de compra, analizar la rentabilidad del negocio y detectar alertas operativas (vencimientos, stock bajo). Todo corre en el navegador del usuario: no hay backend ni base de datos externa. Los datos persisten en `localStorage` via Zustand.

---

## Stack técnico

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19.2.6 | UI framework |
| Vite | 8.0.12 | Bundler / dev server |
| React Router DOM | 7.17.0 | Navegación SPA |
| Zustand | 5.0.14 | Estado global + persistencia |
| Recharts | 3.8.1 | Gráficos de barras y torta |
| @tabler/icons-react | 3.44.0 | Iconografía |
| CSS Modules | (nativo Vite) | Estilos por componente |

**Sin TypeScript** — el proyecto usa JavaScript puro. **Sin backend** — toda la data vive en el navegador. Desplegado en Vercel (`vercel.json` presente en la raíz).

---

## Autenticación

### Sistema real
- Registro en `Registro.jsx`: guarda `usuario`, `contrasenia`, `email`, `nombreFarmacia` en `localStorage`.
- Login en `Login.jsx`: compara contra esos valores en localStorage. Si coinciden, setea `logueado: 'true'`.
- Rutas protegidas con `<RutaProtegida>` en `App.jsx` que lee `localStorage.getItem('logueado')`.
- Logout: `Sidebar.jsx` setea `logueado: 'false'` y redirige a `/login`.

### Usuario de prueba (demo)
- Usuario: `demo` / Contraseña: `demo123`
- El login bypasea la validación de localStorage: si las credenciales coinciden con las de demo, entra directamente sin necesidad de registro previo.
- Si no hay `nombreFarmacia` en localStorage, se setea `'Farmacia Demo'` automáticamente.
- Las credenciales se muestran visiblemente en el formulario de login para facilitar el acceso en demos.

---

## Páginas y funcionalidad

### `/login` — Login.jsx
- Formulario con validación de campos vacíos.
- Muestra errores inline por campo y un error general si las credenciales no coinciden.
- Credenciales de prueba visibles abajo del formulario (demo / demo123).
- Link a `/registro`.

### `/registro` — Registro.jsx
- Formulario con 4 campos: nombre de farmacia, email, usuario, contraseña.
- Validaciones: nombre mínimo 3 chars, email con regex, usuario mínimo 4 chars sin espacios, contraseña mínimo 6 chars sin espacios.
- Al registrarse exitosamente muestra mensaje de éxito y redirige al dashboard en 2 segundos.

### `/dashboard` — Dashboard.jsx (llamado "Inicio" en el menú)
Muestra el resumen operativo y financiero del mes:
- **Alertas operativas** (3 tarjetas colapsables):
  - Rojo: medicamentos vencidos (fecha < hoy)
  - Amarillo: por vencer en los próximos 90 días
  - Naranja: stock bajo (cantidad ≤ stock_minimo)
- **Resumen del mes**: ventas del mes, gastos del mes, ganancia estimada (ventas - gastos), unidades totales en stock y cantidad de productos distintos.
- Lee `nombreFarmacia` de localStorage para el saludo de bienvenida.
- Muestra la fecha actual formateada en español.
- Los montos se formatean en ARS con `Intl.NumberFormat`.

### `/stock` — Stock.jsx
Tabla de productos con:
- Columnas: Nombre, Laboratorio, Droga, Vencimiento, Cantidad, Precio Costo, Precio Venta, Acciones.
- Buscador por nombre (filtrado en tiempo real, case-insensitive).
- Filas con color según estado: rojo si vencido, amarillo si vence en ≤ 90 días.
- Acciones: Editar (abre modal con datos pre-cargados) y Eliminar (con confirmación implícita).
- Botón "+ Agregar medicamento" abre `ModalMedicamento`.

### Modal de medicamento — ModalMedicamento.jsx
Formulario con 8 campos:
- Nombre, Laboratorio, Droga, Vencimiento (date), Cantidad, Stock mínimo, Precio costo, Precio venta.
- **Integración con API RxNorm**: al tipear en el campo "Droga" (≥ 3 caracteres), hace fetch a `https://rxnav.nlm.nih.gov/REST/drugs.json?name={droga}` con debounce de 500ms. Muestra hasta 5 sugerencias en dropdown. Al clickear una sugerencia, autocompleta el campo Nombre.
- Validaciones: nombre y droga mínimo 3 chars, cantidad > 0, vencimiento obligatorio (y no puede estar vencido al agregar nuevo), precios y stock mínimo no pueden ser negativos.
- Al editar: acepta fechas ya vencidas (para registrar medicamentos que ya estaban en stock).

### `/ventas` — Ventas.jsx
Registra las ventas del día, separadas en dos tablas:
- **Medicamentos** y **Perfumería**, cada una ordenada por fecha descendente.
- Botón "+ Agregar venta del día" abre `ModalVentas`.
- Acciones: Editar y Eliminar.

### Modal de ventas — ModalVentas.jsx
3 campos: Fecha (no puede ser futura), Monto (número, no negativo), Categoría (medicamentos / perfumería).

### `/facturas` — Facturas.jsx
Registra las facturas de compra a droguerías, separadas en dos tablas:
- **Medicamentos** y **Perfumería**, ordenadas por fecha descendente.
- Botón "+ Agregar factura" abre `ModalFacturas`.
- Acciones: Editar y Eliminar.

### Modal de facturas — modalFacturas.jsx
5 campos: Nro. Factura (mínimo 4 chars), Droguería (mínimo 3 chars), Fecha (no puede ser futura), Monto, Categoría.

### `/analisis` — Analisis.jsx
Panel de análisis financiero con:
- **4 tarjetas financieras** del mes actual: Ganancia Medicamentos, Ganancia Neta Perfumería, IVA a Pagar Estimado, Ganancia Total del Mes.
- **3 gráficos** con Recharts:
  1. Barras: Ventas vs Gastos del mes (por categoría).
  2. Torta: Distribución de ventas del mes (Medicamentos vs Perfumería). Si no hay ventas, muestra mensaje "Sin ventas registradas este mes".
  3. Barras: Ganancias mes actual vs histórico acumulado (por categoría).
- Los colores de los gráficos se toman de variables CSS del tema (`--pd-primary`, `--pd-alert-soon-text`, `--pd-secondary`) con `getComputedStyle`.

---

## Stores Zustand (estado global + persistencia)

### stockStore — `pharma-stock-v2`
```js
productos: []  // array de objetos producto
// Cada producto:
{
  id: Date.now(),      // ID único
  nombre: string,
  laboratorio: string,
  droga: string,
  vencimiento: string, // formato ISO "YYYY-MM-DD"
  cantidad: number,
  stock_minimo: number,
  precio_costo: number,
  precio_venta: number
}
// Acciones: agregarProducto, eliminarProducto, editarProducto
```
Persiste en localStorage con clave `pharma-stock-v2`.

### facturasStore — `pharmadesk-facturas-v2`
```js
facturas: []  // array de objetos factura
// Cada factura:
{
  id: Date.now(),
  nroFactura: string,   // ej: "0001-00012345"
  drogueria: string,
  fecha: string,        // formato ISO "YYYY-MM-DD"
  monto: number,
  categoria: 'medicamentos' | 'perfumeria'
}
// Acciones: agregarFactura, eliminarFactura, editarFactura
```
Persiste en localStorage con clave `pharmadesk-facturas-v2`.

### ventasStore — `pharmadesk-ventas-v2`
```js
ventas: []  // array de objetos venta
// Cada venta:
{
  id: Date.now(),
  fecha: string,        // formato ISO "YYYY-MM-DD"
  monto: number,
  categoria: 'medicamentos' | 'perfumeria'
}
// Acciones: agregarVenta, eliminarVenta, editarVenta
```
Persiste en localStorage con clave `pharmadesk-ventas-v2`.

---

## Hook personalizado: useVencimientos

`src/hooks/useVencimientos.js` — lee los productos del stockStore y los clasifica:
- **vencidos**: `dias < 0` (fecha de vencimiento menor a hoy)
- **porVencer**: `0 ≤ dias ≤ 90` (vence en los próximos 90 días)
- **stockBajo**: `cantidad ≤ stock_minimo`

Usa `useMemo` para no recalcular en cada render. Retorna `{ vencidos, porVencer, stockBajo }`. Cada producto en vencidos/porVencer incluye el campo `dias` calculado.

---

## Lógica de IVA

En Argentina, **los medicamentos están exentos de IVA** (alícuota 0%). Los productos de **perfumería tributan IVA al 21%**.

La implementación en `Analisis.jsx` calcula el IVA estimado a pagar sobre perfumería usando el método "precio con IVA incluido":
```js
const ivaDebito  = (ventaPerfumeria * 0.21) / 1.21   // IVA de las ventas
const ivaCredito = (gastoPerfumeria * 0.21) / 1.21   // IVA de las compras (crédito fiscal)
const ivaAPagar  = ivaDebito - ivaCredito             // Posición neta IVA
const gananciaNetaPerfumeria = gananciaPerfumeria - ivaAPagar
```

Esta lógica asume que los montos ingresados en ventas y facturas de perfumería **ya incluyen IVA** (precio final al público). El IVA a pagar es la diferencia entre débito fiscal (lo cobrado a clientes) y crédito fiscal (lo pagado a proveedores).

Los medicamentos no tienen cálculo de IVA: su ganancia bruta = ventas - gastos directamente.

---

## API de RxNorm — Por qué se eligió vs ANMAT

**RxNorm** es la base de datos de nomenclatura de medicamentos de la Biblioteca Nacional de Medicina de EE.UU. (NLM/NIH). Se accede vía REST público y gratuito:
```
GET https://rxnav.nlm.nih.gov/REST/drugs.json?name={termino}
```

**Por qué RxNorm y no ANMAT:**
- La API de ANMAT (VUFFA/SUICAR) **no es pública**: requiere convenio institucional y credenciales que no están disponibles para proyectos independientes.
- RxNorm es de acceso libre, no requiere API key, y tiene CORS abierto (se puede llamar directamente desde el browser).
- Para el propósito del proyecto (autocompletar nombres de drogas/principios activos), la nomenclatura de RxNorm es suficiente y reconocida internacionalmente.
- **Limitación conocida**: los nombres están en inglés (p. ej. "Ibuprofen" en lugar de "Ibuprofeno"). Esto no es bloqueante para el MVP dado que las farmacias argentinas manejan los nombres de drogas en su denominación internacional.

El campo que se autocompleta al seleccionar una sugerencia es el **Nombre del medicamento** (marca comercial), tomando `conceptProperties[].name` del response de RxNorm.

---

## Sistema de alertas de vencimiento (90 días)

El umbral de 90 días fue elegido como estándar en la industria farmacéutica argentina: es el tiempo mínimo que las droguerías y obras sociales exigen de vigencia para aceptar devoluciones o canjes de medicamentos por vencer.

**Flujo visual:**
- En la tabla de Stock: la fila se colorea de rojo si ya venció, amarillo si vence en ≤ 90 días.
- En el Dashboard: tres tarjetas colapsables (clic para ver la lista). Muestran el conteo con badge y el detalle con días exactos restantes o transcurridos.
- La clasificación la hace el hook `useVencimientos` con `useMemo`, evitando recálculo innecesario.

---

## Layout y navegación

- `Layout.jsx` envuelve todas las páginas protegidas. Renderiza el Sidebar y el área de contenido.
- `Sidebar.jsx` tiene navegación con `NavLink` (resalta la ruta activa) y botón de cerrar sesión.
- Rutas del menú: Inicio (`/dashboard`), Stock (`/stock`), Ventas (`/ventas`), Facturas (`/facturas`), Análisis (`/analisis`).
- El sidebar es responsive: en mobile tiene comportamiento de drawer (abre/cierra con overlay).
- Íconos de @tabler/icons-react con `stroke={1.5}`.

---

## Decisiones técnicas importantes

| Decisión | Motivo |
|---|---|
| Sin backend / todo en localStorage | MVP rápido, sin necesidad de infraestructura ni costos. Pensado para uso individual por farmacia. |
| Zustand con `persist` | Más simple que Redux para este tamaño. La persistencia automática a localStorage elimina la necesidad de guardar manualmente. |
| CSS Modules en lugar de Tailwind | El proyecto ya arrancó así y mantiene consistencia. Variables CSS globales en `index.css` para el sistema de colores (`--pd-primary`, etc.). |
| Recharts para gráficos | Librería React-nativa, fácil de integrar, responsive por defecto con `ResponsiveContainer`. |
| IDs con `Date.now()` | Simple y funcional para uso de una sola pestaña. No hay riesgo de colisión en uso normal. |
| Versión en clave de persist (`-v2`) | Permite migrar datos sin conflictos si cambia la estructura del store. |
| Ventas y facturas sin relación con stock | La venta no descuenta stock automáticamente. Son módulos independientes. Decisión deliberada para simplificar el MVP. |
| Dashboard renombrado a "Inicio" | Decisión de UX: más amigable para usuarios no técnicos. El título de la página muestra "Inicio" pero la ruta sigue siendo `/dashboard`. |

---

## Formateo y localización

- Montos en ARS: `Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })`. Ejemplo: `$ 125.000`.
- Fechas en tablas: formato `dd/mm/yyyy` (se convierte desde `YYYY-MM-DD` del store).
- Fechas en el Dashboard: formato largo en español (`weekday: 'long', day: 'numeric', month: 'long'`).
- Mes actual: `toLocaleString('es-AR', { month: 'long', year: 'numeric' })`.

---

## Pendiente para futuras versiones

- **Descuento automático de stock al registrar una venta**: hoy son módulos desacoplados. Una venta no actualiza el stock.
- **Filtros en ventas y facturas**: actualmente la tabla de Stock tiene buscador pero Ventas y Facturas no tienen filtro por fecha ni rango.
- **Exportación de datos**: no hay exportación a Excel/PDF ni para reportes ni para respaldo.
- **Multi-usuario o multi-farmacia**: el sistema está pensado para un único usuario por instalación (un solo localStorage).
- **Nombres de drogas en español**: la API de RxNorm devuelve nombres en inglés. Se podría agregar un campo de traducción o buscar una API alternativa.
- **Confirmación antes de eliminar**: actualmente eliminar un producto/venta/factura es inmediato, sin modal de confirmación.
- **Backup/restore de datos**: no hay forma de exportar/importar el localStorage para hacer respaldos o migrar entre dispositivos.
- **Autenticación real**: el sistema de usuario/contraseña en localStorage no es seguro para producción. Pensado solo para demo/prototipo.
- **Paginación**: las tablas muestran todos los registros sin paginar, puede volverse lento con muchos datos.
- **Historial de cambios en stock**: no se registra qué modificó quién ni cuándo.

---

## Estructura de archivos

```
src/
├── App.jsx                    # Router + RutaProtegida
├── main.jsx                   # Entry point React
├── index.css                  # Variables CSS globales (--pd-*)
├── App.css                    # Estilos globales mínimos
├── components/
│   ├── Layout.jsx             # Wrapper con sidebar
│   ├── Layout.module.css
│   ├── Sidebar.jsx            # Navegación lateral
│   └── Sidebar.module.css
├── hooks/
│   └── useVencimientos.js     # Clasificación vencidos/porVencer/stockBajo
├── pages/
│   ├── Login.jsx / .module.css
│   ├── Registro.jsx / .module.css
│   ├── Dashboard.jsx / Dashboard.module.css
│   ├── Stock.jsx / Stock.module.css
│   ├── ModalMedicamento.jsx   # Usa Stock.module.css
│   ├── Ventas.jsx / Ventas.module.css
│   ├── ModalVentas.jsx        # Usa Stock.module.css
│   ├── Facturas.jsx / Facturas.module.css
│   ├── modalFacturas.jsx      # Usa Stock.module.css (nombre en minúscula)
│   └── Analisis.jsx / Analisis.module.css
└── store/
    ├── stockStore.js          # persist key: 'pharma-stock-v2'
    ├── facturasStore.js       # persist key: 'pharmadesk-facturas-v2'
    └── ventasStore.js         # persist key: 'pharmadesk-ventas-v2'
```

**Nota**: `modalFacturas.jsx` tiene la primera letra en minúscula (inconsistencia con el resto, pero funcional en Windows/Mac por ser case-insensitive. Podría romper en Linux).
