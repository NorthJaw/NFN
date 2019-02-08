import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class DeleteButton extends React.Component {
  handleClick = () => {
    this.props.handleClick(this.props.index);
  };

  render() {
    return <button onClick={this.handleClick}> Delete </button>;
  }
}

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.currentText };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleEditCategory(this.props.index, this.state.value);
  };

  render() {
    return (
      <form className="inputForm" onSubmit={this.handleSubmit}>
        <label>
          Edit item:
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

class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showInput: false };
  }

  toggleInput = () => {
    this.setState({ showInput: !this.state.showInput });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleInput}> Edit </button>
        {this.state.showInput ? (
          <EditForm
            currentText={this.props.currentText}
            handleEditCategory={this.props.handleEditCategory}
            index={this.props.index}
          />
        ) : null}
      </div>
    );
  }
}

class NewItem extends React.Component {
  toggleCheck = () => {
    this.props.toggleCheck(this.props.index);
  };

  handleLinkClick = event => {
    event.preventDefault();
    this.props.changeCategory(this.props.index);
  };

  render() {
    return (
      <div>
        <input
          type="checkbox"
          onChange={this.toggleCheck}
          checked={this.props.item.isChecked}
          id="checkbox_"
        />
        <a
          onClick={this.handleLinkClick}
          href=""
          style={{
            textDecoration: this.props.item.isChecked ? "line-through" : "none"
          }}
        >
          {this.props.item.name}
        </a>
        <EditButton
          currentText={this.props.item.name}
          handleEditCategory={this.props.handleEditCategory}
          index={this.props.index}
        />
        <DeleteButton
          index={this.props.index}
          handleClick={this.props.handleDeleteCategory}
        />
      </div>
    );
  }
}

class ToDoItems extends React.Component {
  render() {
    if (this.props.data.length > 0) {
      //console.log(this.props.activeCategory);
      if (this.props.activeCategory == undefined) {
        return this.props.data.map((item, index) => {
          return (
            <NewItem
              item={item}
              index={index}
              handleEditCategory={this.props.handleEditCategory}
              handleDeleteCategory={this.props.handleDeleteCategory}
              toggleCheck={this.props.toggleCheck}
              changeCategory={this.props.changeCategory}
            />
          );
        });
      } else {
        return this.props.data.map((item, index) => {
          if (item.Category.name == this.props.activeCategory.name) {
            console.log("Entered");
            return (
              <NewItem
                item={item}
                index={index}
                handleEditCategory={this.props.handleEditCategory}
                handleDeleteCategory={this.props.handleDeleteCategory}
                toggleCheck={this.props.toggleCheck}
                changeCategory={this.props.changeCategory}
              />
            );
          }
        });
      }
    } else
      return (
        <div>
          <p> Empty </p>
        </div>
      );
  }
}

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.value.trim().length > 0) {
      this.props.onSubmitText(this.state.value);
    }
    this.setState({ value: "" });
  };

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
    this.state = {
      Categories: [],
      Items: [],

      activeCategory: 0,
      id: 0
    };
  }

  changeCategory = index => {
    if (this.state.id == 0) {
      this.setState({ activeCategory: index });
    }
  };

  handleDeleteCategory = index => {
    let temp;
    if (this.state.id == 0) {
      temp = this.state.Categories;
    } else {
      temp = this.state.Items;
    }

    temp.splice(index, 1);

    if (this.state.id == 0) {
      this.setState({ Categories: temp });
    } else {
      this.setState({ Items: temp });
    }
  };

  handleEditCategory = (index, message) => {
    let temp;
    if (this.state.id == 0) {
      temp = this.state.Categories;
    } else {
      temp = this.state.Items;
    }

    temp[index].name = message;

    if (this.state.id == 0) {
      this.setState({ Categories: temp });
    } else {
      this.setState({ Items: temp });
    }
  };

  onSubmitCategory = message => {
    let newObject = {};
    newObject["name"] = message;
    newObject["isChecked"] = false;
    let temp = this.state.Categories;
    temp.push(newObject);
    this.setState({ Categories: temp });
  };

  onSubmitItem = message => {
    let newObject = {};
    newObject["Category"] = this.state.Categories[this.state.activeCategory];
    newObject["name"] = message;
    newObject["isChecked"] = false;
    let temp = this.state.Items;
    temp.push(newObject);
    this.setState({ Items: temp });
  };

  toggleCheck = index => {
    let temp;
    if (this.state.id == 0) {
      temp = this.state.Categories;
    } else {
      temp = this.state.Items;
    }

    if (temp[index].isChecked) {
      temp[index].isChecked = false;
    } else {
      temp[index].isChecked = true;
    }

    if (this.state.id == 0) {
      this.setState({ Categories: temp });
    } else {
      this.setState({ Items: temp });
    }
  };

  toggleId = event => {
    if (this.state.id == 1) {
      this.setState({ id: 0 });
    }
  };

  toggleId1 = event => {
    if (this.state.id == 0) {
      this.setState({ id: 1 });
    }
  };

  render() {
    return (
      <div className="App">
        <div
          className="SplitScreen"
          style={{
            backgroundColor: this.state.id == 0 ? "#eee" : "#fff"
          }}
        >
          <h3 onClick={this.toggleId}> Categories </h3>
          <div
            style={{
              pointerEvents: this.state.id == 1 ? "none" : "auto"
            }}
          >
            <ToDoItems
              data={this.state.Categories}
              handleEditCategory={this.handleEditCategory}
              handleDeleteCategory={this.handleDeleteCategory}
              toggleCheck={this.toggleCheck}
              changeCategory={this.changeCategory}
            />
            <AddItem onSubmitText={this.onSubmitCategory} />
          </div>
        </div>
        <div
          className="SplitScreen"
          style={{
            backgroundColor: this.state.id == 1 ? "#eee" : "#fff"
          }}
        >
          <h3 onClick={this.toggleId1}> Items </h3>
          <div
            style={{
              pointerEvents: this.state.id == 0 ? "none" : "auto"
            }}
          >
            <ToDoItems
              data={this.state.Items}
              handleEditCategory={this.handleEditCategory}
              handleDeleteCategory={this.handleDeleteCategory}
              toggleCheck={this.toggleCheck}
              changeCategory={this.changeCategory}
              activeCategory={this.state.Categories[this.state.activeCategory]}
            />
            <AddItem onSubmitText={this.onSubmitItem} />
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
