'use strict';

const test = require('ava').default;
const randomLABColor = require('./');

test('returns a deterministic LAB string for fixed ranges', (t) => {
  t.is(randomLABColor(58, 58, -16, -16, -30, -30, 1, 1), 'LAB(58% -16 -30)');
});

test('includes alpha as a valid CSS number when the color is transparent', (t) => {
  t.is(randomLABColor(58, 58, -16, -16, -30, -30, 0.62, 0.62), 'LAB(58% -16 -30 / 0.62)');
});

test('returns a deterministic object representation for fixed ranges', (t) => {
  t.deepEqual(randomLABColor(85, 85, -37, -37, 63, 63, 0.92, 0.92, true), {
    lightness: '85%',
    a: '-37',
    b: '63',
    alpha: '0.92',
  });
});

test('should return an object with valid LAB color values', (t) => {
  t.plan(40);

  for (let i = 0; i < 10; i++) {
    const color = randomLABColor(0, 100, -128, 127, -128, 127, 0, 1, true);
    t.true(Number(color.lightness.replace('%', '')) >= 0 && Number(color.lightness.replace('%', '')) <= 100);
    t.true(Number(color.a) >= -128 && Number(color.a) <= 127);
    t.true(Number(color.b) >= -128 && Number(color.b) <= 127);
    t.true(Number(color.alpha) >= 0 && Number(color.alpha) <= 1);
  }
});

test('rejects non-finite range values', (t) => {
  t.throws(() => randomLABColor(Number.NaN), {
    instanceOf: TypeError,
    message: 'lightness range values must be finite numbers',
  });
});

test('rejects reversed ranges', (t) => {
  t.throws(() => randomLABColor(100, 0), {
    instanceOf: RangeError,
    message: 'lightness minimum must be less than or equal to maximum',
  });
});

test('rejects alpha values outside the CSS range', (t) => {
  t.throws(() => randomLABColor(0, 100, -128, 127, -128, 127, 0, 2), {
    instanceOf: RangeError,
    message: 'alpha range must be between 0 and 1',
  });
});
