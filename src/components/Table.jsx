import React from 'react';
import Content from './Content'

class Table extends React.Component{
  /* 中身が無ければfalse */
  empty(list){
    if(list) {
      return true;
    }
    else{
      return false;
    }
  }
  render(){
    /* 拍手データの取得 */
    const likeList = JSON.parse(localStorage.getItem('likeData'));
    /* 投稿データの取得 */
    const postList = JSON.parse(localStorage.getItem('postData'));

    /* 投稿一覧 */
    return(
      <div>
        {this.empty(postList) &&
          this.empty(likeList) &&
          postList.map((post, index) => {
            return(
              /* 投稿内容の表示 */
              <div key={index}>
                <Content  userList={this.props.userList}
                          userIndex={this.props.userIndex}
                          likeList={likeList}
                          post={post}
                          loadWindow = {()=>{this.props.loadWindow()}}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}
export default Table;
