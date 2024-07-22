import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Reviews.css';

const Reviews = () => {
  const [reviewsNews, setReviewsNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [fromTheBlog, setFromTheBlog] = useState([]);
  const [reviewCollections, setReviewCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewsNews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/api/reviews');
        if (Array.isArray(response.data)) {
          setReviewsNews(response.data);
          setLatestNews(response.data.slice(0, 3));
          const popularNews = response.data.filter(news => news.popularity > 8).slice(0, 4);
          setMostPopular(popularNews);
          setNowPlaying(response.data.filter(news => news.now_playing));
          setFromTheBlog(response.data.filter(news => news.from_the_blog));
          setReviewCollections(response.data.filter(news => news.review_collections));

          response.data.forEach(news => {
            console.log(`Title: ${news.title}, Content: ${news.content}, Category: ${news.category}, Author: ${news.author}`);
          });
        } else {
          setError('Unexpected data format');
        }
      } catch (error) {
        setError('Failed to fetch reviews news');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsNews();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="reviews-container">
        <div className="main-news">
          <h2>Reviews News</h2>
          {reviewsNews.length === 0 ? (
            <p>No reviews news available</p>
          ) : (
            <ul>
              {reviewsNews.map(news => (
                <li key={news.id} className="reviews-news-item">
                  <Link to={`/reviews/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3>{news.title}</h3>
                    {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                    <p>{news.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="sidebar">
          <div className="latest-articles">
            <h2>Latest Articles</h2>
            {latestNews.length === 0 ? (
              <p>No latest news available</p>
            ) : (
              <ul>
                {latestNews.map(news => (
                  <li key={news.id} className="latest-news-item">
                    <Link to={`/reviews/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3>{news.title}</h3>
                      {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="most-popular">
            <h2>Most Popular</h2>
            {mostPopular.length === 0 ? (
              <p>No popular news available</p>
            ) : (
              <ul>
                {mostPopular.map(news => (
                  <li key={news.id} className="popular-news-item">
                    <Link to={`/reviews/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3>{news.title}</h3>
                      {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="now-playing">
        <h2>Now Playing</h2>
        {nowPlaying.length === 0 ? (
          <p>No now playing news available</p>
        ) : (
          <Slider {...sliderSettings}>
            {nowPlaying.map(news => (
              <div key={news.id} className="now-playing-item">
                {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
              </div>
            ))}
          </Slider>
        )}
      </div>
      <div className="from-the-blog">
        <h2>From the Blog</h2>
        {fromTheBlog.length === 0 ? (
          <p>No blog news available</p>
        ) : (
          <ul>
            {fromTheBlog.map(news => (
              <li key={news.id} className="blog-news-item">
                <Link to={`/reviews/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{news.title}</h3>
                  {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="review-collections">
        <h2>Review Collections</h2>
        {reviewCollections.length === 0 ? (
          <p>No review collections news available</p>
        ) : (
          <ul>
            {reviewCollections.map(news => (
              <li key={news.id} className="collection-news-item">
                <Link to={`/reviews/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{news.title}</h3>
                  {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Reviews;
