import React, { Component } from 'react';
import TodoList from './todoList';
import TodoInput from './todoInput';
import TodoControls from './todoControls';
import TodoFilters from './todoFilters';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      newTodo: false,
      filter: 'SHOW_ALL'
    };

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.destroyCompleted = this.destroyCompleted.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  addTodo(todo) {
    this.setState({
      todos: [todo].concat(this.state.todos),
      newTodo: true,
    });
  }

  updateTodo(todoPos, todoText) {
    const { todos } = this.state;

    todos[todoPos] = {
      ...todos[todoPos],
      desc: todoText,
      isNew: false
    }

    this.setState({
      todos,
      newTodo: false,
      filter: this.state.newTodo ? 'SHOW_ALL' : this.state.filter
    });
  }

  deleteTodo(todoPos) {
    const { todos } = this.state;
    todos.splice(todoPos, 1);

    this.setState({
      todos,
      newTodo: false
    });
  }

  destroyCompleted() {
    const todos = this.state.todos.filter(todo => !todo.completed)
    this.setState({ todos });
  }

  toggleAll(checked) {
    // remove all if checked, check if not
    const todos = this.state.todos.map( todo => ({
      ...todo,
      completed: !checked
    }));
    this.setState({ todos });
  }

  toggleCompleted(todoPos) {
    const { todos } = this.state;
    todos[todoPos].completed = !todos[todoPos].completed;

    // update completed with new state
    this.setState({
      todos
    });
  }

  setFilter(filter) {
    this.setState({
      filter
    });
  }

  visibilityFilter(todos, filter) {
    switch(filter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_ACTIVE':
        return todos.filter(todo => !todo.completed);
      case 'SHOW_COMPLETED':
        return todos.filter(todo => todo.completed || todo.isNew);
      default:
        return todos;
    }
  }

  render() {
    var activeTodos = this.state.todos.reduce((accum, todo) => todo.completed ? accum : ++accum, 0);
    var completedTodos= this.state.todos.reduce((accum, todo) => todo.completed ? ++accum : accum, 0);

    return (
      <div className="App">
        <div className="App__queue__2" />
        <div className="App__queue__1" />
        <div className="App__todos">
          <TodoInput addTodo={this.addTodo} newTodo={this.state.newTodo} />
          <TodoList
            todos={this.visibilityFilter(this.state.todos, this.state.filter)}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
            toggleCompleted={this.toggleCompleted}
          />
          <TodoFilters setFilter={this.setFilter} activeFilter={this.state.filter} isHidden={this.state.todos.length === 0} />
        </div>
        <div className="App__controls">
          <TodoControls
            destroyCompleted={this.destroyCompleted}
            toggleAll={this.toggleAll}
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            totalTodos={this.state.todos.length}
          />
        </div>
        <div className="App-header">
          <h2>Test TodoApp</h2>
          <h3>Active Todos: {activeTodos}</h3>
          <h3>Completed Todos: {completedTodos}</h3>
          <h3>Total Todos: {this.state.todos.length}</h3>
        </div>
      </div>
    );
  }
}

export default App;
