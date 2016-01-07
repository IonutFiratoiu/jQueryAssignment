var store = (function () {
    // private
    var data = [
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
    ];

    //public
    return {
        getAll: function () {
            return new Promise(function (resolve, reject) {
                resolve(data);
            });
        },
        add: function (item) {
            return new Promise(function (resolve, reject) {
                item.id = 3;
                data.push(item);
                resolve(data);
            });
        },
        update: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                $.each(data, function (index) {
                    if (this.id == id) {
                        data[index] = updateData;
                        resolve(data);
                    }
                });
            });
        },
        delete: function (id) {
            return new Promise(function (resolve, reject) {
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
