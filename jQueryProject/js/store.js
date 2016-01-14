var store = (function () {
    var entryURL = "http://server.godev.ro:8080/api/ionut";

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

    return {
        getAll: function (page, sortField, sortDir) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '?page=' + page + '&sortField=' + sortField + '&sortDir=' + sortDir, getSettings).done(function (data) {
                    resolve(data);
                }).fail(function (xhr) {
                    if(xhr.status == "409"){
                        reject(responseJson.error);
                    }else{
                        reject("Unknown error occurring!!");
                    };
                });
            });
        },
        get: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '/' + id, getSettings).done(function (data) {
                    resolve(data);
                }).fail(function (xhr) {
                    if(xhr.status == "409"){
                        reject(responseJson.error);
                    }else{
                        reject("Unknown error occurring!!");
                    };
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
                }).done(function () {
                    $.ajax(entryURL).done(function (data) {
                        resolve(data);
                    })
                }).fail(function (xhr) {
                    if(xhr.status == "409"){
                        reject(responseJson.error);
                    }else{
                        reject("Unknown error occurring!!");
                    };
                });
            });
        },
        update: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '/' + id, {
                    type: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(updateData)
                }).done(function (data) {
                    data[id] = updateData;
                    resolve(data[id]);
                }
                ).failfunction (xhr) {
                    if(xhr.status == "409"){
                        reject(responseJson.error);
                    }else{
                        reject("Unknown error occurring!!");
                    };
                });
            });
        },
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '/' + id, deleteSettings).done(function (data) {
                    resolve();
                }).fail(function (xhr) {
                    if(xhr.status == "409"){
                        reject(responseJson.error);
                    }else{
                        reject("Unknown error occurring!!");
                    };
                });
            });
        }
    };
})();
