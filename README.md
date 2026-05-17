# random-lab-color

Generate a random CSS LAB color.

## Installation

```bash
npm install --save random-lab-color
```

## Usage

`randomLABColor` returns a random color in CSS `lab()` syntax. Set the final
argument to `true` when you need the generated channel values as an object
instead of a color string.

```javascript
const randomLABColor = require('random-lab-color');

console.log(randomLABColor());
// LAB(58% -16 -30 / 0.62)

console.log(randomLABColor(58, 58, -16, -16, -30, -30, 1, 1));
// LAB(58% -16 -30)

console.log(randomLABColor(85, 85, -37, -37, 63, 63, 0.92, 0.92, true));
// { lightness: '85%', a: '-37', b: '63', alpha: '0.92' }
```

## API

```javascript
randomLABColor(
  minL,
  maxL,
  minA,
  maxA,
  minB,
  maxB,
  minAlpha,
  maxAlpha,
  useObjectExport
);
```

All arguments are optional.

| Argument | Default | Description |
| --- | ---: | --- |
| `minL` | `0` | Minimum lightness percentage. |
| `maxL` | `100` | Maximum lightness percentage. |
| `minA` | `-128` | Minimum `a` channel value. |
| `maxA` | `127` | Maximum `a` channel value. |
| `minB` | `-128` | Minimum `b` channel value. |
| `maxB` | `127` | Maximum `b` channel value. |
| `minAlpha` | `0` | Minimum alpha value. Must be between `0` and `1`. |
| `maxAlpha` | `1` | Maximum alpha value. Must be between `0` and `1`. |
| `useObjectExport` | `false` | Return an object instead of a LAB string. |

String output omits the alpha segment when alpha is `1`, because fully opaque
CSS LAB colors do not need an explicit alpha value.

Object output contains formatted string values:

- **lightness**: The value of the lightness channel (range: 0 to 100).
- **a**: The value of the a channel (range: -128 to 127).
- **b**: The value of the b channel (range: -128 to 127).
- **alpha**: The alpha value (range: 0 to 1).

The function throws a `TypeError` when a range value is not a finite number. It
throws a `RangeError` when a minimum value is greater than its maximum, or when
an alpha value is outside the CSS alpha range of `0` to `1`.

## Testing

```bash
npm test
```

## Acknowledgements

This package is inspired by the generative color concept and the need for random color generation. It is crafted to simplify the process of generating random LAB colors.

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Additional Resources

Here are some additional resources that provide information about the LAB color space:

- [LAB Color Space on Wikipedia](https://en.wikipedia.org/wiki/CIELAB_color_space)
- [Color Spaces Explained on Adobe Developer](https://www.adobe.io/photoshop/uxp/guides/color-spaces/)
- [Generative Art and Color Spaces on Medium](https://medium.com/generative-art/color-spaces-for-generative-art-d807da71fc7b)

Crafted for generative doings by [Adam Morse](https://mrmrs.cc).
