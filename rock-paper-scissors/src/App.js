import { useEffect, useState } from 'react';
import * as backend from '../build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
import renderView from './views/render.js';
import AppViews from './views/AppViews';
const reach = loadStdlib(process.env);

const handToInt = {'ROCK': 0, 'PAPER': 1, 'SCISSORS': 2};
const inToOutcome = ['Bob wins!', 'Draw!', 'Alice wins!'];
const {standardUnit} = reach;
const defaults = {defaultFundAmt: '10', defaultWagerAmt: '3', standardUnit};

const App = () => {
  // const [view, setView] = useState('ConnectAccount');
  const [defaultValues, setDefaultValues] = useState(defaults);
  // const [acc, setAcc] = useState(null);
  // const [bal, setBal] = useState(null);
  const [state, setState] = useState({
    view: 'ConnectAccount',
    acc: null,
    bal: null,
  });

  useEffect(() => {
    const init = async () => {
      const acc = await reach.getDefaultAccount();
      const balAtomic = await reach.balanceOf(acc);
      const bal = reach.formatCurrency(balAtomic, 4);
      setState(prev => ({...prev, acc, bal}));
      // setAcc(acc);
      // setBal(bal);
      const canFundFromFaucet = await reach.canFundFromFaucet()
      console.log(canFundFromFaucet);
      if (canFundFromFaucet) {
        // setView('FundAccount');
        setState(prev => ({...prev, view: 'FundAccount'}));
      } else {
        // setView('ConnectAccount');
        setState(prev => ({...prev, view: 'DeployerOrAttacher'}));
      }
    }
    init();
  }, [])

  const fundAccount = async (fundAmount) => {
    await reach.fundFromFaucet(state.acc, reach.parseCurrency(fundAmount))
    setState(prev => ({...prev, view: 'DeployerOrAttacher'}))
  }

  const skipFundAccount =  () => setState(prev => ({...prev, view: 'DeployerOrAttacher'}));
  
  return (
    <div>
      {renderView(state,AppViews)}
    </div>
  )
}

export default App

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {view: 'ConnectAccount', ...defaults};
//   }
//   async componentDidMount() {
//     const acc = await reach.getDefaultAccount();
//     const balAtomic = await reach.balanceOf(acc);
//     const bal = reach.formatCurrency(balAtomic, 4);
//     this.setState({acc, bal});
//     if (await reach.canFundFromFaucet()) {
//       this.setState({view: 'FundAccount'});
//     } else {
//       this.setState({view: 'DeployerOrAttacher'});
//     }
//   }
//   async fundAccount(fundAmount) {
//     await reach.fundFromFaucet(this.state.acc, reach.parseCurrency(fundAmount));
//     this.setState({view: 'DeployerOrAttacher'});
//   }
//   async skipFundAccount() { this.setState({view: 'DeployerOrAttacher'}); }
//   selectAttacher() { this.setState({view: 'Wrapper', ContentView: Attacher}); }
//   selectDeployer() { this.setState({view: 'Wrapper', ContentView: Deployer}); }
//   render() { return renderView(this, AppViews); }
// }