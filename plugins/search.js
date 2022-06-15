//Searshing and returns the results of the search
//https://api.duckduckgo.com/?q=<search>&format=json&pretty=1&no_html=1&skip_disambig=1

let axios = new require('axios').default;


/*
Make a request to the API via get 
- Recive a json object with the search terms
- Return the json.Abstract
*/
function search(search){
    let url = 'https://api.duckduckgo.com/?q=' + search + '&format=json&pretty=1&no_html=1&skip_disambig=1';
    return axios.get(url).then(response => {
        return response.data.Abstract;
    }
    ).catch(error => {
        console.log(error);
    }
    );
}

//Promise search
/*
Usage example:

search('google').then(response => {
    console.log(response);
});
*/




