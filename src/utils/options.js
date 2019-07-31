export function genBuyCall(strike, underlyingPrice, priceOption) {
  // We only want the underlying values close or OVER the buying price.
  let buyFactors = [];
  for (let x = 5; x <= 18; ++x) {
    buyFactors.push(x * 0.1);
  }
  const pricesUnderlying = buyFactors.map(x => (x * underlyingPrice).toFixed(1));

  const profitOption = pricesUnderlying.map(p => {
    const sup = p - strike - priceOption;
    return (p > strike ? sup : -priceOption).toFixed(2);
  });

  const payoffUnderlying = pricesUnderlying.map(p => (p - underlyingPrice).toFixed(2));

  return {
    pricesUnderlying: pricesUnderlying,
    profitOption: profitOption,
    payoffUnderlying: payoffUnderlying
  };
}

export function genBuyPut(strike, underlyingPrice, priceOption) {
  // We only want the underlying values close or BELOW the buying price.
  let sellFactors = [];
  for (let x = 2; x <= 16; ++x) {
    sellFactors.push(x * 0.1);
  }
  let pricesUnderlying = sellFactors.map(x => (x * underlyingPrice).toFixed(1));
  let profitOption = pricesUnderlying.map(p => {
    const sup = p - strike - priceOption;
    return (p < strike ? sup : -priceOption).toFixed(2);
  });

  let payoffUnderlying = pricesUnderlying.map(x => (x - underlyingPrice).toFixed(2));

  return {
    pricesUnderlying: pricesUnderlying,
    profitOption: profitOption,
    payoffUnderlying: payoffUnderlying
  };
}
