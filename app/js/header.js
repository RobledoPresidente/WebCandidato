var hashtag = '#RobledoPresidente2018';

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

function showLoading(progress) {
    
    hideLoading();
        
    $('#loading').show().spin({
        lines: 5 // The number of lines to draw
        , length: 47 // The length of each line
        , width: 21 // The line thickness
        , radius: 41 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 0 // Corner roundness (0..1)
        , color: '#fff' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning

    });
    
    if (progress !== undefined && progress)
        $('#progress').width(0).show();
}

function hideLoading() {
    
    $('#loading').hide().spin(false);
}
  