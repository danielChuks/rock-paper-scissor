import React from 'react'

const Wrapper = ({content}) => {
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

const FundAccount = ({bal, standardUnit}) => {
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

export  {
    Wrapper, 
    ConnectAccount, 
    FundAccount
}