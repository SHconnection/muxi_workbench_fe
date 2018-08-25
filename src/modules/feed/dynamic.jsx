import React, { Component } from 'react';
import FeedItem from "../../components/feed/index"
import Gotop from '../../components/common/toTop/top'
import './dynamic.css'

class Dynamic extends Component {

  constructor(props) {
      super(props);
      this.state = {
        feedList:[
          {
            id:1,
            timeDay: "2018/8/24",
            timeHour:"21:36",
            avatarUrl: " ",
            uid: 7,
            action: "XXX加入了团队",
            kind: 1,
            sourceID: 3,
            divider: 1,
            dividerID: 2,
            dividerName: "成员"
          },
          {
            id:2,
            timeDay: "2018/8/23",
            timeHour:"21:36",
            avatarUrl: " ",
            uid: 8,
            action: "XXX有了新的进度",
            kind: 1,
            sourceID: 3,
            divider: 1,
            dividerID: 2,
            dividerName: "xxx的进度"
          },
          {
            id:3,
            timeDay: "2018/8/23",
            timeHour:"20:36",
            avatarUrl: " ",
            uid: 12,
            action: "XXX有了新的进度",
            kind: 1,
            sourceID: 3,
            divider: 0,
            dividerID: 2,
            dividerName: "xxx的进度"
          },
          {
            id:4,
            timeDay: "2018/8/23",
            timeHour:"21:36",
            avatarUrl: " ",
            uid: 2,
            action: "木小犀有了新的进度",
            kind: 1,
            sourceID: 3,
            divider: 1,
            dividerID: 2,
            dividerName: "木小犀的进度"
          },
          {
            id:5,
            timeDay: "2018/8/22",
            timeHour:"21:36",
            avatarUrl: " ",
            uid: 2,
            action: "XXX编辑了文档：木犀新人任务",
            kind: 1,
            sourceID: 3,
            divider: 1,
            dividerID: 2,
            dividerName: "木犀101"
          },
          {
            id:6,
            timeDay: "2018/8/22",
            timeHour:"21:36",
            avatarUrl: " ",
            uid: 7,
            action: "XXX上传了文件：xxx文件",
            kind: 1,
            sourceID: 3,
            divider: 1,
            dividerID: 2,
            dividerName: "华师匣子"
          },
        ],
        page: 1
      }
    }

    creatweek(timeDay){
      switch(new Date(timeDay).getDay()){
        case 0: return"周日";
        case 1: return"周一"; 
        case 2: return"周二";
        case 3: return"周三"; 
        case 4: return"周四"; 
        case 5: return"周五";
        case 6: return"周六"; 
        default: return null; 
      }
    }


    render(){
      const {feedList,page} = this.state
      return(
        <div className="feed">
          <div className="feed-content">
            <div className="feed-list">
              {feedList.map((feed, index) => 
                (
                  <div key={feed.id}>
                    {index == 0 ? (<div className={new Date().toLocaleDateString() === feed.timeDay ? "feed-today" : new Date(new Date().getTime() - 24*60*60*1000).toLocaleDateString() === feed.timeDay ? "feed-today" : "feed-day"}>{new Date().toLocaleDateString() === feed.timeDay ? "今" : new Date(new Date().getTime() - 24*60*60*1000).toLocaleDateString() === feed.timeDay ? "昨" : feed.timeDay.slice(-4) + " " + this.creatweek(feed.timeDay)}</div>)
                    : feedList[index-1].timeDay === feed.timeDay ? null: (<div className={new Date().toLocaleDateString() === feed.timeDay ? "feed-today" : new Date(new Date().getTime() - 24*60*60*1000).toLocaleDateString() === feed.timeDay ? "feed-today" : "feed-day"}>{new Date().toLocaleDateString() === feed.timeDay ? "今" : new Date(new Date().getTime() - 24*60*60*1000).toLocaleDateString() === feed.timeDay ? "昨" : feed.timeDay.slice(-4) + " " + this.creatweek(feed.timeDay)}</div>)}
                    <FeedItem timeDay={feed.timeDay} timeHour={feed.timeHour} avatarUrl={feed.avatarUrl} uid={feed.uid} action={feed.action} kind={feed.kind} sourceID={feed.sourceID} divider={feed.divider} dividerID={feed.dividerID} dividerName={feed.dividerName} />
                  </div>
                )
              )}
            </div>
          </div>
          <Gotop className="go-top" />
        </div>
      )
    }
  }

export default Dynamic;




// kind=0  status
// kind=1  project
// kind=2  doc 
// kind=3  comment 
// kind=4  team 
// kind=5  user 
// kind=6  file