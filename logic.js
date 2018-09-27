//declare the global variables
window.onload=function(){
    
var firstEmotions=["Happiness","Surprise","Sadness","Fear","Anger","Joy","Trust","Disgust","Euphoria","Peace","Motivation","Silliness"]




function generateButtons(){

    //function to make buttons appear 
    //for to make the first buttons
    for(var i=0;i<firstEmotions.length;i++){ 
            //$("#firstRow").append("<div class='col-md-3'><button type='button' class='btn btn-primary'>" + firstEmotions[i] + "</button></div>");
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

    $(document).on("click", "button",function(){
        console.log(this);
        console.log("entra al click con boton extra");
        $("#gifsRow").empty();
        var emotion=$(this).attr("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=YTwN196lqIIKvebh5Fx1jLVaHtDfcRgU&limit=10";
//another key>: dc6zaTOxFJmzC
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
                emotionImage.attr("src", results[i].images.fixed_height.url);
    
                gifDiv.prepend(p);
                gifDiv.prepend(emotionImage);
    
                $("#gifsRow").prepend(gifDiv);
              }
            });
       


    });

});
generateButtons();


}