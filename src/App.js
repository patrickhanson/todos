import React, { Component } from 'react';
import './index.css';
import todoList from './todos.json'

const TodoItem = (props) => (
  <li className={props.completed ? "completed" : ""}>
    <div className="view">
      <input className="toggle" type="checkbox" checked={props.completed}/>
      <label>{props.title}</label>
      <button className="destroy" />
    </div>
  </li>
)

class TodoList extends Component {
  state = {todoList: todoList}
  render() {
    return (
      <ul className="todo-list">
        {this.state.todoList.map( todo => <TodoItem completed={todo.completed} title={todo.title} />)}
      </ul>
    )
  }
}


class App extends Component {
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" autoFocus />
        </header>
        <section className="main">
          <TodoList className="todo-list" />
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item(s) left</span>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

export default App;
