import React from 'react';
import ReactSVG from 'react-svg'
import back from '../../../assets/svg/commonIcon/back.svg'
import thumbs from '../../../assets/svg/commonIcon/thumbs.svg'
import Othercomments from '../../../components/common/otherComments/comments'
import Sendcomment from '../../../components/common/sendComment/comment'
// import Detelt from '../../../components/setting/delete'
import './detail.css'


const detail = () => (
         <div className="status-detail">
            <div className="status-detail-head">
              <ReactSVG className="status-detail-back" path={back} />
              <div className="stauts-detail-second">
                <div className="status-detail-name">木小犀</div>
                <div className="status-detail-time">13:23</div>
              </div>
              <div className="status-detail-edit">编辑</div>
              <div className="status-detail-detele">删除</div>
              <ReactSVG className="status-detail-good" path={thumbs} />
              <div className="status-detail-love">14</div>
            </div>
            <div className="status-details">这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本。</div>
            <hr className="line"/>
            <div>
              <Othercomments className="status-detail-comments" />
              <Sendcomment className="sendcomment" />
            </div>
          </div>
);
export default detail;