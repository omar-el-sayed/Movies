$(document).ready(function () {
    let aside = $("aside");
    let fullNameInput = $("#fullName");
    let emailAddressInput = $("#emailAddress");
    let phoneNumberInput = $("#phoneNumber");
    let userAgeInput = $("#userAge");
    let userPasswordInput = $("#userPassword");
    let rePasswordInput = $("#rePassword");

    let movies = [];
    async function getMovies(section) {
        // let httpRequest = await fetch(`https://api.themoviedb.org/3/movie/${section}?api_key=e0fbcdff4605e3a1a211ddb175ec13fb&language=en-US&page=1`);
        let httpRequest = await fetch(`https://api.themoviedb.org/3/${section}?api_key=e0fbcdff4605e3a1a211ddb175ec13fb`);
        movies = await httpRequest.json();
        movies = movies.results;
        displayMovies(movies);
    }
    getMovies('movie/now_playing');

    function displayMovies(moviesList) {
        let movie = ``;
        for (let i = 0; i < moviesList.length; i++) {
            movie += `<div class="col-lg-4 col-md-6 my-3">
                    <div class="movie-desc position-relative text-center overflow-hidden">
                        <img src="https://image.tmdb.org/t/p/w500${moviesList[i].poster_path}" class="img-fluid rounded" alt="${moviesList[i].original_title}">
                        <div class="overlay d-flex align-items-center justify-content-center flex-column rounded">
                            <h2>${moviesList[i].title}</h2>
                            <p class="my-3">${moviesList[i].overview}</p>
                            <span>rate: ${moviesList[i].vote_average}</span>
                            <p class="mt-2">${moviesList[i].release_date}</p>
                        </div>
                    </div>
                  </div>`;
        }
        document.getElementById("moviesList").innerHTML = movie;
    }

    function searchMovies(searchTerm) {
        let searchResult = [];
        for (let i = 0; i < movies.length; i++) {
            if ((movies[i].title).toLowerCase().includes(searchTerm.toLowerCase())) {
                searchResult.push(movies[i]);
            }
        }
        displayMovies(searchResult);
    }
    $("#movieWord").keyup(function () {
        searchMovies(this.value);
    });

    function searchByRate(searchRate) {
        let searchResult = [];
        for (let i = 0; i < movies.length; i++) {
            if ((movies[i].overview).toLowerCase().includes(searchRate.toLowerCase())) {
                searchResult.push(movies[i]);
            }
        }
        displayMovies(searchResult);
    }
    $("#movieDesc").keyup(function () {
        searchByRate(this.value);
    })

    aside.css("left", `-${aside.innerWidth()}px`);
    $("#openBtn").click(function () {
        $(".menu-bar").animate({ left: aside.innerWidth() }, 450);
        $("#openBtn").fadeOut(200, function () {
            aside.animate({ left: '0px' }, 600);
            $("#closeBtn").fadeIn(200);
            for (let i = 0; i < $(".movies-bar a").length; i++) {
                $(".movies-bar a").eq(i).animate({ opacity: '1', margin: '20px 0' }, 1000);
            }
        });

    });

    $("#closeBtn").click(function () {
        $(".menu-bar").animate({ left: "0px" }, 300);
        $("#closeBtn").fadeOut(200, function () {
            aside.animate({ left: `-${aside.innerWidth()}px` }, 600);
            $("#openBtn").fadeIn(200);
            for (let i = 0; i < $(".movies-bar a").length; i++) {
                $(".movies-bar a").eq(i).animate({ opacity: '0', margin: '500px 0' }, 50);
            }
        });
    });

    $("aside .movies-bar a").click(function () {
        let contactOffset = $("#contactUs").offset().top;
        let movieSection = $(this).text();
        if (movieSection == "Now Playing") {
            getMovies('movie/now_playing');
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }
        else if (movieSection == "Popular") {
            getMovies('movie/popular');
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }
        else if (movieSection == "Top Rated") {
            getMovies('movie/top_rated');
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }
        else if (movieSection == "Trending") {
            getMovies('trending/movie/day');
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }
        else if (movieSection == "Upcoming") {
            getMovies('movie/upcoming');
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }
        else {
            $("html, body").animate({ scrollTop: contactOffset }, 1000);
        }
    });

    fullNameInput.keyup(function () {
        let regex = /^[A-Z][a-z]{2,8}\s[A-Z][a-z]{2,8}\s[A-Z][a-z]{2,8}$/;
        if (regex.test(this.value)) {
            // Valid
            fullNameInput.addClass("is-valid");
            fullNameInput.removeClass("is-invalid");
            fullNameInput.next().css("display", "none");
        }
        else {
            //Invalid
            fullNameInput.addClass("is-invalid");
            fullNameInput.removeClass("is-valid");
            fullNameInput.next().css("display", "block");
        }
    });

    emailAddressInput.keyup(function () {
        let regex = /^[A-z]{1,}[0-9]{0,}?@[a-z]{1,}\.[a-z]{2,}$/;
        if (regex.test(this.value)) {
            // Valid
            emailAddressInput.addClass("is-valid");
            emailAddressInput.removeClass("is-invalid");
            emailAddressInput.next().css("display", "none");
        }
        else {
            //Invalid
            emailAddressInput.addClass("is-invalid");
            emailAddressInput.removeClass("is-valid");
            emailAddressInput.next().css("display", "block");
        }
    });

    phoneNumberInput.keyup(function () {
        let regex = /^(\+2|002)?01[0125][0-9]{8}$/;
        if (regex.test(this.value)) {
            // Valid
            phoneNumberInput.addClass("is-valid");
            phoneNumberInput.removeClass("is-invalid");
            phoneNumberInput.next().css("display", "none");
        }
        else {
            // Invalid
            phoneNumberInput.addClass("is-invalid");
            phoneNumberInput.removeClass("is-valid");
            phoneNumberInput.next().css("display", "block");
        }
    });

    userAgeInput.keyup(function () {
        let regex = /^([1-7][0-9]|80)$/;
        if (regex.test(this.value)) {
            // Valid
            userAgeInput.addClass("is-valid");
            userAgeInput.removeClass("is-invalid");
            userAgeInput.next().css("display", "none");
        }
        else {
            // Invalid
            userAgeInput.addClass("is-invalid");
            userAgeInput.removeClass("is-valid");
            userAgeInput.next().css("display", "block");
        }
    });

    userPasswordInput.keyup(function () {
        let regex = /[A-z0-9]{8}/;
        if (regex.test(this.value)) {
            // Valid
            userPasswordInput.addClass("is-valid");
            userPasswordInput.removeClass("is-invalid");
            userPasswordInput.next().css("display", "none");
        }
        else {
            // Invalid
            userPasswordInput.addClass("is-invalid");
            userPasswordInput.removeClass("is-valid");
            userPasswordInput.next().css("display", "block");
        }
    });

    rePasswordInput.keyup(function () {
        let regex = /[A-z0-9]{8}/;
        if (regex.test(this.value)) {
            // Valid
            rePasswordInput.addClass("is-valid");
            rePasswordInput.removeClass("is-invalid");
            rePasswordInput.next().css("display", "none");
        }
        else {
            // Invalid
            rePasswordInput.addClass("is-invalid");
            rePasswordInput.removeClass("is-valid");
            rePasswordInput.next().css("display", "block");
        }
    });

    $(".eye-slash").click(function () {
        userPasswordInput.attr("type", "text");
        $(".eye-slash").css("display", "none");
        $(".eye-icon").css("display", "inline-block");
    });

    $(".eye-icon").click(function () {
        userPasswordInput.attr("type", "password");
        $(".eye-icon").css("display", "none");
        $(".eye-slash").css("display", "inline-block");
    });

    $("#loadingScreen").slideUp(1000, function () {
        $("body").css("overflow", "visible")
    });
});