import { useState } from "react";
import { useStoreContext } from "../context/store";
import RenderView from "../views/RenderView";

const Attacher = () => {
  const {reach} = useStoreContext()
  const [state, setState] = useState({
    view: 'Attach',
    appView: 'AttacherViews',
  });

  return (
    <>      
      {RenderView(state,setState,reach)}
    </>
  )
}

export default Attacher