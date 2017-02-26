$(function () {

    $(window).scroll(function() {

        if ($(this).scrollTop() > 1) {
            
            $('header').addClass("sticky");
            $('#header-img').slideDown('slow');
        }
        else {
            $('header').removeClass("sticky");
            $('#header-img').slideUp('slow');
        }
    });

    $('#colombia').mapster('unbind').mapster({
        clickNavigate: true,
            render_highlight: {
            altImageOpacity: 1,
            fillOpacity: 1,
            fillColor: 'ffffff',
            altImage: 'img/map-highlight.png',
            fadeDuration: 100
        },
            mapKey: 'data-key',
            areas: [
        {
            key: 'north',
            isSelectable: false
        },
        {
            key: 'center',
            isSelectable: false
        },
        {
            key: 'south',
            isSelectable: false
        }]
    });
})