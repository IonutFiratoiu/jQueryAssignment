var editRow = null;
var loading = $('.loader');
var $table = $('table');
var starsInput = $('#stars');
var nameInput = $('#name');
var visitedInput = $('.visited');
var theForm = $('.form');
var page = 1;
var totalPages = 1;
var perPage;
var fieldSorting = 'name';
var direction = 'asc';

var onSubmit = function () {
    if (editRow) {
        store.update(editRow.id, getFormData()).then(
            function () {
                theForm.removeClass("editing");
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

    return false;
};

/*var createStarsInTable = function () {
    var starsInTable = [];
    console.log(parseInt(starsInput.val()));
    for (var i = 1; i <= parseInt(starsInput.val()); i++) {
        starsInTable.join('★');
        console.log(parseInt(starsInput.val()));
        console.log('aaaa');
    };
};*/

var getFormData = function () {
    var data = {
        name: nameInput.val(),
        stars: parseInt(starsInput.val()),
        visited: visitedInput.is(':checked') ? 1 : 0
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
            perPage = data.perPage;
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
            theForm.addClass("editing");
            var $this = $(this).closest('tr').children();
            var id = $(this).closest('tr').data('id');
            store.get(id).then(
                function (data) {
                    editRow = data;
                    nameInput.val($this[0].innerText);
                    starsInput.val(parseInt($this[1].innerText)).change();
                    if ($this[2].innerText == 1) {
                        visitedInput.prop('checked', true);
                    } else {
                        visitedInput.prop('checked', false);
                    }
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
        }

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
        }

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

/*var changeTableValueInStars = function () {
    var $row = $('table tbody tr .stars-value');
        for (var i = 0; i < perPage; i++) {
            var $rowValue = $($row[i]).text();
            for (var j = 1; j <= $rowValue; j++) {
                $($row[i]).html('<span>★</span>');
            };
        };
};*/

var formReset = function () {
    nameInput.val("");
    starsInput.val("").change();
    visitedInput.prop('checked', false);
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

var handleErrors = function (){
    alert (fail);
};/*function (xhr) {
    if(xhr.status == "409"){
        alert(responseJson.error);
    }else{
        alert("Unknown error occurring!!");
    };
};*/

$(document).ready(function () {
    drawTable(store);
    starsInput.stars();
    theForm.submit(onSubmit);
    attachEvents();
    pageNumber();
    sort();
    searchRowByName();
    loadingAjax();
});
