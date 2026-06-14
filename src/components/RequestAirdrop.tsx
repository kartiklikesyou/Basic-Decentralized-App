import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useRef } from "react"
const LAMPORTS_PER_SOL = 1_000_000_000

export function RequestAirdrop(){
    const wallet = useWallet();
    const {connection} = useConnection()
    const amountRef = useRef<HTMLInputElement>(null)
    async function requestAirdrop(){
        try{
            if(!wallet.publicKey){
                alert("Connect your wallet first")
                return
            }
            const amount = amountRef.current?.value
            await connection.requestAirdrop(
                wallet.publicKey,
                Number (amount ||"0")*LAMPORTS_PER_SOL
            )
            alert(`Airdropped ${amount} SOL to ${wallet.publicKey?.toBase58()}`)
        }catch(e){
            alert(`Airdrop Failed ${e}`)    
        }
    }

    return(
        <div>
        <input ref = {amountRef} type="text" placeholder="Amount"></input>
        <button onClick={requestAirdrop}>Request Airdrop</button>
        </div>
    )
}