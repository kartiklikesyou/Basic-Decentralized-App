import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useRef } from "react"
import {PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
const LAMPORTS_PER_SOL = 1_000_000_000

export function SendTokens(){
    const {connection} = useConnection()
    const wallet = useWallet()
    const toRef = useRef<HTMLInputElement>(null)
    const amountRef = useRef<HTMLInputElement>(null)

    async function sendTokens(){
        if(!wallet.publicKey){
            alert("Connect Wallet First")
            return
        }
        const to = toRef.current?.value
        const amount = amountRef.current?.value
        if(!to || !amount){
            alert("Enter recipient and amount")
            return
        }
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey : wallet.publicKey,
            toPubkey : new PublicKey(to),
            lamports : Number(amount) * LAMPORTS_PER_SOL
        }))
        await wallet.sendTransaction(transaction,connection)
        alert(`Send ${amount} SOL to ${to}`)
    }

    return (
        <div>
            <input ref={toRef} type="text" placeholder="to"/>
            <input ref={amountRef} type="text" placeholder="amount"/>
            <button onClick={sendTokens}>Send Tokens</button>
        </div>
    )
}