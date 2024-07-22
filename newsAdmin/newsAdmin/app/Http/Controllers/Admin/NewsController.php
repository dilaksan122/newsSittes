<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Health;
use App\Models\News;
use App\Models\Review;
use App\Models\Sports;
use App\Models\Technology;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function cinema()
    {
        return view('Admin.news.cinema');
    }

    public function sports()
    {
        return view('Admin.news.sports');
    }

    public function technology()
    {
        return view('Admin.news.technology');
    }

    public function reviews()
    {
        return view('Admin.news.reviews');
    }

    public function health()
    {
        return view('Admin.news.health');
    }



    public function storeCineNews(Request $request)
    {
        $validateData = $request->validate([
            "title" => "required",
            "content" => "required",
            "author" => "required",
            'category' => 'required|string',
            "image" => "image|mimes:jpeg,png,jpg,gif", // Validate image type and size
            "popularity" => "required|integer|min:0|max:10", // Validate popularity
            "trending" => "required|boolean" // Validate trending
        ]);

        if ($request->hasFile('image')) {
            // Generate a unique file name for the image
            $imageName = time() . '.' . $request->image->getClientOriginalExtension();

            // Store the image in the 'public/images' directory
            $request->image->storeAs('public/images', $imageName);

            // Add the image path to the validateData array
            $validateData['image'] = 'storage/images/' . $imageName;
        }

        News::create($validateData);

        return redirect()->route('cinema.news')->with('success', 'News added successfully.');
    }

    public function storeSportsNews(Request $request)
    {
        $validateData = $request->validate([
            "title" => "required",
            "content" => "required",
            "author" => "required",
            "category" => "required",
            "popularity" => "required|integer|min:0|max:10", // Validate popularity
            "trending" => "required|boolean", // Validate trending
            "image" => "image|mimes:jpeg,png,jpg,gif"  // Validate image type and size
        ]);

        if ($request->hasFile('image')) {
            // Generate a unique file name for the image
            $imageName = time() . '.' . $request->image->getClientOriginalExtension();

            // Store the image in the 'public/images' directory
            $request->image->storeAs('public/images', $imageName);

            // Add the image path to the validateData array
            $validateData['image'] = 'storage/images/' . $imageName;
        }

        // Create a new Sports record with the validated data
        Sports::create($validateData);

        // Redirect back with a success message
        return redirect()->back()->with('success', 'Sports news created successfully!');
    }

    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
            'category' => 'required|string',
            'popularity' => 'required|integer|min:0|max:10',
            'trending' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // Validate image type and size (up to 2MB)
        ]);
    
        if ($request->hasFile('image')) {
            // Generate a unique file name for the image
            $imageName = time() . '.' . $request->image->getClientOriginalExtension();
    
            // Store the image in the 'public/images' directory
            $request->image->storeAs('public/images', $imageName);
    
            // Add the image path to the validatedData array
            $validatedData['image'] = 'storage/images/' . $imageName;
        }
    
        // Create a new Technology record with the validated data
        Technology::create($validatedData);
    
        // Redirect back with a success message
        return redirect()->back()->with('success', 'Technology news created successfully!');
    }
    

    public function storeReviews(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
            'category' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'trending' => 'required|boolean', // Validate trending
            'popularity' => 'required|integer|min:0|max:10',
            'now_playing' => 'required|boolean',
            'from_the_blog' => 'required|boolean',
            'review_collections' => 'required|boolean',
        ], [
            // Custom error messages
            'title.required' => 'Title is required.',
            'content.required' => 'Description is required.',
            'author.required' => 'Author Name is required.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'Supported image formats are: jpeg, png, jpg, gif, svg.',
            'image.max' => 'The image may not be greater than 2MB.',
        ]);

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/Reviewimages', $imageName);
            $validatedData['image'] = 'storage/Reviewimages/' . $imageName;
        }

        // Create new review record
        Review::create($validatedData);

        // Redirect back with success message
        return redirect()->route('reviews')->withSuccess('Review added successfully.');
    }

    public function storeHealth(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
            'category' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            "trending" => "required|boolean", // Validate trending
            "popularity" => "required|integer|min:0|max:10"

        ], [
            // Custom error messages
            'name.required' => 'Title is required.',
            'content.required' => 'Description is required.',
            'author.required' => 'Author Name is required.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'Supported image formats are: jpeg, png, jpg, gif, svg.',
            'image.max' => 'The image may not be greater than 2MB.',
        ]);

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/Healthimages', $imageName);
            $validatedData['image'] = 'storage/Healthimages/' . $imageName;
        }

        // Create new review record
        Health::create($validatedData);

        // Redirect back with success message
        return redirect()->route('health.news')->withSuccess('Review added successfully.');
    }

    public function viewCinema()
    {
        $cinema = News::paginate(5);

        return view('Admin.cinema.viewCinema', compact('cinema'));
    }

    // app/Http/Controllers/CinemaNewsController.php

    public function edit($id)
    {
        $cinema = News::findOrFail($id);
        return view('Admin.cinema.edit', compact('cinema'));
    }

    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            "title" => "required",
            "content" => "required",
            "author" => "required",
            'category' => 'required|string',
            "image" => "image|mimes:jpeg,png,jpg,gif",
            "popularity" => "required|integer|min:0|max:10",
            "trending" => "required|boolean"
        ]);

        $cinema = News::findOrFail($id);

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->getClientOriginalExtension();
            $request->image->storeAs('public/images', $imageName);
            $validateData['image'] = 'storage/images/' . $imageName;
        }

        $cinema->update($validateData);

        return redirect()->route('cinema.news')->with('success', 'News updated successfully.');
    }

    public function destroy($id)
    {
        $cinema = News::findOrFail($id);
        $cinema->delete();

        return redirect()->route('cinema.views')->with('success', 'News deleted successfully.');
    }

    public function viewSports()
    {
        $sports = Sports::all();
        return view('Admin.Sports.viewSports', compact('sports'));
    }

    public function editSports($id)
    {
        $sport = Sports::findOrFail($id);
        return view('Admin.Sports.editSports', compact('sport'));
    }

    public function updateSports(Request $request, $id)
    {
        $validateData = $request->validate([
            "title" => "required",
            "content" => "required",
            "author" => "required",
            "category" => "required",
            "popularity" => "required|integer|min:0|max:10",
            "trending" => "required|boolean",
            "image" => "image|mimes:jpeg,png,jpg,gif"
        ]);

        $sport = Sports::findOrFail($id);

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->getClientOriginalExtension();
            $request->image->storeAs('public/images', $imageName);
            $validateData['image'] = 'storage/images/' . $imageName;
        }

        $sport->update($validateData);

        return redirect()->route('Admin.Sports.viewSports')->with('success', 'Sports news updated successfully.');
    }

    public function destroySports($id)
    {
        $sport = Sports::findOrFail($id);
        $sport->delete();

        return redirect()->route('Admin.Sports.viewSports')->with('success', 'Sports news deleted successfully.');
    }


    public function viewTechnologies()
    {
        $technology=Technology::all();
        return view('Admin.Technology.viewTechnology',compact('technology'));
    }


    public function editTechnology($id)
    {
        $tech = Technology::findOrFail($id);
        return view('Admin.Technology.editTechnology', compact('tech'));
    }

    public function updateTechnology(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'author' => 'required',
            'category' => 'required',
            'popularity' => 'required|integer',
            'trending' => 'required|boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        $tech = Technology::findOrFail($id);
        $tech->title = $request->title;
        $tech->content = $request->content;
        $tech->author = $request->author;
        $tech->category = $request->category;
        $tech->popularity = $request->popularity;
        $tech->trending = $request->trending;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('technology_images', 'public');
            $tech->image = $imagePath;
        }

        $tech->save();

        return redirect()->back()->with('success', 'Technology news updated successfully');
    }

    public function destroyTechnology($id)
    {
        $tech = Technology::findOrFail($id);
        $tech->delete();

        return redirect()->route('Admin.Technologies.viewTechnologies')->with('success', 'Technology news deleted successfully');
    }
    public function showReviews()
    {
        $reviews = Review::all();
        return view('Admin.reviews.show', compact('reviews'));
    }

    public function editReviews($id)
    {
        $review = Review::findOrFail($id);
        return view('Admin.reviews.edit', compact('review'));
    }

    public function updateReviews(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $review = Review::findOrFail($id);
        $review->title = $request->title;
        $review->content = $request->content;
        $review->category = $request->category;
        $review->author = $request->author;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $review->image = $imagePath;
        }

        $review->save();
        return redirect()->route('Admin.Reviews.viewReviews')->with('success', 'Review updated successfully');
    }

    public function destroyReviews($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return redirect()->route('Admin.Reviews.viewReviews')->with('success', 'Review deleted successfully');
    }

    public function showHealth()
    {
        $healthNews = Health::all();
        return view('Admin.health.viewHealth', compact('healthNews'));
    }

    public function editHealth($id)
    {
        $healthNews = Health::findOrFail($id);
        return view('Admin.health.editHealth', compact('healthNews'));
    }

    public function updateHealth(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
            'category' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            "trending" => "required|boolean", // Validate trending
            "popularity" => "required|integer|min:0|max:10"
        ]);

        $healthNews = Health::findOrFail($id);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/Healthimages', $imageName);
            $validatedData['image'] = 'storage/Healthimages/' . $imageName;
        }

        $healthNews->update($validatedData);

        return redirect()->route('Admin.Health.viewHealth')->with('success', 'Health news updated successfully.');
    }

    public function destroyHealth($id)
    {
        $healthNews = Health::findOrFail($id);
        $healthNews->delete();
        return redirect()->route('Admin.Health.viewHealth')->with('success', 'Health news deleted successfully.');
    }
}