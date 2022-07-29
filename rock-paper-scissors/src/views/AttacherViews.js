import { useRef, useState } from "react"
import { useStoreContext } from "../context/store"
import * as backend from '../../build/index.main.mjs';
import usePlayer, { Player } from "../components/usePlayer";

const AttacherWrapper = ({ content }) => {
    return (
        <div className="Attacher">
            <h2>Attacher {'{Bob}'}</h2>
            {content}
        </div>
    )
}

const Attach = ({ setState }) => {
    const { acc, reach } = useStoreContext()
    const [ctcInfoStr, setCtcInfoStr] = useState('')
    const [
        getHand,
        random,
        seeOutcome,
        informTimeout
    ] = usePlayer()

    const textAreaRef = useRef()
    const handleTextChange = (e) => setCtcInfoStr(e.target.value)
    const attach = async (ctcInfoStr) => {
        const ctc = acc.contract(backend, JSON.parse(ctcInfoStr))
        const info = JSON.parse(ctcInfoStr)
        const interactObject = {
            info,
            acceptWager,
            getHand,
            random,
            seeOutcome,
            informTimeout
        }
        console.log('interactObject',interactObject)
        setState(prev => ({
            ...prev,
            appView: 'AttacherViews',
            view: 'Attaching'
        }))
        backend.Bob(ctc, interactObject)

    }

    const acceptWager = async (wagerAtomic) => {
        const wager = reach.formatCurrency(wagerAtomic, 4);
        return await new Promise(resolveAcceptedP => {
            setState(prev => ({
                ...prev,
                view: 'AcceptTerms',
                wager,
                resolveAcceptedP
            }))
            console.log('acceptWager after',wager)
        })
    }
    return (
        <div>
            Please paste the contract info to attach to:
            <br />
            <textarea
                spellCheck={false}
                className="ContractInfo"
                placeholder="{}"
                ref={textAreaRef}
                onChange={handleTextChange}
            >
            </textarea>
            <br />
            <button
                disabled={!ctcInfoStr} 
                onClick={() => attach(ctcInfoStr)}
            >
                Attach
            </button>
        </div>
    )
}

const Attaching = () => {
    return (
        <div>
            Attaching, please wait...
        </div>
    )
}

const AcceptTerms = ({ wager, resolveAcceptedP, setState, state }) => {
    const { defaults } = useStoreContext()
    const [isDisabled, setIsDisabled] = useState(false);

    const termsAccepted = () => {
        setIsDisabled(true)
        resolveAcceptedP()
        console.log('resolveAcceptedP after', resolveAcceptedP)
        setState(prev => ({
            ...prev,
            view: "WaitingForTurn"
        }))
        setIsDisabled(false)
    }

    return (
        <div>
            The terms of the game are:
            <br /> Wager: {wager} {defaults.standardUnit}
            <br />
            <button disabled={isDisabled} onClick={termsAccepted}>
                Accept terms and pay wager
            </button>
        </div>
    );
}

const WaitingForTurn = () => {
    return (
        <div>
            Waiting for the other player...
            <br />Think about which move you want to play.
        </div>
    )
}


// new
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

export {
    AttacherWrapper,
    Attach,
    Attaching,
    AcceptTerms,
    WaitingForTurn,
    // new
    GetHand,
    WaitingForResult,
    Done,
    Timeout
}