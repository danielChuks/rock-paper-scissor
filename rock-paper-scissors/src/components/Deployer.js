import { useState } from 'react'
import { useStoreContext } from '../context/store';
import RenderView from '../views/RenderView';
// import Player from './Player';

const Deployer = () => {
  const { reach } = useStoreContext()
  const [state, setState] = useState({
    view: 'SetWager',
    appView: 'DeployerViews',
  });

  // Player
  // random(){
  //   return reach.hasRandom.random();
  // }

  return (
    // <Player>
      <>
        {RenderView(state, setState, reach)}
      </>
    // </Player>
  )
}

export default Deployer