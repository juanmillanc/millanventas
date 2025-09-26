# Millan Ventas

Aplicación Next.js + Firebase para gestionar productos, ventas, deudas y reportes. PWA lista para instalar.

## Requisitos
- Firebase (plan Spark)
- Vercel para hosting del frontend

## Configuración local
1. Copia `.env.example` a `.env.local` y completa con tus credenciales de Firebase.
2. Instala dependencias:

```
npm install
```

3. Levanta el entorno de desarrollo:

```
npm run dev
```

## Variables de entorno (.env.local)
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## Pasos en Firebase
- Crea un proyecto en Firebase Console.
- Añade una App Web y copia las credenciales a `.env.local`.
- Habilita Authentication (Email/Password) y crea tu usuario (solo tú).
- Activa Firestore en modo Production.

## Deploy en Vercel
- Crea proyecto desde este repo.
- Configura las variables de entorno (mismos nombres que `.env.example`).
- Build Command: `npm run build`.

## PWA
- `public/manifest.json` configurado.
- Service Worker con `next-pwa` (se activa en producción).
- Añade tus íconos en `public/icons/icon-192.png` y `public/icons/icon-512.png`.
- En el celular, usa "Agregar a pantalla de inicio" para instalar.

## Estructura
- `app/(dashboard)/*`: Ventas, Deudas, Reportes, Productos (protegidas)
- `app/login`: login con email/contraseña
- `lib/firebase.ts`: inicialización Firebase
- `app/providers/AuthProvider.tsx`: contexto de autenticación

## Próximos pasos
- Conectar Firestore (CRUD productos, registrar ventas y deudas)
- Validaciones con Zod y filtros/búsquedas
- Ajustes de estilos con Tailwind
