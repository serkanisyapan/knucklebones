import { useState } from "react"

interface Dice{
    diceNumber?: number
}

export const Dice = ({ diceNumber }: Dice) => {
    const [dice, setDice] = useState<number>(diceNumber || rollDice())

    function pickRandomDieNumber() {
        return Math.floor(Math.random() * 6) + 1
    }

    function rollDice() {
        return pickRandomDieNumber()
    }

    return <div className="bg-emerald-500 cursor-pointer select-none h-16 w-16 rounded text-white flex justify-center items-center text-2xl">{dice}</div>
}