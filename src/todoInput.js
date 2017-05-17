import React from 'react';
import uuidV4 from 'uuid/v4';

class TodoInput extends React.Component {

  constructor(props) {
    super(props)

    this.createTodo = this.createTodo.bind(this);
  }

  createTodo(e) {
    e.preventDefault();
    this.props.addTodo({
      id: uuidV4(),
      desc: '',
      completed: false,
      isNew: true
    });
  }

  render() {
    return (
      <div className={`${this.props.newTodo && 'inserting'} todo__input`}>
        <div className="todo__input--wrap">
          <div className="todo__input--btn entypo-plus" onClick={this.createTodo} />
          <div className="todo__input--txt" onClick={this.createTodo}>
            Add new goal
          </div>
        </div>
      </div>
    );
  }
}

export default TodoInput;
