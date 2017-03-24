function alignFloatForm() {
    if (!$("body").hasClass("ipad")) {
       var offset_top_val = $(".item-photo-prev").height(),
       offset_bottom_val = $(".breadcrumbs-section").height() + $(".more-properties").height() + $("footer").height() + 150 + ($(".similar:not(:empty)").length === 1 ? 485 : 0);
        $(".float-form:not(.ipad)").affix({
            offset: {
                top: offset_top_val,
                bottom: offset_bottom_val
            }
        });
    }
}

function sendTranslateForm() {
    if ($('#translatePageForm').valid()) {
        $("#translatePageModal .btn-send").prop('disabled', true);
        $("#translatePageModal .button-ajax-loading").removeClass('hidden');
        $('#translatePageForm').submit();
    }
}

function shareAdvertOnSuccess(data) {
    if (data == "True") {
        $("#sharePageModal .modal-send").hide();
        $("#sharePageModal .modal-success").removeClass('hidden');
    } else {
        $("#sharePageForm").html(data);
        $.validator.unobtrusive.parse($("#sharePageForm"));
    }
}

function sendShareForm() {
    if ($('#sharePageForm').valid()) {
        $("#sharePageForm .btn-send").prop('disabled', true);
        $("#sharePageForm .button-ajax-loading").removeClass('hidden');
        $('#sharePageForm').submit();
    }
}

function open_window(url, wWidth, wHeight) {
    open(url, 'new_window', 'toolbar=no,location=0,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no, copyhistory=0,width=' + wWidth + ',height=' + wHeight);
}

function renderConverter(elementToWrite, amount, currencyFrom, currencyTo) {
    elementToWrite.append('<iframe src="/converter_form.htm?' + amount + ':' + currencyFrom + ':' + currencyTo + '" width="260" height="70" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" style="border: 3px solid #015D1D; position:relative; top:3px; text-align:center; background-color:#FFFFFF;"></iframe></center></div>');
}