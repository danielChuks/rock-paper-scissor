import { loadStdlib } from '@reach-sh/stdlib';
import { AppViewWrapper, ConnectAccount, DeployerOrAttacher, FundAccount } from '../../views/AppView';
import { AcceptTerms, Attach, AttacherWrapper, Attaching, WaitingForTurn } from '../../views/AttacherViews';
import { Deploy, DeployerWrapper, Deploying, SetWager, WaitingForAttacher } from '../../views/DeployerViews';
import { Done, GetHand, Timeout, WaitingForResult } from '../../views/PlayerViews';

const reach = loadStdlib(process.env);
const {standardUnit} = reach;


const defaults = {defaultFundAmt: '10', defaultWagerAmt: '3', standardUnit};


const initialState = {
    view: 'ConnectAccount',
    acc: null,
    bal: null,
    defaults: defaults,
    appView: 'AppView',
    reach,
}

const views = {
    AppView: {
        'Wrapper': AppViewWrapper,
        'ConnectAccount': ConnectAccount,
        'FundAccount': FundAccount,
        'DeployerOrAttacher': DeployerOrAttacher
    },
    DeployerViews: {
        'Wrapper': DeployerWrapper,
        'SetWager':SetWager,
        'Deploy':Deploy,
        'Deploying':Deploying,
        'WaitingForAttacher':WaitingForAttacher,
        // new
        'GetHand':GetHand, 
        'WaitingForResult':WaitingForResult,
        'Done':Done,
        'Timeout':Timeout
    },
    AttacherViews: {
        'Wrapper': AttacherWrapper,
        'Attach':Attach,
        'Attaching':  Attaching,
        'AcceptTerms':AcceptTerms,
        'WaitingForTurn':WaitingForTurn,

        // new
        'GetHand':GetHand, 
        'WaitingForResult':WaitingForResult,
        'Done':Done,
        'Timeout':Timeout
    }
}

export {
    initialState,
    views,
}