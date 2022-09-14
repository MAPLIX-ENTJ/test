import React, { useEffect, useState } from "react";
import './Course.css';
import sukso from "../img/sukso.png";
import forest from "../img/forest.png";
import sea from "../img/sea.png";
import river from "../img/river.png";
import restaurant from "../img/restaurant.png";
import cafe from "../img/cafe.png";
import acitivity from "../img/activity.png";
import tour from "../img/tour.png";
import mediaplace from "../img/mediaplace.png";
import likelist from "../img/likelist.png";
import MapContainer from '../components/MapContainer';
import CourseAdd from '../components/CourseAdd'

import axios from "axios";
const { kakao } = window;
function Course(){

  const initialCourse = [
    { order : 1 , course : null },
    { order : 2 , course : null },
    { order : 3 , course : null },
    { order : 4 , course : null },
    { order : 5 , course : null },
    { order : 6 , course : null },
    { order : 7 , course : null },
    { order : 8 , course : null },
    { order : 9 , course : null },
  ];

  
  const [result, setResult] = useState([]);
  const [courselist, setCourselist] = useState(initialCourse);
  const [activeCate, setActiveCate] = useState(null);
  
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const id = window.localStorage.getItem("id");

  const initialCate = [ // 필터 어떤거 클릭됐는지, true : 클릭된상태
  { category : "likelist", flag : true, realCate: "즐겨찾기"},
  { category : "mediaplace", flag : false, realCate: "촬영지"},  
  { category : "sukso" , flag : false, realCate: "숙소"},
  { category : "forest" , flag : false, realCate: "숲"},
  { category : "sea" , flag : false, realCate: "바다"},
  { category : "river" , flag : false, realCate: "강"},
  { category : "restaurant" , flag : false, realCate: "음식점"},
  { category : "cafe" , flag : false, realCate: "카페"},
  { category : "activity" , flag : false, realCate: "체험"},
  { category : "tour" , flag : false, realCate: "관광지"},
  { category : "etc" , flag : false, realCate: "기타"}
];

const [cardList, setCardList] = useState([])
const loadData = () => {

  let nowcate = "";

        for (var k=0; k < activeCate.length; k++){
          if (Object.values(activeCate)[k].flag === true){
            nowcate = Object.values(activeCate)[k].realCate
          }
        }

    if (Object.values(activeCate)[0].flag === true){ // likelist
        axios.post('http://ec2-3-38-107-72.ap-northeast-2.compute.amazonaws.com:8000/api/likelist',{id})
        .then(function (response) {
        console.log(response.data);
        setCardList(response.data);
        //console.log(Object.values(activeCate));
        // console.log(Object.values(activeCate)[0].flag);
        });
    } else if (Object.values(activeCate)[1].flag === true){
        // axios.get('http://ec2-3-38-107-72.ap-northeast-2.compute.amazonaws.com:8000/api/search')
        axios.get('http://ec2-3-38-107-72.ap-northeast-2.compute.amazonaws.com:8000/api/search/title', {params: {
          'media': ''
      }})
        .then(function (response) {
            setCardList(response.data);
        });
        
    } else{
      var ps = new kakao.maps.services.Places(); 
      if (nowcate === '바다'){
        nowcate = '해변'
      }

      ps.keywordSearch(nowcate , placesSearchCB); 
      // ps.keywordSearch(nowcate , placesSearchCB, {page: 2 , size : 15}); 
      // sps.keywordSearch(nowcate , placesSearchCB, {page: 3 , size : 15}); 
      
      

      function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(data)
          const newnew = []
          for (var a=0; a < data.length; a++){
            newnew.push({address : data[a].address_name, category : nowcate, p_name : data[a].place_name, p_num : a, p_y : data[a].y, p_x : data[a].x})
          }
          setCardList(newnew);
          
        }
      }
    }
    console.log(cardList.length)
    
};



useEffect(()=> {
    if (activeCate){
      loadData();
    }
    console.log(activeCate)
    // console.log("courseadd 필터" + Object.values(activeCate));
},[activeCate]);      

useEffect(()=> {
  setActiveCate(initialCate);
  console.log('result = ', result);
}, []);

  
  // 중복필터
  const filterOn2 = (e) => {
    console.log("필터 버튼 눌림" + e.target.id);
    const newKeywords = activeCate.map(k => {
      if (k.category === e.target.id) {
        return { ...k, flag : !k.flag,};
      } else {
        return k;
      }
    });    
    setActiveCate(newKeywords);
    //console.log(Object.values(activeCate));
    // 버튼 눌릴때마다 true인 것들의 이름만 찾아서 cardlist filter해줘야함 
  };

  // 단일필터
  const filterOn = (e) => {

    if(document.getElementsByClassName('filterOn').length !== 0) {
      document.getElementsByClassName('filterOn')[0].classList.remove('filterOn') 
      }
    const newKeywords = activeCate.map(k => {
      if (k.category === e.target.id) {
        e.target.parentElement.classList.add('filterOn');

        return {...k, flag : true};
      }else {
        return {...k, flag : false};
      }
  
    });
   // console.log("필터 클릭 : ", nowclickcate)
   setActiveCate((prev) => {return newKeywords});
    // setActiveCate(() => {
    //   activeCate.map(k => {
    //     if (k.category === e.target.id){ return {...k, flag : true};}
    //     else{ return {...k, flag : false}}
    //   })
    // });
  };


  const onChange = (e) => {
    console.log(activeCate);
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };
    return(
      <div className='Search'>
        <div className='Upper'>
          <h1>Maplix</h1>
          <div className='Filter'>
            <button className='FilterIcons' onClick={filterOn}>
              <img src={likelist} alt = "likelist" id='likelist' />
              <li>#즐겨찾기</li>            
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={mediaplace} alt = "mediaplace" id='mediaplace' />
              <li>#촬영지</li>            
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={sukso} alt = "sukso" id='sukso'/>
              <li>#숙소</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={forest} alt = "forest" id="forest"/>
              <li>#숲</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={sea} alt = "sea" id="sea"/>
              <li>#바다</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={river} alt = "river" id="river"/>
              <li>#강</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={restaurant} alt = "restaurant" id="restaurant"/>
              <li>#음식점</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={cafe} alt = "cafe" id="cafe"/>
              <li>#카페</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={acitivity} alt = "activity" id="activity" />
              <li>#액티비티</li>
            </button>

            <button className='FilterIcons' onClick={filterOn}>
              <img src={tour} alt = "tour" id="tour"/>
              <li>#관광지</li>
            </button>

          </div>
        </div>

        <div className='Lower'>
          <div className="course-sidebar">
            <div id="course-line"></div>
            <CourseAdd activeCate={activeCate} cardList={cardList} courselist={courselist} setCourselist={setCourselist} />
          </div>
          <MapContainer activeCate={activeCate} cardList={cardList} courselist={courselist} setCourselist={setCourselist} pagename={'Course'} />      
          </div>      
        </div>
    )
  }

  // styled. 
  
  export default Course;