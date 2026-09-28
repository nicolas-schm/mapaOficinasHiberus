## Fijar una oficina concreta mediante parámetro en la URL

En cualquier URL del CMS donde esté embebido este mapa, se puede añadir el parámetro `oficina` en la query string para que el mapa cargue directamente centrado en esa sede, con el zoom cercano y el panel lateral abierto:

```
?oficina=madrid
?oficina=buenos-aires
```

Cuando la URL incluye este parámetro:

- El mapa aparece centrado en esa oficina, con el zoom ya cercano.
- El panel lateral se abre automáticamente y no se puede cerrar (sin botón de cerrar ni con la tecla Escape).
- Se ocultan el selector de región y el desplegable de país, para que no se pueda salir de esa vista.
- El mapa queda bloqueado: no se puede arrastrar, hacer zoom con scroll ni rotar.
- Solo se muestra el pin de esa oficina, ningún otro.

Sin el parámetro `oficina`, el mapa se comporta como siempre (vista global con todas las oficinas).

### Listado de identificadores por oficina

| Identificador (`?oficina=`) | Sede |
| --- | --- |
| `zaragoza` | Zaragoza |
| `madrid` | Madrid |
| `barcelona` | Barcelona |
| `alicante` | Alicante |
| `almeria` | Almería |
| `asturias` | Asturias |
| `bilbao` | Bilbao |
| `granada` | Granada |
| `lleida` | Lleida |
| `logrono` | Logroño |
| `mallorca` | Mallorca |
| `pamplona` | Pamplona |
| `santander` | Santander |
| `sevilla` | Sevilla |
| `soria` | Soria |
| `toledo` | Toledo |
| `valencia` | Valencia |
| `valladolid` | Valladolid |
| `vitoria` | Vitoria-Gasteiz |
| `miami` | Estados Unidos – Miami |
| `buenos-aires` | Argentina – Buenos Aires |
| `bogota` | Colombia – Bogotá |
| `quito` | Ecuador – Quito |
| `guayaquil` | Ecuador – Guayaquil |
| `cdmx` | México – Ciudad de México |
| `queretaro` | México – Querétaro |
| `santiago` | Chile – Santiago |
| `grafelfing` | Alemania – Gräfelfing |
| `andorra` | Andorra – Andorra la Vella |
| `milan` | Italia – Milán |
| `wroclaw` | Polonia – Wrocław |
| `varsovia` | Polonia – Varsovia |
| `londres` | Reino Unido – Londres |
| `bucarest` | Rumanía – Bucarest |
| `tetuan` | Marruecos – Tetuán |

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
