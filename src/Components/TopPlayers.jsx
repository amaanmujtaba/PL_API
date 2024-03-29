import React, { useState, useEffect } from 'react';
import DisplayFilteredPlayers from './DisplayFilteredPlayers';

export default function TopPlayers({ filteredPlayers, gwFixtures, nextFour }){

    filteredPlayers.sort((a, b) => b.ep_next - a.ep_next);
    return(
    <>
        <DisplayFilteredPlayers filteredPlayers={filteredPlayers} gwFixtures={gwFixtures} nextFour={nextFour} />
    </>
    );
}