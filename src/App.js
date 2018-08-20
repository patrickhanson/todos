import React, { Component } from 'react';
import './index.css';
import todoList from './todos.json'
import { Switch, Route, Link } from 'react-router-dom'
import TodoList from './TodoList.jsx'

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
    console.log(this.state)
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

  All = () => {
    return (
      <TodoList
      className="todo-list"
      todoList={this.state.todoList}
      deleteTodo={this.deleteTodo}
      markComplete={this.markComplete}
      />
    )
  }

  Active = () => {
    const activeTodos = this.state.todoList.filter(todo => todo.completed === false)
    return(
      <TodoList
        className="todo-list"
        todoList={activeTodos}
        deleteTodo={this.deleteTodo}
        markComplete={this.markComplete} 
      />
    )
  }

  Completed = () => {
    const completedTodos = this.state.todoList.filter(todo => todo.completed === true)
    return(
      <TodoList
        className="todo-list"
        todoList={completedTodos}
        deleteTodo={this.deleteTodo}
        markComplete={this.markComplete} 
      />
    )
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
          <Switch>
            <Route exact path='/' component={this.All} />
            <Route exact path='/active' component={this.Active} />
            <Route exact path='/completed' component={this.Completed} />
          </Switch>
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item(s) left</span>
          <ul className="filters">
            <li>
              <Link to="/">
                All
              </Link>
            </li>
            <li>
              <Link to="/active">
                Active
              </Link>
            </li>
            <li>
              <Link to="/completed">
                Completed
              </Link>
            </li>
          </ul>
          <button className="clear-completed" onClick={this.deleteAllCompleted} >Clear completed</button>
        </footer>
      </section>
    );
  }
}

export default App;
