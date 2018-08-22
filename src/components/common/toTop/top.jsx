import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import top from '../../../assets/svg/commonIcon/top.svg'
import './top.css'


class toTop extends Component {
  constructor(props){
    super(props);
    this.state ={
      display:false
    };
    this.scrollTop = this.scrollTop.bind(this)
  }
  componentDidMount= ()=> {
    window.addEventListener('scroll',this.handleScroll);
    };
    
    componentWillUnmount= ()=> {
    window.removeEventListener('scroll',this.handleScroll);
    };
    
    handleScroll=event=> {
    if (window.pageYOffset > 100) {
    this.setState({ display: true });
    }else {
    this.setState({ display: false });
    }
    };
    
    scrollTop= ()=> {
    window.scrollTo(0,0);
    };
    

  render() {
    return (
      <div>
        <ReactSVG className="top" onClick={this.scrollTop} path={top} />
      </div>
    )
  }
}
export default toTop;


