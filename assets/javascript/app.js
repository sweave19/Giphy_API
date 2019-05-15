
// topics variable
var topics = [
    "frog",
    "lion",
    "elephant",
    "dog",
    "camel",
    "monkey",
    "kangaroo",
    "turtle"
]

//Func dynamically creates a button for each string in topics var
//and for each user search


$(document).ready(function () {

    function makeBtn() {

        //loop to create a btn for each string in topics
        for (i = 0; i < topics.length; i++) {
            var addBtn = $("<button>");
            addBtn.addClass("btn btn-primary animalBtn")
            addBtn.text(topics[i]);
            addBtn.attr("animalName", topics[i]);

            //update the html with the new btn
            $("#buttons").append(addBtn);
        }
    }
    //calls makeBtn func
    makeBtn();



    //takes user input and adds it to topics var
    $("#subBtn").on("click", function (event) {
        event.preventDefault();
        topics.push($("#inputAnimal").val().trim())
        $("#buttons").empty();
        makeBtn();
        // reset the inputAnimal area
        $("#inputAnimal").val("")
    });



    //when one of the animal buttons is clicked:
    //on click of button, AJAX req for search of giphy API for the text on that button
    $(document).on("click", ".animalBtn", function () {

        $("#gifArea").empty();
        var animalName = $(this).attr("animalName");
        var apiKey = "WZSQOZoCE7xIunWfx3Hfq4wTKVNLE3gt";
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${animalName}&limit=10`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.data);
            var data = response.data;
            var rating = data.rating;
            for (i = 0; i < data.length; i++) {

                var newImg = $("<img height= '250px' width= '250px'>");
                var p = $("<p>").text("Rating: " + data[i].rating.toUpperCase());

                //adding classes to the new GIFs. adding a src attr so it pulls the still version
                newImg.addClass("img-fluid animalGif").attr("src", data[i].images.fixed_width_still.url)
                    .attr("alt", animalName)
                    .attr("state", "still")
                    .attr("still", data[i].images.fixed_width_still.url)
                    .attr("animated", data[i].images.fixed_width.url);
                p.addClass("ratings");
                $("#gifArea").append(newImg, p);

            }
        });

    })
    //handler for when a GIF is clicked
    $(document).on("click", ".animalGif", function () {

        var state = $(this).attr("state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("animated"))
            $(this).attr("state", "animated")
        }

        else {
            $(this).attr("src", $(this).attr("still"))
            $(this).attr("state", "still")
        }
    })
});
