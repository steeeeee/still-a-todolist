import React from 'react';

function TodoFiltersButton(props) {
  return (
    <div
      className={`${props.isActive && 'active'} todo__filters--btn`}
      onClick={() => props.setFilter(props.filter)}
    >
      {props.txt}
    </div>
  );
}

export default TodoFiltersButton;
