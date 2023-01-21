import React, {useState} from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <form onSubmit={this.props.onSubmit}>
          <input type="text" value={this.props.inputVal} onChange={this.props.onChange} placeholder="Enter your todo..."/>
          <button>Submit</button>
        </form>
        <button onClick={this.props.showHideCompleted}>{`${this.props.hideCompleted ? `Show` : `Hide`}`} completed</button>
      </div>
    )
  }
}
