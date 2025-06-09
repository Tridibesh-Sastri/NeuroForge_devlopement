export interface AssessmentQuestion {
  id: number;
  text: string;
  dimension: 'emotional_regulation' | 'social_interaction' | 'decision_making' | 'self_awareness';
  reverse_scored?: boolean;
}

export const assessmentQuestions: AssessmentQuestion[] = [
  // Emotional Regulation (Questions 1-5)
  {
    id: 1,
    text: "I can effectively manage my emotions when faced with stressful situations.",
    dimension: "emotional_regulation"
  },
  {
    id: 2,
    text: "I often feel overwhelmed by my emotions and struggle to control them.",
    dimension: "emotional_regulation",
    reverse_scored: true
  },
  {
    id: 3,
    text: "I can calm myself down when I'm feeling anxious or upset.",
    dimension: "emotional_regulation"
  },
  {
    id: 4,
    text: "My emotions frequently interfere with my daily activities.",
    dimension: "emotional_regulation",
    reverse_scored: true
  },
  {
    id: 5,
    text: "I am good at recognizing and understanding my emotional states.",
    dimension: "emotional_regulation"
  },

  // Social Interaction (Questions 6-10)
  {
    id: 6,
    text: "I feel comfortable initiating conversations with new people.",
    dimension: "social_interaction"
  },
  {
    id: 7,
    text: "I often feel anxious or nervous in social situations.",
    dimension: "social_interaction",
    reverse_scored: true
  },
  {
    id: 8,
    text: "I can easily understand other people's emotions and perspectives.",
    dimension: "social_interaction"
  },
  {
    id: 9,
    text: "I prefer to avoid social gatherings and group activities.",
    dimension: "social_interaction",
    reverse_scored: true
  },
  {
    id: 10,
    text: "I am skilled at building and maintaining meaningful relationships.",
    dimension: "social_interaction"
  },

  // Decision-Making (Questions 11-15)
  {
    id: 11,
    text: "I carefully consider all options before making important decisions.",
    dimension: "decision_making"
  },
  {
    id: 12,
    text: "I often make impulsive decisions that I later regret.",
    dimension: "decision_making",
    reverse_scored: true
  },
  {
    id: 13,
    text: "I am confident in my ability to make good decisions under pressure.",
    dimension: "decision_making"
  },
  {
    id: 14,
    text: "I frequently second-guess myself after making decisions.",
    dimension: "decision_making",
    reverse_scored: true
  },
  {
    id: 15,
    text: "I can effectively weigh the pros and cons of different choices.",
    dimension: "decision_making"
  },

  // Self-Awareness (Questions 16-20)
  {
    id: 16,
    text: "I have a clear understanding of my personal strengths and weaknesses.",
    dimension: "self_awareness"
  },
  {
    id: 17,
    text: "I often feel confused about who I am and what I want in life.",
    dimension: "self_awareness",
    reverse_scored: true
  },
  {
    id: 18,
    text: "I am aware of how my behavior affects others around me.",
    dimension: "self_awareness"
  },
  {
    id: 19,
    text: "I struggle to understand my own motivations and desires.",
    dimension: "self_awareness",
    reverse_scored: true
  },
  {
    id: 20,
    text: "I regularly reflect on my thoughts, feelings, and actions.",
    dimension: "self_awareness"
  }
];

export const likertScale = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
];

export const educationLevels = [
  "High School",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Professional Certification",
  "Other"
];

export const genderOptions = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
  "Other"
];