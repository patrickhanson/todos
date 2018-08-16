import React, { Component } from 'react';
import './index.css';
import todoList from './todos.json'

class TodoItem extends Component {

  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={this.props.markComplete}
            defaultChecked={this.props.completed} />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={this.props.deleteTodo} />
        </div>
      </li>
    )
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todoList.map(todo => <TodoItem completed={todo.completed}
          title={todo.title}
          key={todo.id}
          deleteTodo={this.props.deleteTodo(todo.id)}
          markComplete={this.props.markComplete(todo.id)}
        />)}
      </ul>
    )
  }
}

class App extends Component {
  state = {
    todoList,
    value: ""
  }

  markComplete = id => () => {
    const newTodos = this.state.todoList.slice()
    newTodos.forEach(todo => {
      if (todo.id === id) {
        if (todo.completed === true) {
          todo.completed = false
        } else {
          todo.completed = true
        }
      }
    });
    this.setState({
      todoList: newTodos
    })
  }

  deleteTodo = id => () => {
    this.setState({
      todoList: this.state.todoList.filter(todo => todo.id !== id)
    })
  }

  deleteAllCompleted = () => {
    this.setState({
      todoList: this.state.todoList.filter(todo => todo.completed === false)
    })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  addTodo = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      let newTodo = {
        userId: 1,
        id: (Math.floor(Math.random() * 1000)),
        title: event.target.value,
        completed: false,
      }
      let newTodoList = [...this.state.todoList, newTodo]
      this.setState({
        todoList: newTodoList,
        value: ""
      })
    }
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            onKeyPress={this.addTodo}
            className="new-todo"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="What needs to be done?"
            autoFocus 
          />
        </header>
        <section className="main">
          <TodoList
            className="todo-list"
            todoList={this.state.todoList}
            deleteTodo={this.deleteTodo}
            markComplete={this.markComplete}
          />
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item(s) left</span>
          <button className="clear-completed" onClick={this.deleteAllCompleted} >Clear completed</button>
        </footer>
      </section>
    );
  }
}

export default App;
