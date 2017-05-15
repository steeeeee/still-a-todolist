import React, { Component } from 'react';
import TodoElement from './todoElement'

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.renderTodo = this.renderTodo.bind(this);
  }

  renderTodo(todo, i) {
    return (
      <TodoElement
        key={todo.id}
        id={i}
        todo={todo}
        updateTodo={this.props.updateTodo}
        deleteTodo={this.props.deleteTodo}
        toggleCompleted={this.props.toggleCompleted}
      />);
  }

  render() {
    return (
      <ul>
        {this.props.todos.map(this.renderTodo)}
      </ul>
    );
  }
}

export default TodoList;
