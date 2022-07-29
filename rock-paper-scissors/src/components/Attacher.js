import { useState } from "react";
import { useStoreContext } from "../context/store";
import RenderView from "../views/RenderView";
// import Player from "./Player";

const Attacher = () => {
  const {reach} = useStoreContext()
  const [state, setState] = useState({
    view: 'Attach',
    appView: 'AttacherViews',
  });

  return (
    // <Player>      
      <>
        {RenderView(state, setState, reach)}
      </>
    // </Player>
  )
}

export default Attacher