
const renderView = (parent,Views) => {
    console.log(parent);
    parent = parent || {};
    const {view, ContentView} = parent;
    const View = view === 'Wrapper' ? ContentView : Views[view];
    const Wrapper = Views['Wrapper'];
    const props = {...parent}
    const content = <View {...props} />;
  return (
    <Wrapper {...{content}}/>
  )
}

export default renderView