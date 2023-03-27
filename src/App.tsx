import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Routes from './routes'

import GlobalStyle from './styles/global'

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
    <ToastContainer />
  </>
)

export default App
