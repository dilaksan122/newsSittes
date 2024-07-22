import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './Sports.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useWindowSize from './useWindowSize';

const Sports = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { width } = useWindowSize();
  const itemsPerPage = width >= 1024 ? 100 : 5; // Set items per page based on screen size

  const mainNewsRef = useRef(null);

  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:8000/api/api/sports-news');
          if (Array.isArray(response.data)) {
          setSportsNews(response.data);


          const trending = response.data.filter(news => news.trending);
          setTrendingNews(trending);


          const popular = response.data.filter(news => news.popularity > 8);
          setPopularNews(popular);
        } else {
          setError('Unexpected data format');
        }
      } catch (error) {
        setError('Failed to fetch sports news');
      } finally {
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, []);

  useEffect(() => {
    // Scroll to top of main news section when currentPage or selectedCategory changes
    if (mainNewsRef.current) {
      mainNewsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage, selectedCategory]);

  const filteredSportsNews = selectedCategory === 'All'
    ? sportsNews
    : sportsNews.filter(news => news.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSportsNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSportsNews.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

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
    <div className="sports-container">
      <div className="news-content">
        <div className="filter">
          <label>Filter by Category:</label>
          <div className="category-buttons">
            {['All', 'Football', 'Basketball', 'Cricket', 'Tennis', 'Baseball', 'Hockey', 'Golf', 'Boxing', 'Rugby', 'Motor Sports'].map(category => (
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
          <h2>{selectedCategory === 'All' ? 'All Sports News' : `Sports News - ${selectedCategory}`}</h2>
          {currentItems.length === 0 ? 
          (
            <p>No sports news available</p>
          ) : (
            <ul>
              {currentItems.map(news => (
                <li key={news.id} className="sports-news-item">
                  <Link to={`/sports/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3>{news.title}</h3>
                    {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {totalPages > 1 && (
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
              <div key={news.id} className="news-slide">
                <Link to={`/sports/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{news.title}</h3>
                  {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                </Link>
              </div>
            ))}
          </Slider>
        </div>


        <div className="popular-news">
          <h2>Popular News</h2>
          <Slider {...sliderSettings}>
            {popularNews.map(news => (
              <div key={news.id} className="news-slide">
                <Link to={`/sports/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{news.title}</h3>
                  {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                </Link>
              </div>
            ))}
          </Slider>

        </div>
      </div>
    </div>
  );
};

export default Sports;