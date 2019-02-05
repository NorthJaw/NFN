import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

var local_data = require("./questions.json");

class EditForm extends React.Component {

  render() {
    return (
      <form className="inputForm" onSubmit={this.props.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.props.showText}
            onChange={this.props.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class EditBtn extends React.Component {
  constructor(props) {
    super(props);

    this.onTap = this.onTap.bind(this);
  }

  onTap = () => {
    this.props.onEdit(this.props.id);
  };

  render() {
    return (
      <div>
        <button onClick={this.onTap}> Edit </button>
      </div>
    );
  }
}

function ListItems(props) {
  return (
    <div>
      <ul>
        {props.questionList.question_list.questions.map((data, index) => {
          const name = data["name"];
          const parent_id = data["parent_id"];
          return (
            <div className="listItem">
              <li key={index}>
                Name: {name}, Parent_id: {parent_id}
              </li>
              <EditBtn className="editBtn" onEdit={props.onEdit} id={index} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

function ListItemsWithIDZero() {
  const result2 = local_data.question_list.questions
    .filter(data => {
      return data.parent_id == 0;
    })
    .map((data_, index) => {
      const name = data_["name"];
      const parent_id = data_["parent_id"];
      return (
        <li key={index}>
          Name: {name}, Parent_id: {parent_id}
        </li>
      );
    });

  return (
    <div className="dispDiv">
      <ul>{result2}</ul>
    </div>
  );
}

class App extends React.Component {
  state = {
    questions: local_data,
    index: 0,
    editText: "Default Text"
  };


  handleChange = (event) => {
    this.setState({ editText: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.onChangeText(this.state.editText);
  };


  onClickEdit = id => {
    this.setState({ index: id }, () => {
      let newQuesitons = this.state.questions;
      let newText = newQuesitons.question_list.questions[id].name;
      this.setState({ editText: newText });
    });
  };

  onChangeText = newString => {
    this.setState({ editText: newString }, () => {
      let newQuestions = this.state.questions;
      newQuestions.question_list.questions[
        this.state.index
      ].name = this.state.editText;
      this.setState({ questions: newQuestions });
    });
  };

  render() {
    return (
      <div className="App">
        <h2>Hello CodeSandbox</h2>
        <div style={{ display: "flex" }}>
          <div className="dispDiv">
            <ListItems
              questionList={this.state.questions}
              onEdit={this.onClickEdit}
            />
          </div>
          <div className="dispDiv">
            <EditForm
              showText={this.state.editText}
              onChangeText={this.onChangeText}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
