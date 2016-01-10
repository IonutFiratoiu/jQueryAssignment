var store = (function () {
    // private
    /*var data = [
        {
            city: 'Bucharest',
            visited: 1,
            stars: 4,
            id: 1
        },
        {
            city: 'Amsterdam',
            visited: 0,
            stars: 3,
            id: 2
        }
    ];*/

    var entryURL = "http://server.godev.ro:8080/api/ionut/entries";

    var getSettings = {
        type: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        data: $.map(Object, function(e) { return e.val(); })
    };

    var postSettings = {
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(store)
    };

    //public
    return {
        getAll: function () {
            return new Promise(function (resolve, reject) {
                var get = $.ajax(entryURL, getSettings).done(function(){
                    $.ajax(entryURL).done(function(data){
                        return data;
                    })
                })
                resolve(get);
                console.log(get);
            });
        },
        add: function (item) {
            return new Promise(function (resolve, reject) {
                var post = $.ajax(entryURL, postSettings).done(function(){
                    $.ajax(entryURL).done(function(data){
                        return data;
                    })
                });
                //data.push(item);
                resolve(post);
                console.log(post);
            });
        },
        update: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                var updateRow = $.ajax(entryURL, updateSettings).done(function(){
                    $.ajax(entryURL).done(function(data){
                        return data;
                    })
                });
                $.each(updateRow, function (index) {
                    if (this.id == id) {
                        data[index] = updateData;
                        resolve(updateRow);
                    }
                });
            });
        },
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                var deleteFromTable = $.ajax(entryURL, postSettings).done(function(){
                    $.ajax(entryURL).done(function(data){
                        return data;
                    })
                })
                $.each(data, function (index) {
                    if (this.id == id) {
                        data.splice(index, 1);
                        resolve(data);
                    }
                });
            });
        }
    };
})();
