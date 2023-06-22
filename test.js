'use strict';

const test = require('ava');
const randomLABColor = require('./');

test('should return an object with valid LAB color values', (t) => {
  t.plan(40);

  for (let i = 0; i < 10; i++) {
    const color = randomLABColor(0, 100, -128, 127, -128, 127, 0, 1, true);
    t.true(Number(color.lightness.replace('%', '')) >= 0 && Number(color.lightness.replace('%', '')) <= 100);
    t.true(Number(color.a) >= -128 && Number(color.a) <= 127);
    t.true(Number(color.b) >= -128 && Number(color.b) <= 127);
    t.true(Number(color.alpha.replace('%', '')) >= 0 && Number(color.alpha.replace('%', '')) <= 100);
  }
});
