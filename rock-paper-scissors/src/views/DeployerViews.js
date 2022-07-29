import React, { useEffect, useRef, useState } from 'react'
import { useStoreContext } from '../context/store'
import * as backend from '../../build/index.main.mjs';
import usePlayer from '../components/usePlayer';
// import Player from '../components/Player';

const DeployerWrapper = ({ content }) => {
    return (
        <div className="Deployer">
            <h2>Deployer (Alice)</h2>
            {content}
            {/* <Player/> */}
        </div>

    )
}

const SetWager = ({ setState }) => {
    const { defaults } = useStoreContext()
    const [wagerAmount, setWagerAmount] = useState('')
    const handleTextChange = (e) => setWagerAmount(e.target.value)
    const wager = wagerAmount || defaults.defaultWagerAmt
    const setWager = (_wager) => {
        setState(prev => ({ ...prev, view: 'Deploy', wager: _wager }))
    }
    
    return (
        <div>
            <input type="number" placeholder={defaults.defaultWagerAmt} onChange={handleTextChange} /> {defaults.standardUnit}
            <br />
            <button onClick={() => setWager(wager)}>Set wager</button>
        </div>
    )
}

const Deploy = ({ wager, setState }) => {
    const { defaults, acc, reach } = useStoreContext()
    const [
        getHand,
        random,
        seeOutcome,
        informTimeout,
        playHand
    ] = usePlayer()

    const deploy = async () => {
        const ctc = acc.contract(backend)
        setState(prev => ({
            appView: 'DeployerViews',
            view: 'Deploying',
            ctc,
        }))
        const interactObject = {
            wager: reach.parseCurrency(wager),
            deadline: { ETH: 10, ALGO: 100, CFX: 1000 }[reach.connector],
            getHand,
            random,
            seeOutcome,
            informTimeout,
            playHand
        }
        console.log('interactObject',interactObject)
        backend.Alice(ctc, interactObject)
        const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
        setState(prev => ({ ...prev, view: 'WaitingForAttacher', ctcInfoStr }))
    }

    return (
        <div>
            Wager (pay to deploy): <strong>{wager}</strong> {defaults.standardUnit}
            <br />
            <button onClick={deploy}>Deploy</button>
        </div>
    )
}

const Deploying = () => {
    return (
        <div>
            <h2>Deploying... please wait.</h2>
        </div>
    )
}

const WaitingForAttacher = ({ ctcInfoStr }) => {
    const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))
    const copyToClipboard = async (button) => {
        navigator.clipboard.writeText(ctcInfoStr);
        const origInnerHTML = button.innerHTML;
        button.innerHTML = "Copied!";
        button.disabled = true;
        await sleep(1000);
        button.innerHTML = origInnerHTML;
        button.disabled = false;
    }
    return (
        <div>
            Waiting for attacher to join...
            <br /> Please give them this contract info:
            <pre>{ctcInfoStr}</pre>
            <button
                onClick={(e) => copyToClipboard(e.currentTarget)}
                className='ContractButton'
            >
                Copy to clipboard
            </button>
        </div>
    )
}

// const handToInt = {'ROCK': 0, 'PAPER': 1, 'SCISSORS': 2};
// const inToOutcome = ['Bob wins!', 'Draw!', 'Alice wins!'];

const GetHand = () => {
    const [hand, playable] = usePlayer();
    return (
        <div>
            {hand ? 'It was a draw! Pick again.' : ''}
            <br />
            {!playable ? 'Please wait' : ''}
            <br />
            <button>Rock</button>
            <button>Rock</button>
            <button>Rock</button>
        </div>
    )
}

const WaitingForResult = () => {
    return (
        <div>
            Waiting for results...
        </div>
    )
}

const Done = () => {
    return (
        <div>
            Thank you for playing. The outcome of this game was: 
            <br />
        </div>
    )
}

const Timeout = () => {
    return <div>There's been a timeout. (Someone took too long.)</div>;
}

// export { 
//     GetHand, 
//     WaitingForResult,
//     Done,
//     Timeout
// };


export {
    DeployerWrapper,
    SetWager,
    Deploy,
    Deploying,
    WaitingForAttacher,
    // new
    GetHand, 
    WaitingForResult,
    Done,
    Timeout

}

