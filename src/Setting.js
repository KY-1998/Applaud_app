import React from 'react';

class Setting extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      userList: [],
    };
  }
  handleNameChange(event){
    this.setState({name: event.target.value});
  }
  handleImageChange(event){
    this.setState({image: event.target.value});
  }
  handleUserListChange(){
    if(this.state.name != '' && this.state.image != ''){
      const userData = {
        name: this.state.name,
        image: this.state.image,
        point_canBeUsed: 100,
        point_received: 0,
      }
      const userList = this.state.userList;
      userList.push(userData);
      this.setState({name: '', image: '', userList: userList});
    }
  }
  saveUserList(){
    const userList = this.state.userList;
    if(userList[0]){
      localStorage.setItem('userData', JSON.stringify(userList));
      this.props.loadWindow();
    }

  }

  render(){
    return(
      <div className='setting-container'>
        <div className='setUserInfo'>
          <h1>ユーザ登録</h1>
          <div className='userName'>
            <p>name:（例）hogehoge</p>
            <input type='text' value={this.state.name} onChange={(event)=>{this.handleNameChange(event)}}/>
            <span className='focus-line'></span>
          </div>
          <div className='userImage'>
            <p>image:（例）hogehoge.png</p>
            <input type='text'  value={this.state.image} onChange={(event)=>{this.handleImageChange(event)}} />
            <span className='focus-line'></span>
          </div>
          <div className='btn-wrapper'>
            <input className = 'btn' type='button' value='追加' onClick={()=>{this.handleUserListChange()}}/>
            <input className = 'btn' type='button' value='保存' onClick={()=>{this.saveUserList()}}/>
          </div>
        </div>
        <div className='userListSet'>
          {this.state.userList.map((userData, index) => {
            return(
              <li className='userDataSet' key={index}>name:{userData.name}, image:{userData.image}</li>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Setting;
