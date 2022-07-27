import { views } from "../utils/helpers/store.helpers";


const RenderView = (state,setState,reach) => {
    const {view, ContentView, appView} = state;
    const Views = views[appView]
    const View = view === 'Wrapper' ? ContentView : Views[view];
    const Wrapper = Views['Wrapper'];
    const content = <View {...state} setState={setState} reach={reach}/>;

  return (
    <Wrapper content={content}/>
    )
}

export default RenderView;
