$(document).ready(function(){
        var select = $(".component-list"),
          options_area = $(".options-list"),
          option = $(".option");
      
        select.on("click",function(){
         option.parent().find(".show-list").removeClass("show-list");
          $(this).find(options_area).addClass("show-list");
        });

        option.on("click", function () {
          $(this).parent().parent().find(".component-selected").text($(this).text());
          $(this).parent().find(".show-list").removeClass("show-list");

          setTimeout(function () {
              $("body").trigger("click");
          }, 0);
        });
        $(window).on("click touchend", function (e) {

        var target = $(e.target);

        if ($(e.target).closest(options_area).length || $(e.target).closest(option).length || $(e.target).closest(select).length ) {
            e.stopPropagation();
        } else {
            options_area.removeClass("show-list");
        }
 });
})
