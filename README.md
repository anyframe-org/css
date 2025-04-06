# AnyFrame/css

`anyframe/css` is a **utility-first CSS framework** with rich features, fast, and easy to customize.

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
import { AnyCSS } from '@anyframe/css'

const css = AnyCSS({
  /* configuration here */
})

console.log(css.render(['bg-red-500', 'flex']))
```

## License

MIT © 2025 AnyFrame Org.
