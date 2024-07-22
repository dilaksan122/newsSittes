<?php
namespace App\Http\Controllers\AdminApi;

use App\Http\Controllers\Controller;
use App\Models\Health;
use App\Models\News;
use App\Models\Review;
use App\Models\Sports;
use App\Models\Technology;
use Illuminate\Http\Request;

class NewsApiControllers extends Controller
{
    public function fetchAllCinemaNews()
    {
        $news = News::orderBy('created_at', 'desc')->get();
        return response()->json($news);
    }

    public function fetchAllSportsNews()
    {
        $sportsNews = Sports::orderBy('created_at', 'desc')->get();
        return response()->json($sportsNews);
    }

    public function fetchCinemaNewsById($id)
    {
        $news = News::find($id);

        if (!$news) {
            return response()->json(['error' => 'News not a found'], 404);
        }

        return response()->json($news);
    }

    public function fetchSportsNewsById($id)
    {
        $sportsNews = Sports::find($id);

        if (!$sportsNews) {
            return response()->json(['error' => 'Sports news not found'], 404);
        }

        return response()->json($sportsNews);
    }

    public function fetchAllTechnologyNews()
    {
        $technology = Technology::orderBy('created_at', 'desc')->get();
        return response()->json($technology);
    }

    public function fetchTechnologyNewsById($id)
    {
        $technology = Technology::find($id);

        if (!$technology) {
            return response()->json(['error' => 'Technology not found'], 404);
        }

        return response()->json($technology);
    }

    public function fetchAllReviews()
    {
        $review = Review::orderBy('created_at', 'desc')->get();
        return response()->json($review);
    }

    public function fetchAllHealth()
    {
        $health = Health::orderBy('created_at', 'desc')->get();
        return response()->json($health);
    }

    public function fetchAllReviewsById($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        return response()->json($review);
    }

    public function fetchAllHealthById($id)
    {
        $health = Health::find($id);

        if (!$health) {
            return response()->json(['error' => 'Health not found'], 404);
        }

        return response()->json($health);
    }
}

?>