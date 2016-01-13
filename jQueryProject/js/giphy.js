var giphy = (function () {
    var giphyURL = "http://api.giphy.com/v1/gifs/search?q=";
    var giphyURL2 = "&api_key=dc6zaTOxFJmzC";

    var giphySettings = {
        type: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return {
        getGiphy: function (q) {
            return new Promise(function (resolve, reject) {
                $.ajax(giphyURL + q + giphyURL2, giphySettings).done(function (data) {
                    if(data.data[0] != null) {
                        resolve(data.data[0].images.downsized.url);
                    }else{
                        resolve('https://media.giphy.com/media/LGVQJ4cQGPs8o/giphy.gif');
                    };
                }).fail(reject);
            });
        }
    };
})();