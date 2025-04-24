# AnyFrame/css

`anyframe/css` is a **utility-first CSS framework** with rich features, modern, and easy to customize.

## Features

This package is a fork of [`tenoxui/static`](https://github.com/tenoxui/tenoxui/tree/main/packages/%40tenoxui-static), but with additional :

- **Ready to Use Preset** - Use various built-in `utilities` we create to laverage your development.
- **Better Prefix or Variants Handling** - Customize any or use basic variants like `hover:`, `dark:`, or use direct `[&_*:where(:is(.class))]:` is possible.
- **Palette Generator** - It's easy to create your palette just from single hex color.
- **Better Responsive Handling** - We use better responsive design rules when dealing with complex design.
- **Stricter Rules** - We add strict rules and condition to determine wether the class names are valid

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

// iife/cdn
<script src="https://cdn.jsdelivr.net/npm/@anyframe/css@latest/dist/anycss.iife.js"></script>
<script>
  const { AnyCSS } = __anyframe_css__
</script>
```

## Usage Example

```javascript
import { AnyCSS } from '@anyframe/css'

const css = new AnyCSS({
  /* other configuration here */
})

console.log(css.render(['bg-red-500', 'flex', 'md:flex', '[&.active]:bg-blue-500']))
```

Output:

```css
.bg-red-500 {
  background-color: oklch(61.2% 0.249 28.3);
}
.flex {
  display: flex;
}
.md\:flex {
  @media (width >= 48rem) {
    display: flex;
  }
}
.\[\&\.active\]\:bg-blue-500 {
  &.active {
    background-color: oklch(55.7% 0.24 260.9);
  }
}
```

## License

MIT © 2025 AnyFrame Org.
