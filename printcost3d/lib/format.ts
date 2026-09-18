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
  grams: number;
  hours: number;
  laborMinutes: number;
  extras: number;
  failureRate: number;
  marginRate: number;
  roundTo: number;
  materialKgPrice: number;
  machineHourly: number;
  watts: number;
  electricityRate: number;
  laborHourly: number;
}) {
  const materialCost = (input.grams / 1000) * input.materialKgPrice;
  const machineCost = input.hours * input.machineHourly;
  const electricityCost = input.hours * (input.watts / 1000) * input.electricityRate;
  const laborCost = (input.laborMinutes / 60) * input.laborHourly;
  const directCost = materialCost + machineCost + electricityCost + laborCost + input.extras;
  const failureReserve = directCost * Math.max(0, input.failureRate) / 100;
  const totalCost = directCost + failureReserve;
  const margin = Math.min(95, Math.max(1, input.marginRate)) / 100;
  const suggestedPrice = roundUp(totalCost / (1 - margin), input.roundTo);
  const profit = suggestedPrice - totalCost;

  return {
    materialCost,
    machineCost,
    electricityCost,
    laborCost,
    failureReserve,
    totalCost,
    suggestedPrice,
    profit,
  };
}
