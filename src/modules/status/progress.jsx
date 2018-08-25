import React, { Component } from 'react';
import StatusItem from "../../components/status/basicCard/index"
import Gotop from '../../components/common/toTop/top'


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
            goodNumber: 14,
            comments: 2,
          },
          {
            id: 2,
            goodNumber: 4,
            comments: 5,
            name: "木小犀",
            time: "08:03",
            index: 1,
            text: "这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段"
          },
          {
            id: 3,
            goodNumber: 23,
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
    <div>
      <div className="status">
        <div className="status-container">
          {cards.map(card => 
            (
              <div key={card.id}>
                <StatusItem goodNumber={card.goodNumber} comments={card.comments} name={card.name} time={card.time} index={card.index} text={card.text} />
              </div>
            )
          )}
        </div>
      </div>
      <Gotop className="gotop" />
    </div>
  )
}
}

export default Progress;