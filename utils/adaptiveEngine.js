export function calculateDifficulty(score, timeTaken) {
  if (score > 80 && timeTaken < 30) return "hard";
  if (score < 40) return "easy";
  return "medium";
}
