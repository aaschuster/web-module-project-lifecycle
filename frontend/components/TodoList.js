import React, {useState} from 'react'
import Todo from "./Todo"

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        {this.props.todos.map( todo => {
            if(todo.completed && this.props.hideCompleted) {
              return null;
            } else {
              return (
                <div 
                  onClick={() => this.props.liClick(todo.id)} 
                  key={todo.id} 
                  className={todo.completed ? "completed" : ""}
                >
                  <Todo todo={todo.name}/>
                </div>
              )
            }
        })}
      </div>
    )
  }
}
