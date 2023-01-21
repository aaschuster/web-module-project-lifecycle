import React, {useState} from 'react'

import Form from "./Form";
import Todo from "./Todo";
import TodoList from "./TodoList";

const URL = 'http://localhost:9000/api/todos'



export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      inputVal: ""
    }
  }

  render() {

    const onChange = (e) => {
      this.setState({inputVal: e.target.value});
    };
    
    const onSubmit=(e)=> {
      e.preventDefault();
      this.setState({inputVal: ""});
    }

    return(
      <div>
        <Form inputVal={this.state.inputVal} onChange={onChange} onSubmit={onSubmit}/>
        <TodoList />
      </div>
    )
  }
}
