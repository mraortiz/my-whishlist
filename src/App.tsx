
import Content from './Content';
import { UiProvider } from './context/UIContext';

function App() {

  return (
    <UiProvider>
      <Content />
    </UiProvider>
  )
}

export default App
