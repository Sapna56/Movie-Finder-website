const api_url="http://www.omdbapi.com/?i=tt3896198&apikey=be3292e5&s=";  //this url is the basic url we get after generating api key on omdb api site 
//i=tt3896198  this is our id for our api
//this above url only generates the basic information about the movie and not the complete information
//so we use the below url to generate all the information realted to movie.
const api_url_search="http://www.omdbapi.com/?apikey=be3292e5&i=";
var search_input=document.getElementById("search_input");
var card=document.getElementsByClassName("movie-cards")[0];
document.getElementsByClassName("search")[0].addEventListener("click",function(){
    console.log(search_input.value);
    const query=search_input.value;
    if(query){
        getMovies(api_url+query);
    }
});

async function getMovies(url){
    const resp=await fetch(url);
    const respData=await resp.json();
    console.log(respData);
    showMovies(respData.Search);
}

function showMovies(movies){
    card.innerHTML="";
    movies.forEach(async function(movie){
        const movieData=await fetch(api_url_search+movie.imdbID);
        const movieDataobj=await movieData.json();
        movie_dispay(movieDataobj);
    });
}
function movie_dispay(imovie){
    const movieElm=document.createElement("div");
    movieElm.classList.add("movie-card");
    movieElm.innerHTML=`
    <div class="card">
        <img src="${imovie.Poster}" alt="Poster" width="300px" height="300px"/>
        <br>
        <div class="movie-description">
            <span class="movie-title"><b>Title</b><span class="value">${imovie.Title}</span></span>
            <span class="movie-title"><b>Rating</b><span class="value">${imovie.imdbRating}</span></span>
            <span class="movie-title"><b>Director</b><span class="value">${imovie.Director}</span></span>
            <span class="movie-title"><b>Released</b><span class="value">${imovie.Release}</span></span>
            <span class="movie-title"><b>Genre</b><span class="value">${imovie.Genre}</span></span>
         </div>
    </div>
    `;
    card.appendChild(movieElm);
}