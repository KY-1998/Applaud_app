import React from 'react';
import User from './User';
import Target from './Target';
import Table from './Table';
import Post from './Post';
import Setting from './Setting';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userIndex: 0,
      targetIndex : -1,
      load: 0,
    };
  }
  /* ユーザ変更 */
  handleUserChange(event){
    this.setState({userIndex: event.target.value});
  }
  /* 相手の変更 */
  handleTargetChange(event){
    this.setState({targetIndex: event.target.value});
  }
  /* 現在のユーザの場合true */
  userFlag(index){
    if(index == this.state.userIndex){return true;}
    else {return false;}
  }
  /* 相手の再設定（ユーザによって褒める相手が変わる） */
  resetTarget(){
    const targetSelect = document.getElementById('targetSelect');
    targetSelect.selectedIndex = 0;
    this.setState({targetIndex: -1});
  }
  /* 画面のロード用のstateの更新 */
  loadWindow(){
    this.setState({load: 0});
  }

  render(){
    /* ユーザリストをローカルデータから取得 */
    const userList = JSON.parse(localStorage.getItem('userData'));

    

    if(userList){
      return (
        <div>
          <div className = 'header'>
            {/* ユーザ部分 */}
            <div className = 'user-container'>
              <User
                user={userList[this.state.userIndex]}
              />
              <select defaultValue='default' onChange = {(event) => {this.handleUserChange(event); this.resetTarget();}}>
                <option value = 'default' disabled>User</option>
                {userList.map((userItem, index) => {
                  return(
                    <option key={index} value={index}>
                      {userItem.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='main'>
            {/* 投稿部分 */}
            <div className = 'post-container'>
              <div>
                <div className = 'target-container'>
                  {(this.state.targetIndex >= 0) &&
                    <Target
                      target={userList[this.state.targetIndex]}
                    />
                  }
                </div>
                <div className = 'text-container'>
                  <Post userIndex={this.state.userIndex}
                        targetIndex={this.state.targetIndex}
                        loadWindow={()=>{this.loadWindow();}}/>
                </div>
              </div>
              <select id = 'targetSelect' defaultValue='default' onChange = {(event) => {this.handleTargetChange(event);}}>
                <option value = 'default' disabled>Select</option>
                {userList.map((targetItem, index) => {
                  if(!this.userFlag(index)){
                    return(
                      <option key={index} value={index}>
                        {targetItem.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            {/* 投稿一覧部分 */}
            <div className = 'table-container'>
              <Table userList = {userList}
                     userIndex = {this.state.userIndex}
                     loadWindow = {()=>{this.loadWindow(); }}/>
            </div>
          </div>
        </div>
      );
    }else{
      return(
        <Setting loadWindow = {()=>{this.loadWindow()}}/>
      );

    }

  }
}

export default App;
