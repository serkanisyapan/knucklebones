import { useState } from "react"
import { Dice } from "./Dice"

export const PlayerBoard = () => {
    const [board, setBoard] = useState([[1, 5, 6], [2, 4], [3, 4]])
    
    return (
        <div className="h-[250px] flex flex-row">
            {board.map((col, index) => (
                <div className="text-white bg-slate-500 border border-black w-[100px] p-3 grid grid-rows-3" key={index}>
                    {col.map((dice, idx) => (
                        <Dice key={idx} diceNumber={dice}/>
                    ))}
                </div>
            ))}
        </div>
    )
}