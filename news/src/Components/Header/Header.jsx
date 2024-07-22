import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="header">
      <div className='top-nav'>
        <div className='Logo' onClick={toggleModal}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="title">PitchMark</div>
        <div className="newlitter">
        <li><Link to="/newsLetter" style={{ textDecoration: 'none' }}>NEWSLETTER</Link></li>
        </div>
      </div>
      <hr />
      <ul className="navbar">
        <li><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/technology" style={{ textDecoration: 'none' }}>Technology</Link></li>
        <li><Link to="/cinema" style={{ textDecoration: 'none' }}>Cinema</Link></li>
        <li><Link to="/sports" style={{ textDecoration: 'none' }}>Sports</Link></li>
        <li><Link to="/reviews" style={{ textDecoration: 'none' }}>Reviews</Link></li>
        <li><Link to="/health" style={{ textDecoration: 'none' }}>Health</Link></li>
        <li><Link to="/privacy-policy" style={{ textDecoration: 'none' }}>Privacy</Link></li>
        <li><Link to="/contact" style={{ textDecoration: 'none' }}>Contact</Link></li>
      </ul>
      {isModalVisible && (
        <div className="modal-navbar">
          <ul>
            <li><Link to="/" onClick={toggleModal} style={{ textDecoration: 'none' }}>Home</Link></li>
            <li><Link to="/technology" onClick={toggleModal} style={{ textDecoration: 'none' }}>Technology</Link></li>
            <li><Link to="/cinema" onClick={toggleModal} style={{ textDecoration: 'none' }}>Cinema</Link></li>
            <li><Link to="/sports" onClick={toggleModal} style={{ textDecoration: 'none' }}>Sports</Link></li>
            <li><Link to="/reviews" onClick={toggleModal} style={{ textDecoration: 'none' }}>Reviews</Link></li>
            <li><Link to="/health" onClick={toggleModal} style={{ textDecoration: 'none' }}>Health</Link></li>
            <li><Link to="/privacy-policy" onClick={toggleModal} style={{ textDecoration: 'none' }}>Privacy</Link></li>
            <li><Link to="/contact" onClick={toggleModal} style={{ textDecoration: 'none' }}>Contact</Link></li>
            
            <li onClick={toggleModal}><FontAwesomeIcon icon={faClose} /></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
