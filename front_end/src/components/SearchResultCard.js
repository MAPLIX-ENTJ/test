// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
// import Modal from "./PostModal";
import React, { useState }from "react";
import axios from "axios";
import { MdBookmarkBorder } from "react-icons/md";
import { MdBookmark } from "react-icons/md";

export default function SearchResultCard({card}) {

  const id = window.localStorage.getItem("id");
  const l_num = card.l_num;
  const [detail, setDetail] = useState(false); 
  
  const onClickPlace =()=> {
      setDetail(true);
  }

  const addLikelist = () => {
    console.log(id, l_num);
    axios.post('http://localhost:8000/api/post/likelist',{id, l_num})
        .then(function (response) {
          alert("즐겨찾기에 추가되었습니다")    
        
        });
  }
  return (
    <div className={styles.SearchResultCard}>
      <div className={styles.search_container} onClick={onClickPlace}>    
        <div className={styles.search_title}>{card.p_name}</div>
        <div img_box>
            <ol>
                <ul className={styles.search_address}>{card.address}</ul>
                <ul>#{card.m_name}</ul>
                <ul>#{card.category}</ul>
                <button onClick={addLikelist}><MdBookmarkBorder size="20px"/></button>
            
            </ol>
            {/* <button type='submit' onClick={onClickLikeBtn}>즐겨찾기</button> */}
        </div>
      </div>

      {detail ?
      <div className={styles.search_detail} onClick={()=>{setDetail(false)}}>
          <div className={styles.sm_img}>
            <img className={styles.sm_img} src={'/location/location_' + card.l_image + '.png'}></img>
          </div>
          <div className={styles.sm_title}>{card.p_name}</div>
          <ul>{card.address}</ul>
          <ul>#{card.m_name}</ul>
          <ul>#{card.category}</ul>
      </div>
      : null}
    </div>
  );
}