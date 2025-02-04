@extends('Admin.dashboard')

@section('content')
    <link rel="stylesheet" href="{{ asset('css/cinema-news.css') }}">
    <div class="content-container">
        <h2>Cinema News</h2>

        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <form action="{{ route('storeCineNews') }}" method="POST" class="cinema-news-form" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" required>
            </div>
            <div class="form-group">
                <label for="content">Description</label>
                <textarea id="content" name="content"></textarea>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" name="category" class="category" required>
                    <option value="" disabled selected>Select a category</option>
                    <option value="Box Office">Box Office</option>
                    <option value="Movie Reviews">Movie Reviews</option>
                    <option value="Celebrity News">Celebrity News</option>
                    <option value="New Releases">New Releases</option>
                    <option value="Interviews">Interviews</option>
                    <option value="Trailers">Trailers</option>
                    <!-- Add more categories as needed -->
                </select>
            </div>
            <div class="form-group">
                <label for="author">Author Name</label>
                <input type="text" id="author" name="author" required>
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="file" id="image" name="image">
            </div>
            <div class="form-group">
                <label for="popularity">Popularity (0-10)</label>
                <input type="number" id="popularity" name="popularity" required min="0" max="10">
            </div>
            <div class="form-group">
                <label for="trending">Trending</label>
                <select id="trending" name="trending" class="trending">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <button type="submit" class="btn-submit">Submit</button>
        </form>
    </div>

    <script src="https://cdn.ckeditor.com/4.24.0/standard/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('content');
    </script>
@endsection
