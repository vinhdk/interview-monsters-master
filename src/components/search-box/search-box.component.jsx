import React from "react";

import "./search-box.styles.css";

export const SearchBox = (props) => (
  <div>
    <input
      className="search-box"
      type="search"
      placeholder="search monsters"
      onChange={(e) => props.onSearchChange(e)}
    />
    <select className="select-box">
      <option value={1}>company 1</option>
      <option value={2}>company 2</option>
    </select>
    <button className="delete">delete</button>
  </div>
);
