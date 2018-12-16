const drawDecisionWeights = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0.8, //13
  0.5, //14
  0.35, //15
  0.2, //16
  0.1, //17
  0.08, //18
  0.05, //19
  0.03, //20
  0 // 21
];

export const GetRandomInt = max => {
  return Math.floor(Math.random() * max);
};

export const ShouldAIdraw = (currentPoints, difficulty = 0) => {
  return Math.random() <= drawDecisionWeights[currentPoints] * (1 + difficulty);
};
