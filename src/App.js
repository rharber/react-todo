import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.handleClick}>
        {this.props.label}
      </button>
    )
  }
}

class AddTodo extends React.Component {
 	render() {
  	return (
    	<div>
        <input
        	value={this.props.value}
          onChange={this.props.handleChange}>
        </input>
        <Button handleClick={this.props.handleClick} label='+'/>
      </div>
    )
  }
}

class TodoItem extends React.Component {
 	render() {
  	return (
    	<div className={this.props.shouldShow ? 'todo-item' : 'todo-item-hidden'}>
        <input type='checkbox' onClick={this.props.handleClick}
        checked={this.props.completed ? 'true' : ''}/>
        <div className={this.props.completed ? 'done' : 'active'}>{this.props.text}</div>
      </div>
    )
  }
}

class TodoList extends React.Component {
	shouldShowItem = (todo) => {
    if (this.props.filter == 'active') {
      return !todo.completed
    } else if (this.props.filter == 'done') {
      return todo.completed
    } else {
    	return true
    }
  }

	render() {
  	return (
				<ul>
          {this.props.list.map((todo, index) => {
            return (
            	<TodoItem
                key={index}
                text={todo.text}
                completed={todo.completed}
                shouldShow={this.shouldShowItem(todo)}
                handleClick={() => this.props.toggleItem(index)}
             />
            );
          })}
        </ul>
    )
  }
}

class App extends React.Component {

  state = {
    todos: [{ text: 'First todo item', completed: false }],
    value: null,
    filter: 'all'
  }

  clear = () => { this.setState({ todos: [], value: "" }) }

  showDone = () => { this.setState({ filter: 'done' }) }

  showAll = () => { this.setState({ filter: 'all' }) }

  showActive = () => { this.setState({ filter: 'active' }) }

  addTodoItem = () => {
  	var newTodos = this.state.todos
    newTodos.push({ text: this.state.value, completed: false })
    this.setState({ todos: newTodos, value: "" })
  }

  handleChange = (e) => {
  	this.setState({ value: e.target.value })
  }

  toggleItem = (index) => {
  	var newTodos = this.state.todos
    newTodos[index].completed = !this.state.todos[index].completed
  	this.setState({ todos: newTodos})
  }

  render() {
  	return (
    	<div>
      	<h1>Todo App</h1>
        <AddTodo
        	handleClick={this.addTodoItem}
        	value={this.state.value}
          handleChange={this.handleChange} />
        <TodoList
        	list={this.state.todos}
          toggleItem={this.toggleItem}
          filter={this.state.filter} />
				<div class='footer'>
          <Button handleClick={this.showAll} label='All' />
          <Button handleClick={this.showActive} label='Active' />
          <Button handleClick={this.showDone} label='Done' />
          <Button handleClick={this.clear} label='Clear' />
    		</div>
      </div>
    )
  }

}

export default App;
