$(function () {

    $(window).scroll(function() {

        if ($(this).scrollTop() > 1) {
            
            $('body').addClass("sticky");
            $('#header-img').slideUp('slow');
        }
        else {
            $('body').removeClass("sticky");
            $('#header-img').slideDown('slow');
        }
    });
});