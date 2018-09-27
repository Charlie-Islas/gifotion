//declare the global variables
window.onload=function(){
    
var firstEmotions=["Happiness","Surprise","Sadness","Fear","Anger","Joy","Trust","Disgust","Euphoria","Peace","Motivation","Silliness"]

function generateButtons(){
    $("#clickInstructions").hide();
    //function to make buttons appear 
    //for to make the first buttons
    for(var i=0;i<firstEmotions.length;i++){ 
            var newButton=$('<button>').text(firstEmotions[i]);
            $(newButton).addClass('btn btn-primary');
            $(newButton).addClass('emotionBtn');
            $(newButton).attr("id",firstEmotions[i]);
            $("#buttons").append(newButton);
    }
}

$("#addBtn").on("click", function() {

    var makeBtn=false;
    var str=$('#usr').val();
    if(str!==""){
        makeBtn=true;
    }
       
    if(makeBtn){
    var capitalised = ($('#usr').val()).charAt(0).toUpperCase() + ($('#usr').val()).slice(1);
    var newButton=$('<button>').text(capitalised);
    $(newButton).addClass('btn btn-primary');
    $(newButton).addClass('emotionBtn');
    $(newButton).attr("id",capitalised);
    $('#buttons').append(newButton);
    $('#usr').val('');}
  });

$(document).keypress(function(e) {
 
    if(e.which == 13) {
        var makeBtn=false;
        var str=$('#usr').val();

        if(str!==""){
            makeBtn=true;
        }
        if(makeBtn){
            
            var capitalised = ($('#usr').val()).charAt(0).toUpperCase() + ($('#usr').val()).slice(1);
            var newButton=$('<button>').text(capitalised);
            $(newButton).addClass('btn btn-primary');
            $(newButton).addClass('emotionBtn');
            $(newButton).attr("id",capitalised);
            $('#buttons').append(newButton);
            $('#usr').val('');
        }
    
    }
});


$(document).ready(function(){

    $(document).on("click", ".emotionBtn",function(){
        
        $("#clickInstructions").show();
        $("#gifsRow").empty();
        var emotion=$(this).attr("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+emotion+"&api_key=YTwN196lqIIKvebh5Fx1jLVaHtDfcRgU&limit=15";

        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              
              var results = response.data;
                
              
              for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var emotionImage = $("<img>");
                emotionImage.addClass("img-thumbnail");
                emotionImage.attr("src", results[i].images.fixed_height_still.url);
                emotionImage.attr("data-state","still");
                emotionImage.attr("data-still",results[i].images.fixed_height_still.url);
                emotionImage.attr("data-animate",results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(emotionImage);
    
                $("#gifsRow").prepend(gifDiv);
              }

            });
    });

    $(document).on("click",".img-thumbnail",function(){
                
        var state=$(this).attr("data-state");
       
        if (state==="still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
           } 
        else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
           }    
    
    });


});

generateButtons();

}