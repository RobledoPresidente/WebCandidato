$(function () {    

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

    //Twitter
    var nTweets = 6;

    var twitter = function () {

        $('#feed').append('<h4 class="text-center p-3 loading">Cargando...</h4>');

        var configProfile = {
            "profile": {"screenName": 'JERobledo'},
            "domId": '',
            "maxTweets": nTweets,
            "enableLinks": true, 
            "showUser": true,
            "showTime": true,
            "showImages": true,
            "customCallback": handleTweets,
            "showInteraction": false,
            "dataOnly": true,
            "lang": 'es'
        };
        twitterFetcher.fetch(configProfile);
    }

    twitter();

    $('#feed .more').click(function () {
        
        $('#feed > .card-columns').empty();

        nTweets =  nTweets + 6;

        twitter();
    })

    $('#scratchcard').wScratchPad({
        size: $(window).width() / 30,
        bg: 'img/especial-odebrecht.png',
        fg: 'img/especial-raspe.png',
        'cursor': 'url("./img/coin.png") 5 5, default',
        scratchMove: function (e, percent) {

            if (percent > 95) {

                $('#scratchcard').addClass('done');

                location.href = 'http://jorgerobledo.com/el-puente-esta-quebrado-por-que-porque-se-lo-robaron/';
            }
        }
    });

    $('#meme').click(function () {

        location.href = 'memes.html#' + $('#meme-text').val();
    });
})

function handleTweets(tweets) {

    var x = tweets.length;
    var n = 0;

    var row = $('#feed > .card-columns');

    while (n < x) {

        if (tweets[n].image)
            row.append('<div class="card' + (tweets[n].author.indexOf('https://twitter.com/JERobledo') < 0 ? ' rt' : '') + '"><div class="card-image-header" style="background-image: url(' + tweets[n].image + ')"><div class="card-img-overlay"><div class="user">' + tweets[n].author + '</div><div class="tweet">' + tweets[n].tweet + '</div><p class="timePosted"><a href="' + tweets[n].permalinkURL + '">' + tweets[n].time + '</div></div></div>')
        else
        row.append('<div class="card' + (tweets[n].author.indexOf('https://twitter.com/JERobledo') < 0 ? ' rt' : '') + '"><div class="user">' + tweets[n].author + '</div><div class="tweet">' + tweets[n].tweet + '</div><p class="timePosted"><a href="' + tweets[n].permalinkURL + '">' + tweets[n].time + '</div></div>');
      n++;
    }

    $('#feed .loading').remove();
}