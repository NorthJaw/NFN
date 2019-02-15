import React from "react";
import { MyContext } from "./appContext";
import { Link, Redirect } from "react-router-dom";

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

export function Expenses() {
  return (
    <div>
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            {context.state.AddorEdit == 1 ? <Redirect to="/add" /> : null}
            {context.state.ListItems.map((item, index) => {
              return (
                <div>
                  <Expense index={index} />
                </div>
              );
            })}
            <Link to="/">Home</Link>
            <br />
            <Link to="add">Add Expense</Link>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    </div>
  );
}
