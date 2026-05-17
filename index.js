'use strict';

const MAX_ALPHA = 1;

const assertFiniteRange = (channel, min, max) => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError(`${channel} range values must be finite numbers`);
  }

  if (min > max) {
    throw new RangeError(`${channel} minimum must be less than or equal to maximum`);
  }
};

const assertAlphaRange = (min, max) => {
  assertFiniteRange('alpha', min, max);

  if (min < 0 || max > MAX_ALPHA) {
    throw new RangeError('alpha range must be between 0 and 1');
  }
};

const trimNumber = (value, fractionDigits) => {
  const fixed = value.toFixed(fractionDigits);

  return fixed.includes('.') ? fixed.replace(/\.?0+$/, '') : fixed;
};

const randomFloat = (min, max) => Math.random() * (max - min) + min;

const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const formatPercentage = (value) => `${trimNumber(value, 2)}%`;

const formatChannelValue = (value) => trimNumber(value, 0);

const formatAlpha = (value) => trimNumber(value, 2);

module.exports = function randomLABColor(
  minL = 0,
  maxL = 100,
  minA = -128,
  maxA = 127,
  minB = -128,
  maxB = 127,
  minAlpha = 0,
  maxAlpha = 1,
  useObjectExport = false
) {
  assertFiniteRange('lightness', minL, maxL);
  assertFiniteRange('a', minA, maxA);
  assertFiniteRange('b', minB, maxB);
  assertAlphaRange(minAlpha, maxAlpha);

  const lightness = formatPercentage(randomFloat(minL, maxL));
  const a = formatChannelValue(randomInteger(minA, maxA));
  const b = formatChannelValue(randomInteger(minB, maxB));
  const alpha = formatAlpha(randomFloat(minAlpha, maxAlpha));

  if (useObjectExport) {
    return { lightness, a, b, alpha };
  }

  return `LAB(${lightness} ${a} ${b}${alpha === '1' ? '' : ` / ${alpha}`})`;
};
