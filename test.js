'use strict';

const test = require('ava').default;
const randomLABColor = require('./');

test('returns a valid LAB color with integer channels by default', (t) => {
  for (let i = 0; i < 20; i++) {
    const color = randomLABColor();
    t.regex(color, /^lab\(\d+% -?\d+ -?\d+\)$/);
  }
});

test('returns a deterministic LAB string for fixed ranges', (t) => {
  t.is(randomLABColor(58, 58, -16, -16, -30, -30), 'lab(58% -16 -30)');
});

test('omits alpha when no alpha range is supplied', (t) => {
  t.notRegex(randomLABColor(58, 58, -16, -16, -30, -30), / \/ /);
});

test('includes alpha as a valid CSS number when requested', (t) => {
  t.is(randomLABColor(58, 58, -16, -16, -30, -30, 0.62, 0.62), 'lab(58% -16 -30 / 0.62)');
});

test('returns numeric channels when useObjectExport is true', (t) => {
  const color = randomLABColor(0, 100, -128, 127, -128, 127, 0, 1, true);

  t.is(typeof color.lightness, 'number');
  t.is(typeof color.a, 'number');
  t.is(typeof color.b, 'number');
  t.is(typeof color.alpha, 'number');
  t.true(color.lightness >= 0 && color.lightness <= 100);
  t.true(color.a >= -128 && color.a <= 127);
  t.true(color.b >= -128 && color.b <= 127);
  t.true(color.alpha >= 0 && color.alpha <= 1);
});

test('omits alpha from object output when not requested', (t) => {
  const color = randomLABColor(0, 100, -128, 127, -128, 127, undefined, undefined, true);
  t.false('alpha' in color);
});

test('accepts decimal ranges and emits two-decimal channels', (t) => {
  for (let i = 0; i < 20; i++) {
    const color = randomLABColor(0.5, 99.5, -10.5, 10.5, -20.5, 20.5);
    t.regex(color, /^lab\(\d+(?:\.\d{2})?% -?\d+(?:\.\d{2})? -?\d+(?:\.\d{2})?\)$/);
  }
});

test.serial('validates ranges before generating any random values', (t) => {
  const originalRandom = Math.random;
  let calls = 0;
  Math.random = () => {
    calls++;
    return 0.5;
  };

  try {
    t.throws(() => randomLABColor(100, 0), {
      instanceOf: RangeError,
      message: 'lightness minimum must be less than or equal to maximum'
    });
  } finally {
    Math.random = originalRandom;
  }

  t.is(calls, 0);
});

test('validates range values', (t) => {
  t.throws(() => randomLABColor(Number.NaN), {
    instanceOf: TypeError,
    message: 'lightness range must use finite numbers'
  });

  t.throws(() => randomLABColor(100, 0), {
    instanceOf: RangeError,
    message: 'lightness minimum must be less than or equal to maximum'
  });

  t.throws(() => randomLABColor(0, 100, -128, 127, -128, 127, 2, 1), {
    instanceOf: RangeError,
    message: 'alpha minimum must be less than or equal to maximum'
  });

  t.throws(() => randomLABColor(0, 100, -128, 127, -128, 127, -0.1, 1), {
    instanceOf: RangeError,
    message: 'alpha range must be between 0 and 1'
  });
});
