# Telectro — Web Corporativa

> **Telectro. Conectamos seguridad y energía.**
> Empresa de instalaciones eléctricas | Castellón, España

---

## Descripción

Web corporativa de **Telectro**, empresa de instalaciones eléctricas fundada por **David Strujac, José Jiménez y Erik Lozano**. Especializada en instalaciones, mantenimiento 24h, domótica y fotovoltaica en la provincia de Castellón.

### Secciones incluidas
- **Hero** — Presentación con badge de disponibilidad 24h y estadísticas animadas
- **Barra de confianza** — Indicadores de valor diferencial
- **Nosotros** — Los 3 pilares: Mantenimiento, Montaje y Revisión
- **Servicios** — 6 servicios: Instalaciones, Urgencias 24h, Mantenimiento Industrial, Domótica, Fotovoltaica, Puntos de Recarga VE
- **¿Por qué elegirnos?** — Ventajas competitivas (servicio 24h, garantía 6 meses, precios transparentes)
- **Precios orientativos** — Tarifas base con opción de financiación
- **Equipo** — David, José y Erik con sus roles
- **Contacto** — Formulario con validación y teléfono de urgencias
- **Footer** — Links, redes sociales y zonas de actuación

---

## Archivos del proyecto

```
telectro/
├── index.html       ← Estructura HTML semántica
├── styles.css       ← Todos los estilos (paleta navy + amarillo)
├── script.js        ← JS: navbar, menú, reveal, contadores, formulario
├── assets/
│   ├── images/
│   │   ├── hero-bg.png
│   │   ├── team.png
│   │   ├── service1.png
│   │   ├── service2.png
│   │   └── logo.png
│   └── icons/
└── README.md
```

---

## Datos técnicos de Telectro (del Plan de Empresa)

| Concepto | Detalle |
|---|---|
| Nombre | Telectro |
| Eslogan | "Conectamos seguridad y energía" |
| Socios | David Strujac, José Jiménez, Erik Lozano |
| Ubicación | Castellón y provincia |
| Servicio | 24h / 365 días |
| Garantía | 6 meses en instalaciones y reparaciones |
| Target | Familias renta media-alta e industria |
| Precio avería | desde 418 € |
| Precio instalación | desde 1.191 € |
| Precio mantenimiento | desde 284 € |

---

## Cómo usarlo localmente

1. Abre la carpeta `telectro/` con tu editor favorito
2. Abre `index.html` directamente en el navegador
3. O usa **Live Server** en VS Code para recarga automática

---

## Subir a GitHub Pages

### 1. Crear repositorio en GitHub
```
github.com → New repository → nombre: telectro
Márcar: Public ✓ | Add README: No
```

### 2. Subir archivos (desde la carpeta telectro/)
```bash
git init
git add .
git commit -m "🚀 Primer commit - Web Telectro"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/telectro.git
git push -u origin main
```

### 3. Activar GitHub Pages
```
Repositorio → Settings → Pages
Source: Deploy from branch → main → / (root)
→ Save
```

La web estará disponible en:  
`https://TU_USUARIO.github.io/telectro`

---

## Personalización

Antes de publicar, actualiza en `index.html`:
- **Teléfono real** → busca `+34 600 000 000`
- **Email real** → busca `info@telectro.es`
- **Redes sociales** → sección footer, atributo `href`

En `styles.css` puedes cambiar los colores en `:root`:
- `--navy` → color de fondo principal
- `--yellow` → color de acento (amarillo eléctrico)

---

*Proyecto creado para Telectro — Strujac, Jiménez & Lozano © 2025*
