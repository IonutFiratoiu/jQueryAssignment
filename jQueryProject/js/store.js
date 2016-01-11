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
        }
    };

    var deleteSettings = {
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //public
    return {
        getAll: function () {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL, getSettings).done(function(data){
                    resolve(data.list);
                });
            });
        },
        get: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '/' + id, getSettings).done(function(data){
                    resolve(data.list);
                });
            });
        },
        add: function (item) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL, {
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(item)
                }).done(function(){
                    $.ajax(entryURL).done(function(data){
                        //data.push(item);
                        resolve(data);
                    })
                }).error(function(xhr){
                    reject(xhr.responseJSON);
                });
            });
        },
        update: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                var updateRow = $.ajax(entryURL, updateSettings).done(function(){
                    $.ajax(entryURL).done(function(data){
                        $.each(updateRow, function (index) {
                            if (this.id == id) {
                                data[index] = updateData;
                                resolve(updateRow);
                            }
                        });
                    })
                });
            });
        },
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '/' + id, deleteSettings).done(function(data){
                    resolve();
                })
            });
        }
    };
})();
