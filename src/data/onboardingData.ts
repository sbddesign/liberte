import { OnboardingScreenData } from '../components/OnboardingScreen'

export const onboardingScreens: OnboardingScreenData[] = [
  {
    id: 'screen1',
    image: '/elephant.png',
    text: 'Freelancers around the world use Liberté to get paid.',
    primaryButton: {
      label: 'Continue',
      action: () => {} // Will be set dynamically
    },
    activeDotIndex: 0,
    totalDots: 6
  },
  {
    id: 'screen2',
    image: '/tiger.png',
    text: 'Your clients can pay you in their local currency.',
    primaryButton: {
      label: 'Continue',
      action: () => {} // Will be set dynamically
    },
    secondaryButton: {
      label: 'Back',
      action: () => {} // Will be set dynamically
    },
    activeDotIndex: 1,
    totalDots: 6
  },
  {
    id: 'screen3',
    image: '/zebra.png',
    text: 'You receive dollars to your Liberté wallet.',
    primaryButton: {
      label: 'Continue',
      action: () => {} // Will be set dynamically
    },
    secondaryButton: {
      label: 'Back',
      action: () => {} // Will be set dynamically
    },
    activeDotIndex: 2,
    totalDots: 6
  },
  {
    id: 'screen4',
    image: '/lion.png',
    text: 'Choose a savings plan to automatically invest in bitcoin.',
    primaryButton: {
      label: 'Continue',
      action: () => {} // Will be set dynamically
    },
    secondaryButton: {
      label: 'Back',
      action: () => {} // Will be set dynamically
    },
    activeDotIndex: 3,
    totalDots: 6
  },
  {
    id: 'screen5',
    image: '', // No image for slider screen
    text: 'How much do you want to save?',
    primaryButton: {
      label: 'Begin',
      action: () => {} // Will be set dynamically
    },
    secondaryButton: {
      label: 'Back',
      action: () => {} // Will be set dynamically
    },
    activeDotIndex: 4,
    totalDots: 6
  }
]
