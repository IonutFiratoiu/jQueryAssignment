var editRow = null;
var onSubmit = function () {
    if (editRow) {
        store.update(editRow.id, getFormData()).then(
            function () {
                $('.form').removeClass("editing");
                drawTable(store);
                formReset();
            },
            function (data) {
                alert(data.fail);
            }
        );
    } else {
        store.add(getFormData()).then(
            function () {
                drawTable(store);
                formReset();
            },
            function (data) {
                alert(data.fail);
            }
        );
    };

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
            showPage();
            attachEvents();
        },
        function (data) {
            alert(data.fail);
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
            store.delete(id).then(
                function () {
                    drawTable(store);
                });

            return false;
        });
    $('.edit').on('click', function () {
        $('.form').addClass("editing");
        var $this = $(this).closest('tr').children();
        var id = $(this).closest('tr').data('id');
        store.get(id).then(
            function (data) {
                editRow = data;
                $('#name').val($this[0].innerText);
                $('#stars').val(parseInt($this[1].innerText)).change();
                if ($this[2].innerText == 1) {
                    $('.visited').prop('checked', true);
                } else {
                    $('.visited').prop('checked', false);
                }
                ;
            })
    });
    $('.cancel').on('click', function () {
        formReset();

        return false;
    });
    $('.forward').on('click', function () {
        var pageUrl = 'http://server.godev.ro:8080/api/ionut/entries' + '?page=' + $('.current-page').text();
        store.getAll(pageUrl);
        console.log(pageUrl);
        $('.forward a').attr('href', pageUrl);

        return false;
    });

};

var showPage = function() {
    store.getPage().then(
        function(data) {
            $('.current-page').text(data);
        }
    );
};

var formReset = function () {
    $('#name').val("");
    $('#stars').val("").change();
    $('.visited').prop('checked', false);
};

$(document).ready(function () {
    drawTable(store);
    $('#stars').stars();
    $('form').submit(onSubmit);
});
