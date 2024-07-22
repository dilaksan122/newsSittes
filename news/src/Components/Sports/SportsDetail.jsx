import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './SportsDetail.css'; // Import CSS file for styling

const SportsDetails = () => {
  const { id } = useParams(); // Get the news ID from the URL params
  const [sportsNews, setSportsNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSportsNewsDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/api/sports-news/${id}`);
        const currentNews = response.data;
        setSportsNews(currentNews); // Set the sports news details

        // Fetch related news based on the current news category
        const relatedResponse = await axios.get(`http://127.0.0.1:8000/api/api/sports-news?category=${currentNews.category}`);
        setRelatedNews(relatedResponse.data.filter(news => news.id !== currentNews.id).slice(0, 3)); // Exclude current news from related
      } catch (error) {
        setError('Failed to fetch sports news details');
      } finally {
        setLoading(false);
      }
    };

    fetchSportsNewsDetails();
  }, [id]);

  const handleRelatedNewsClick = () => {
    // Scroll to the top of the page when a related news item is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!sportsNews) return <div className="error">Sports news details not found.</div>;

  return (
    <div className="sports-details-container">
      <h2>{sportsNews.title}</h2>
      {sportsNews.image && <img src={`http://127.0.0.1:8000/${sportsNews.image}`} alt={sportsNews.title} />}
      {sportsNews.content && <p dangerouslySetInnerHTML={{ __html: sportsNews.content }}></p>}
      {sportsNews.author && <p><strong>Author:</strong> {sportsNews.author}</p>}
      {sportsNews.date && <p><strong>Date:</strong> {new Date(sportsNews.date).toLocaleDateString()}</p>}
      
      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <div className="related-news">
          <h3>Related News</h3>
          <div className="related-news-list">
            {relatedNews.map(news => (
              <div
                key={news.id}
                className="related-news-item"
                onClick={handleRelatedNewsClick} // Scroll to top on click
              >
                <Link to={`/sports/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />
                  <p>{news.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsDetails;
