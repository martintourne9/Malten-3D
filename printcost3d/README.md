# PrintCost 3D SaaS · v0.4

Versión comercial del MVP de PrintCost 3D, enlazada al proyecto Supabase real y preparada para desplegarse como app web con cuentas, datos sincronizados y suscripción Pro.

## Incluye
- Next.js 16 App Router + TypeScript.
- Registro, login, logout, confirmación por email y recuperación de contraseña con Supabase Auth.
- Datos por usuario con Row Level Security (RLS).
- Calculadora de costos con recálculo en servidor.
- Historial sincronizado de cotizaciones.
- Configuración de impresora, material, electricidad y mano de obra.
- Plan Free con límite **en base de datos** de 5 cotizaciones por mes.
- Plan Pro sin límite de cotizaciones.
- Checkout recurrente preparado con Mercado Pago Suscripciones.
- Webhook de Mercado Pago con validación HMAC y activación/desactivación automática de Pro.
- Cancelación de Pro desde la app.
- UI responsive para celular y escritorio.

## 1. Crear Supabase
El proyecto real ya fue creado en Supabase:

- Project ref: `fophrvfeftitkgvbuzxu`
- Región: São Paulo (`sa-east-1`)
- Project URL y Publishable Key ya están cargados en `.env.example`.
- Migraciones `001_init.sql` y `002_quote_fk_indexes.sql` ya fueron aplicadas a producción.

Pendiente para producción web:
1. En Authentication > URL Configuration agregar la URL final de Vercel.
2. Copiar una **Secret Key** (`sb_secret_...`) desde Project Settings > API Keys a `SUPABASE_SECRET_KEY`.
3. La ruta `/auth/confirm` acepta tanto PKCE (`code`) como enlaces SSR con `token_hash`.

> La Secret Key es secreta y omite RLS. Nunca debe llevar prefijo `NEXT_PUBLIC_` ni guardarse en Git.

## 2. Configurar variables
Copiar `.env.example` como `.env.local` y completar las claves.

```bash
cp .env.example .env.local
```

## 3. Mercado Pago
1. Crear una aplicación en **Tus integraciones** de Mercado Pago Uruguay.
2. Copiar el Access Token productivo a `MERCADOPAGO_ACCESS_TOKEN`.
3. Configurar un Webhook apuntando a:

`https://TU-DOMINIO.com/api/webhooks/mercadopago`

4. Activar el evento **Planes y suscripciones / subscription_preapproval**.
5. Copiar la clave secreta del webhook a `MERCADOPAGO_WEBHOOK_SECRET`.
6. La app crea una suscripción mensual pendiente y redirige al `init_point` de Mercado Pago. Cuando Mercado Pago la confirma como `authorized`, el webhook cambia el usuario a `plan = pro`.

Precio de lanzamiento por defecto: **199 UYU/mes**. Se cambia con `PRO_PRICE_UYU` sin tocar el código.

## 4. Instalar y ejecutar
Requiere Node 22+.

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## 5. Desplegar en Vercel
1. Subir esta carpeta a GitHub.
2. Importar el repositorio en Vercel.
3. Agregar las variables de `.env.example` en Project Settings > Environment Variables.
4. Cambiar `NEXT_PUBLIC_APP_URL` por el dominio final.
5. En Supabase, agregar ese dominio a las URLs permitidas.
6. En Mercado Pago, configurar el webhook con el dominio final.
7. Ejecutar un pago de prueba antes de usar credenciales productivas.

## Seguridad aplicada
- La cuota Free se valida en Postgres, no solo en la interfaz.
- Cada tabla tiene RLS para que un usuario solo vea/modifique sus datos.
- Los usuarios autenticados no tienen permiso SQL para editar `plan` ni los campos de Mercado Pago; solo el backend con Service Role puede hacerlo.
- El cálculo se repite del lado servidor antes de guardar.
- El webhook valida `x-signature` con HMAC-SHA256 y comparación en tiempo constante.
- La Secret Key de Supabase y el Access Token de Mercado Pago solo se usan del lado servidor.

## Antes de vender al público
- Agregar Términos y Condiciones + Política de Privacidad.
- Definir email de soporte.
- Probar alta, renovación, rechazo y cancelación de suscripción.
- Configurar un dominio propio.
- Agregar analítica de conversión.
- Revisar textos legales y flujo de soporte antes del lanzamiento.

## Próximo sprint recomendado
1. Varias impresoras y materiales para Pro.
2. Clientes guardados.
3. Presupuesto PDF con logo.
4. Inventario de filamentos.
5. Plan anual.
6. Internacionalización y segundo proveedor de pagos para vender fuera de Uruguay.
