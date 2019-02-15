import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { MyContext } from "./appContext";
import { AddItem } from "./additem";
import { Expenses } from "./expenses";
import { Home } from "./home";

import "./styles.css";

export class App extends React.Component {
  state = {
    name: "",
    expense: "",
    category: "",
    ListItems: JSON.parse(JSON.parse(localStorage.getItem("ListItems"))) || [],
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
        localStorage.setItem(
          "ListItems",
          JSON.stringify(JSON.stringify(this.state.ListItems))
        );
      } else {
        let temp = this.state.ListItems;
        temp[this.state.editIndex].name = this.state.name;
        temp[this.state.editIndex].expense = this.state.expense;
        temp[this.state.editIndex].category = this.state.category;
        this.setState({ ListItems: temp });
        this.setState({ AddorEdit: 0 });
        localStorage.setItem(
          "ListItems",
          JSON.stringify(JSON.stringify(this.state.ListItems))
        );
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
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={AddItem} />
            <Route path="/list" component={Expenses} />
          </div>
        </BrowserRouter>
      </MyContext.Provider>
    );
  }
}
