import React from 'react'

const exports = {}

exports.Wrapper = ({content}) => {
  return (
    <div className='App'>
        <header className="App-header" id="root">
            <h1>Rock, Paper, Scissors</h1>
            {content}
        </header>
    </div>
  )
}

exports.ConnectAccount = () => {
    return (
        <div>
            Please wait while we connect to your account.
        If this takes more than a few seconds, there may be something wrong.
        </div>
    )
}

exports.FundAccount = ({bal, standardUnit}) => {
    return (
        <div>
           <h2>Fund account</h2>
           <br />
           Balance: {bal} {standardUnit}
           <hr />
           Would you like to fund your account with additional {standardUnit}?
           <br />
           (This only works on certain devnets)
           <br />
        </div>
    )
}

exports.DeployerOrAttacher = () => {

    return (
        <div>
            Please select a role:
            <br />
            <p>
                <button >
                    Deployer
                </button>
                <br /> 
                Set the wager, deploy the contract.
            </p>
            <p>
                <button>
                    Attacher
                </button>
                <br />
                Attach to the Deployer's contract
            </p>
        </div>
    )
}

export default exports
