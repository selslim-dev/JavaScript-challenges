import promptSync from "prompt-sync";
import { calculateBillDetails, processBatchBills } from "./calculator.js";

const prompt = promptSync({ sigint: true });

console.log("=== Restaurant Financial Engine ===");
const inputBills = prompt(
  "Enter bill values separated by commas (e.g., 275, 40, 430): ",
);

// Parse string input into an array of numbers
const bills = inputBills
  .split(",")
  .map((val) => parseFloat(val.trim()))
  .filter((val) => !isNaN(val));

if (bills.length === 0) {
  console.log("Invalid input. Please provide valid numeric bill values.");
} else {
  const results = processBatchBills(bills);

  console.log("\n--- Individual Bill Breakdown ---");
  results.breakdown.forEach((item) => {
    console.log(
      `The bill was ${item.bill}, the tip was ${item.tip}, and the total value was ${item.total}`,
    );
  });

  console.log("\n--- Batch Summary ---");
  console.log(`Total Revenue: ${results.summary.totalRevenue}`);
  console.log(`Total Tips Generated: ${results.summary.totalTips}`);
  console.log(`Average Tip: ${results.summary.averageTip}`);
}
