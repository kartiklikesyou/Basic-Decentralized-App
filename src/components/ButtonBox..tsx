import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

interface ButtonBoxProps{
    amountRef : React.RefObject<HTMLInputElement|null> 
}   

export function ButtonBox(props: ButtonBoxProps){
    const wallet = useWallet()
    const {connection} = useConnection()


    async function sendAirdropToUser() {
        if (!wallet.publicKey) {
        alert("Connect your wallet first")
        return
        }
        try {
            const amount = props.amountRef.current?.value
            const signature = await connection.requestAirdrop(wallet.publicKey, Number(amount) * LAMPORTS_PER_SOL)
            await connection.confirmTransaction(signature)
            alert(`Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`)
        } catch (e) {
            alert("Airdrop failed: " + e)
        }
    }

    return <button onClick={sendAirdropToUser}>Request AirDrop</button>
}