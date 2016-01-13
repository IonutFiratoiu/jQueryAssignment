var store = (function () {
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
        getAll: function (page, sortField, sortDir) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '?page=' + page + '&sortField=' + sortField + '&sortDir=' + sortDir, getSettings).done(function (data) {
                    resolve(data);
                }).fail(reject);
            });
        },
        get: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '/' + id, getSettings).done(function (data) {
                    resolve(data);
                }).fail(reject);
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
                }).fail(reject);
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
                ).fail(reject);
            });
        },
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(entryURL + '/' + id, deleteSettings).done(function (data) {
                    resolve();
                }).fail(reject);
            });
        }
    };
})();
