# random-lab-color

Generate a random LAB color.

## Installation

```bash
npm install --save random-lab-color
```

## Usage

The `randomLABColor` function can be used to generate a random LAB color. By default, it returns the color as a string in the `LAB(L A B / A%)` format. However, you can also opt to get an object representation of the color by setting the `useObjectExport` parameter to `true`.

```javascript
const randomLABColor = require('random-lab-color');

// Generate random LAB color as a string
console.log(randomLABColor()); // LAB(58% -16 -30)
console.log(randomLABColor(0, 100, -128, 127, -128, 127, 0, 1)); // LAB(34 58 -73 / 62)

// Generate random LAB color as an object
console.log(randomLABColor(0, 100, -128, 127, -128, 127, 0, 1, true));
// { lightness: '85%', a: -37, b: 63, alpha: '92%' }
```

In the object representation, the returned object contains the following properties:

- **lightness**: The value of the lightness channel (range: 0 to 100).
- **a**: The value of the a channel (range: -128 to 127).
- **b**: The value of the b channel (range: -128 to 127).
- **alpha**: The value of the alpha channel (range: 0 to 100).

By adjusting the input parameters and using the `useObjectExport` parameter, you can control the range of each channel and obtain the color as an object with the respective channel values.

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

Feel free to explore these resources to learn more about LAB and its applications in generative art and design.

Crafted for generative doings by [Adam Morse](https://mrmrs.cc).
