import { createContext, useContext, useReducer } from 'react';

const QuestionnaireContext = createContext();

const initialState = {
  answers: {
    mood: {
      energyLevel: 3,
      tiredness: null,
      energyBursts: null,
      focus: null
    },
    sleep: {
      sleepQuality: null,
      lessSleep: null,
      moreSleep: null
    },
    emotional: {
      irritability: null,
      euphoria: null,
      hopelessness: null,
      overallMood: 3
    },
    thoughts: {
      racingThoughts: null,
      sluggishThinking: null,
      decisionDifficulty: null,
      grandioseThoughts: null
    },
    behavioral: {
      talkative: null,
      withdrawing: null,
      riskyBehavior: null,
      dailyResponsibilities: null
    },
    physical: {
      tension: 3,
      discomfort: null
    }
  }
};

function questionnaireReducer(state, action) {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.category]: action.payload
        }
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function QuestionnaireProvider({ children }) {
  const [state, dispatch] = useReducer(questionnaireReducer, initialState);

  return (
    <QuestionnaireContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
}