import React, { Component } from "react";


function feedItem(props){
    const {time_d,time_s,avatar_url,uid,action,kind,sourceID,divider,divider_id,divider_name} = props
    return(
        <div className="feed-item">
          <div className="feed-day">{time_d === Date.prototype.getDate() ? "今" : time_d === (Date.prototype.getDate()-1) ? "昨" : time_d}</div>
        
        
        </div>
    )
}


// [{  time_d:年月日时间，
//     time_s:时分秒时间
//     avatar_url:头像图片，
//     uid:用户id,（number）
//     action:行为，
//     kind:类型，（number）
//     sourceID:对应类型的id，（number）
//     divider:是否分隔，(bool)
//     divider_id:分隔对应的id，（number）
//     divider_name:分隔对应的名字}]