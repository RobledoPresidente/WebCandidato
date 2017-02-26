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

    var mapster = function () {

        //$('#colombia').mapster('resize');

        //$('#colombia-container').append('<img id="colombia" src="img/map.png" alt="" usemap="#colombia-regions" class="img-fluid">');

        $('#colombia').mapster({
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
                }
            ]
        });
    }

    mapster();

    var doit;

    $(window).resize(function() {
        
        //TODO

        clearTimeout(doit);

        doit = setTimeout(function () {

            console.log('resize')

            $('#mapster_wrap_0').css('width', '')

            $('#colombia').mapster('resize', $('#mapster_wrap_0').width());
        }, 200);
    });
})