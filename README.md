# AnyFrame/css

`anyframe/css` is a **utility-first CSS framework** with rich features, fast, and easy to customize. We use `tenoxui` library for the style computation since this library is small and lightweight.

## Installation

```bash
npm i @anyframe/css
```

## Imports

```javascript
// esm
import { AnyCSS } from '@anyframe/css'

// cjs
const { AnyCSS } = require('@anyframe/css')

// iife
const { AnyCSS } = __anyframe_css__
```

## Usage Example

```javascript
const css = AnyCSS({
  /* configuration here */
})

console.log(ui.render(['bg-red-500', 'flex']))
```

## License

MIT © 2025 AnyFrame Org.
