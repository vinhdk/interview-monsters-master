import React, {useEffect, useCallback, useState, useMemo} from "react";

import {CardList} from "./components/card-list/card-list.component";
import {SearchBox} from "./components/search-box/search-box.component";

import "./App.css";
import {MonsterService} from "./services/monster.service";
import {useDebounce} from "./hooks/debounce.hook";

/**
 *  List issues in project and write reasons for those issues
 *  Write function throttle search after 300ms user stop typing
 *  write function search monster follow company field from api
 *  Write function to ONLY show button delete when having any selected monster and remove selected monster by clicking button with 0(n)
 *  Optimize performance
 */

function App() {
    const [monsters, setMonsters] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [searchCompany, setSearchCompany] = useState('All');
    const [selectedMonsters, setSelectedMonsters] = useState([]);
    const debounceValue = useDebounce(searchField, 300);

    const getMonsters = async () => {
        const res = await MonsterService.getMonsters();
        setMonsters(res);
        setCompanies(res.map((item) => item.company));
    };

    const getMonstersAfterRemove = () => {
        const toRemoveSet = new Set(selectedMonsters.map((monster) => monster.id));
        return monsters.filter((monster) => !toRemoveSet.has(monster.id));
    };

    const onSearchChange = useCallback((event) => {
        setSearchField(event.target.value);
    }, [searchField]);

    const onSelectChange = useCallback((event) => {
        setSearchCompany(event.target.value);
    }, [searchCompany]);

    const onSelectedItem = useCallback((monster, val) => {
        if (val) {
            selectedMonsters.push(monster);
            setSelectedMonsters(selectedMonsters);
        } else {
            setSelectedMonsters(selectedMonsters.filter((m) => m.id !== monster.id));
        }
    }, [selectedMonsters]);

    const onDeleteSelectedItems = useCallback((monster, val) => {
        if (selectedMonsters.length) {
            const monstersAfterRemove = getMonstersAfterRemove();
            setMonsters(monstersAfterRemove);
            setSelectedMonsters([]);
            setCompanies(monstersAfterRemove.map((item) => item.company));
            setSearchField('');
            setSearchCompany('All');
        } else {
            alert('Please select monster before click delete button');
        }
    }, [selectedMonsters]);

    const cardList = useMemo(() => {
        const filteredMonsters = monsters.filter((monster) =>
            monster.name.toLowerCase().includes(debounceValue.toLowerCase())
            && (monster.company.name === searchCompany || searchCompany === 'All')
        );
        setSelectedMonsters([]);
        return <CardList monsters={filteredMonsters} onSelectedItem={onSelectedItem}/>;

    }, [debounceValue, searchCompany, monsters]);

    const searchBox = useMemo(() => {
        return <SearchBox
            companies={companies}
            haveSelectedMonster={selectedMonsters.length}
            onSearchChange={onSearchChange}
            onSelectChange={onSelectChange}
            onDelete={onDeleteSelectedItems}
        />
    }, [companies, selectedMonsters]);

    useEffect(() => {
        getMonsters();
    }, []);

    return (
        <div className="App">
            <h1>Monsters Rolodex</h1>
            {searchBox}
            {cardList}
        </div>
    );
}

export default App;
