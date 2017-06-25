/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var resultNumber = 0;
var nextPageToken = "";
//var pageMark="";
//var page=0;
//var totalPage=0;
//
// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCmIxo-TtHpnedhNpZtE-pD2489i7aX42w');
}
 
// Called when the search button is clicked in the html code
function search(pageToken) {    
    var number = document.getElementById('number').value;
    resultNumber = parseInt(number);
    if(resultNumber>50)
        resultNumber=50;
    var query = document.getElementById('query').value;    
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        maxResults: resultNumber,
        type: 'video',
        q:query,
        pageToken:pageToken
    });
    if (pageToken) {
    request.pageToken = pageToken;
    }
    //page++;
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(onSearchResponse);
}
// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {      
    //var responseString = JSON.stringify(response, '', 1); 
    //var total = response['pageInfo'].totalResults;
    nextPageToken = response['nextPageToken'];
    var item = response['items'];    
    var result = "";    
    for (var i = 0; i < resultNumber; i++) {
        var id = item[i].id.videoId;
        var title = item[i].snippet.title;
        result+=title+"\t https://www.youtube.com/watch?v="+id+"\n";
    }
    //pageMark="共 " +page*resultNumber+"/"+total+" 筆";
    document.getElementById('select').innerHTML = nextPageToken;  
    document.getElementById('result').innerHTML = result; 
    //document.getElementById('totalNumber').innerHTML = total;
    //document.getElementById('response').innerHTML = responseString;
    
}

// Retrieve the next page.
function nextPage() {
  search(nextPageToken);
}

/*
// Retrieve the previous page.
function previousPage() {
  search(prevPageToken);
}

*/

