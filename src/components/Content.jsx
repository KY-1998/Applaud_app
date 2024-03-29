import React from 'react';
import Point from './Point';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Content extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hoverFlag: false,
    };
  }
  /* 拍手データの保存（変更） */
  handleLikeChange(userList, likeList, post){
    /* 現在のユーザインデックス */
    const userIndex = this.props.userIndex;

    /* 投稿者または褒められた相手が現在のユーザでない時 */
    if(post.userIndex != userIndex && post.targetIndex != userIndex){
        /* 拍手をもうすでにしたことがあればtrue */
        let flag = false;
        for(let i = 0; i < likeList.length; i++){
          /* 拍手の記録がある時 */
          if(likeList[i].postId === post.id && likeList[i].userIndex == this.props.userIndex){
            /* 拍手の記録があった */
            flag = true;
            /* 現在のユーザが　15回以上拍手していない　かつ　使えるポイントがまだあるとき */
            if(likeList[i].goodNum < 15
                && userList[userIndex].point_canBeUsed > 0){
              /* 拍手の数を増やす */
              likeList[i].goodNum++;
              /* 現在のユーザの使えるポイントを２つ減らす */
              userList[userIndex].point_canBeUsed -= 2;
              /* 投稿した人の受けとったポイント数を増やす */
              userList[post.userIndex].point_received++;
              /* 投稿された人の受けとったポイント数を増やす */
              userList[post.targetIndex].point_received++;
            }
            break;
          }
        }
        /* 拍手の記録がない時かつ使えるポイントがまだある時 */
        if(!flag && userList[userIndex].point_canBeUsed > 0){
          /* 投稿IDと現在のユーザインデックスを保存し、拍手を１にする */
          const data = {
            postId: post.id,
            userIndex: this.props.userIndex,
            goodNum: 1,
          }
          /* 拍手データに保存 */
          likeList.push(data);
          /* 現在のユーザの使えるポイントを２つ減らす */
          userList[userIndex].point_canBeUsed -= 2;
          /* 投稿したユーザの受け取った拍手を増やす */
          userList[post.userIndex].point_received++;
          /* 投稿された人の受けとったポイント数を増やす */
          userList[post.targetIndex].point_received++;
        }
        /* ローカルストレージに保存 */
        localStorage.setItem('userData', JSON.stringify(userList));
        localStorage.setItem('likeData', JSON.stringify(likeList));
    }

  }
  /* 拍手の数をカウントして戻す */
  likeNum(likeList, postId){
    let cnt = 0;
    for(let i = 0; i < likeList.length; i++){
      /* 指定した投稿IDが拍手データ内で見つかった時 */
      if(likeList[i].postId === postId){
        /* カウント */
        cnt += likeList[i].goodNum;
      }
    }
    return cnt;
  }

  render(){
    /* いいねデータの取得 */
    const likeList = this.props.likeList;
    /* 投稿の取得 */
    const post = this.props.post;
    /* ユーザリスト取得 */
    const userList = this.props.userList;



    /* 投稿内容の表示 */
    return(
      <div className='tableContent'>
        <div>
        {/* ホバーしている時 採点一覧を表示*/}
        {this.state.hoverFlag
           && <Point  likeList={likeList}
                      userList={userList}
                      postId={post.id}/>
        }
        </div>
        <div className='tableTop'>
          {/* 投稿データの表示 */}
          <div className='tableCard'>
            <img src={`${process.env.PUBLIC_URL}/user_img/${userList[post.userIndex].image}`} alt="UserImage" />
            <FontAwesomeIcon className='fontArrow' size='4x' icon={['fas', 'arrow-right']} />
            <img src={`${process.env.PUBLIC_URL}/user_img/${userList[post.targetIndex].image}`} alt="TargetImage" />
          </div>
          <div className='tableText'>{post.text}</div>
        </div>
        <div className='tableBottom'>
          {/* 拍手データの表示 */}
          <div className='good-wrapper' >
            <div className='goodIcon' onClick={()=>{this.handleLikeChange(userList, likeList, post); this.props.loadWindow();}}>
              <FontAwesomeIcon size='2x' icon={['fas', 'sign-language']} />
            </div>
            <div className = 'goodNum' onMouseOver={()=>{this.setState({hoverFlag: true})}} onMouseLeave={()=>{this.setState({hoverFlag: false})} }>
              {this.likeNum(likeList, post.id)}
            </div>
          </div>
          <div className='tableDate'>{post.date}</div>
        </div>
      </div>
    );
  }
}
export default Content;
