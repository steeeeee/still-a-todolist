import React, { Component } from 'react'

class TodoElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todo.desc,
      editing: false,
      isNew: this.props.todo.isNew
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.todoInput.focus();
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  toggleEdit() {
    console.log('quiiii')
    this.setState({editing: !this.state.editing}, () => {
      this.todoInput.focus();
    });
  }

  handleSubmit(e, id, isNew) {
    e.preventDefault();
    if (this.state.value !== '') {
      this.props.updateTodo(id, this.state.value, this.state.isNew);
      this.setState({
        editing: false,
        isNew: false
      });
    } else {
      this.props.deleteTodo(id);
    }
  }

  render() {
    const { desc, completed, isNew } = this.props.todo
    const id =  this.props.id;

    return (
      <div id={id} className={`${isNew && 'inserting'} todo__element`}>
        <li className={"todo__element--container"}>
            <div
              onClick={() => this.props.toggleCompleted(id)}
              className={`iconicfill-check todo__element--checkbox ${completed && 'completed'} ${isNew && 'inserting'}`}
            />
            <div className="todo__element--description">
              <form className={`edit-input ${this.state.editing && 'editing'} ${isNew && 'inserting'}`}>
                <input
                  type="text"
                  ref={(input) => this.todoInput = input}
                  onBlur={(e) => this.handleSubmit(e, id)}
                  onChange={this.handleChange}
                  value={this.state.value}
                />
                <button onClick={(e) => this.handleSubmit(e, id)}>{isNew ? 'Add' : 'Save'}</button>
              </form>
              <p
                onClick={this.toggleEdit}
                className={`todo__element--text ${completed && 'completed'}`}
              >
               {desc}
              </p>
            </div>
            <div className="todo__element--delete iconicfill-trash-fill" onClick={() => this.props.deleteTodo(id)} />
        </li>
      </div>
    );
  }
}

export default TodoElement;
