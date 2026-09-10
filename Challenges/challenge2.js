/**
 * CHALLENGE 2: The Advanced Competitive Tournament Engine
 *
 * THE CORE PROBLEM:
 * Two gymnastics teams compete against each other across multiple rounds.
 * The team with the highest average score wins a trophy. However, strict
 * qualification rules apply regarding minimum performance standards.
 *
 * ARCHITECTURAL REQUIREMENTS (To make it more generalized and harder):
 *
 * 1. DYNAMIC INPUT COLLECTION
 *    - Do not hardcode any scores, team names, or round counts.
 *    - Ask the user for the number of rounds to simulate.
 *    - Prompt for custom team names (instead of fixing them as Dolphins/Koalas).
 *    - Prompt for the required minimum score threshold dynamically.
 *
 * 2. DATA TRACKING & AGGREGATION
 *    - Collect the scores for each round via the terminal.
 *    - Store each team's scores dynamically inside their own arrays.
 *    - Calculate the mathematical average score for each team using array methods.
 *
 * 3. THE CONDITIONAL COMPARISON MATRIX (With Bonus Rules)
 *    Evaluate the calculated averages using the following hierarchical logic:
 *    - WINNER: A team only wins the trophy if its average score is strictly higher
 *      than the opponent's average, AND its average meets or exceeds the minimum threshold.
 *    - DRAW: A competitive draw occurs only if both teams have the exact same
 *      average score, AND both teams' averages meet or exceed the minimum threshold.
 *    - DISQUALIFICATION / NO WINNER: If neither team manages to reach the minimum
 *      score threshold, no trophy is awarded to anyone, regardless of who scored higher.
 *
 * TEST DATA SETS (Use these variations in your terminal to test your engine):
 * --------------------------------------------------------------------------
 * Dataset 1 (Standard):
 *   - Threshold: 100 | Rounds: 3
 *   - Team A: [96, 108, 89]  | Team B: [88, 91, 110]
 *
 * Dataset 2 (Threshold Validation):
 *   - Threshold: 100 | Rounds: 3
 *   - Team A: [97, 112, 101] | Team B: [109, 95, 123]
 *
 * Dataset 3 (Draw Threshold Validation):
 *   - Threshold: 100 | Rounds: 3
 *   - Team A: [97, 112, 101] | Team B: [109, 95, 106]
 * --------------------------------------------------------------------------
 */

// --- START CODING YOUR GENERALIZED SOLUTION BELOW ---
const prompt = require("prompt-sync")({ sigint: true });

function getOrdinalSuffix(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const threshold = Number(
  prompt(
    "Enter the minimum score threshold (average that each team needs to reach in order to qualify) : ",
  ),
);
const numberOfTeams = Number(
  prompt("Enter the number of teams that participate: "),
);
const totalRounds = Number(prompt("Enter the number of rounds to simulate: "));

const teams = [];

for (let i = 0; i < numberOfTeams; i++) {
  const teamName = prompt(
    `Please enter ${getOrdinalSuffix(i + 1)} team name: `,
  );
  const teamScores = [];

  for (let j = 0; j < totalRounds; j++) {
    const score = Number(
      prompt(`Enter score for ${teamName} in round ${j + 1}: `),
    );
    teamScores.push(score);
  }

  // Store the team data together
  teams.push({ name: teamName, scores: teamScores });
}

let highestAvg = -1;
let winningTeam = null;
let isTie = false;

console.log("\n--- Tournament Results ---");

for (let i = 0; i < teams.length; i++) {
  const team = teams[i];

  // 1. Calculate average using reduce
  const totalScore = team.scores.reduce((sum, score) => sum + score, 0);
  const average = totalScore / team.scores.length;

  console.log(`${team.name} Average: ${average.toFixed(2)}`);

  // 2. Check if team meets the minimum threshold
  if (average >= threshold) {
    // 3. Compare with the current highest score
    if (average > highestAvg) {
      highestAvg = average;
      winningTeam = team;
      isTie = false; // Reset tie flag if a higher score is found
    } else if (average === highestAvg) {
      isTie = true; // Mark a tie if another team matches the highest score
    }
  }
}

// 4. Display the final verdict
console.log("\n--- Final Verdict ---");
if (!winningTeam) {
  console.log(
    "DISQUALIFICATION / NO WINNER: No team met the minimum score threshold.",
  );
} else if (isTie) {
  console.log(
    `DRAW: Multiple teams tied with the highest average of ${highestAvg.toFixed(2)}!`,
  );
} else {
  console.log(
    `WINNER: ${winningTeam.name} wins the trophy with an average of ${highestAvg.toFixed(2)}!`,
  );
}

// console.log("\nTournament Data Collected:", teams);
