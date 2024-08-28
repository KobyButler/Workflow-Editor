import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Field from '../src/components/Field';

test('renders Field component correctly', () => {
  const group = { type: 'Textbox', label: 'Test Label' };

  render(
      <DndProvider backend={HTML5Backend}>
          <Field
              group={group}
              index={0}
              moveField={() => {}}
              handleDragStart={() => {}}
              handleDragEnd={() => {}}
          />
      </DndProvider>
  );

  expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
});
