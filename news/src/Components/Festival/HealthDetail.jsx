import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './HealthDetail.css';

const HealthDetail = () => {
  const { id } = useParams();
  const [healthNews, setHealthNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthNewsDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/api/health/${id}`);
        setHealthNews(response.data);
      } catch (error) {
        setError('Failed to fetch health news details');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthNewsDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  if (!healthNews) return <div className="error">Health news details not found.</div>;

  return (
    <div className="health-details-container">
      <h2>{healthNews.name}</h2>
      {healthNews.image && <img src={`http://127.0.0.1:8000/${healthNews.image}`} alt={healthNews.name} />}
      {healthNews.content && <p dangerouslySetInnerHTML={{ __html: healthNews.content }}></p>}
      {healthNews.author && <p><strong>Author:</strong> {healthNews.author}</p>}
      {healthNews.date && <p><strong>Date:</strong> {new Date(healthNews.date).toLocaleDateString()}</p>}
    </div>
  );
};

export default HealthDetail;
