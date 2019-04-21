$(document).ready(function () {
    console.log("ready");
    var addButtons = ["dogs", "cats", "lions", "monkeys", "BMW", "Volkswagen","Birds","Bears","Sealion","Raccoon","Disturbed","Dream Theater", "Three Days Grace"];

    function displayImg() {

        $("#display-buttons").empty();
        for (var i = 0; i < addButtons.length; i++) {
            var newButtons = $("<button>" + addButtons[i] + "</button>");
            newButtons.addClass("new-buttons");
            newButtons.attr("data-buttontype", addButtons[i]);
            $("#display-buttons").append(newButtons);
        }
        $(".new-buttons").on("click", function () {
 
            var input = $(this).attr("data-buttontype");
            var limit = 10;
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=o9B0e5E5gyVEF165dqAYnQ0w5AVNzTWy";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {
                console.log(response)
                var responseImage = response.data;
                for (var j = 0; j < responseImage.length; j++) {
                    var newDiv = $("<div> class='new-div'");
                    var pRating = $("<p class='rating'>");
                    $(pRating).text(responseImage[j].rating);
                    var newImage = $("<img>");
                    $(newImage).addClass("gif");
                    $(newImage).attr("src", responseImage[j].images.fixed_height_still.url);
                    $(newImage).attr("data-still", responseImage[j].images.fixed_height_still.url);
                    $(newImage).attr("data-animate", responseImage[j].images.fixed_height.url);
                    $(newImage).attr("data-state", "still");
                    $(newImage).attr("data-state", "still");
                    $(newDiv).append(pRating);
                    $(newDiv).append(newImage);
                    $("#display-images").prepend(newDiv);

                }


            })

        })






    }
    
    function imageControll() {

        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
    
        if(state == "still"){
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }
    
        else if(state== "animate"){
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }
    
    $("#form").on("click","#submitPress", function(){
        event.preventDefault();
        var newGif = $("#user-input").val().trim();
        addButtons.push(newGif);
        $("display-buttons").empty();
        displayImg();
        $("#user-input").val("");
    })
    displayImg();
    $(document).on("click", ".gif", imageControll);

});






