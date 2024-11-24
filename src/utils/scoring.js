// Question category mappings
const DEPRESSION_INDICATORS = [2, 5, 7, 10, 13, 17, 19, 21];
const MANIA_INDICATORS = [3, 6, 8, 9, 12, 15, 16, 18];
const NEUTRAL_INDICATORS = [1, 4, 11, 20];

// Calculate scores based on answers
export function calculateScores(answers) {
  const { mood, sleep, emotional, thoughts, behavioral, physical } = answers;

  let depressionScore = 0;
  let maniaScore = 0;
  let neutralScore = 0;

  // Calculate scores based on answers
  if (mood) {
    neutralScore += (mood.energyLevel || 3) * 0.5;
    depressionScore += mood.tiredness === 'yes' ? 1 : 0;
    maniaScore += mood.energyBursts === 'yes' ? 1 : 0;
    neutralScore += mood.focus === 'yes' ? 0.5 : 0;
  }

  if (sleep) {
    depressionScore += sleep.sleepQuality === 'no' ? 1 : 0;
    maniaScore += sleep.lessSleep === 'yes' ? 1 : 0;
    depressionScore += sleep.moreSleep === 'yes' ? 1 : 0;
  }

  if (emotional) {
    maniaScore += emotional.irritability === 'yes' ? 1 : 0;
    maniaScore += emotional.euphoria === 'yes' ? 1 : 0;
    depressionScore += emotional.hopelessness === 'yes' ? 1 : 0;
    neutralScore += (emotional.overallMood || 3) * 0.5;
  }

  if (thoughts) {
    maniaScore += thoughts.racingThoughts === 'yes' ? 1 : 0;
    depressionScore += thoughts.sluggishThinking === 'yes' ? 1 : 0;
    maniaScore += thoughts.grandioseThoughts === 'yes' ? 1 : 0;
  }

  if (behavioral) {
    maniaScore += behavioral.talkative === 'yes' ? 1 : 0;
    depressionScore += behavioral.withdrawing === 'yes' ? 1 : 0;
    maniaScore += behavioral.riskyBehavior === 'yes' ? 1 : 0;
    depressionScore += behavioral.dailyResponsibilities === 'yes' ? 1 : 0;
  }

  if (physical) {
    neutralScore += (physical.tension || 3) * 0.5;
    depressionScore += physical.discomfort === 'yes' ? 1 : 0;
  }

  // Scale scores to match thresholds
  depressionScore = Math.round(depressionScore * 3); // Scale up to match 30-point max
  maniaScore = Math.round(maniaScore * 3); // Scale up to match 30-point max
  neutralScore = Math.round(neutralScore); // Keep neutral score as is

  return { depressionScore, maniaScore, neutralScore };
}

export function getDiagnosis(scores) {
  const { depressionScore, maniaScore, neutralScore } = scores;

  // If both scores are low, use neutral score as tie-breaker
  if (depressionScore < 10 && maniaScore < 10) {
    if (neutralScore > 7) {
      return {
        diagnosis: 'Neutral',
        severity: 'neutral',
        type: 'neutral'
      };
    }
  }

  // Compare depression and mania scores directly
  if (depressionScore >= 20) {
    return {
      diagnosis: 'Severely Depressed',
      severity: 'severe',
      type: 'depression'
    };
  } else if (maniaScore >= 20) {
    return {
      diagnosis: 'Severely Manic',
      severity: 'severe',
      type: 'mania'
    };
  } else if (depressionScore >= 10 && depressionScore > maniaScore) {
    return {
      diagnosis: 'Moderately Depressed',
      severity: 'moderate',
      type: 'depression'
    };
  } else if (maniaScore >= 10 && maniaScore > depressionScore) {
    return {
      diagnosis: 'Moderately Manic',
      severity: 'moderate',
      type: 'mania'
    };
  }

  // If scores are very close, default to neutral
  return {
    diagnosis: 'Neutral',
    severity: 'neutral',
    type: 'neutral'
  };
}