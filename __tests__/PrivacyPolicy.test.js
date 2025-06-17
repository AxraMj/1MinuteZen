import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrivacyPolicy from '../components/PrivacyPolicy';

describe('PrivacyPolicy', () => {
  it('renders correctly', () => {
    const { getByText } = render(<PrivacyPolicy onClose={() => {}} />);
    expect(getByText('Privacy Policy')).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const onClose = jest.fn();
    const { getByText } = render(<PrivacyPolicy onClose={onClose} />);
    const closeButton = getByText('×');
    fireEvent.press(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
}); 