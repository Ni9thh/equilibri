import inquirer from 'inquirer';
import chalk from 'chalk';
import { format } from 'date-fns';
import { JSONFilePreset } from 'lowdb/node';

const db = await JSONFilePreset('mood-data.json', { entries: [] });

const moodScale = {
  '-5': 'Severe Depression',
  '-4': 'Moderate Depression',
  '-3': 'Mild Depression',
  '-2': 'Low Mood',
  '-1': 'Slightly Low',
  '0': 'Neutral',
  '1': 'Slightly Elevated',
  '2': 'Elevated Mood',
  '3': 'Mild Mania',
  '4': 'Moderate Mania',
  '5': 'Severe Mania'
};

const symptoms = {
  mania: [
    'Decreased need for sleep',
    'Racing thoughts',
    'Increased energy',
    'Risky behavior',
    'Rapid speech',
    'Increased productivity'
  ],
  depression: [
    'Oversleeping',
    'Low energy',
    'Loss of interest',
    'Poor concentration',
    'Changes in appetite',
    'Social withdrawal'
  ]
};

async function main() {
  console.log(chalk.blue.bold('\n🌟 Bipolar Wellness Tracker 🌟\n'));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'moodScore',
      message: 'How would you rate your current mood?',
      choices: Object.entries(moodScale).map(([score, desc]) => ({
        name: `${desc} (${score})`,
        value: parseInt(score)
      }))
    },
    {
      type: 'number',
      name: 'energyLevel',
      message: 'Rate your energy level (1-10):',
      validate: (value) => value >= 1 && value <= 10
    },
    {
      type: 'checkbox',
      name: 'currentSymptoms',
      message: 'Select any current symptoms:',
      choices: [
        ...symptoms.mania.map(s => ({ name: s, value: s })),
        ...symptoms.depression.map(s => ({ name: s, value: s }))
      ]
    },
    {
      type: 'input',
      name: 'notes',
      message: 'Any additional notes? (optional)'
    }
  ]);

  const entry = {
    timestamp: new Date().toISOString(),
    ...answers
  };

  db.data.entries.push(entry);
  await db.write();

  console.log(chalk.green('\n✅ Entry recorded successfully!\n'));
  displaySummary(entry);
}

function displaySummary(entry) {
  console.log(chalk.yellow('Entry Summary:'));
  console.log('Date:', format(new Date(entry.timestamp), 'PPpp'));
  console.log('Mood:', chalk.bold(moodScale[entry.moodScore]));
  console.log('Energy Level:', chalk.bold(entry.energyLevel + '/10'));
  
  if (entry.currentSymptoms.length > 0) {
    console.log('\nSymptoms:');
    entry.currentSymptoms.forEach(s => console.log(chalk.dim('- ' + s)));
  }
  
  if (entry.notes) {
    console.log('\nNotes:', chalk.italic(entry.notes));
  }

  const recommendation = getRecommendation(entry.moodScore);
  console.log(chalk.cyan('\nRecommendation:', recommendation));
}

function getRecommendation(moodScore) {
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

main().catch(console.error);