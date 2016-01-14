var store = (function () {
    var entryURL = "http://server.godev.ro:8080/api/ionut/entries";

    var defaults = {
        type: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var getErrorHandler = function(reject) {
        return function(xhr) {
            if(xhr.status == "409"){
                reject(xhr.responseJSON.error);
            }else{
                reject("Unknown error occurring!!");
            }
        };
    };

    return {
        getAll: function (page, sortField, sortDir) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '?page=' + page + '&sortField=' + sortField + '&sortDir=' + sortDir, defaults).done(function (data) {
                    resolve(data);
                }).error(getErrorHandler(reject));
            });
        },
        get: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '/' + id, defaults).done(function (data) {
                    resolve(data);
                }).error(getErrorHandler(reject));
            });
        },
        add: function (item) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL, $.extend({}, defaults, {
                    type: 'POST',
                    data: JSON.stringify(item)
                })).done(function () {
                    $.ajax(entryURL).done(function () {
                        resolve(item);
                    })
                }).error(getErrorHandler(reject));
            });
        },
        update: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '/' + id, $.extend({}, defaults, {
                    type: 'PUT',
                    data: JSON.stringify(updateData)
                })).done(function (data) {
                        resolve(data);
                }
                ).error(getErrorHandler(reject));
            });
        },
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '/' + id, $.extend({}, defaults, {
                    type: 'DELETE'
                })).done(function () {
                    resolve();
                }).error(getErrorHandler(reject));
            });
        }
    };
})();
