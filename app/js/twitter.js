$(function () {
    
    $('#share-twitter').click(function (e) {
        
        e.preventDefault();

        showLoading();

        var oauth_token = localStorage.getItem("twitter_oauth_token");
        var oauth_token_secret = localStorage.getItem("twitter_oauth_token_secret");
        
        if (oauth_token && oauth_token_secret) {
            
            cb.setToken(oauth_token, oauth_token_secret);
                
            twitt();
        } 
        else
            oauth_requestToken();
    });
});
    
function twitter_oauth_accessToken(oauth_verifier) {
    
    cb.setToken(localStorage.getItem("twitter_oauth_token"), localStorage.getItem("twitter_oauth_token_secret"));

    cb.__call(
        "oauth_accessToken",
        {
            oauth_verifier: oauth_verifier
        },
        function (reply, rate, err) {
            
            hideLoading();
            
            if (err) {
                console.log("error response or timeout exceeded" + err.error);
            }
            if (reply) {
                cb.setToken(reply.oauth_token, reply.oauth_token_secret);
            }
            
            twitt();
        }
    );
}

function twitt() {
    
    showLoading();

    var params = {};

    var m = location.href.indexOf('memes.html') > 0;
    
    params = { 
        "media": m ? canvas.toDataURL("image/png").replace('data:image/png;base64,', '') : ''
    };
    
    cb.__call(
        "media_upload",
        params,
        function (reply, rate, err) {

            if (validateReply(reply)) {
    
                cb.__call(
                    "statuses_update",
                    { 
                        "media_ids": m ? reply.media_id_string : '',
                        "status": hashtag + ' ' + $('#meme-text').val() + ' http://jorgerobledo.co/'
                    },
                    function (reply, rate, err) {
                        
                        if (validateReply(reply)) {

                            alert("Tu trino se ha enviado exitosamente");
            
                            ga('send', 'event', m !== undefined ? 'meme' : 'tweet', 'click', 'twitter', {'nonInteraction': 1, 'page': m !== undefined ? '/memes.html' : '/'});  
                            console.log('Event sent: share twitter'); 
                        }
                    }
                );
            }
        }
    );
}

function validateReply(reply) {
    
    hideLoading();
                        
    console.log(reply);
    
    if (reply.errors) {
                    
        if (reply.errors[0].code == 186)
            alert("Twitter dice: El estado tiene más de 140 caracteres");
        else if (reply.errors[0].code == 187)
            alert("Twitter dice: El estado es dumplicado");
        else if (reply.errors[0].code == 89)
            oauth_requestToken();
        else
            alert("Twitter dice: Error inesperado");
    
        return false;
    }
    
    return true;
}


    
function oauth_requestToken() {  
                        
    showLoading();
    
    cb.__call(
        "oauth_requestToken", {
        oauth_callback: "http://jorgerobledo.co/twitter.html"
    },
    function (reply, rate, err) {
        
        if (err) {
            console.log("error response or timeout exceeded" + err.error);
        }
        
        if (reply) {
            
            console.log("reply", reply)
            // stores it
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            // save the token for the redirect (after user authorizes)
            // we'll want to compare these values 
            localStorage.setItem("twitter_oauth_token", reply.oauth_token);
            localStorage.setItem("twitter_oauth_token_secret", reply.oauth_token_secret);

            // gets the authorize screen URL
            cb.__call(
            "oauth_authorize", {},
            function (auth_url) {
                
                popup(auth_url);
            });
        }
    });
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