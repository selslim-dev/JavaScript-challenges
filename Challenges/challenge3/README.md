# Modular Restaurant Financial Engine: Production-Grade Tip & Batch Processing System

## Executive Summary & Architectural Vision

The **Modular Restaurant Financial Engine** is an advanced, production-grade JavaScript application designed to transition simple procedural logic into a clean, highly scalable, and professional codebase. Moving far beyond basic syntax drills, this system implements core software engineering principles such as **Separation of Concerns**, **Pure Functions**, **Configurable Rule Engines**, and **Functional Array Transformations**. 

In modern software development, hardcoding business rules or writing monolithic scripts that mix user interaction with core math creates fragile applications that are difficult to test, maintain, or scale. This project addresses those challenges by isolating pure computational logic from terminal orchestration, ensuring every component has a single, well-defined responsibility.

---

## Architectural Principles & Core Concepts

### 1. Separation of Concerns
The application cleanly separates user input and terminal presentation from mathematical evaluation and data processing. By keeping the calculation engine completely independent of side effects (like `console.log` or synchronous terminal prompts), the core logic becomes entirely deterministic and easily portable to web or API environments.

### 2. Configurable Rule Engines (Eliminating Magic Numbers)
Instead of scattering literal values like `50`, `300`, `0.15`, and `0.2` throughout the codebase, all business thresholds and percentages are centralized inside a configuration object (`DEFAULT_CONFIG`). If the restaurant modifies its tipping brackets or tax structures in the future, developers only need to update a single configuration definition rather than hunting through nested conditional blocks.

### 3. Pure Functions & Ternary Logic
To maintain functional purity, the calculation engine strictly avoids procedural `if/else` branching chains for value checks. Instead, it leverages concise **ternary operators** (`? :`) to evaluate conditions inline, returning immutable data structures that make tracking state changes trivial.

### 4. Advanced Data Transformation with ES6 Array Methods
Rather than handling individual data points manually via legacy loops, the engine utilizes modern functional programming constructs:
* **`Array.prototype.map()`**: Transforms an array of raw numerical bills into rich, structured financial objects containing individual bill values, calculated tips, and final totals.
* **`Array.prototype.reduce()`**: Aggregates batch datasets to compute total revenue, total tip generation, and average statistical metrics across an arbitrary number of inputs.

---

## Complete Unified Source Code

The complete standalone implementation combining configuration, pure calculation rules, batch aggregation, and CLI orchestration into a single executable file:

```javascript
const prompt = require('prompt-sync')({ sigint: true });

// Centralized configuration object to prevent hardcoded magic numbers
const DEFAULT_CONFIG = {
  minThreshold: 50,
  maxThreShold: 300,
  minTipVal: 0.15,
  maxTipVal: 0.2,
};

/**
 * Calculates the tip and total for a single bill using a ternary operator.
 * Operates as a pure function with no external side effects.
 * 
 * @param {number} bill - The raw bill value entered by the user
 * @param {Object} config - Configuration object containing thresholds and rates
 * @returns {Object} An immutable object containing bill, tip, and total
 */
const calculateBillDetails = function (bill, config = DEFAULT_CONFIG) {
  const { minThreshold, maxThreShold, minTipVal, maxTipVal } = config;
  
  // Strict ternary implementation replacing traditional if/else blocks
  const tipRate =
    bill >= minThreshold && bill <= maxThreShold ? minTipVal : maxTipVal;
  
  const tip = bill * tipRate;
  const total = bill + tip;

  return {
    bill,
    tip: Number(tip.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};

/**
 * Processes an array of bills, transforming them and calculating aggregate statistics.
 * 
 * @param {number[]} bills - An array of numerical bill amounts
 * @returns {Object} Comprehensive breakdown and summary statistics
 */
const processBatchBills = function (bills) {
  // Transform raw numbers into rich breakdown objects via map
  const processed = bills.map((bill) => calculateBillDetails(bill));
  
  // Aggregate financial metrics using reduce
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
};

// --- Presentation & Orchestration Layer ---

console.log("=== Restaurant Financial Engine ===");
const inputBills = prompt("Enter bill values separated by commas (e.g., 275, 40, 430): ");

// Parse, sanitize, and validate user string input into a clean array of numbers
const bills = inputBills
  .split(',')
  .map(val => parseFloat(val.trim()))
  .filter(val => !isNaN(val));

if (bills.length === 0) {
    console.log("Invalid input. Please provide valid numeric bill values.");
} else {
    // Process the batch dataset through the core engine
    const results = processBatchBills(bills);

    console.log("\n--- Individual Bill Breakdown ---");
    results.breakdown.forEach(item => {
        console.log(`The bill was ${item.bill}, the tip was ${item.tip}, and the total value was ${item.total}`);
    });

    console.log("\n--- Batch Summary ---");
    console.log(`Total Revenue: ${results.summary.totalRevenue}`);
    console.log(`Total Tips Generated: ${results.summary.totalTips}`);
    console.log(`Average Tip: ${results.summary.averageTip}`);
}
