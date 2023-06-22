'use strict';

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
  // Helper function to generate a random value within a range
  const randomValue = (min, max) => {
    if (max <= 1) {
      // If the range is within [0, 1], generate a random float value
      return Math.random() * (max - min) + min;
    } else {
      // If the range is integers, generate a random integer value
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  // Helper function to format a value as a percentage string
  const formatPercentage = (value) => {
    if (value === 0) return '0%';
    return value.toFixed(2).replace(/\.?0+%?$/, '%');
  };

  // Helper function to format a channel value as a string
  const formatChannelValue = (value) => {
    if (value === 0) return '0';
    return value.toFixed(0);
  };

  // Generate random values for lightness, a, b, and alpha
  const lightness = formatPercentage(randomValue(minL, maxL));
  const a = formatChannelValue(randomValue(minA, maxA));
  const b = formatChannelValue(randomValue(minB, maxB));
  const alpha = formatPercentage(randomValue(minAlpha, maxAlpha));

  // Return the LAB color as a string or object based on useObjectExport parameter
  if (useObjectExport) {
    return { lightness, a, b, alpha };
  }

  return `LAB(${lightness} ${a} ${b}${alpha ? ` / ${alpha}` : ''})`;
};
