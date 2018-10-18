import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import ArrowLeft from "../../../assets/svg/commonIcon/arrowLeft.svg";
import ArrowRight from "../../../assets/svg/commonIcon/arrowRight.svg";
import './index.css';

class Paging extends Component {
  constructor(props) {
    super(props)
    this.choosePage = this.choosePage.bind(this);
  }

  choosePage(page) {
    const { selectPage, pageNums, currentPage } = this.props
    if (currentPage !== page) {
      if (page > 0 && page <= pageNums) {
        selectPage(page)
      }
    }
  }

  render() {
    // const { midPage } = this.state
    const { pageNums, currentPage } = this.props
    return (
      <div className="paging-conten">
        <div className="paging-arrow" onClick={() => {this.choosePage(currentPage - 1)}} onKeyDown={() => {}} role="presentation">
          <ReactSVG path={ArrowLeft} />
        </div>
        {currentPage - 1 > 0 ? (<div onClick={() => {this.choosePage(currentPage - 1)}} onKeyDown={() => {}} role="presentation">{currentPage - 1}</div>) : ""}
        <div className="paging-current">{currentPage}</div>
        {currentPage + 1 <= pageNums ? (<div onClick={() => {this.choosePage(currentPage + 1)}} onKeyDown={() => {}} role="presentation">{currentPage + 1}</div>) : ""}
        <div className="paging-arrow" onClick={() => {this.choosePage(currentPage + 1)}} onKeyDown={() => {}} role="presentation">
          <ReactSVG path={ArrowRight} />
        </div>
      </div>
    )
  }
}


Paging.propTypes = {
  pageNums: PropTypes.number,
  currentPage: PropTypes.number,
  selectPage: PropTypes.func
}

Paging.defaultProps = {
  pageNums: 1,
  currentPage: 1,
  selectPage: null
}

export default Paging;