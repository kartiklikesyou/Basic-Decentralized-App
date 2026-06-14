import { useRef } from "react"
import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

export function SignMessage(){
    const {publicKey,signMessage}=useWallet()
    const messageRef = useRef<HTMLInputElement>(null)
    async function onClick(){
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');
        const message = messageRef.current?.value 
        const encodedMessage = new TextEncoder().encode(message)
        const signature = await signMessage(encodedMessage)
        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
        throw new Error('Message signature invalid!')
        alert(`Success, Message Signature : ${bs58.encode(signature)}`)
    }

    return (
        <div>
            <input ref = {messageRef} type="text" placeholder="Message"/>
            <button onClick={onClick}>Sign Message</button>
        </div>  
    )
}