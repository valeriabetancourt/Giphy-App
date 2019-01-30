$(document).ready(function() {
  var topics = [
    "labrador",
    "poodle",
    "bulldog",
    "beagle",
    "golden",
    "chihuahua",
    "yorkie",
    "husky",
    "pug",
    "dachshund",
    "pomeranian",
    "boxer",
    "chow chow",
    "cocker spaniel",
    "border collie",
    "rottweiler",
    "doberman",
    "corgi",
    "akita",
    "dalmatian",
    "great dane"
  ];

  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
  }

  $(document).on("click", ".topics-button", function() {
    $("#topics").empty();
    $(".topics-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var topicsDiv = $('<div class="topics-item">');

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var topicsImage = $("<img>");
        topicsImage.attr("src", still);
        topicsImage.attr("data-still", still);
        topicsImage.attr("data-animate", animated);
        topicsImage.attr("data-state", "still");
        topicsImage.addClass("topics-image");

        topicsDiv.append(p);
        topicsDiv.append(topicsImage);

        $("#topics").append(topicsDiv);
      }
    });
  });

  $(document).on("click", ".topics-image", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-topics").on("click", function(event) {
    event.preventDefault();
    var newtopics = $("input")
      .eq(0)
      .val();

    if (newtopics.length > 2) {
      topics.push(newtopics);
    }

    populateButtons(topics, "topics-button", "#topics-buttons");
  });

  populateButtons(topics, "topics-button", "#topics-buttons");
});
