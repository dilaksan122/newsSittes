import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ReviewsDetail.css';

const ReviewsDetail = () => {
  const { id } = useParams();
  const [reviewsNews, setReviewsNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewsNewsDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/api/reviews/${id}`);
        setReviewsNews(response.data);
      } catch (error) {
        setError('Failed to fetch reviews news details');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsNewsDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  if (!reviewsNews) return <div className="error">Reviews news details not found.</div>;

  return (
    <div className="reviews-details-container">
      <h2>{reviewsNews.title}</h2>
      {reviewsNews.image && <img src={`http://127.0.0.1:8000/${reviewsNews.image}`} alt={reviewsNews.title} />}
      {reviewsNews.content && <p dangerouslySetInnerHTML={{ __html: reviewsNews.content }}></p>}
      {reviewsNews.author && <p><strong>Author:</strong> {reviewsNews.author}</p>}
      {reviewsNews.date && <p><strong>Date:</strong> {new Date(reviewsNews.date).toLocaleDateString()}</p>}
    </div>
  );
};

export default ReviewsDetail;
