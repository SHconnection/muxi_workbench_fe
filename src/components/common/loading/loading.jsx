import React from "react"
import ReactDOM from 'react-dom'
import './loading.css'
import '../../../static/css/common.css'
import LoadGif from './GIF1.gif'

const Loading = () => (
  <div className="alertLayer">
    <img className="loadingGif" src={LoadGif} alt="loading" />
  </div>
)


Loading.newInstance = function newInstance() {
  const div = document.createElement('div')
  document.body.appendChild(div)
  ReactDOM.render(React.createElement(Loading), div)
  return {
    destroy() {
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
    }
  }
}

export default Loading