$(window).on("load", function () {

  $(window).on("scroll", function () {
    var top_of_window = $(window).scrollTop();
    var bottom_of_window = top_of_window + $(window).height();

    var visible_threshold = bottom_of_window - $(window).height() * 0.4;
    var invisible_threshold = top_of_window + $(window).height() * 0.4;

    $('.block-wrapper').each(function () {
      var top_of_object = $(this).position().top;
      var bottom_of_object = $(this).position().top + $(this).outerHeight();

      if ((invisible_threshold > bottom_of_object) || (visible_threshold < top_of_object)) {
        $(this).removeClass("block-visible");
      } else if (visible_threshold > top_of_object) {
        $(this).addClass("block-visible");
      }

    });
  });

  $(".contents-item").on("click", function() {
    window.location.hash = "";
    window.location.hash = $(this).attr("data-ref");
  });

});