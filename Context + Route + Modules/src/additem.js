import React from "react";
import { MyContext } from "./appContext";
import { Link } from "react-router-dom";

export class AddItem extends React.Component {
  render() {
    return (
      <div>
        <MyContext.Consumer>
          {context => (
            <React.Fragment>
              <form
                onSubmit={e => {
                  context.handleSubmitForm(
                    e,
                    context.state.name,
                    context.state.expense,
                    context.state.category
                  );
                  this.props.history.push("/list");
                }}
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
              <Link to="/">Home</Link>
              <br />
              {context.state.AddorEdit == 1 ? null : (
                <Link to="list">List all Expenses</Link>
              )}
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}
