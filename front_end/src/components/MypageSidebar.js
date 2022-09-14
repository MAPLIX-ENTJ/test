// MypageSidebar.js
import { Link } from 'react-router-dom';
import styles from './MypageSidebar.module.css'
import {BiCaretRight} from 'react-icons/bi';
import profile from '../img/profile.png';

function Menu({ activeMenu }) {
    console.log('현재 활성화된 메뉴 : ', activeMenu);
  return (
    <div className={styles.menu}>
      <div className={styles.user_img}>
      <img src={profile}></img>
      </div>
      <div className={styles.user_nickname}>
        {window.localStorage.getItem("nick_name")}
      </div>
      <div className={styles.my_list}>
        <Link
          to="/mypage/likelist"
          className={activeMenu === 'likelist' ? styles.focused : styles.link}
        >
          <BiCaretRight className={styles.icon} />즐겨찾기
        </Link>
        <Link
          to="/mypage/stamp"
          className={activeMenu === 'stamp' ? styles.focused : styles.link}
        >
          <BiCaretRight className={styles.icon} />
          도장깨기
        </Link>
        <Link
          to="/mypage/mycourse"
          className={activeMenu === 'mycourse' ? styles.focused : styles.link}
        >
          <BiCaretRight className={styles.icon} />
          내 경로
        </Link>
        <Link
          to="/mypage/request"
          className={activeMenu === 'request' ? styles.focused : styles.link}
        >
          <BiCaretRight className={styles.icon} />
          요청하기
        </Link>
        {/* <Link
          to="/mypage/updateinfo"
          className={activeMenu === 'updateinfo' ? styles.focused : styles.link}
        >
          <BiCaretRight className={styles.icon} />
          회원정보 수정
        </Link> */}
      </div>
    </div>
  );
}


export default Menu;