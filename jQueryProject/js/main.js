var onSubmit = function () {
    store.add(getFormData()).then(
        function () {
            drawTable(store);
            formReset();
        },
        function (data) {
            alert(data.error);
        }
    );


    return false;
};

var getFormData = function () {
    var data = {
        name: $('#name').val(),
        stars: parseInt($('#stars').val()),
        visited: $('.visited').is(':checked') ? 1 : 0
    };
    return data;
};

var drawTable = function (store) {
    store.getAll().then(
        function (data) {
            var $tabel = $('table tbody');
            $tabel.empty();
            $.each(data, function () {
                var tr = $('tr');
                var template = tmpl("tpl", this);
                $tabel.append(template);
            });
            attachEvents();
        },
        function (data) {
            alert(data.error);
        }
    );
};

var attachEvents = function () {
    $('.delete').confirmDelete({
            message: 'Are you sure?',
            onConfirm: function () {
                alert('yes!');
            },
            onReject: function () {
                alert('no!');
            }
        })
        .on('click', function () {
            var id = $(this).closest('tr').data('id');
            store.delete(id).then(function () {
                drawTable(store);
            });

            return false;
        });
    $('.edit').click('onChange', function () {
        var $this = $(this).closest('tr').children();
        $('#name').val($this[0].innerText);
        $('#stars').val(parseInt($this[1].innerText)).change();
        if ($this[2].innerText == 1) {
            $('.visited').prop('checked', true);
        } else {
            $('.visited').prop('checked', false);
        }
        ;
    });

};

var formReset = function () {
    console.log('aa');
    $('#name').val("")
    $('#stars').val("").change();
    $('.visited').prop('checked', false);
};

$(document).ready(function () {
    drawTable(store);
    $('#stars').stars()
    $('form').submit(onSubmit);
});
