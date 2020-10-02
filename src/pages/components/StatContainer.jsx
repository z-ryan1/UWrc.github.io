import React from "react";
import PropTypes from "prop-types";

import StatSlotMachineItem from "./StatSlotMachineItem";
import StatRow from "./StatRow";


const Colors = {
  GLAUCOUS: "#6883BA",
  YALE_BLUE: "#033860",
  CHINA_ROSE: "#AB4E68",
  SPANISH_VIOLET: "#4B2E83",
  LIGHT_FRENCH_BEIGE: "#B7A57A",
}

function buildStatContainer(statItems) {
  let statItemMapping = Object.entries(statItems)
  let colors = Object.values(Colors)
  let statRows = []
  let currentRow = [
    <StatSlotMachineItem
      key={0}
      idx={0}
      caption={statItemMapping[0][0]}
      value={statItemMapping[0][1]}
      backgroundColor={colors[0]}
    />
  ]
  for (let i = 1; i < statItemMapping.length; i++) {
    if (i % 3 == 0) {  // rows have <= 3 items
      statRows.push(currentRow)
      currentRow = []
    }
    let currentItem = <StatSlotMachineItem
      key={i}
      caption={statItemMapping[i][0]}
      value={statItemMapping[i][1]}
      backgroundColor={colors[i % colors.length]}
    />
    currentRow.push(currentItem)
  }
  statRows.push(currentRow)
  return statRows.map((row, i) => <StatRow key={i} idx={i} statItems={row} />)
}

StatContainer.propTypes = {
  statItems: PropTypes.object.isRequired
}

export default function StatContainer(props) {
  return <div>
    {buildStatContainer(props.statItems)}
  </div>
}