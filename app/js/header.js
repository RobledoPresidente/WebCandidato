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

    $('.share li').click(function (event) {

        event.preventDefault();
        
        var network = $(this).data('network');
        var dataParent = $(this).closest('.share').data();
        
        ga('send', 'event', 'social-share', 'click', network, {'nonInteraction': 1 });

        switch (network) {
            case 'twitter':
                popup('https://twitter.com/intent/tweet', {
                    text: dataParent.title + ' | vía @JERobledo',
                    url: dataParent.url
                });
                break;
            case 'facebook':
                popup('https://www.facebook.com/sharer/sharer.php', {
                    u: dataParent.url
                });
                break;
            case 'google':
                popup('https://plus.google.com/share', {
                    url: dataParent.url
                });
                break;
            case 'email':
                popup('mailto:', {
                    subject: dataParent.title + ' | jorgerobledo.co',
                    body: 'Recomiendo esto que encontré en la página de Jorge Robledo ' + dataParent.url
                });
                break;
            case 'whatsapp':
                popup('whatsapp://send', {
                    text: dataParent.title + ' | vía @JERobledo ' + dataParent.url,
                });
                break;
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
  
function popup(url, params, newTab) {
    
    var k, popup, qs, v;
    
    if (params == null)
        params = {};
        
    popup = {
        width: 600,
        height: 350
    };
    
    popup.top = (screen.height / 2) - (popup.height / 2);
    popup.left = (screen.width / 2) - (popup.width / 2);
    
    qs = ((function() {
        
        var _results;
        _results = [];
        for (k in params) {
            
            v = params[k];
            _results.push("" + k + "=" + (encodeURIComponent(v)));
        }
        return _results;
    }).call(this)).join('&');
    
    if (qs)
        qs = "?" + qs;
    
    return window.open(url + qs, 'targetWindow', newTab ? '' : "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + popup.left + ",top=" + popup.top + ",width=" + popup.width + ",height=" + popup.height);
}