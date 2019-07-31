export function BlackScholes(S, X, T, r, v) {
  var d1 = (Math.log(S / X) + (r + (v * v) / 2) * T) / (v * Math.sqrt(T));
  var d2 = d1 - v * Math.sqrt(T);

  return {
    call: S * CND(d1) - X * Math.exp(-r * T) * CND(d2),
    put: X * Math.exp(-r * T) * CND(-d2) - S * CND(-d1)
  };
}

/* The cummulative Normal distribution function: */
function CND(x) {
  if (x < 0) {
    return 1 - CND(-x);
  } else {
    const k = 1 / (1 + 0.2316419 * x);
    return (
      1 -
      (Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI)) *
        k *
        (0.31938153 +
          k *
            (-0.356563782 +
              k * (1.781477937 + k * (-1.821255978 + k * 1.330274429))))
    );
  }
}
