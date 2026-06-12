import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import '@solana/wallet-adapter-react-ui/styles.css';
import { InputBox } from './components/InputBox';
import { ButtonBox } from './components/ButtonBox.';
import { useRef } from 'react';

function App() {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])
  const amountRef=useRef<HTMLInputElement>(null)
  return (
    <div style = {{display:"flex", justifyContent:"center", alignItems:"center",minHeight:"90vh" }}>
          <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
              <WalletProvider wallets={wallets} autoConnect>
                  <WalletModalProvider>
                    <WalletMultiButton/>
                    <div>
                      <InputBox amountRef = {amountRef}/>
                      <ButtonBox amountRef = {amountRef}/>
                    </div>
                    <WalletDisconnectButton/>
                  </WalletModalProvider>
              </WalletProvider>
          </ConnectionProvider>
    </div>
    );
}

export default App
