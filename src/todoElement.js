import React, { Component } from 'react';
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
// import { TransitionMotion, spring } from 'react-motion';

class TodoElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      editing: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.todo.isNew) {
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
    this.setState({
      editing: !this.state.editing,
      value: this.props.desc
    }, () => {
      this.todoInput.focus();
    });
  }

  handleSubmit(e, id, isNew) {
    e.preventDefault();
    if (this.state.value !== '') {
      this.props.updateTodo(id, this.state.value);
      this.setState({
        editing: false
      });
    } else {
      this.props.deleteTodo(id);
    }
  }

  render() {
    const { desc, completed, isNew } = this.props.todo
    const id =  this.props.id;
    const { height, opacity, marginX, marginY, shadowOffY, shadowBlur, shadowSpread, borderTop, zIndex } = this.props.styles

    const style = {
      height: height,
      opacity: opacity,
      margin: `${marginY}px ${marginX}px`,
      boxShadow: `0px ${shadowOffY}px ${shadowBlur}px ${shadowSpread}px rgba(51,24,75,0.41)`,
      borderTop: `${borderTop}px solid #efefef`,
      zIndex
    }

    return (
      <div id={id} className={`${isNew && 'inserting'} todo__element`} style={style}>
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
            <div className="todo__element--delete entypo-cancel-squared" onClick={() => this.props.deleteTodo(id)} />
        </li>
      </div>
    );
  }
}

export default TodoElement;
