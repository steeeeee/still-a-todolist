import React from 'react';

function TodoControls(props) {
  const noActiveTodos = props.activeTodos === 0;
  const noCompletedTodos = props.completedTodos === 0;
  const noTodos = props.totalTodos === 0;

  return (
    <div className="todo__controls">
      <div
        className={`${noTodos && 'disabled'} todo__controls--btn entypo-check`}
        onClick={() => props.toggleAll(noActiveTodos)}
      >
      check all
      </div>
      <div
        className={`${noCompletedTodos && 'disabled'} todo__controls--btn entypo-cancel`}
        onClick={props.destroyCompleted}
      >
      clear
      </div>
    </div>
  );
}

export default TodoControls;
