import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
const LAMPORTS_PER_SOL = 1_000_000_000

export function ShowSolBalance(){
    const {connection} = useConnection()
    const wallet = useWallet()
    const [balance,setBalance]=useState(0)
    async function getBalance(){
        if(wallet.publicKey){
            const balance = await connection.getBalance(wallet.publicKey)
            setBalance(Number(balance)/LAMPORTS_PER_SOL)
        }
    }
    getBalance()
    return (
        <div>
            SOL BALANCE : {balance}
        </div>
    )
}