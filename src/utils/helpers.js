export function getRecommendation(moodScore) {
  if (moodScore >= 3) {
    return 'Consider contacting your healthcare provider as you may be experiencing mania.';
  } else if (moodScore <= -3) {
    return 'Consider reaching out to your support system or healthcare provider for help with depression.';
  } else if (moodScore > 0) {
    return 'Monitor your mood and maintain your routine. Practice grounding techniques if needed.';
  } else if (moodScore < 0) {
    return 'Focus on self-care and gentle activities. Remember this will pass.';
  }
  return 'Continue with your wellness routine and regular monitoring.';
}