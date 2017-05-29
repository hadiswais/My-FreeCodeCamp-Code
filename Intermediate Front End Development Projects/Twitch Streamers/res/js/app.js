(function () {
    // array of streamers
    var streamers = ['freecodecamp', 'monstercat', 'ESL_SC2', 'storbeck', 'brunofin', 'comster404'];

    // get the data from api    
    function getData() {
        // looping over the streamers and get the data
        streamers.forEach(function (streamer) {

            // get stream info
            $.ajax({
                url: 'https://wind-bow.gomix.me/twitch-api/streams/' + streamer,
                dataType: 'jsonp',
                success: function (data) {
                    var game, status, img, name, description, url, html;

                    //check if the channel is offline 
                    if (data.stream === null) {
                        status = 'offline'
                        game = 'offiline';
                        description = '';
                        name = streamer;
                        img = 'https://www.oliver-twist.dk/us/wp-content/uploads/sites/6/2016/01/icon_person_by_ninjavdesign-d8x96sl.png';
                    }

                    // otherwise its online
                    else {
                        game = data.stream.game;
                        status = "online";
                        name = data.stream.channel.display_name;
                        description = ' - ' + data.stream.channel.status;
                        img = data.stream.channel.logo;
                    }

                    //get channel info 
                    $.ajax({
                        url: 'https://wind-bow.gomix.me/twitch-api/channels/' + streamer,
                        dataType: 'jsonp',
                        success: function (data) {

                            url = data.url;

                            // check if the url is exist 
                            if (url) {

                                // set logo if the channel is exist but offline
                                if (data.logo !== null)
                                    img = data.logo;

                                // set the result to html
                                html = '<div class="row ' + status + '"><div class="col-sm-1" id="icon"><img src="' + img + '" class="img"></div><div class="col-sm-3" id="name"><a href="' + url + '" target="_blank">' + name + '</a></div><div class="col-sm-8" id="streaming">' + game + '<span>' + description + '</span></div></div>';
                                $("#result").append(html);
                            }

                            // otherwise the channel is not avilable or closed
                            else {
                                html = '<div class="row ' + status + '"><div class="col-sm-1" id="icon"><img src="' + img + '" class="img"></div><div class="col-sm-3" id="name"><a href="' + url + '" target="_blank">' + streamer + '</a></div><div class="col-sm-8" id="streaming">' + "N/A";
                                $("#result").append(html);
                            }
                        },
                    })
                },
            })
        })
    }

    // when the page is ready call getData()    
    $(document).ready(function () {
        getData();
    });
})()