import React from 'react';
import TodoFiltersButton from './todoFiltersButton'

function TodoFilters(props) {
  const filters = [
    { id: 1, filter: 'SHOW_ALL', txt: 'All' },
    { id: 2, filter: 'SHOW_ACTIVE', txt: 'Active' },
    { id: 3, filter: 'SHOW_COMPLETED', txt: 'Done' }
  ];

  return (
    <div className={`${props.isHidden && 'hidden'} todo__filters`}>
      { filters.map(item => (
          <TodoFiltersButton
            key={item.id}
            filter={item.filter}
            txt={item.txt}
            setFilter={props.setFilter}
            isActive={props.activeFilter === item.filter}
          />
      )) }
    </div>
  );
}

export default TodoFilters;
