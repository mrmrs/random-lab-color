'use strict';

module.exports = function randomLABColor(
  minL = 0, maxL = 100,
  minA = -128, maxA = 127,
  minB = -128, maxB = 127,
  minAlpha, maxAlpha,
  useObjectExport = false
) {
  const includeAlpha = minAlpha !== undefined || maxAlpha !== undefined;
  const alphaLow = minAlpha ?? 0;
  const alphaHigh = maxAlpha ?? 1;

  validateRange('lightness', minL, maxL);
  validateRange('a', minA, maxA);
  validateRange('b', minB, maxB);
  if (includeAlpha) validateAlphaRange(alphaLow, alphaHigh);

  const lightness = randomChannelNumber(minL, maxL);
  const a = randomChannelNumber(minA, maxA);
  const b = randomChannelNumber(minB, maxB);
  const alpha = includeAlpha ? randomAlphaNumber(alphaLow, alphaHigh) : null;

  if (useObjectExport) {
    const result = { lightness, a, b };
    if (includeAlpha) result.alpha = alpha;
    return result;
  }

  const l = formatPercentOrNumber(lightness, minL, maxL);
  const aValue = formatPlainNumber(a);
  const bValue = formatPlainNumber(b);

  if (!includeAlpha) {
    return `lab(${l} ${aValue} ${bValue})`;
  }

  return `lab(${l} ${aValue} ${bValue} / ${formatAlpha(alpha)})`;
};

function randomChannelNumber(min, max) {
  if (Number.isInteger(min) && Number.isInteger(max)) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return randomTwoDecimalNumber(min, max);
}

function randomAlphaNumber(min, max) {
  return randomTwoDecimalNumber(min, max);
}

function randomTwoDecimalNumber(min, max) {
  const minBucket = Math.round(min * 100);
  const maxBucket = Math.round(max * 100);
  const bucket = Math.floor(Math.random() * (maxBucket - minBucket + 1)) + minBucket;
  return bucket / 100;
}

function formatPercentOrNumber(value, min, max) {
  if (min > 1 || max > 1) {
    if (Number.isInteger(value)) {
      return `${value}%`;
    }

    return `${value.toFixed(2)}%`;
  }

  return value.toFixed(2);
}

function formatPlainNumber(value) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(2);
}

function formatAlpha(value) {
  return value.toFixed(2);
}

function validateRange(channel, min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError(`${channel} range must use finite numbers`);
  }

  if (min > max) {
    throw new RangeError(`${channel} minimum must be less than or equal to maximum`);
  }
}

function validateAlphaRange(min, max) {
  validateRange('alpha', min, max);

  if (min < 0 || max > 1) {
    throw new RangeError('alpha range must be between 0 and 1');
  }
}
