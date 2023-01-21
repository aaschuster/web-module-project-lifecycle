import React, {useState} from 'react'
import Todo from "./Todo"

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        {this.props.todos.map( todo => (
            <Todo todo={todo.name} key={todo.id}/>
        ))}
      </div>
    )
  }
}
