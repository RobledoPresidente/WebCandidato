$(function () {    

    $('#hashtag').html(hashtag);

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

        showLoading();

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

    var periscope;

    while (n < x) {

        if (tweets[n].image)
            row.append('<div class="card' + (tweets[n].author.indexOf('https://twitter.com/JERobledo') < 0 ? ' rt' : '') + '"><div class="card-image-header" style="background-image: url(' + tweets[n].image + ')"><div class="card-img-overlay"><div class="user">' + tweets[n].author + '</div><div class="tweet">' + tweets[n].tweet + '</div><p class="timePosted"><a href="' + tweets[n].permalinkURL + '">' + tweets[n].time + '</div></div></div>')
        else {

            var content; 

            if (tweets[n].tweet.indexOf('https://www.periscope.tv/') > 0) {

                var element = $('<div>' + tweets[n].tweet + '</div>');  

                var link = element.find("[rel='nofollow noopener']");

                element.append('<a href="' + link.data('expanded-url') + '"><img src="http://www.robledopresidente.elchapin.co/img/periscope.png" class="img-fluid"></a>');

                link.remove();

                content = element.html();
            }
            else if (tweets[n].tweet.indexOf('youtube.com') > 0 || tweets[n].tweet.indexOf('youtu.be') > 0) {

                var element = $('<div>' + tweets[n].tweet + '</div>');  

                var link = element.find("[rel='nofollow noopener']");

                var vid;

                if (tweets[n].tweet.indexOf('youtube.com'))
                    vid = link.data('expanded-url').replace('https://www.youtube.com/watch?v=', '');
                else
                    vid = link.data('expanded-url').replace('https://youtu.be/', '');

                element.append('<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="http://www.youtube.com/embed/' + vid + '" allowfullscreen=""></iframe></div>');

                link.remove();

                content = element.html();
            }
            else
                content = tweets[n].tweet;

            row.append('<div class="card' + (tweets[n].author.indexOf('https://twitter.com/JERobledo') < 0 ? ' rt' : '') + '"><div class="user">' + tweets[n].author + '</div><div class="tweet">' + content + '</div><p class="timePosted"><a href="' + tweets[n].permalinkURL + '">' + tweets[n].time + '</div></div>');
        }
        n++;
    }

    hideLoading();

    $('#feed .loading').remove();
}