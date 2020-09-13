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
    var ref = $(this).attr("data-ref");
    window.location.hash = ref;
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#" + ref).offset().top
  }, 500);
  });

  $("a.navitem").on("click", function(event) {
    event.preventDefault();
    var ref = $(this).attr("href");
    window.location.hash = ref;
    $([document.documentElement, document.body]).animate({
      scrollTop: $(ref).offset().top
  }, 500);
  })

});