$(window).on("load", function () {

  $(window).on("scroll", function () {
    var top_of_window = $(window).scrollTop();
    var bottom_of_window = top_of_window + $(window).height();

    var visible_threshold = bottom_of_window - $(window).height() * 0.65;
    var invisible_threshold = top_of_window + $(window).height() * 0.65;

    $('.block-wrapper').each(function () {
      var top_of_object = $(this).position().top;
      var bottom_of_object = $(this).position().top + $(this).outerHeight();

      if (visible_threshold > top_of_object) {
        $(this).addClass("block-visible");
      } else if (invisible_threshold < bottom_of_object) {
        $(this).removeClass("block-visible");
      }

    });
  });

});