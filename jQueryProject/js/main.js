var editRow = null;
var $loading = $('.loader');
var $table = $('.theTable');
var $tablebody = $('.theTable tbody');
var $starsInput = $('#stars');
var $nameInput = $('#name');
var $visitedInput = $('.visited');
var $theForm = $('.form');
var $giphy = $('.giphy');
var $sortName = $('[data-field]');
var page = 1;
var totalPages = 1;
var perPage;
var fieldSorting = 'name';
var direction = 'asc';

var onSubmit = function () {
    if (editRow) {
        store.update(editRow.id, getFormData()).then(
            function () {
                $theForm.removeClass("editing");

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

var getFormData = function () {
    var data = {
        name: $nameInput.val(),
        stars: parseInt($starsInput.val()),
        visited: $visitedInput.is(':checked') ? 1 : 0
    };
    return data;
};

var drawTable = function (store) {
    store.getAll(page,fieldSorting, direction).then(
        function (data) {
            $tablebody.empty();
            $.each(data.list, function () {
                var tr = $('tr');
                var template = tmpl("tpl", this);
                $tablebody.append(template);
            });
            totalPages = data.totalPages;
            perPage = data.perPage;
            $('.current-page').text(page);
            $('.total-pages').text(totalPages);
        },
        handleErrors
    );
};

var deleteOnClick = function () {
    var id = $(this).closest('tr').data('id');
    store.delete(id).then(
        function () {
            drawTable(store);
        },
        handleErrors
    );

    return false;
};

var editOnClick = function () {
    $theForm.addClass("editing");
    var id = $(this).closest('tr').data('id');
    store.get(id).then(
        function (data) {
            editRow = data;
            $nameInput.val(data.name);
            $starsInput.val(data.stars).change();
            $visitedInput.prop('checked', data.visited == 1);
        },
        handleErrors
    )
};

var cancelOnClick = function () {
    formReset();

    return false;
};

var attachEvents = function () {
        $table.on('click', '.delete', deleteOnClick);
        $table.on('click', '.edit', editOnClick);
        $('.cancel').on('click', cancelOnClick);
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
    $table.on('click', 'th', function () {
        var $allUpSigns = $('.up');
        var $allDownSigns = $('.down');
        var $dataField = $(this).data('field');
        var $dataDirection = $(this).data('direction');
        var $upSign = $(this).children('.up');
        var $downSign = $(this).children('.down');
        $.each($allUpSigns, function () {
            $(this).removeAttr('hidden');
        });

        $.each($allDownSigns, function () {
            $(this).removeAttr('hidden');
        });
        $.each($(this).siblings('[data-field]'), function () {
            $(this).attr('data-direction', 'asc');
            $upSign.removeAttr('hidden');
            $downSign.removeAttr('hidden');
        });
        fieldSorting = $dataField;
        direction = $dataDirection;
        console.log($dataDirection)

        drawTable(store);

        if ($dataDirection == 'asc') {
            $(this).attr('data-direction', 'desc');
            $upSign.attr('hidden', true);
            $downSign.removeAttr('hidden');
        }else {
            $(this).attr('data-direction', 'desc');
            $upSign.removeAttr('hidden');
            $downSign.attr('hidden', true);
        };

        return false;
    });
};

var getGiphyForRowName = function() {
    $tablebody.on('click', '.city-name', function() {
        var $this = $(this).text();

        giphy.getGiphy($this).then(
            function(url) {
                $giphy.removeAttr('hidden');
                $('.giphy-place img').attr('src', url);
            }
        );

        return false;
    });
    $('.close-giphy').on('click', function () {
        $giphy.attr('hidden', true);

        return false;
    });
};

var formReset = function () {
    $nameInput.val("");
    $starsInput.val("").change();
    $visitedInput.prop('checked', false);
    editRow = null;
};

var loadingAjax = function () {
    $(document).ajaxStart(function(){
        $loading.show();
    })
        .ajaxStop(function() {
            $loading.hide();
        })
};

var handleErrors = function (){
    console.log('aa');
    /*alert (fail());*/
};

$(document).ready(function () {
    drawTable(store);
    $starsInput.stars();
    $theForm.submit(onSubmit);
    attachEvents();
    pageNumber();
    sort();
    getGiphyForRowName();
    loadingAjax();
});