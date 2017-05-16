import React from 'react';
import uuidV4 from 'uuid/v4';

class TodoInput extends React.Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
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
      <div className={`${this.props.newTodo && 'inserting'} todo__header`}>
        <div className="todo__header--wrap">
          <div className="todo__header--btn iconicfill-plus" onClick={this.handleSubmit} />
          <div className="todo__header--txt" onClick={this.handleSubmit}>
            Add new goal
          </div>
        </div>
      </div>
    );
  }
}

export default TodoInput;
