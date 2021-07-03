import React, { useEffect, useCallback, useState } from "react";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

import "./App.css";

/**
 *  List issues in project and write reasons for those issues
 *  Write function throttle search after 300ms user stop typing
 *  write function search monster follow company field from api
 *  Write function to ONLY show button delete when having any selected monster and remove selected monster by clicking button with 0(n)
 *  Optimize performance
 */

function App() {
  const [monsters, setMonster] = useState([]);
  const [searchField, setSearchField] = useState("");

  const getMonster = useCallback(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonster(users));
  }, []);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  useEffect(() => {
    getMonster();
  });

  const filteredMonsters = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox onSearchChange={onSearchChange} />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;
