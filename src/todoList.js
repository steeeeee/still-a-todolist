import React, { Component } from 'react';
import TodoElement from './todoElement';
import { TransitionMotion, spring } from 'react-motion';

import './todo_list.css';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.renderTodo = this.renderTodo.bind(this);
  }

  willEnter (key, style) {
    return {
      opacity: spring(0)
    }
  }

  willLeave() {
    return {
      opacity: spring(0)
    }
  }

  renderTodo(todo, i) {
    return (
        <TodoElement
          key={todo.key}
          style={{...todo.style, backgroundColor: 'purple'}}
          id={i}
          todo={todo}
          updateTodo={this.props.updateTodo}
          deleteTodo={this.props.deleteTodo}
          toggleCompleted={this.props.toggleCompleted}
        />
    );
  }

  render() {
    return (
      <ul>
        <TransitionMotion
          willEnter={ this.willEnter }
          willLeave={ this.willLeave }
          styles={ this.props.todos.map( item => ({
            key: item.id,
            style: {
              opacity: spring(1)
            }
          }))
          }>
          { styles => styles.map(this.renderTodo) }
        </TransitionMotion>
      </ul>
    );
  }
}

export default TodoList;
