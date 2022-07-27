import { useState } from 'react'
import { useStoreContext } from '../context/store';
import RenderView from '../views/RenderView';

const Deployer = () => {
  const {reach} = useStoreContext()
  const [state, setState] = useState({
    view: 'SetWager',
    appView: 'DeployerViews',
  });

  return (
    <>      
      {RenderView(state,setState,reach)}
    </>
  )
}

export default Deployer