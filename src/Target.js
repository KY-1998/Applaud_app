import React from 'react';

class Target extends React.Component{
  render(){
    /* 相手の情報を表示 */
    return(
      <div className = 'targetCard'>
        <img src = {`${process.env.PUBLIC_URL}/${this.props.target.image}`} />
      </div>
    );
  }
}
export default Target;
