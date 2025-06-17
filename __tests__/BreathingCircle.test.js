import React from 'react';
import { render } from '@testing-library/react-native';
import BreathingCircle from '../components/BreathingCircle';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

describe('BreathingCircle', () => {
  it('renders correctly when inactive', () => {
    const { getByTestId } = render(<BreathingCircle isActive={false} />);
    const circle = getByTestId('breathing-circle');
    expect(circle).toBeTruthy();
  });

  it('renders correctly when active', () => {
    const { getByTestId } = render(<BreathingCircle isActive={true} />);
    const circle = getByTestId('breathing-circle');
    expect(circle).toBeTruthy();
  });
}); 