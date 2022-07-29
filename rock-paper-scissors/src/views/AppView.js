import { useRef } from "react";
import Attacher from "../components/Attacher";
import Deployer from "../components/Deployer";
import { useStoreContext } from "../context/store";


const AppViewWrapper = ({content}) => {
    return (
    <div className='App'>
        <header className="App-header" id="root">
            <h1>Rock, Paper, Scissors</h1>
            {content}
        </header>
    </div>
  )
}

const ConnectAccount = () => {
    return (
        <div>
            Please wait while we connect to your account.
        If this takes more than a few seconds, there may be something wrong.
        </div>
    )
}

const FundAccount = () => {
const {bal, defaults, setState, acc, reach} = useStoreContext()

    const inputRef = useRef()
    const amt = inputRef?.current?.value || defaults?.defaultFundAmt
    const handleTextChange = (e) => {
        inputRef.current.value = e.target.value
    }
    const fundAccount = async (fundAmount) => {
        await reach.fundFromFaucet(acc, reach.parseCurrency(fundAmount))
        setState(prev => ({...prev, view: 'DeployerOrAttacher'}))
      }    
      const skipFundAccount =  () => setState(prev => ({...prev, view: 'DeployerOrAttacher'}));
      
    return (
			<div>
				<h2>Fund account</h2>
				<br />
				Balance: {bal} {defaults.standardUnit}
				<hr />
				Would you like to fund your account with additional {defaults.standardUnit}?
				<br />
				(This only works on certain devnets)
				<br />
				<input ref={inputRef} type="number" placeholder={defaults.defaultFundAmt} onChange={handleTextChange} />
				<button onClick={()=>fundAccount(amt)}>Fund Account</button>
                <button onClick={skipFundAccount}>Skip</button>
			</div>
		);
}

const DeployerOrAttacher = () => {
    const {setState} = useStoreContext()

    const selectDeployer = () => setState(prev => ({...prev, view: 'Wrapper', ContentView: Deployer}))
    const selectAttacher = () => setState(prev => ({...prev, view: 'Wrapper', ContentView: Attacher}))
    return (
        <div>
            Please select a role:
            <br />
            <p>
                <button onClick={selectDeployer}>
                    Deployer
                </button>
                <br /> 
                Set the wager, deploy the contract.
            </p>
            <p>
                <button onClick={selectAttacher}>
                    Attacher
                </button>
                <br />
                Attach to the Deployer's contract
            </p>
        </div>
    )
}

export {
    AppViewWrapper,
    ConnectAccount,
    FundAccount,
    DeployerOrAttacher
}



// import { useRef } from "react";
// import Attacher from "../components/Attacher";
// import Deployer from "../components/Deployer";


// const AppViewWrapper = ({content}) => {
//     // console.log('content',view);
//     // const views = {
//     //     'ConnectAccount': ConnectAccount,
//     //     'FundAccount': FundAccount,
//     //     'DeployerOrAttacher': DeployerOrAttacher
//     // }
//     // const View = views[view];
//     // const content = <View {...state} setState={setState} reach={reach}  />;
//   return (
//     <div className='App'>
//         <header className="App-header" id="root">
//             <h1>Rock, Paper, Scissors</h1>
//             {content}
//         </header>
//     </div>
//   )
// }

// const ConnectAccount = () => {
//     return (
//         <div>
//             Please wait while we connect to your account.
//         If this takes more than a few seconds, there may be something wrong.
//         </div>
//     )
// }

// const FundAccount = ({ bal, defaults, setState, acc, reach}) => {
//     // console.log('value',defaults.standardUnit)
//     const inputRef = useRef()
//     const amt = inputRef?.current?.value || defaults?.defaultFundAmt
//     const handleTextChange = (e) => {
//         inputRef.current.value = e.target.value
//     }
//     const fundAccount = async (fundAmount) => {
//         await reach.fundFromFaucet(acc, reach.parseCurrency(fundAmount))
//         setState(prev => ({...prev, view: 'DeployerOrAttacher'}))
//       }
    
//       const skipFundAccount =  () => setState(prev => ({...prev, view: 'DeployerOrAttacher'}));
      
//     return (
// 			<div>
// 				<h2>Fund account</h2>
// 				<br />
// 				Balance: {bal} {defaults.standardUnit}
// 				<hr />
// 				Would you like to fund your account with additional {defaults.standardUnit}?
// 				<br />
// 				(This only works on certain devnets)
// 				<br />
// 				<input ref={inputRef} type="number" placeholder={defaults.defaultFundAmt} onChange={handleTextChange} />
// 				<button onClick={()=>fundAccount(amt)}>Fund Account</button>
//                 <button onClick={skipFundAccount}>Skip</button>
// 			</div>
// 		);
// }

// const DeployerOrAttacher = ({setState, state, reach}) => {
//     const selectDeployer = () => setState(prev => ({...prev, view: 'Wrapper', ContentView: Deployer}))
//     const selectAttacher = () => setState(prev => ({...prev, view: 'Wrapper', ContentView: Attacher}))
//     return (
//         <div>
//             Please select a role:
//             <br />
//             <p>
//                 <button onClick={selectDeployer}>
//                     Deployer
//                 </button>
//                 <br /> 
//                 Set the wager, deploy the contract.
//             </p>
//             <p>
//                 <button onClick={selectAttacher}>
//                     Attacher
//                 </button>
//                 <br />
//                 Attach to the Deployer's contract
//             </p>
//         </div>
//     )
// }

// export {
//     AppViewWrapper,
//     ConnectAccount,
//     FundAccount,
//     DeployerOrAttacher
// }
