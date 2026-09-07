/**
 * CHALLENGE: Dynamic CLI BMI Tracker & Leaderboard Analyzer
 *
 * DESCRIPTION:
 * This script accepts user input directly via the terminal to calculate body mass index (BMI) for any number of participants. It dynamically allocates
 * objects inside a data array and executes a single-pass linear scan algorithm
 * to find the participant with the highest BMI without triggering index boundary exceptions.
 * ADVANCED JS CONCEPTS DEMONSTRATED:
   1. CLI I/O Integration — Implementing synchronous external module abstraction using `prompt-sync`.
   2. Dynamic Array Structuring — Aggregating user states into unified object structures (`{ name, bmi }`).
   3. Array Boundary Management — Preventing "Off-by-One" errors by strictly keeping iteration boundaries under `array.length`.
   4. Tracking State Pattern — Utilizing a "Current Champion" pointer strategy instead of looking ahead (`i + 1`), avoiding `TypeError: Cannot read properties of undefined`.
 */
// requirements :
// 1. node js installed
// 2. run this command in your terminal : npm install prompt-sync
/////////////////////////
const prompt = require("prompt-sync")({ sigint: true });

const people = [];

const numberBMIS = prompt("Enter the number of BMIs you want to calculate : ");
const numberOfBMIS = Number(numberBMIS);

for (let i = 0; i < numberOfBMIS; i++) {
  console.log(`\n---- Person ${i} ----`);
  const name = prompt("Enter your name : ");
  const weight = prompt("Enter your weight in kg (ex, 78) : ");
  const height = prompt("Enter your height in meters (ex, 1.78): ");
  const bmi = weight / height ** 2;
  people.push({ name, bmi });
}

console.log("---Results---");
for (let i = 0; i < people.length; i++) {
  console.log(`${people[i].name}'s BMI is : ${people[i].bmi.toFixed(1)}`);
}

let highestBMIPerson = people[0];

for (let i = 1; i < people.length; i++) {
  if (people[i].bmi > highestBMIPerson.bmi) {
    highestBMIPerson = people[i];
  }
}

console.log(
  `\n🏆 ${highestBMIPerson.name} has the highest BMI of ${highestBMIPerson.bmi.toFixed(1)}!`,
);
