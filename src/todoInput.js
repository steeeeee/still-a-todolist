import React from 'react';
import uuidV4 from 'uuid/v4';

class TodoInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.value !== '') {
      this.props.addTodo({
        id: uuidV4(),
        desc: this.state.value,
        completed: false
      });
      this.setState({ value: '' })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.value} placeholder="add todo"/>
        <button type="submit">add</button>
      </form>
    );
  }
}

export default TodoInput;
