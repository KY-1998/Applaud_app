import React from 'react';

class User extends React.Component{
  render(){
    /* ユーザの情報を表示 */
    return(
      <div className = 'userCard'>
          <img src={`${process.env.PUBLIC_URL}/user_img/${this.props.user.image}`} alt="UserImage"/>
          <span className='userCardText'>拍手できるポイント: <span className='userCardNum'>{this.props.user.point_canBeUsed}</span></span>
          <span className='userCardText'>拍手されたポイント: <span className='userCardNum'>{this.props.user.point_received}</span></span>
      </div>
    );
  }
}
export default User;
