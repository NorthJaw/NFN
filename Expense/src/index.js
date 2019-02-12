import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const MyContext = React.createContext();

class MyProvider extends React.Component {
  state = {
    name: "",
    expense: "",
    category: "",
    ListItems: [],
    AddorEdit: 0,
    editIndex: 0
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmitForm = (event, name, expense, category) => {
    event.preventDefault();
    if (
      name.trim().length > 0 &&
      category.trim().length > 0 &&
      expense.trim().length > 0
    ) {
      if (this.state.AddorEdit == 0) {
        let newObject = {};
        newObject["name"] = name;
        newObject["expense"] = expense;
        newObject["category"] = category;

        let temp = this.state.ListItems;
        temp.push(newObject);

        this.setState({ ListItems: temp });
      } else {
        let temp = this.state.ListItems;
        temp[this.state.editIndex].name = this.state.name;
        temp[this.state.editIndex].expense = this.state.expense;
        temp[this.state.editIndex].category = this.state.category;
        this.setState({ ListItems: temp });
        this.setState({ AddorEdit: 0 });
      }
      this.setState({ name: "" });
      this.setState({ expense: "" });
      this.setState({ category: "" });
    } else {
      alert("Enter valid details");
    }
  };

  editFn = index => {
    this.setState({ AddorEdit: 1 });
    this.setState({ editIndex: index });
    this.setState({ name: this.state.ListItems[index].name });
    this.setState({ expense: this.state.ListItems[index].expense });
    this.setState({ category: this.state.ListItems[index].category });
  };

  deleteFn = index => {
    let temp = this.state.ListItems;
    temp.splice(index, 1);
    this.setState({ ListItems: temp });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          handleSubmitForm: this.handleSubmitForm,
          handleInputChange: this.handleInputChange,
          editFn: this.editFn,
          deleteFn: this.deleteFn
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class Expense extends React.Component {
  render() {
    return (
      <div>
        <MyContext.Consumer>
          {context => (
            <div style={{ display: "flex" }}>
              <label>
                Name: {context.state.ListItems[this.props.index].name} Expense:{" "}
                {context.state.ListItems[this.props.index].expense} Categroy:{" "}
                {context.state.ListItems[this.props.index].category}
              </label>
              <button onClick={e => context.editFn(this.props.index)}>
                Edit
              </button>
              <button onClick={e => context.deleteFn(this.props.index)}>
                Delete
              </button>
            </div>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}

function Expenses() {
  return (
    <div>
      <MyContext.Consumer>
        {context =>
          context.state.ListItems.map((item, index) => {
            return <Expense index={index} />;
          })
        }
      </MyContext.Consumer>
    </div>
  );
}

class AddItem extends React.Component {
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <MyContext.Consumer>
          {context => (
            <form
              onSubmit={e =>
                context.handleSubmitForm(
                  e,
                  context.state.name,
                  context.state.expense,
                  context.state.category
                )
              }
            >
              <label>
                Name:
                <input
                  name="name"
                  value={context.state.name}
                  onChange={context.handleInputChange}
                />
              </label>
              <label>
                Expense:
                <input
                  name="expense"
                  type="number"
                  value={context.state.expense}
                  onChange={context.handleInputChange}
                />
              </label>
              <label>
                Category:
                <input
                  name="category"
                  value={context.state.category}
                  onChange={context.handleInputChange}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}

function App() {
  return (
    <MyProvider>
      <div className="App">
        <h3>Hello CodeSandbox</h3>
        <Expenses />
        <AddItem />
      </div>
    </MyProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
