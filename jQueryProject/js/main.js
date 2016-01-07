

var onSubmit = function() {
    store.add(getFormData()).then(function(){
        drawTable(store);
    });

    return false;
};


var getFormData = function() {
    var data = {
        city: $('#city').val(),
        stars: $('#stars').val(),
        visited: $('.visited').val()
    };
    return data;
};

var drawTable = function(store) {
    store.getAll().then(function(data) {
        var $tabel = $('table tbody');
        $tabel.empty();
        $.each(data, function(){
            var tr = $('tr');
            var template = tmpl("tpl", this);
            $tabel.append(template);
        });
        attachEvents();
    });
};

$(document).ready(function(){
    drawTable(store);
    $('form').submit(onSubmit);
});

var attachEvents = function(){
    $('.delete').on('click', function(){
        var id = $(this).closest('tr').data('id');
        store.delete(id).then(function(){
            drawTable(store);
        });

        return false;
    });
};