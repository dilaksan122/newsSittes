import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import './Cinema.css'; // Import your CSS file
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useCineWindowSize from './useCineWindowSize';

const Cinema = () => {
  const [cinemaNews, setCinemaNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const mainNewsRef = useRef(null); // Create a reference for the main news section

  const { width } = useCineWindowSize();
  const itemsPerPage = width >= 1024 ? 10 : 5; // Set items per page based on screen size

  useEffect(() => {
    const fetchCinemaData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/api/cinema-news');
        if (Array.isArray(response.data)) {
          setCinemaNews(response.data);

          const trending = response.data.filter(news => news.trending);
          setTrendingNews(trending);

          const popular = response.data.filter(news => news.popularity > 8);
          setMostPopular(popular);
        } else {
          setError('Unexpected data format');
        }
      } catch (error) {
        setError('Failed to fetch cinema news');
      } finally {
        setLoading(false);
      }
    };

    fetchCinemaData();
  }, []);

  const filteredCinemaNews = selectedCategory === 'All'
    ? cinemaNews
    : cinemaNews.filter(news => news.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCinemaNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCinemaNews.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
    scrollToMainNews(); // Scroll to main news section
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
    scrollToMainNews(); // Scroll to main news section
  };

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
    scrollToMainNews(); // Scroll to main news section
  };

  useEffect(() => {
    // Scroll to top of main news section when currentPage or selectedCategory changes
    if (mainNewsRef.current) {
      mainNewsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage, selectedCategory]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Auto scroll every 5 seconds
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cinema-container">
      <div className="news-content">
        <div className="filter">
          <label>Filter by Category:</label>
          <div className="category-buttons">
            {/* Category buttons */}
            {['All', 'Box Office', 'Movie Reviews', 'Celebrity News', 'New Releases', 'Interviews', 'Trailers'].map(category => (
              <button
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="main-news" ref={mainNewsRef}>
          <h2>{selectedCategory === 'All' ? 'All Cinema News' : `Cinema News - ${selectedCategory}`}</h2>
          {currentItems.length === 0 ? (
            <p>No cinema news available</p>
          ) : (
            <ul>
              {currentItems.map(news => (
                <li key={news.id} className="cinema-news-item">
                  <Link to={`/cinema/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3>{news.title}</h3>
                    {news.image && <img src={`http://localhost:8000/${news.image}`} alt={news.title} />}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {filteredCinemaNews.length > itemsPerPage && (
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          )}
        </div>

        <div className="trending-news">
          <h2>Trending News</h2>
          <Slider {...sliderSettings}>
            {trendingNews.map(news => (
              <div key={news.id}>
                <Link to={`/cinema/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{news.title}</h3>
                  {news.image && <img src={`http://localhost:8000/${news.image}`} alt={news.title} />}
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        <div className="popular-news">
          <h2>Popular News</h2>
          <Slider {...sliderSettings}>
            {mostPopular.map(news => (
              <div key={news.id}>
                <Link to={`/cinema/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{news.title}</h3>
                  {news.image && <img src={`http://localhost:8000/${news.image}`} alt={news.title} />}
                </Link>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </div>
  );
};

export default Cinema;
