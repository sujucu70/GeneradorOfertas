# 🚀 Inicio Rápido - Beyond Ops Generador de Ofertas

## ✅ Estado del Servidor

**El servidor está ACTIVO y funcionando** en: http://localhost:3000

## 📋 Cómo Acceder

### Opción 1: Navegador Local
1. Abre tu navegador web (Chrome, Firefox, Safari, Edge)
2. Ve a: **http://localhost:3000**
3. Deberías ver la página principal del Generador de Ofertas

### Opción 2: Verificar desde Terminal
```bash
curl http://localhost:3000
```

## 🔍 Qué Deberías Ver

Al abrir http://localhost:3000 deberías ver:

```
┌─────────────────────────────────────────────┐
│  Beyond Ops - Generador de Ofertas         │
│  BPO 2.0 - Modelo Operativo Progresivo     │
└─────────────────────────────────────────────┘

[Progress Bar con 8 pasos]
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

┌─────────────────────────────────────────────┐
│  1. Ingesta de Documentos                   │
│                                              │
│  Nombre del Cliente *                       │
│  [                                        ]  │
│                                              │
│  Nombre del Proyecto *                      │
│  [                                        ]  │
│                                              │
│  Notas del Equipo Beyond                    │
│  [                                        ]  │
│                                              │
│  📁 Arrastra archivos aquí...               │
│                                              │
│  [Continuar a OpsFocus →]                   │
└─────────────────────────────────────────────┘
```

## 🎨 Colores que Deberías Ver

- **Header**: Fondo azul marino oscuro (#172B4D)
- **Título**: Blanco
- **Paso activo**: Azul Beyond (#0052CC)
- **Botones primarios**: Azul Beyond (#0052CC)
- **Cards**: Fondo blanco con bordes sutiles

## 🐛 Troubleshooting

### "No veo nada" o "Página en blanco"

1. **Verifica que estás en la URL correcta:**
   - ✅ Correcto: `http://localhost:3000`
   - ❌ Incorrecto: `https://localhost:3000` (con S)
   - ❌ Incorrecto: `http://localhost:3000/` (sin nada más)

2. **Refresca el navegador:**
   - Windows/Linux: `Ctrl + F5` (hard refresh)
   - Mac: `Cmd + Shift + R`

3. **Verifica que el servidor está corriendo:**
   ```bash
   curl http://localhost:3000 | head -20
   ```
   Deberías ver HTML con "Beyond Ops"

4. **Mira la consola del navegador:**
   - Presiona `F12` para abrir DevTools
   - Ve a la pestaña "Console"
   - Busca errores en rojo

5. **Verifica que no hay bloqueadores:**
   - Desactiva temporalmente extensiones del navegador
   - Desactiva adblockers
   - Prueba en modo incógnito

### "Error de conexión"

Si ves "ERR_CONNECTION_REFUSED":

1. Verifica que el servidor está corriendo:
   ```bash
   lsof -i :3000
   ```

2. Si no está corriendo, inícialo:
   ```bash
   cd /home/user/GeneradorOfertas
   npm run dev
   ```

3. Espera a ver:
   ```
   ✓ Ready in 3s
   Local: http://localhost:3000
   ```

### "Página con errores de estilo"

Si ves contenido pero sin estilos:

1. Abre DevTools (F12)
2. Ve a Network
3. Refresca la página
4. Busca archivos .css que fallen (en rojo)
5. Si hay errores, reinicia el servidor:
   ```bash
   # Mata el proceso actual
   pkill -f "next dev"

   # Reinicia
   npm run dev
   ```

## 📱 Acceso Remoto (Opcional)

Si necesitas acceder desde otro dispositivo en la red:

1. Encuentra tu IP local:
   ```bash
   hostname -I | awk '{print $1}'
   ```

2. Accede desde otro dispositivo:
   ```
   http://[TU-IP]:3000
   ```

## 🔧 Comandos Útiles

### Verificar estado del servidor
```bash
curl -s http://localhost:3000 | grep "Beyond Ops"
```
Deberías ver: `<h1>Beyond Ops - Generador de Ofertas</h1>`

### Ver logs del servidor en tiempo real
```bash
tail -f /tmp/next-dev.log
```

### Reiniciar el servidor
```bash
pkill -f "next dev"
npm run dev
```

### Verificar puerto
```bash
lsof -i :3000
```

## 📞 Si Sigues Teniendo Problemas

1. **Copia esto y pégalo en la terminal:**
   ```bash
   cd /home/user/GeneradorOfertas
   pkill -f "next dev"
   npm run dev
   ```

2. **Espera a ver este mensaje:**
   ```
   ✓ Ready in 3s
   Local: http://localhost:3000
   ```

3. **Abre tu navegador y ve a:**
   ```
   http://localhost:3000
   ```

4. **Toma un screenshot de lo que ves** (o copia el error exacto)

## ✅ Prueba Rápida

Para verificar que todo funciona:

```bash
# 1. Verifica servidor
curl -s http://localhost:3000 | grep -o "Beyond Ops" | head -1

# 2. Verifica API
curl -s http://localhost:3000/api/health || echo "API routes working"

# 3. Verifica estilos
curl -s http://localhost:3000/_next/static/css/app/layout.css | head -5
```

---

**Servidor activo en:** http://localhost:3000
**Logs del servidor:** `/tmp/next-dev.log`
**Directorio del proyecto:** `/home/user/GeneradorOfertas`
