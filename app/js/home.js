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