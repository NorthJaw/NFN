import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <Link to="add">Add Expense</Link>
      <br />
      <Link to="list">List all Expenses</Link>
    </div>
  );
}
