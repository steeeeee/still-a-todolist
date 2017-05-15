import React, { Component } from 'react'

class TodoElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todo.desc,
      editing: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e, id) {
    e.preventDefault();
    if (this.state.value !== '') {
      this.props.updateTodo(id, this.state.value);
      this.setState({
        editing: false
      });
    }
  }

  render() {
    const { desc, completed } = this.props.todo
    const id = this.props.id;

    return (
      <div id={id} className="todo__element">
        <li className={"todo__element--container"}>
            <div
              onClick={() => this.props.toggleCompleted(id)}
              className={`iconicfill-check todo__element--checkbox ${completed && 'completed'}`}
            />
            <div className="todo__element--description">
              <form className={`edit-input ${this.state.editing && 'editing'}`} onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.value} type="text"/>
                <button onClick={(e) => this.handleSubmit(e, id)}>save</button>
              </form>
              <p
                onClick={() => this.setState({editing: !this.state.editing})}
                className={`todo__element--text ${completed && 'completed'}`}
              >
                {desc}
              </p>
            </div>
            <div className="todo__element--delete" onClick={() => this.props.deleteTodo(id)}>x</div>
        </li>
      </div>
    );
  }
}

export default TodoElement;
