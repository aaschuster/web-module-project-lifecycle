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
      todos: [],
      hideCompleted: false
    }
  }

  componentDidMount() {
    this.setTodos();
  }

  setTodos() {
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

    const liClick = (id) => {
      axios.patch(`http://localhost:9000/api/todos/${id}`)
        .then(res => this.setTodos())
        .catch(err => console.error(err));
    }

    const clear = () => {
      this.setState({hideCompleted: true});
    }

    return(
      <div>
        <Form 
          inputVal={this.state.inputVal} 
          onChange={onChange} 
          onSubmit={onSubmit} 
          clear={clear}
        />
        <TodoList todos={this.state.todos} liClick={liClick} hideCompleted={this.state.hideCompleted}/>
      </div>
    )
  }
}
