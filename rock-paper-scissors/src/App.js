import { useEffect, useState } from 'react';
import { loadStdlib } from '@reach-sh/stdlib';
import RenderView from "./views/RenderView";
import { useStoreContext } from './context/store.js';

const reach = loadStdlib(process.env);
reach.setWalletFallback(reach.walletFallback({}));

// const handToInt = {'ROCK': 0, 'PAPER': 1, 'SCISSORS': 2};
// const inToOutcome = ['Bob wins!', 'Draw!', 'Alice wins!'];

const App = () => {
  const { setState, state, reach } = useStoreContext()

  useEffect(() => {
    const init = async () => {
      const acc = await reach.getDefaultAccount();
      const balAtomic = await reach.balanceOf(acc);
      const bal = reach.formatCurrency(balAtomic, 4);
      setState(prev => ({ ...prev, acc, bal }));
      if (await reach.canFundFromFaucet()) {
        setState(prev => ({ ...prev, view: 'FundAccount' }));
      } else {
        setState(prev => ({ ...prev, view: 'DeployerOrAttacher' }));
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      {RenderView(state, setState, reach)}
    </>
  )
}

export default App


