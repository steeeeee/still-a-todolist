import React, { Component } from 'react';
import TodoList from './todoList'
import TodoInput from './todoInput'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      completedTodos: 0
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
      todos: this.state.todos.concat(todo)
    });
  }

  deleteTodo(todoPos) {
    const todos = this.state.todos;
    todos.splice(todoPos, 1);

    this.setState({ todos });
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

  updateTodo(todoPos, todoText) {
    const todos = this.state.todos;
    todos[todoPos].desc = todoText;

    this.setState({
      todos
    });
  }

  render() {
    var activeTodoCount = this.state.todos.reduce((accum, todo) => todo.completed ? accum : ++accum, 0);
    var completedTodoCount= this.state.todos.reduce((accum, todo) => todo.completed ? ++accum : accum, 0);

    return (
      <div className="App">
        <div className="App-header">
          <h2>Test TodoApp</h2>
          <h3>Active Todos: {activeTodoCount}</h3>
          <h3>Completed Todos: {completedTodoCount}</h3>
        </div>
        <button onClick={() => this.toggleAll(activeTodoCount === 0)}>Toggle All</button>
        <button onClick={this.destroyCompleted}>Destroy Completed</button>
        <div className="App__todos">
          <TodoInput addTodo={this.addTodo} />
          <TodoList
            todos={this.state.todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
            toggleCompleted={this.toggleCompleted}
          />
        </div>
      </div>
    );
  }
}

export default App;
