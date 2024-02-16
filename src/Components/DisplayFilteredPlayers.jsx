import { teamMapping, GW } from "../data";
import ListElement from "./ListElement";
import DisplayFixtures from "./DisplayFixtures";

export default function DisplayFilteredPlayers({ filteredPlayers, gwFixtures, nextFour}){
    return(
        <div className = "bg-slate-600 hide mt-5">
            <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Team</th>
                    <th className="px-4 py-2">Pos</th>

                    <th className="px-4 py-2">Exp Pts</th>

                    <th className="px-4 py-2">GW {GW}</th>
                    <th className="px-4 py-2">Next 4 Gameweeks</th>

                </tr>
            </thead>
            <tbody>
                    {filteredPlayers
                    .map(player => (
                    <tr key={player.id}>
                        <td className="border px-4 py-2">{player.first_name} {player.second_name}</td>
                        <td className="border px-4 py-2">{teamMapping[player.team]}</td>
                        <td className="border px-4 py-2">{player.position}</td>
                        <td className="border px-4 py-2">{player.ep_next}</td>
                        

                        <td className="border px-4 py-2">
                            {gwFixtures && gwFixtures[player.team] ? (
                                <ul>
                                {gwFixtures[player.team].map((fixture, index) => (
                                    <ListElement fixture = {fixture} index= {index} dir = "col" />
                                ))}
                                </ul>
                            ) : (
                                "wait"
                            )}


                            </td>
                            <td className="border px-4 py-2">
                                        <ul className="flex flex-row">
                                            {nextFour[player.team].map((fixtures, index) => (
                                                <DisplayFixtures fixtures = {fixtures} />
                                                        
                            ))}
                        
                                        </ul>
                                    </td>


                        
                        
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}
