/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
function search() {
    var query = document.getElementById('query').value;
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q:query
    });
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(onSearchResponse);
}
// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML = responseString;
}

/*
$(function(){
    $("form").on("submit", function(e) {
        e.preventDefault();
        var request = gapi.client.youtube.search.list({
            part:"snippet",
            type:"video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 3,
            order:"viewCount"
        });
        request.execute(function(response){
            console.log(response);
        });
    });
});

function init(){
    gapi.client.setApiKey("AIzaSyCmIxo-TtHpnedhNpZtE-pD2489i7aX42w");
    gapi.client.load("youtube","v3",function handleAPILoaded(){        
    });
}

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
}

/*
function show_content(msg){
  $('.box_main').append('<div class="msg_box">'+msg+'</div>');
  console.log(msg);
}
function search(){

  if($('#video_id').val() !== ''){
    var videoId = $('#video_id').val();
    YoutubeDataTool.getVideoInfo(videoId);
  }
}
*/


/**
 * YouTube video uploader class
 *
 * @constructor
 */

var YoutubeDataTool = function(){
   /**
   * youtube api key(https://console.developers.google.com/apis/credentials?project=develop-1350&authuser=2)
   *
   * @attribute api_key
   * @type string
   */
  this.api_key = 'AIzaSyCzNFRHjVKEdyRhi2BT0Sx5oc-IDRg6ghI';

  /**
   * The id of the new video.
   *
   * @attribute videoId
   * @type string
   * @default ''
   */
  this.videoId = '';



}; //end of YoutubeDataTool


YoutubeDataTool.prototype.getVideoInfo = function(videoId) {
  if(typeof videoId == 'undefined' || videoId === ''){
     show_content('請輸入影片編號');
     return false;
  }
  this.videoId = videoId;
  var url = 'https://www.googleapis.com/youtube/v3/videos?id='+videoId+'&key='+this.api_key+'&part=snippet';
  $.ajax({
    type: 'GET',
    async: false,
    url:  url,
    success :function(rp){
        console.log(rp);
    }
});
};
var YoutubeDataTool = new YoutubeDataTool();
