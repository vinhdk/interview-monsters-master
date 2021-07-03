import React from "react";

import { Card } from "../card/card.component";

import "./card-list.styles.css";

/**
 *  Re-write list monster with 3 columns and space between columns is exact 20px; not    left and right side, responsive with mobile using FlexBox
 *  Make email of every care in the same row
 *  Create animation when hover monster
 */

export const CardList = (props) => (
  <div className="card-list">
    {props.monsters.map((monster) => (
      <Card key={monster.id} monster={monster} onSelectedItem={(e) => props.onSelectedItem(monster, e.target.checked)} />
    ))}
  </div>
);
