$(function () {
  var MARGIN = 400;
  var ANIMATION_DURATION = 1500;

  var carouselList = $("#carousel ul");
  var moveFirstSlide = function () {
    var firstItem = carouselList.find("li:first");
    var lastItem = carouselList.find("li:last");
    lastItem.after(firstItem);
    carouselList.css({marginLeft: 0});
  };

  var changeSlides = function () {
    carouselList.animate({'marginLeft': -MARGIN}, ANIMATION_DURATION, moveFirstSlide);
  };

  setInterval(changeSlides, 3000);

  function moveLastSlide() {
    var firstItem = carouselList.find("li:first");
    var lastItem = carouselList.find("li:last");
    firstItem.before(lastItem);
    carouselList.css({marginLeft: -MARGIN});
  }

  function changesSlidesBack() {
    moveLastSlide();
    carouselList.animate({'marginLeft': 0}, ANIMATION_DURATION);
  }

  var rightRow = $('#rightRow');
  rightRow.on('click', changesSlidesBack);

  var leftRow = $('#leftRow');
  leftRow.on('click', changeSlides);
});