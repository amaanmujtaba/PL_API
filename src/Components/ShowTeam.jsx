import React from 'react';
import ListElement from './ListElement';
import { teamMapping, GW } from '../data';

export default function ShowTeam({ nextFour, gwFixtures }) {


    const avgDiff = {};

    
    //console.log(nextFour[1].length);
    for (let i = 1; i<=20; i++){
        let sumDiff = 0
        let numDiff = 0
        //nextFour[i].forEach()
        for (let j = 0; j<nextFour[i].length; j++){
            console.log(nextFour[i][j], )
            if(nextFour[i][j][0][1] !==0 ){
                sumDiff+= nextFour[i][j][0][1];
                numDiff+=1;
            }
        }
        avgDiff[i] = (sumDiff/numDiff).toFixed(2);
    }


    console.log(avgDiff);
    return (
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">GW {GW}</th>
                        <th className="px-4 py-2">Next 4 Gameweeks</th>
                        <th className="px-4 py-2">Avg Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(nextFour).map(teamId => (
                        <tr key={teamId}>
                            <td className="border px-4 py-2">{teamMapping[teamId]}</td>
                            <td className="border px-4 py-2">
                                {gwFixtures[teamId].map((fixture, index) => (
                                    <ListElement key={index} fixture={fixture} index={index} dir="col" />
                                ))}
                            </td>
                            <td className="border px-4 py-2">
                                <ul className="flex flex-row">
                                    {nextFour[teamId].map((fixtures, index) => (
                                        <React.Fragment key={index}>
                                            {fixtures.map((fixture, i) => (
                                                
                                                <ListElement key={i} fixture={fixture} index={i} dir="row" />
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </ul>
                            </td>
                            <td className="border px-4 py-2">{avgDiff[teamId]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
