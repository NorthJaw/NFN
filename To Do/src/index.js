import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleCheckboxChange}
          id="checkbox_"
        />
        <label
          htmlFor="checkbox_"
          style={{
            textDecoration: this.state.checked ? "line-through" : "none"
          }}
        >
          {this.props.item}
        </label>
      </div>
    );
  }
}

class ListItems extends React.Component {
  //<input type="checkbox" checked={this.state.checked} onChange={this.handleCheckClick} className="filled-in" id="filled-in-box" />

  render() {
    return this.props.listItems.map(item => {
      return <Item item={item} />;
    });
  }
}

class ToDoList extends React.Component {
  render() {
    return (
      <div>
        <ListItems listItems={this.props.listItems} />
      </div>
    );
  }
}

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultText };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmitForm(this.state.value);
    this.setState({ value: this.props.defaultText });
  }

  render() {
    return (
      <form className="inputForm" onSubmit={this.handleSubmit}>
        <label>
          Add Item:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listItems: [] };
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(message) {
    const newMessage = this.state.listItems;
    newMessage.push(message);
    console.log(newMessage);
    this.setState({ listItems: newMessage });
  }

  render() {
    return (
      <div className="App">
        <h3>Hello CodeSandbox</h3>
        <ToDoList listItems={this.state.listItems} />
        <AddItem defaultText="Default Text" onSubmitForm={this.onSubmitForm} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
