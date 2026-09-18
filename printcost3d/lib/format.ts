export function money(value: number, currency = "UYU") {
  return new Intl.NumberFormat(currency === "UYU" ? "es-UY" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "UYU" ? 0 : 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function roundUp(value: number, step: number) {
  const safeStep = step > 0 ? step : 1;
  return Math.ceil(value / safeStep) * safeStep;
}

export function calculateQuote(input: {
  quantity: number;
  grams: number;
  hours: number;
  laborMinutes: number;
  extras: number;
  failureRate: number;
  marginRate: number;
  commissionRate: number;
  fixedFee: number;
  roundTo: number;
  materialKgPrice: number;
  machineHourly: number;
  watts: number;
  electricityRate: number;
  laborHourly: number;
}) {
  const quantity = Math.max(1, Math.floor(input.quantity || 1));
  const materialCost = (input.grams / 1000) * input.materialKgPrice;
  const machineCost = input.hours * input.machineHourly;
  const electricityCost = input.hours * (input.watts / 1000) * input.electricityRate;
  const laborCost = (input.laborMinutes / 60) * input.laborHourly;
  const directCost = materialCost + machineCost + electricityCost + laborCost + input.extras;
  const failureReserve = directCost * Math.max(0, input.failureRate) / 100;
  const totalCost = directCost + failureReserve;
  const margin = Math.min(90, Math.max(1, input.marginRate)) / 100;
  const commission = Math.min(80, Math.max(0, input.commissionRate)) / 100;
  const fixedFee = Math.max(0, input.fixedFee);
  const denominator = 1 - margin - commission;
  const invalidPricing = denominator <= 0.05;
  const suggestedPrice = invalidPricing
    ? 0
    : roundUp((totalCost + fixedFee) / denominator, input.roundTo);
  const salesFee = suggestedPrice * commission + fixedFee;
  const profit = suggestedPrice - totalCost - salesFee;
  const unitPrice = suggestedPrice / quantity;
  const achievedMargin = suggestedPrice > 0 ? profit / suggestedPrice : 0;
  const markup = totalCost > 0 ? profit / totalCost : 0;

  return {
    quantity,
    materialCost,
    machineCost,
    electricityCost,
    laborCost,
    failureReserve,
    totalCost,
    salesFee,
    suggestedPrice,
    unitPrice,
    profit,
    achievedMargin,
    markup,
    invalidPricing,
  };
}
