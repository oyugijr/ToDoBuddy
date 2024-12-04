import React from 'react';

interface FilterButtonsProps {
  setFilter: (filter: 'all' | 'completed' | 'pending') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('pending')}>Pending</button>
    </div>
  );
};

export default FilterButtons;