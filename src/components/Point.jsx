import React from 'react';

class Point extends React.Component{
  /* 採点一覧の作成して戻す */
  setPointList(){
    /* 投稿idの取得 */
    const postId = this.props.postId;
    /* 拍手データの取得 */
    const likeList = this.props.likeList;
    /* ユーザデータの取得 */
    const userList = this.props.userList;
    /* 採点データの作成 */
    const pointList=[];
    for(let i = 0; i < likeList.length; i++){
      /* 指定した投稿IDが拍手データ内に見つかった時 */
      if(likeList[i].postId === postId){
        /* 拍手が0でない時 */
        if(likeList[i].goodNum !== 0){
          /* 拍手したユーザの名前とその数を保存 */
          var data = {
            name: userList[likeList[i].userIndex].name,
            goodNum: likeList[i].goodNum,
          }
          /* 採点データに保存 */
          pointList.push(data);
        }
      }
    }
    /* 拍手数で並び替え（降順） */
    pointList.sort(
      (a,b)=>{
        return (a.goodNum < b.goodNum ? 1 : -1);
      }
    )
    return pointList;

  }
  render(){
    /* 採点データを取得 */
    const pointList = this.setPointList();
    /* 採点データを表示 */
    return(
      <div className='pointCard'>
        <h1>拍手一覧</h1>
        {pointList.map((point, index) => {
          return(
            /* 名前と拍手数を表示 */
            <div className='pointItem' key={index}>{point.name}:{point.goodNum}</div>
          );
        })}
      </div>
    );
  }
}
export default Point;
