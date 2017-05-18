import React, { Component } from 'react';
import TodoElement from './todoElement';
import { TransitionMotion, spring, presets } from 'react-motion';

import './todo_list.css';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.renderTodo = this.renderTodo.bind(this);
  }

  willEnter (key, style) {
    console.log('-------------will enter-----------------')
    return {
      opacity: 0,
      height: 0,
      marginX: 0,
      marginY: 0,
      shadowOffY: 0,
      shadowBlur: 0,
      shadowSpread: 0,
      zIndex: 0,
      borderTop: 0,
    }
  }

  willLeave() {
    console.log('-------------will leave-----------------')
    return {
      opacity: 1,
      height: spring(0, presets.noWobble),
      marginX: spring(0),
      marginY: spring(0),
      shadowOffY: spring(0, {precision: 0.0001}),
      shadowBlur: spring(0, {precision: 0.0001}),
      shadowSpread: spring(0, {precision: 0.0001}),
      zIndex: spring(0),
      borderTop: 0,
    }
  }

  renderTodo(todo, i) {
    return (
        <TodoElement
          key={todo.key}
          styles={todo.style}
          id={i}
          todo={todo.data}
          updateTodo={this.props.updateTodo}
          deleteTodo={this.props.deleteTodo}
          toggleCompleted={this.props.toggleCompleted}
        />
    );
  }

  render() {
    return (
        <TransitionMotion
          styles={ this.props.todos.map( item => ({
            key: item.id,
            data: item,
            style: {
              opacity: 1,
              height: spring(75, presets.noWobble),
              marginX: item.isNew ? spring(-25, presets.noWobble) : spring(0, presets.noWobble) ,
              marginY: item.isNew ? spring(15, presets.noWobble) : spring(0, presets.noWobble),
              shadowOffY: item.isNew ? spring(22) : spring(0),
              shadowBlur: item.isNew ? spring(59) : spring(0),
              shadowSpread: item.isNew ? spring(-1) : spring(0),
              zIndex: item.isNew ? 1 : spring(0),
              borderTop: item.isNew ? 1 : spring(1),
            }
          }))}
          willEnter={ this.willEnter }
          willLeave={ this.willLeave }
        >

          { styles => <ul>{ styles.map(this.renderTodo) }</ul>}

      </TransitionMotion>
    );
  }
}

export default TodoList;
