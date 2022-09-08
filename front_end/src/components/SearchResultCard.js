// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
// import Modal from "./PostModal";
// import React, { useState }from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdBookmarkBorder } from "react-icons/md";
import { MdBookmark } from "react-icons/md"; 

export default function SearchResultCard({card}) {

  const id = window.localStorage.getItem("id");
  const l_num = card.l_num;
  const [detail, setDetail] = useState(false); 

  // 데이터 가져오기
  const loadPost = async () => {
    const response = await axios.post('http://3.38.107.72:8000/api/post/likelistcheck'
    , {id, l_num}
    );
    // console.log(response.data[0].l_num);
    if (response.data[0].l_num === l_num) 
      return setLike(true);
  };


  // 현재상태값, 그 상태값을 갱신해주는 함수 / post 초기값 ( 빈배열 )
  const [check_like, setLike] = useState();

  // 컴포넌트가 렌더링 될때마다 특정 작업 실행되도록
  useEffect(()=> {
      loadPost();
    }, [] );

  const onClickPlace =(e)=> {
      // setDetail(!detail);
      if(document.getElementsByClassName('modalOn').length !== 0) {
        document.getElementsByClassName('modalOn')[0].classList.remove('modalOn') 
        }
      //   debugger
        e.target.parentElement.parentElement.children[1].classList.add('modalOn');
  }

  const addLikelist = () => {
    console.log(id, l_num);
    if (id == undefined) return alert("로그인 후 이용 가능합니다."), document.location.href = '/login';
    else return (
      axios.post('http://3.38.107.72:8000/api/post/likelistcheck',{id, l_num})
        .then(function (response) {
          console.log(response)
          if (response.data[0] == undefined) return (
            axios.post('http://3.38.107.72:8000/api/post/likelist',{id, l_num})
            .then(function (response) {
              alert("즐겨찾기에 추가되었습니다")
              setLike(true);
              })
          )
          else return (
            axios.post('http://3.38.107.72:8000/api/post/deletelikelist',{id, l_num})
            .then(function (response) {
              alert("즐겨찾기에서 삭제되었습니다.")
              setLike(false);
              })
          )
        })
    )}

  return (
    <div className={styles.SearchResultCard}>
      <div className={styles.search_container} onClick={onClickPlace}>    
        <div className={styles.search_title}>{card.p_name}</div>
        {/* <div className={styles.search_address}>{card.address}</div>
        <div className={styles.search_detail_tag}>#{card.m_name}</div>
        <div className={styles.search_detail_tag}>#{card.category}</div>
        <button onClick={addLikelist}><MdBookmarkBorder size="20px"/></button> */}
        <div img_box>
            <ol>
                <ul className={styles.search_address}>{card.address}</ul>
                <ul>#{card.m_name}</ul>
                <ul>#{card.category}</ul>
                {
                (function() {
                  if (check_like == true) return (<button onClick={addLikelist}><MdBookmark size="20px"/></button>);
                  else  return (<button onClick={addLikelist}><MdBookmarkBorder size="20px"/></button>);
                })()
                }
            </ol>
        </div>
      </div>

      <div className="search_detail">
          <div>
            <img className={styles.sm_img} src={'/location/location_' + card.l_image + '.png'}></img>
          </div>
          <div className={styles.sm_title}>{card.p_name}</div>
          <ul>{card.address}</ul>
          <ul>#{card.m_name}</ul>
          <ul>#{card.category}</ul>
          <button className="modal_close_btn" onClick={(e)=>{e.target.parentElement.classList.remove('modalOn')}}>X</button>
      </div> 
    </div>
  );
}