import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './TechnologyDetail.css';

const TechnologyDetail = () => {
  const { id } = useParams();
  const [techNews, setTechNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechNewsDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/api/technology-news/${id}`);
        setTechNews(response.data);

        // Fetch related news based on the category
        const category = response.data.category;
        if (category) {
          const relatedResponse = await axios.get(`http://localhost:8000/api/api/technology-news?category=${category}`);
          setRelatedNews(relatedResponse.data.filter(news => news.id !== response.data.id).slice(0, 5)); // Limit to 5 items
        }
      } catch (error) {
        setError('Failed to fetch technology news details');
      } finally {
        setLoading(false);
      }
    };

    fetchTechNewsDetails();
  }, [id]);

  useEffect(() => {
    // Scroll to the top of the page when news details are loaded
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [techNews]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  if (!techNews) return <div className="error">Technology news details not found.</div>;

  return (
    <div className="technology-details-container">
      <h2>{techNews.title}</h2>
      {techNews.image && <img src={`http://localhost:8000/images/${techNews.image}`} alt={techNews.title} />}
      {techNews.content && <p dangerouslySetInnerHTML={{ __html: techNews.content }}></p>}
      {techNews.author && <p><strong>Author:</strong> {techNews.author}</p>}
      {techNews.date && <p><strong>Date:</strong> {new Date(techNews.date).toLocaleDateString()}</p>}

      {/* Related Content */}
      {relatedNews.length > 0 && (
        <div className="related-news">
          <h3>Related Content</h3>
          <ul>
            {relatedNews.map(news => (
              <li key={news.id}>
                <Link
                  to={`/technology/${news.id}`}
                  className="related-news-item"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <h4>{news.title}</h4>
                  {news.image && <img src={`http://localhost:8000/images/${news.image}`} alt={news.title} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TechnologyDetail;
