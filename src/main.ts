import ReactDOM from 'react-dom/client'
import init from './init'
import 'react-circular-progressbar/dist/styles.css'
import './fonts.css'
import './index.css'

const getRootElement = (id: string): HTMLElement => {
  const root = document.getElementById(id)

  if (root) return root;

  const element = document.createElement('div')
  element.id = id
  document.body.appendChild(element)

  return element
}

const startApp = async () => {
  const vdom = await init()
  const rootElement = getRootElement('root')

  ReactDOM.createRoot(rootElement).render(vdom)
}

startApp()
