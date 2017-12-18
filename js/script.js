$(function(){
  var carouselList = $("#carousel ul");
  var moveFirstSlide = function(){
    var firstItem = carouselList.find("li:first");
    var lastItem = carouselList.find("li:last");
    lastItem.after(firstItem);
    carouselList.css({marginLeft: 0});
  };
  var changeSlides = function(){
    carouselList.animate({'marginLeft':-400}, 1000, moveFirstSlide);
  };
  setInterval(changeSlides, 3000);

  var leftRow = $('#leftRow');
  var left = function() {
    leftRow.click();
  };
  left();
});