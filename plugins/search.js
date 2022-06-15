//Searshing and returns the results of the search
//https://api.duckduckgo.com/?q=<search>&format=json&pretty=1&no_html=1&skip_disambig=1

let axios = new require('axios').default;


//Replace all whitespaces with _
function cleanSearch(searchStr) {
    return searchStr.replace(/\s/g, '%20');
}
/*
Make a request to the API via get 
- Recive a json object with the search terms
- Return the json.Abstract
*/
function search(search){
    let url = 'https://api.duckduckgo.com/?q=' + cleanSearch(search) + '&format=json&pretty=1&no_html=1&skip_disambig=1';
    return axios.get(url).then(response => {
        return response.data.Abstract;
    }
    ).catch(error => {
        console.log(error);
    }
    );
}

search('').then(response => {
    if(response === ""){
        console.log('I cant find this😔\nBe sure if you are searching with single words!');
    }
    else{
        console.log(`${response}`);
    }
    
});

//Promise search
/*
Usage example:

search('google').then(response => {
    console.log(response);
});
*/




