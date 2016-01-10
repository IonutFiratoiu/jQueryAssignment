

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
        visited: $('.visited').prop('checked')
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


var attachEvents = function(){
    $('.delete').confirmDelete({
        message:'Are you sure?',
        onConfirm: function() {
            alert('yes!');
        },
        onReject: function() {
            alert('no!');
        }
    });
    $('.delete').on('click', function(){
        var id = $(this).closest('tr').data('id');

        store.delete(id).then(function(){
            drawTable(store);
        });

        return false;
    });

};

$(function() {
    $('#stars').stars();
});

$(document).ready(function(){
    drawTable(store);
    $('form').submit(onSubmit);
});
