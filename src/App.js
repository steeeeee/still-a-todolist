import React, { Component } from 'react';
import TodoList from './todoList'
import TodoInput from './todoInput'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      newTodo: false
    };

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.destroyCompleted = this.destroyCompleted.bind(this);
  }

  addTodo(todo) {
    // Concat creates a new array
    // never push into the same array

    this.setState({
      todos: [todo].concat(this.state.todos),
      newTodo: true
    });
  }

  deleteTodo(todoPos) {
    const todos = this.state.todos;
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
    const todos = this.state.todos;
    todos[todoPos].completed = !todos[todoPos].completed;

    // update completed with new state
    this.setState({
      todos
    });
  }

  updateTodo(todoPos, todoText, isNew) {
    const todos = this.state.todos;

    todos[todoPos] = {
      ...todos[todoPos],
      desc: todoText,
      isNew: false
    }

    this.setState({
      todos,
      newTodo: false
    });
  }

  render() {
    var activeTodoCount = this.state.todos.reduce((accum, todo) => todo.completed ? accum : ++accum, 0);
    var completedTodoCount= this.state.todos.reduce((accum, todo) => todo.completed ? ++accum : accum, 0);

    return (
      <div className="App">
        <div className="App__queue__2" />
        <div className="App__queue__1" />
        <div className="App__todos">
          <TodoInput addTodo={this.addTodo} newTodo={this.state.newTodo} />
          <TodoList
            todos={this.state.todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
            toggleCompleted={this.toggleCompleted}
          />
        </div>
        <button onClick={() => this.toggleAll(activeTodoCount === 0)}>Toggle All</button>
        <button onClick={this.destroyCompleted}>Destroy Completed</button>
        <div className="App-header">
          <h2>Test TodoApp</h2>
          <h3>Active Todos: {activeTodoCount}</h3>
          <h3>Completed Todos: {completedTodoCount}</h3>
        </div>
      </div>
    );
  }
}

export default App;
