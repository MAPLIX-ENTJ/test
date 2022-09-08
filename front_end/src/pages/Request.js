// src/pages/writepost.js
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import CommunitySideBar from './CommunitySidebar';
import styles from '../components/Community.module.css';
import styles2 from "./Community.module.css";
import styles_two from './MyPage.module.css';

import { useEffect, useState} from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import {RiQuestionnaireFill} from 'react-icons/ri';

const initialState = {
  media_name: "",
  r_content: "",
  id: "",
  m_type: "",
};

const Request = () => {
  const [state, setState] = useState(initialState);
  const [img, setImg] = useState({r_image: ""});

  const {media_name, r_content, id, m_type} = state;
  const {r_image} = img;

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    const r_image = img;
    // formData.append('file', img);
    console.log(r_image);
    // console.log(formData);
    
    if (!media_name || !r_content || !id || !m_type || !r_image) {
      // toast.error("Please provide value into each input field");
    } else {
      const res = axios.post("http://3.38.107.72:8000/mypage/request", {
        media_name,
        r_content,
        id,
        m_type,
        r_image
        // formData
      })
      .then((res) => {
        setState({media_name: "", r_content: "", id: "", m_type: ""});
        setImg({r_image: ""});
        alert("success!")
      })
      console.log(res);
      // .catch((err) => toast.error(err.response.data));
    setTimeout(() => history.push("/mypage"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleImgChange = (e) => {
    console.log(e.target.files[0].name);
    setImg(e.target.files[0].name);
  }


  return (
    <div className={styles2.main_container}>
      <Layout activeMenu="request">
        <div className={styles.write_container}>
          <div style={{display:"flex"}}>
          <RiQuestionnaireFill  className={styles_two.icon}/>
          <span>요청하기</span>
        </div>
          <form 
            className={styles.form_container}
          // style={{
          //   margin: "auto",
          //   padding: "15px",
          //   maxWidth: "400px",
          //   alignContent: "center"
          // }}
          onSubmit={handleSubmit}
          >
            <div className={styles.write_item}>
              <label htmlFor='media_name'>Title</label>
              <input
              type="text"
              id="media_name"
              name="media_name"
              placeholder='제목'
              vlaue={media_name}
              onChange={handleInputChange}
              />
            </div>

            <div className={styles.write_item}>
              <label htmlFor='r_content'>내용</label>
              <input className={styles.content}
              type="text"
              id="r_content"
              name="r_content"
              placeholder='내용'
              vlaue={r_content}
              onChange={handleInputChange}
              />
            </div>

            <div className={styles.write_item}>
              <label htmlFor='id'>ID</label>
              <input
              type="text"
              id="id"
              name="id"
              placeholder='ID'
              vlaue={id}
              onChange={handleInputChange}
              />
            </div>

            <div className={styles.write_item}>
              <label htmlFor='m_type'>유형</label>
              <select name="m_type" onChange={handleInputChange} vlaue={m_type} id="m_type">
                  <option value="드라마">드라마</option>
                  <option value="영화">영화</option>
                  <option value="예능">예능</option>
              </select>
            </div>

            {/* <input ref={logoImgInput} type='file' className='imgInput' id='logoImg' accept='image/*' name='file' onChange={onImgChange}/> */}

            {/* <input type="file" id="file" accept='image/*' onChange={handleImgChange} multiple={false} /> */}

            {/* <label htmlFor='r_image'>이미지</label>
            <input 
            type="text"
            id="r_image"
            name="r_image"
            placeholder='이미지'
            vlaue={r_image}
            onChange={handleInputChange}
            /> */}
            <br></br>

            <input className={styles.btn_submit} type="submit" value="등록" />        
          </form>
        </div>
      </Layout>
    </div>
  );
};
export default Request;