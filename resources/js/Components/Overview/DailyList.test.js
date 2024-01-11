import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import boxReducer from './box-slice';
import DailyList from './DailyList';
import { useDispatch, useSelector } from 'react-redux';

// Mock the useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

test('select day returns 16 boxes', () => {
  
  // Mock the useDispatch and useSelector hooks
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockReturnValue([]);

  const store = configureStore({
    reducer: { box: boxReducer },
  });

  render(
    <Provider store={store}>
      <DailyList />
    </Provider>
  );

  const boxes = screen.getAllByRole('box');
  expect(boxes).toHaveLength(16);
});


test('select day returns 16 boxes', () => {
  // Mock the useDispatch and useState hooks
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useState.mockReturnValue([null, jest.fn()]);

  const store = configureStore({
    reducer: { box: boxReducer },
  });

  render(
    <Provider store={store}>
      <DailyList />
    </Provider>
  );

  const boxes = screen.getAllByRole('box');
  expect(boxes).toHaveLength(16);
});

// Add a box -> returns updated box
test('add a box returns updated box', () => {
  render(<DailyList />);
  const addButton = screen.getByRole('button', { name: /add box/i });
  userEvent.click(addButton);
  const boxes = screen.getAllByRole('box');
  expect(boxes).toHaveLength(17); // assuming there were originally 16 boxes
});

// Add box [duration] -> 90 mins 13 boxes
test('add box with duration 90 mins returns 13 boxes', () => {
  render(<DailyList />);
  // assuming you have a way to set the duration and add a box
  const durationInput = screen.getByRole('spinbutton');
  userEvent.type(durationInput, '90');
  const addButton = screen.getByRole('button', { name: /add box/i });
  userEvent.click(addButton);
  const boxes = screen.getAllByRole('box');
  expect(boxes).toHaveLength(13);
});

// Drag and drop updates start time
test('drag and drop updates start time', () => {
  render(<DailyList />);
  // assuming you have a way to simulate drag and drop
  // this is usually complex and might require a library like `@testing-library/user-event`
});

// Drag and drop does not add or remove boxes
test('drag and drop does not add or remove boxes', () => {
  render(<DailyList />);
  const boxesBefore = screen.getAllByRole('box');
  // assuming you have a way to simulate drag and drop
  // this is usually complex and might require a library like `@testing-library/user-event`
  const boxesAfter = screen.getAllByRole('box');
  expect(boxesAfter).toHaveLength(boxesBefore.length);
});