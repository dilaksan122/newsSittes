import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './CinemaDetails.css'; // Import CSS file for styling
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CinemaDetails = () => {
  const { id } = useParams(); // Get the news ID from the URL params
  const [cinemaNews, setCinemaNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCinemaNewsDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/api/cinema-news/${id}`);
        setCinemaNews(response.data); // Set the cinema news details

        // Fetch related news
        if (response.data && response.data.category) {
          const relatedResponse = await axios.get(`http://127.0.0.1:8000/api/api/cinema-news?category=${response.data.category}`);
          setRelatedNews(relatedResponse.data.filter(news => news.id !== response.data.id).slice(0, 5));
        }
      } catch (error) {
        setError('Failed to fetch cinema news details');
      } finally {
        setLoading(false);
      }
    };

    fetchCinemaNewsDetails();

    // Scroll to top when the component mounts or the id changes
    window.scrollTo(0, 0);
  }, [id]);

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

  if (!cinemaNews) return <div className="error">Cinema news details not found.</div>;

  return (
    <div className="cinema-details-container">
      <h2>{cinemaNews.title}</h2>
      {cinemaNews.image && <img src={`http://127.0.0.1:8000/${cinemaNews.image}`} alt={cinemaNews.title} />}
      <div className="details-footer">
        <p><strong>Category:</strong> {cinemaNews.category}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        {cinemaNews.author && <p><strong>By:</strong> {cinemaNews.author}</p>}
      </div>
      {cinemaNews.content && <p dangerouslySetInnerHTML={{ __html: cinemaNews.content }}></p>}
      <div className="related-news">
        <h2>Related Content</h2>
        <Slider {...sliderSettings}>
          {relatedNews.map(news => (
            <div key={news.id}>
              <Link to={`/cinema/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{news.title}</h3>
                {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CinemaDetails;
