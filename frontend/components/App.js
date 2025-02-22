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
    axios.get(URL)
      .then(res => this.setState({todos: res.data.data}))
      .catch(err => console.error(err));
  }

  render() {

    const onChange = (e) => {
      this.setState({inputVal: e.target.value});
    };
    
    const onSubmit=(e)=> {
      e.preventDefault();
      axios.post(URL, ({name: this.state.inputVal}))
        .then(res => this.setState({todos: [...this.state.todos, res.data.data]}))
        .catch(err => console.error(err));
      this.setState({inputVal: ""});
    }

    const liClick = (id) => {
      axios.patch(`${URL}/${id}`)
        .then(res => {
          this.setState({todos: this.state.todos.map(todo => {
            if(todo.id===id) todo.completed = !todo.completed;
            return todo;
          })})
        })
        .catch(err => console.error(err));
    }

    const showHideCompleted = () => {
      this.setState({hideCompleted: !(this.state.hideCompleted)});
    }

    return(
      <div>
        <Form 
          inputVal={this.state.inputVal} 
          onChange={onChange} 
          onSubmit={onSubmit} 
          showHideCompleted={showHideCompleted}
          hideCompleted={this.state.hideCompleted}
        />
        <TodoList todos={this.state.todos} liClick={liClick} hideCompleted={this.state.hideCompleted}/>
      </div>
    )
  }
}
