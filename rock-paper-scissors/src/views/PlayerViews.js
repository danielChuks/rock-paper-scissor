// const handToInt = {'ROCK': 0, 'PAPER': 1, 'SCISSORS': 2};
// const inToOutcome = ['Bob wins!', 'Draw!', 'Alice wins!'];

import usePlayer from "../components/usePlayer";

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
    GetHand, 
    WaitingForResult,
    Done,
    Timeout
};