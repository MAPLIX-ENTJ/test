// src/pages/Home.js
import Layout from '../components/Layout';
import styles from "./Community.module.css";
import LikeListCard from "..//components/LikeListCard";
import MapContainer from '../components/MapContainer';
import React, { useState, useEffect } from "react";
import axios from 'axios';
const { kakao } = window;
function MyPage() {
  const id = window.localStorage.getItem("id");
  const [courselist, setCourselist] = useState([])
  console.log(id)
  // 데이터 가져오기
  const loadPost = async () => {
    const response = await axios.post('http://ec2-3-37-76-88.ap-northeast-2.compute.amazonaws.com:8000/api/likelist'
    // , {body: JSON.stringify({id: id})}
    , {id}
    );
    console.log(response.data);
    // 전체 데이터가 초기 상태
    setPost(response.data);
    //setFiltered(response.data)
  };


  // 현재상태값, 그 상태값을 갱신해주는 함수 / post 초기값 ( 빈배열 )
  const [post, setPost] = useState([]);
  //const [filtered, setFiltered] = useState([]);
  const [activeCate, setActiveCate] = useState([]);

  const [modal, setModal] = useState(false);
  

  // 컴포넌트가 렌더링 될때마다 특정 작업 실행되도록
  useEffect(()=> {
      loadPost();
    }, [] );  

  const openModal = (e) => {
    setModal(true);
    // console.log(e.card.cm_num);
    // const cardid = e.currentTarget;
    // const book = searchBooks[id]
    
  };

  return (
    <div className={styles.main_container}>
      <Layout activeMenu="likelist">
      <div className={styles.title_like}>
        즐겨찾기
      </div>

      <div className={styles.like_list} id={styles.likelist_container}>
          {post.map((card, index) => {
            return (
              
              <div>

              {/* div onClick={() => console.log("커뮤니티에서", card.cm_num)}> */}
              <LikeListCard key={card.like_num} card={card} onClick={openModal}/>
              {/* 모달 이걸로해보기 */}
              {/* https://github.com/marinakim44/mern-img-modal/blob/master/client/src/App.js */}
              </div>
            );
          })}
      </div>
      
      <div className={styles.likelist_map_container}>
          <MapContainer cardList={post} courselist={courselist} activeCate={activeCate} pagename={'LikeList'}/>
      </div>
      </Layout>
            
    </div>
  
  );
}

export default MyPage;