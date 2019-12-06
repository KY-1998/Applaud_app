import React from 'react';

class Post extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      miss: '',
    };
  }
  /* 日付を取得 */
  getDate(){
    const now = new Date();

    let year = now.getYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();


    // 日付の調節
    if(year < 2000) { year += 1900; }
    if(month < 10) { month = '0' + month; }
    if(day < 10) { day = '0' + day; }
    if(hour < 10) { hour = '0' + hour; }
    if(min < 10) { min = '0' + min; }
    if(sec < 10){sec = '0' + sec; }

    return year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' +sec;
  }

  /* テキスト内容変更 */
  handleTextChange(event){
    this.setState({text: event.target.value});
  }
  /* 投稿データの保存（変更） */
  handlePostChange(user, target){
    /* 投稿ユーザと褒める相手のインデックス　テキスト　日付　を保存 */
    const data = {
      id: 0,
      userIndex: this.props.userIndex,
      targetIndex: this.props.targetIndex,
      text: this.state.text,
      date: this.getDate(),
    }
    /* 投稿データの取得 */
    let dataList = JSON.parse(localStorage.getItem('postData'));
    /* 投稿データの保存（変更） */
    if(dataList){
      dataList.push(data);
      data.id = dataList.length - 1;
    }else{
      dataList = [data];
      localStorage.setItem('likeData', JSON.stringify([]));
    }
    /* 日付で並び替え（降順） */
    dataList.sort(
      (a,b)=>{
        return (a.date < b.date ? 1 : -1);
      }
    )
    /* ローカルストレージに保存 */
    localStorage.setItem('postData', JSON.stringify(dataList));
    /* テキストのリセット */
    this.setState({text: ''});
  }
  /* ミス（エラーメッセージ）の変更 */
  setMiss(text){
    this.setState({miss: text});
  }
  /* ミス（エラーメッセージ）の変更 */
  handleMissChange(){
    if(this.props.targetIndex >= 0){
      this.setMiss("五文字以上入力してください")
    }

  }
  render(){
    return(
      <form onSubmit = {()=>{this.handlePostChange(); this.props.loadWindow(); }}>
        {/* ミス（エラーメッセージ）の表示 */}
        <p className = 'postMiss'>{(this.state.miss != '') && this.state.miss}</p>
        {/* テキスト入力部分 */}
        <span className = 'postText'>
          {this.props.targetIndex < 0 ? <textarea value = "褒める相手を選んでください" disabled="disabled"/>
            : <textarea value = {this.state.text} onChange={(event) => {this.handleTextChange(event)}} />}
          <span className='focus-bkg'><i></i></span>
        </span>
        {/* 送信ボタン部分 */}
        <span className = 'postInput'>
          {this.state.text.length < 5 ? <input type = 'button' value='applaud' onClick={()=>{this.handleMissChange()}}/>
            : <input type='submit' value='applaud'/>}
        </span>
      </form>
    );
  }
}
export default Post;
