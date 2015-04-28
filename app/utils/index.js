'use strict';

export function isInCircle(x, y, x0, y0, radius) {
  return (x >= x0 - radius) && (x <= x0 + radius) && (y >= y0 - radius) && (y <= y0 + radius);
}
