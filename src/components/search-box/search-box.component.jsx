import React from "react";

import "./search-box.styles.css";

export const SearchBox = (props) => (
    <div>
        <input
            className="search-box"
            type="search"
            placeholder="search monsters"
            onChange={props.onSearchChange}
        />
        <select
            className="select-box"
            onChange={props.onSelectChange}
        >
            <option value={'All'}>All</option>
            {props.companies.map((company, i) => (
                <option key={i} value={company.name}>{company.name}</option>
            ))}
        </select>
        {props.haveSelectedMonster ? <button className="delete" onClick={props.onDelete}>delete</button> : <></>}
    </div>
);
