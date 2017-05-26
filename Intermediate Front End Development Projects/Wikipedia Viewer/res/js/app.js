(function () {
    // init vars
    var arrResult = [];
    var url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=';
    var html = '';

    // structure for the data
    function result(title, snippet) {
        this.title = title;
        this.snippet = snippet;
    }

    // get data from wikipedia
    function getData() {
        $.ajax({
            url: url + $('#search').val(),
            dataType: 'jsonp',
            type: 'POST',
            headers: {
                'Api-User-Agent': 'Example/1.0'
            },
            success: function (data) {
                setData(data);
            },
            error: function () {
                alert('something wrong happend, try agein!');
            }
        });
    };

    // set result to html
    function setData(data) {
        $('.list').empty();
        arrResult.length = 0;
        var dataArr = data.query.search;

        for (var res in dataArr) {
            arrResult.push(new result(dataArr[res].title, dataArr[res].snippet));
            html = '<a href="https://en.wikipedia.org/wiki/' + dataArr[res].title + '"target="_blank"><li><h1>' + dataArr[res].title + '</h1><p>' + dataArr[res
            ].snippet + '</p></li ></a> ';
            $('.list').append(html);
        }
    }

    // start search with each key stroke
    $("#search").on("keyup", function () {
        getData();
    });
})();