var editRow = null;
var loading = $('.loader');
var $table = $('table');

var page = 1;
var totalPages = 1;
var fieldSorting = 'name';
var direction = 'asc';

var onSubmit = function () {
    if (editRow) {
        store.update(editRow.id, getFormData()).then(
            function () {
                $('.form').removeClass("editing");
                drawTable(store);
                formReset();
            },
            handleErrors
        );
    } else {
        store.add(getFormData()).then(
            function () {
                drawTable(store);
                formReset();
            },
            handleErrors
        );
    }

    ;
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
    store.getAll(page,fieldSorting, direction).then(
        function (data) {
            var $tabel = $('table tbody');
            $tabel.empty();
            $.each(data.list, function () {
                var tr = $('tr');
                var template = tmpl("tpl", this);
                $tabel.append(template);
            });
            totalPages = data.totalPages;
            $('.current-page').text(page);
            $('.total-pages').text(totalPages);
        },
        handleErrors
    );
};

var attachEvents = function () {
        $table.on('click', '.delete', function () {
            var id = $(this).closest('tr').data('id');
            store.delete(id).then(
                function () {
                    drawTable(store);
                },
                handleErrors
            );

            return false;
        });
        $table.on('click', '.edit', function () {
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
                },
                handleErrors
            )
        });
        $('.cancel').on('click', function () {
            formReset();

            return false;
        });
    }
;

var pageNumber = function () {
    $('.forward').on('click', function () {
        if (page < totalPages) {
            page++;
            drawTable(store);

            return false;
        }
    });
    $('.back').on('click', function () {
        if (page > 1) {
            page--;
            drawTable(store);

            return false;
        }
    });
};

var sort = function () {
    $('.ascendant').on('click', function () {
        var fieldName = $(this).closest('span');
        direction = 'asc';
        if(fieldName.hasClass('sort-city')){
            fieldSorting = 'name';
        }else{
            if (fieldName.hasClass('sort-stars')){
                fieldSorting = 'stars';
            }else{
                fieldSorting = 'visited'
            }
        };
        drawTable(store);

        return false;
    });
    $('.descendant').on('click', function () {
        var fieldName = $(this).closest('span');
        direction = 'desc';
        if(fieldName.hasClass('sort-city')){
            fieldSorting = 'name';
        }else{
            if (fieldName.hasClass('sort-stars')){
                fieldSorting = 'stars';
            }else{
                fieldSorting = 'visited'
            }
        };
        drawTable(store);

        return false;
    });
};

var searchRowByName = function() {
    var placeGiphy = $('.giphy-place');
    $('tbody').on('click', '.city-name', function() {
        var $this = $(this).text();
        giphy.getGiphy($this).then(
            function(url) {
                $('.giphy').removeAttr('hidden');
                $('.giphy-place img').attr('src', url);
            }
        );

        return false;
    })
    $('.close-giphy').on('click', function () {
        $('.giphy').attr('hidden', true);

        return false;
    });
};

var formReset = function () {
    $('#name').val("");
    $('#stars').val("").change();
    $('.visited').prop('checked', false);
    editRow = null;
};

var loadingAjax = function () {
    $(document).ajaxStart(function(){
        loading.show();
    })
        .ajaxStop(function() {
            loading.hide();
        })
};

var handleErrors = function (xhr) {
    if(xhr.status == "409"){
        alert(responseJson.error);
    }else{
        alert("Unknown error occurring!!");
    };
};

$(document).ready(function () {
    drawTable(store);
    $('#stars').stars();
    $('form').submit(onSubmit);
    attachEvents();
    pageNumber();
    sort();
    searchRowByName();
    loadingAjax();
});
