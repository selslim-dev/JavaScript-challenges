// Configurable rule engine object
const DEFAULT_CONFIG = {
  minThreshold: 50,
  maxThreshold: 300,
  baseTipRate: 0.15,
  alternateTipRate: 0.2,
};

/**
 * Calculates the tip for a single bill using a ternary operator.
 * @param {number} bill
 * @param {Object} config
 * @returns {Object} bill, tip, and total
 */
export function calculateBillDetails(bill, config = DEFAULT_CONFIG) {
  const { minThreshold, maxThreshold, baseTipRate, alternateTipRate } = config;

  // Strict ternary implementation replacing if/else
  const tipRate =
    bill >= minThreshold && bill <= maxThreshold
      ? baseTipRate
      : alternateTipRate;
  const tip = bill * tipRate;
  const total = bill + tip;

  return {
    bill,
    tip: Number(tip.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

/**
 * Processes an array of bills and generates aggregate statistics.
 * @param {number[]} bills
 * @returns {Object} summary statistics
 */
export function processBatchBills(bills) {
  const processed = bills.map((bill) => calculateBillDetails(bill));

  const totalRevenue = processed.reduce((sum, item) => sum + item.total, 0);
  const totalTips = processed.reduce((sum, item) => sum + item.tip, 0);

  return {
    breakdown: processed,
    summary: {
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalTips: Number(totalTips.toFixed(2)),
      averageTip: Number((totalTips / bills.length).toFixed(2)),
    },
  };
}
