$(document).ready(function () {
    let movies = []; // Array to store movie objects

    // Event listener for form submission
    $("#movie-form").on("submit", function (event) {
        event.preventDefault(); // Prevents default form submission behavior
        let title = $("#title").val().trim(); // Get and trim title input
        let rating = $("#rating").val(); // Get rating input

        // Validate title length
        if (title.length < 2) {
            alert("Title must be at least 2 characters long.");
            return;
        }
        // Validate rating range
        if (rating < 0 || rating > 10 || rating === "") {
            alert("Rating must be between 0 and 10.");
            return;
        }

        let movie = { title, rating }; // Create movie object
        movies.push(movie); // Add movie to array
        renderMovies(); // Update movie list display

        // Clear input fields
        $("#title").val("");
        $("#rating").val("");
    });

    // Function to render movies in the list
    function renderMovies() {
        $("#movie-list").empty(); // Clear current list
        movies.forEach((movie, index) => {
            $("#movie-list").append(`
                <div class="movie" data-index="${index}">
                    <span>${movie.title} - ${movie.rating}</span>
                    <button class="remove-btn">Remove</button>
                </div>
            `);
        });
    }

    // Event listener for remove button
    $("#movie-list").on("click", ".remove-btn", function () {
        let index = $(this).parent().data("index"); // Get index of movie
        movies.splice(index, 1); // Remove movie from array
        renderMovies(); // Update list display
    });

    // Event listener for sorting by title
    $("#sort-title").on("click", function () {
        movies.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title
        renderMovies(); // Update list display
    });

    // Event listener for sorting by rating
    $("#sort-rating").on("click", function () {
        movies.sort((a, b) => a.rating - b.rating); // Sort numerically by rating
        renderMovies(); // Update list display
    });
});