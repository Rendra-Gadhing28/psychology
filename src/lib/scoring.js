/**
 * Menghitung tipe MBTI berdasarkan jawaban Skala Likert (1-5)
 * @param {Array<{ questionId: number, value: number }>} answers 
 * @param {Array<object>} questions 
 * @returns {object}
 */
export function calculateMBTI(answers, questions) {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  const questionMap = new Map();
  for (const q of questions) {
    questionMap.set(q.id, q);
  }

  const dimensionPairs = {
    EI: ["E", "I"],
    SN: ["S", "N"],
    TF: ["T", "F"],
    JP: ["J", "P"]
  };

  for (const ans of answers) {
    const q = questionMap.get(ans.questionId);
    if (!q) continue;

    const val = Number(ans.value);
    if (isNaN(val) || val < 1 || val > 5) continue;

    const pair = dimensionPairs[q.dimension];
    if (!pair) continue;

    const [first, second] = pair;
    const target = q.polarity;
    const opposite = target === first ? second : first;

    // Likert 1 (STS) s/d 5 (SS)
    // Target mendapat nilai val, lawan mendapat 6 - val
    scores[target] += val;
    scores[opposite] += (6 - val);
  }

  // Tentukan pemenang tiap dimensi
  const eiWinner = scores.E >= scores.I ? "E" : "I";
  const snWinner = scores.S >= scores.N ? "S" : "N";
  const tfWinner = scores.T >= scores.F ? "T" : "F";
  const jpWinner = scores.J >= scores.P ? "J" : "P";

  const type = `${eiWinner}${snWinner}${tfWinner}${jpWinner}`;

  // Hitung persentase dominansi tiap dimensi
  const calcPct = (winner, loser) => {
    const total = scores[winner] + scores[loser];
    if (total === 0) return 50;
    return Math.max(50, Math.min(100, Math.round((scores[winner] / total) * 100)));
  };

  const percentages = {
    EI: {
      winner: eiWinner,
      loser: eiWinner === "E" ? "I" : "E",
      percentage: calcPct(eiWinner, eiWinner === "E" ? "I" : "E"),
      scores: { E: scores.E, I: scores.I },
      label: eiWinner === "E" ? "Ekstrovert" : "Introvert"
    },
    SN: {
      winner: snWinner,
      loser: snWinner === "S" ? "N" : "S",
      percentage: calcPct(snWinner, snWinner === "S" ? "N" : "S"),
      scores: { S: scores.S, N: scores.N },
      label: snWinner === "S" ? "Sensing" : "Intuisi"
    },
    TF: {
      winner: tfWinner,
      loser: tfWinner === "T" ? "F" : "T",
      percentage: calcPct(tfWinner, tfWinner === "T" ? "F" : "T"),
      scores: { T: scores.T, F: scores.F },
      label: tfWinner === "T" ? "Thinking" : "Feeling"
    },
    JP: {
      winner: jpWinner,
      loser: jpWinner === "J" ? "P" : "J",
      percentage: calcPct(jpWinner, jpWinner === "J" ? "P" : "J"),
      scores: { J: scores.J, P: scores.P },
      label: jpWinner === "J" ? "Judging" : "Perceiving"
    }
  };

  return {
    type,
    scores,
    percentages
  };
}
