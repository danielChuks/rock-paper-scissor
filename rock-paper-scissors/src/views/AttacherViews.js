import { useRef, useState } from "react"
import { useStoreContext } from "../context/store"
import * as backend from '../../build/index.main.mjs';

const AttacherWrapper = ({content}) => {
    return (
        <div className="Attacher">
            <h2>Attacher {'{Bob}'}</h2>
            {content}
        </div>
    )
}

const Attach = ({setState}) => {
    const { acc,reach } = useStoreContext()

    const textAreaRef = useRef()
    const handleTextChange = (e) => {
        textAreaRef.current.value = e.target.value
    }
    const attach = async (ctcInfoStr) => {
        const ctc = acc.contract(backend, JSON.parse(ctcInfoStr))
        const info = JSON.parse(ctcInfoStr)
        const interactObject = {
            info,acceptWager
        }
        setState(prev =>({
            ...prev, 
            appView: 'AttacherViews',
            view: 'Attaching'
        }))
        backend.Bob(ctc, interactObject)
        
    }

    const acceptWager = async (wagerAtomic) => {
        const wager = reach.formatCurrency(wagerAtomic, 4);
        return await new Promise(resolveAcceptedP => setState(prev => ({
            ...prev,
            view: 'AcceptTerms',
            wager,
            resolveAcceptedP
        })))
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
                // disabled={!textAreaRef.current.value} 
                onClick={()=>attach(textAreaRef.current.value)}
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

const AcceptTerms = ({wager, resolveAcceptedP,setState}) => {
    const { defaults } = useStoreContext()
    const [isDisabled, setIsDisabled] = useState(false);

    const termsAccepted = () => {
        setIsDisabled(true)
        resolveAcceptedP()
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

export {
    AttacherWrapper,
    Attach,
    Attaching,
    AcceptTerms,
    WaitingForTurn
}