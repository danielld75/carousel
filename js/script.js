$(function () {
  var MARGIN = 400;
  var ANIMATION_DURATION = 1500;
  var SLIDE_PAUSE = 3000;

  var carouselList = $("#carousel .slides");
  var moveFirstSlide = function () {
    var firstItem = carouselList.find("li:first");
    var lastItem = carouselList.find("li:last");
    lastItem.after(firstItem);
    carouselList.css({marginLeft: 0});
    setActiveDot();
  };

  var changeSlides = function () {
    carouselList.animate({'marginLeft': -MARGIN}, ANIMATION_DURATION, moveFirstSlide);
  };

  var intervalId = setInterval(changeSlides, SLIDE_PAUSE);

  function moveLastSlide(slidesCount) {
    slidesCount = slidesCount || 1;
    for (var i = 0; i < slidesCount; i++) {
      var firstItem = carouselList.find("li:first");
      var lastItem = carouselList.find("li:last");
      firstItem.before(lastItem);
    }
    carouselList.css({marginLeft: -MARGIN * slidesCount});
    setActiveDot();
  }

  function changesSlidesBack() {
    moveLastSlide();
    carouselList.animate({'marginLeft': 0}, ANIMATION_DURATION);
  }

  var rightRow = $('#rightRow');
  rightRow.click(changesSlidesBack);

  var leftRow = $('#leftRow');
  leftRow.click(changeSlides);

  function pauseInterval(milliseconds) {
    clearInterval(intervalId);
    setTimeout(function() {
      intervalId = setInterval(changeSlides, SLIDE_PAUSE);
    }, milliseconds);
  }

  function setActiveDot() {
    var currentSlide = carouselList.find("li:first").data("slide");
    $(".dots .dot").each(function() {
      var dot = $(this);
      if (dot.data("slide") === currentSlide) {
        dot.addClass("active");
      } else {
        dot.removeClass("active");
      }
    });
  }
  setActiveDot();

  $(".dots .dot").click(function() {
    pauseInterval(ANIMATION_DURATION);

    var clickedSlide = $(this).data("slide");
    var currentSlide = carouselList.find("li:first").data("slide");

    if (clickedSlide > currentSlide) {
      var diff = clickedSlide - currentSlide;
      carouselList.animate({'marginLeft': -MARGIN * diff}, ANIMATION_DURATION, function() {
        for (var i = 0; i < diff; i++) {
          moveFirstSlide();
        }
      });
    } else if (clickedSlide < currentSlide) {
      var diff = currentSlide - clickedSlide;
      moveLastSlide(diff);
      carouselList.animate({'marginLeft': 0}, ANIMATION_DURATION);
    }
  });
});
