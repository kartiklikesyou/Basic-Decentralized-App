import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import '@solana/wallet-adapter-react-ui/styles.css';
import { RequestAirdrop } from './components/RequestAirdrop'
import { SendTokens } from './components/SendTokens'
import { ShowSolBalance } from './components/ShowSolBalance'
import { SignMessage } from './components/SignMessage'

function App() {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])
  return (
    <div style = {{display:"flex", justifyContent:"center", alignItems:"center",minHeight:"90vh" }}>
          <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
              <WalletProvider wallets={wallets} autoConnect>
                  <WalletModalProvider>
                    <WalletMultiButton/>
                    <div>
                      <RequestAirdrop/>
                      <SendTokens/>
                      <ShowSolBalance/>
                      <SignMessage/>
                    </div>
                    <WalletDisconnectButton/>
                  </WalletModalProvider>
              </WalletProvider>
          </ConnectionProvider>
    </div>
    );
}

export default App
