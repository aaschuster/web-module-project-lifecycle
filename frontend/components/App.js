import React, {useState} from 'react'
import axios from "axios";

import Form from "./Form";
import Todo from "./Todo";
import TodoList from "./TodoList";

const URL = 'http://localhost:9000/api/todos'



export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      inputVal: "",
      todos: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:9000/api/todos")
      .then(res => this.setState({todos: res.data.data}))
      .catch(err => console.error(err));
  }

  render() {

    const onChange = (e) => {
      this.setState({inputVal: e.target.value});
    };
    
    const onSubmit=(e)=> {
      e.preventDefault();
      axios.post("http://localhost:9000/api/todos", ({name: this.state.inputVal}))
        .then(res => this.setState({todos: [...this.state.todos, res.data.data]}))
        .catch(err => console.error(err));
      this.setState({inputVal: ""});
    }

    return(
      <div>
        <Form inputVal={this.state.inputVal} onChange={onChange} onSubmit={onSubmit}/>
        <TodoList todos={this.state.todos}/>
      </div>
    )
  }
}
