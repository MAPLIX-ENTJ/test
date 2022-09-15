import { specialChars } from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
import styles from "./CommunityCard.module.css";
import Modal from "./PostModal";
import axios from "axios";



export default function CommunityCard({card}) {

  const l_num = card.l_num;

  const [png, setPng] = useState(false);
  const [jpg, setJpg] = useState(false);
  const [webp, setWebp] = useState(false);

  // 촬영지 이미지 가져오기
  const loadImage = async () => {
    const response = await axios.get('http://ec2-3-37-76-88.ap-northeast-2.compute.amazonaws.com:8000/api/locationimage');
    // console.log(response.data)
    const locationImg = 'location_' + l_num;
    // console.log(locationImg);
    function findLocationImg(element) {
      if (element.includes(locationImg))
        return true
    }
    const locationIndex  = response.data.findIndex(findLocationImg)
    const findLocation = response.data[locationIndex];
    const ext = findLocation.split(".")[1]

    if (ext == 'png') {
      setPng(true)
    }
    else if (ext == 'jpg') {
      setJpg(true)
    }
    else if (ext == 'webp') {
      setWebp(true)
    }
    // console.log(findLocation, ext);
  }

  // 컴포넌트가 렌더링 될때마다 특정 작업 실행되도록
  useEffect(()=> {
    loadImage();
  }, [] );
  

  return (
    <div className={styles.likeList_container} >  
        <div className={styles.like_img}>
            {
              (function() {
                if (png == true) return <img className={styles.like_img} src={'/location/location_' + card.l_image + '.png'} alt="" ></img> 
                else if (jpg == true) return <img className={styles.like_img} src={'/location/location_' + card.l_image + '.jpg'} alt=""></img>
                else if (webp == true) return <img className={styles.like_img} src={'/location/location_' + card.l_image + '.webp'} alt=""></img>
              })()
            }
        </div>  
        <div className={styles.like_list_txt}>
          <div className={styles.like_name}>{card.p_name}</div>
          <div img_box>
              <ol>
                <br></br>
                  <ul>{card.address}</ul>
                  <ul>#{card.m_name} #{card.m_type} {card.category}</ul>
              </ol>
          </div>
        </div>
    </div>

  );
}