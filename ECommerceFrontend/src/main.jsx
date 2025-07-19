import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {ConfigProvider, theme} from 'antd'
import {ThemeProvider, useTheme} from './context/ThemeContext.jsx'
// import { ProductsProvider } from './context/ProductsContext/ProductsState.jsx';
// import { OrderProvider } from './context/OrdersContext/OrdersState'
// import './index.css';
import './assets/styles/main.scss'

const ThemedApp = () => {
  const {algorithm} = useTheme()
  const selectedAlgorithm =
    algorithm === 'darkAlgorithm' ? theme.darkAlgorithm : theme.defaultAlgorithm

  return (
    <ConfigProvider theme={{algorithm: selectedAlgorithm}}>
      <App />
    </ConfigProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        {/* <OrderProvider> */}
        {/* <ProductsProvider> */}
        <ThemedApp />
        {/* </ProductsProvider> */}
        {/* </OrderProvider> */}
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
