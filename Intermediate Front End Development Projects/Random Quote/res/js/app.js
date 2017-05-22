/* init ids var */
var text = $('#text');
var author = $('#author');
var tweet = $('#tweet');
var btnMore = $('#more');

/* API url from forismatic */
var url = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';

/* array of bgcolors */
var colors = ['#DC4C46', '#672E3B', '#223A5E', '#4F84C4', '#D2691E', '#EDCDC2', '#CE3175', '#AF9483', "#79C753", "#BC243C"];

/*  get data from api*/
var getData = function (data) {
    text.text(data.quoteText);
    var currquote = 'https://twitter.com/intent/tweet?text=' + data.quoteText + ' --' + data.quoteAuthor;
    if (data.quoteAuthor === '')
        author.text("Unknown");
    else
        author.text(data.quoteAuthor);

    tweet.attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + data.quoteText + '-- ' + data.quoteAuthor));
};

/*  generate new quote when page is loaded */
$(document).ready(function () {
    newQuote();
});

/*  generate new quote when button is clicked */
btnMore.click(newQuote);

/* get new quote, change bgcolor and animate qoute change */
function newQuote() {
    setTimeout($.getJSON(url, getData, 'jsonp'), 200);
    var color = Math.floor(Math.random() * colors.length);
    $('#text, #author').animate({
        opacity: 0
    }, 300,
        function () {
            $(this).animate({
                opacity: 1
            }, 300);
        });
    $("body").animate({
        backgroundColor: colors[color]
    }, 1000);
}