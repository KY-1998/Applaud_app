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
  /*名前を一時保存*/
  handleNameChange(event){
    this.setState({name: event.target.value});
  }
  /*画像を一時保存*/
  handleImageChange(event){
    this.setState({image: event.target.value});
  }
  /*ユーザリストに「入力された名前と画像」と「その他のデータ」をユーザとして追加保存*/
  handleUserListChange(){
    /*名前と画像の中身がある時*/
    if(this.state.name !== '' && this.state.image !== ''){
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
  /*ローカルストレージにユーザリストを保存*/
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
        {/*ユーザ登録*/}
        <div className='setUserInfo'>
          <h1>ユーザ登録</h1>
          {/*名前入力*/}
          <div className='userName'>
            <p>name:（例）hogehoge</p>
            <input type='text' value={this.state.name} onChange={(event)=>{this.handleNameChange(event)}}/>
            <span className='focus-line'></span>
          </div>
          {/*画像名入力*/}
          <div className='userImage'>
            <p>image:（例）hogehoge.png</p>
            <input type='text'  value={this.state.image} onChange={(event)=>{this.handleImageChange(event)}} />
            <span className='focus-line'></span>
          </div>
          {/*追加、保存のbutton表示*/}
          <div className='btn-wrapper'>
            <input className = 'btn' type='button' value='追加' onClick={()=>{this.handleUserListChange()}}/>
            <input className = 'btn' type='button' value='保存' onClick={()=>{this.saveUserList()}}/>
          </div>
        </div>
        {/*現在追加しているユーザを表示*/}
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
