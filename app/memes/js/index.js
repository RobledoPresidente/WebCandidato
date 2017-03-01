var memeSize = 300;

var canvas = document.getElementById('memecanvas');
ctx = canvas.getContext('2d');

// Set the text style to that to which we are accustomed
canvas.width = memeSize;
canvas.height = memeSize;

//  Grab the nodes
var bottomText = document.getElementById('meme-text');

var update = function () {

    var img = new Image();
    img.onload = function () {
        
        drawMeme(img)
    };
    img.src = $('.selected').data('id');
}

bottomText.addEventListener('keydown', update)
bottomText.addEventListener('keyup', update)
bottomText.addEventListener('change', update)

function drawMeme(img) {

    var bottomText = $('#meme-text').val();
    
    if (!bottomText)
        bottomText = ' ';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0, memeSize, memeSize);

    ctx.lineWidth = 4;
    ctx.font = '19pt sans-serif';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    x = memeSize / 2;
    y = 10;

    wrapText(ctx, hashtag, x, y, 300, 28, false);

    ctx.font = '15pt sans-serif';

    ctx.textBaseline = 'bottom';
    var text2 = document.getElementById('meme-text').value;
    text2 = text2.toUpperCase();
    y = memeSize;

    wrapText(ctx, text2, x, y, 300, 28, true);
}

function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {

    var pushMethod = (fromBottom) ? 'unshift' : 'push';

    lineHeight = (fromBottom) ? -lineHeight : lineHeight;

    var lines = [];
    var y = y;
    var line = '';
    var words = text.split(' ');

    for (var n = 0; n < words.length; n++) {
        var testLine = line + ' ' + words[n];
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth) {
            lines[pushMethod](line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines[pushMethod](line);

    for (var k in lines) {
        context.strokeText(lines[k], x, y + lineHeight * k);
        context.fillText(lines[k], x, y + lineHeight * k);
    }
}

function downloadCanvas(link, canvasId, filename) {

    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

document.getElementById('download').addEventListener('click', function () {

    downloadCanvas(this, 'memecanvas', 'meme.png');
}, false);

$(function() {   

    if (!$('#meme-text').val())
        $('#meme-text').val(location.hash.replace('#', ''));        

    update();

    $('.opciones > div > img').click(function () {  

        $('.opciones > div > img').removeClass('selected');   

        $(this).addClass('selected');  

        var img = new Image();

        img.onload = function () {

            drawMeme(img)
        };
        img.src = $(this).data('id');
    });
});