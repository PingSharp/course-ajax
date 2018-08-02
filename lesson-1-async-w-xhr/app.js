(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        searchData();
    });
    function addImage(){
        let data = JSON.parse(this.responseText);
        if(data && data.results && data.results[0]){
            for(let i = 0;i < data.results.length;i++){
                let Pic = data.results[i];
            let htmlcontent = `<figure>
            <img src="${Pic.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${Pic.user.name}</figcaption>
            </figure>`;
            responseContainer.insertAdjacentHTML('afterbegin',htmlcontent);
            }
        }
        else{
            let htmlcontent = `<div>No images available!</div>`;
            responseContainer.insertAdjacentHTML('afterbegin',htmlcontent);
        }
    }
    function addArticles(){
        let data = JSON.parse(this.responseText);        
        if(data && data.response && data.response.docs[0]){
            for(let j=0;j<data.response.docs.length;j++){
                let Article = data.response.docs[j];
            let htmlcontent = `<div>
            <a href="${Article.web_url}">
            <h2>${Article.headline.main}</h2>
            </a>
            </div>`; 
            responseContainer.insertAdjacentHTML('afterbegin',htmlcontent);
            }
            
        }
        else{
            let htmlcontent = `<div>No Article available!</div>`;
            responseContainer.insertAdjacentHTML('afterbegin',htmlcontent);
        }
    }
    searchedForText = 'Android';
    searchData();
    function searchData(){
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.onerror = function(err){
            alert(err.message+err.type);
        }
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=39787cd6d0084ba2b539c81b170b950d`);
        articleRequest.send();
        
        const unsplashRequest = new XMLHttpRequest();
        
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = function(err){
            alert(err.message+err.type);
        }
        unsplashRequest.setRequestHeader('Authorization','Client-ID aeaf305f274fa944afdfd902bb5df4cc49bac99f5b0e5db3592b4cf60caeb7f6');
        unsplashRequest.send();
    }    
})();
