import React, { Component } from 'react';
import './progress.css'
import StatusItem from '../../components/status/basicCard/index.jsx'

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cards: [
          {
            id: 1,
            name: "木小犀",
            time: "14:46",
            text: "这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段",
            index: 0,
            good_number: 14,
            comments: 2,
          },
          {
            id: 2,
            good_number: 4,
            comments: 5,
            name: "木小犀",
            time: "08:03",
            index: 1,
            text: "这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段"
          },
          {
            id: 3,
            good_number: 23,
            comments: 3,
            name: "木小犀",
            time: "11:37",
            index: 0,
            text: "这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段"
          }
        ]
    }
}
render() {
  const {cards} = this.state
  return (
    <div className="status">
      <div className="status-container">
        {cards.map(card => 
          (
            <div key={card.id}>
              <StatusItem good_number={card.good_number} comments={card.comments} name={card.name} time={card.time} index={card.index} text={card.text} />
            </div>
          )
        )}
      </div>
    </div>
  )
}
}

export default Progress;