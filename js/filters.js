function getCurrentHistoryStateData() {
    var data = {};
    $('#searchForm input[type=text], #searchForm input[type=hidden], #order, #city, #city_id').each(function (index) {
        data[$(this).attr('id')] = $(this).val();
    });
    $('#searchForm input[type=checkbox]').each(function (index) {
        data[$(this).attr('id')] = $(this).is(":checked");
    });
    return data;
}

function compareTwoHistoryStateData(state1, state2) {
    if (!state1 || ! state2) {
        return false;
    }
    for (p in state1) {
        if (p != 'htmlData' && state1[p] != state2[p]) { return false; }
    }
    return true;
}

function openFilters(scrollToTop) {
    if (document.documentElement.clientWidth < 600) {
         $(".filters-title .ga-icon-budget-arrow").css("display","block");  
    }
    if (scrollToTop !== false && $(window).scrollTop() > 30) {
        $("html, body").animate({ scrollTop: 0 }, 200);
        setTimeout(function() { openFilters(false); }, 250);
        return;
    }
    //$(".show-more-filters").hide();
    $(".more-filters").css("min-height",  ($(window).height() - 570) + "px");
    $(".filters-button-area").hide();
    var morePropertiesMargin = $("#searchForm > input + section").height() + $("#searchAjaxContent").height();
    var footerMargin = morePropertiesMargin + $('header').height() + $("section.more-properties").height() - 20;
    $("body").toggleClass("open-filters");
    $("section.more-properties").css('margin-top', morePropertiesMargin);
    $("footer").css('margin-top', footerMargin);
    $(".more-filters").slideToggle(450);
    setTimeout(function() {
        $(".more-filters-buttons").toggleClass("hidden");
    }, 250);
    setTimeout(function() {
        $("html").toggleClass("opened-filters");
    }, 450);
}

function closeFilters(scrollToTop) {
    if (document.documentElement.clientWidth < 600) {
         $(".filters-title .ga-icon-budget-arrow").css("display","none");  
    }
    if (scrollToTop !== false && $(window).scrollTop() > 30) {
        $("html, body").animate({ scrollTop: 0 }, 200);
        setTimeout(function() { closeFilters(false); }, 250);
        return;
    }
    //$(".show-more-filters").show();
    //$(".filters-button-area").show();
    setTimeout(function() {
        $("body").toggleClass("open-filters");
        $("section.more-properties").css('margin-top', 0);
        $("footer").css('margin-top', 0);
    }, 450);
    $(".more-filters").slideToggle(450);
    $(".more-filters-buttons").toggleClass("hidden");
    $("html").toggleClass("opened-filters");
}

function enableApplyButtonIfChanged() {
    var currentState = getCurrentHistoryStateData();
    if (window.previousState && !compareTwoHistoryStateData(window.previousState, currentState)) {
        $('.btn-apply').prop('disabled', false);
    } else {
        $('.btn-apply').prop('disabled', true);
    }
}

function searchFiltersOnDocumentReady() {
    if (document.documentElement.clientWidth > 600) {
        $('#order').on('change', function () {
            searchFormAjaxSubmit();
        });
    }
    else {
            enableApplyButtonIfChanged();
        }
    

    // Add mask to inputs to have separator
    $(".min").mask("000" + jsModel.NumberSeparator + "000" + jsModel.NumberSeparator + "000", { reverse: true });
    $(".max").mask("000" + jsModel.NumberSeparator + "000" + jsModel.NumberSeparator + "000", { reverse: true });

    // Show/Hide more filters section
    $(".show-more-filters").on("click", function () {
        var isOpened = $("body").hasClass("open-filters");
        if (isOpened && (document.documentElement.clientWidth > 600)) {
            closeFilters();
        } 
        else if (isOpened && (document.documentElement.clientWidth < 600)) {
            $(".filters-button-area").hide();
            $(".more-filters-area").show();     
        }
        else {
            openFilters();  
        }
    });

    $(".filters-content.more-checkbox.filters-properties.row .ga-icon-triangle-down").on("click", function () {
        if (document.documentElement.clientWidth > 600) {
            var parentContainer = $(this).closest(".filters-content.more-checkbox.filters-properties.row");
            var offset = $(this).offset().top - 30;
            if (!parentContainer.hasClass("opened")) {
                parentContainer.addClass("opened", 150);
                $(this).addClass('ga-icon-triangle-up');
                $('html,body').animate({ scrollTop: offset }, 500);
            } else {
                parentContainer.removeClass("opened", 150);
                $(this).removeClass('ga-icon-triangle-up');
            }
        }
        else {
            ;
        }
    });
    $(".component-checkbox-list").on("click", function () {
        var parentContainer = $(this).closest(".filters-content.more-checkbox.filters-properties.row");
        var offset = $(this).offset().top - 30;
        if (!parentContainer.hasClass("opened")) {
            parentContainer.addClass("opened", 150);
            $('html,body').animate({ scrollTop: offset }, 500);
        } else {
            parentContainer.removeClass("opened", 150);
        }
    })

    $(".filters-title-area").on("click", function () {
        var isOpened = $("body").hasClass("open-filters");
        if (isOpened && (document.documentElement.clientWidth > 600)) {
            closeFilters();
            $(this).removeClass('ga-icon-triangle-up');
        } else if ((!isOpened) && (document.documentElement.clientWidth > 600)) {
            $(this).parent().parent().parent().toggleClass("filters-hide");
            $(".more-filters").hide();
            $(".btn-filter").removeClass("btn-filter-close");
            $(".filters-title .ga-icon-triangle-down").toggleClass(" ga-icon-triangle-up");
        }
        else {
            ;
        }
    });
    $(".filters-title .ga-icon-budget-arrow").on("click", function () {
        $(".btn-cancel").trigger("click");
    });
        $(".item-search").on("click", function () {
            var isOpened = $("body").hasClass("open-filters");
            if (isOpened) {
                closeFilters();
            } else {
                openFilters();
                $(".city-block").css("display","block");
                $(".filters-row").css("display","block");     
                $(".filters-button-area").show();
                $(".more-filters-area").hide();
                //$(".btn-filter").removeClass("btn-filter-close");
            }
            /*$(".filters-row").css("display","block");
            $(".city-block").css("display","block");
            $(".more-filters").hide();
            $("#panel-menu").css("animation","mymoveback 1s 1 forwards");
            $('#nav-icon3').removeClass("open");
            $(".btn-filter").removeClass("btn-filter-close");*/
        });
        $(".item-advanced-search").on("click", function () {
            var isOpened = $("body").hasClass("open-filters");
            if (isOpened) {
                closeFilters();
            } else {
                openFilters();
                $(".filters-row").css("display","block");
                $(".city-block").css("display","block");
                $(".more-filters-area").show();
            }
        });


    // I added this because otherwise form submit doesn't work on IE and Edge
    $('input[name],select[name]').each(function () {
        if ($(this).attr('name') != '') {
            if ($(this).closest('div').find('span[data-valmsg-for=' + $(this).attr('name') + ']').length == 0) {
                $(this).closest('div').append('<span class="field-validation-valid error_msg" data-valmsg-for="' + $(this).attr('name') + '" data-valmsg-replace="true"></span>');
            }
        }
    });

    // The same thing here, we do not validate max because it is not possible to submit the form after
    $("#searchForm").data("validator").settings.ignore = ".ignore";

    // Save current state to global variable
    $('#currency').on('change', function () {
        if (($("html.opened-filters").length == 0) && (document.documentElement.clientWidth > 600)) {
            searchFormAjaxSubmit();
        } else {
            enableApplyButtonIfChanged();
        }
    });

    $("#radius, input[type='checkbox']").on('change', function() {
        enableApplyButtonIfChanged();
    });

    $('button.btn-apply').click(function () {
        searchFormAjaxSubmit();
    });

    $('button.btn-cancel').click(function () {

        window.searchFormAjaxDesactivated = true;
        restoreFilterValuesFromState(window.previousState, false);
        $('#city').importTags($('#city').val());
        if(document.documentElement.clientWidth > 600) {
            closeFilters();
            $(".filters-button-area").show();
        }
        else {
            closeFilters(false);
            $(".city-block").css("display","none");
            $(".filters-row").css("display","none");
        }
        window.searchFormAjaxDesactivated = false;

    });

    $(window).on("orientationchange", function () {
        if ($("body").hasClass("open-filters")) {
            window.searchFormAjaxDesactivated = true;
            restoreFilterValuesFromState(window.previousState, false);
            closeFilters();
            $(".city-block").css("display","none");
            $(".filters-row").css("display","none");
            window.searchFormAjaxDesactivated = false;
        }
    });

    $("#city").blur(function () {
        if ($("html.opened-filters").length == 0) {
            // searchFormAjaxSubmit();
        } else {
            enableApplyButtonIfChanged();
        }
    });

    // Initialize all variables
    var filters = $.map([1, 2, 3, 4, 5], function(n) { return $("#filter-" + n); }),
        filtersRangeInit =  $.map([1, 2, 3, 4, 5], function(n) { return document.getElementById('filter-' + n + '-range'); }),
        filtersMax = $.map(filters, function (n) { return n.data("limit-max"); }),
        filtersW1 = $.map(filters, function(n) { return n.is("[data-value-min]:not([data-value-min=''])") ? n.data("value-min") : 0; }),
        filtersW2 = $.map(filters, function (n) { return n.is("[data-value-max]:not([data-value-max=''])") ? n.data("value-max") : n.data("limit-max"); }),
        filtersValueMin = $.map(filters, function (n) { return n.find(".min"); }),
        filtersValueMax = $.map(filters, function (n) { return n.find(".max"); }),
        filtersRealValueMin = $.map(filters, function (n) { return n.find(".hidden-min-value"); }),
        filtersRealValueMax = $.map(filters, function (n) { return n.find(".hidden-max-value"); }),
        filtersRanges = $.map([1, 2, 3, 4, 5], function(n) {
            var values = null;
            switch(n) {
                case 1 :
                    values = jsModel.BudgetValues;
                    break;
                case 2:
                    values = jsModel.SurfaceValues;
                    break;
                case 4:
                    values = jsModel.LandValues;
                    break;
            }
            var result = {};
            result['min'] = 0;
            if (typeof values !== 'undefined' && values !== null) {
                for (var k = 0; k < values.length; k++) {
                    result[Math.round((k + 1) * 100.0 / (values.length + 1)) + "%"] = values[k];
                }
            }
            result['max'] = filtersMax[n - 1];
            return result;
        });

    // Shadow on hover and on focus
    $.each(filtersValueMin.concat($.map(filtersValueMin, function (o) { return o.prev().prev(); })), function () {
        if ($(this).is('input')) {
            $(this).mouseover(function() {
                $(this).addClass("hovered");
                $(this).prev().prev().addClass("hovered");
            });
            $(this).mouseout(function() {
                $(this).removeClass("hovered");
                $(this).prev().prev().removeClass("hovered");
            });
        } else {
            $(this).mouseover(function () {
                $(this).addClass("hovered");
                $(this).next().next().addClass("hovered");
            });
            $(this).mouseout(function () {
                $(this).removeClass("hovered");
                $(this).next().next().removeClass("hovered");
            });
            $(this).on('click', function () {
                if (!$(this).next().next().is(':focus')) {
                    $(this).removeClass("hovered");
                    $(this).next().next().focus();
                }
            });
        }
    });

    // Shadow on hover and on focus
    $.each(filtersValueMax.concat($.map(filtersValueMax, function (o) { return o.prev().prev(); })), function () {
        if ($(this).is('input')) {
            $(this).mouseover(function () {
                $(this).addClass("hovered");
                $(this).prev().prev().addClass("hovered");
            });
            $(this).mouseout(function () {
                $(this).removeClass("hovered");
                $(this).prev().prev().removeClass("hovered");
            });
        } else {
            $(this).mouseover(function () {
                $(this).addClass("hovered");
                $(this).next().next().addClass("hovered");
            });
            $(this).mouseout(function () {
                $(this).removeClass("hovered");
                $(this).next().next().removeClass("hovered");
            });
            $(this).on('click', function () {
                if (!$(this).next().next().is(':focus')) {
                    $(this).removeClass("hovered");
                    $(this).next().next().focus();
                }
            });
        }
    });

    $("input.min, input.max").on('click touch', function () {
        $(this).select();
        this.setSelectionRange(0, 9999);
    });

    // For every filter
    for (var i = 0; i < 5; i++) {
        if (filtersW1[i] < 0) filtersW1[i] = 0;
        if (filtersW1[i] >= filtersMax[i]) filtersW1[i] = filtersMax[i];
        if (filtersW2[i] < 0) filtersW2[i] = 0;
        if (filtersW2[i] >= filtersMax[i]) filtersW2[i] = filtersMax[i];
        if (document.documentElement.clientWidth < 600) {
            filtersValueMin[i].val("Min");
            filtersValueMax[i].val("Max");
            console.log(filtersValueMax[i].val());
        }
        else {
            filtersValueMin[i].val(filtersValueMin[i].masked(filtersW1[i]));
            filtersValueMax[i].val((filtersW2[i] == filtersMax[i] ? "> " : "") + filtersValueMax[i].masked(filtersW2[i]));  
            console.log(filtersValueMax[i].val());
        }
        
        filtersRealValueMin[i].val(filtersW1[i]);
        filtersRealValueMax[i].val((i === 2 || i === 4) && filtersW2[i] == filtersMax[i] ?
            (filtersMax[i] + 1) : filtersW2[i]);
      
        filtersValueMin[i].focus(function () {
            $(this).addClass("focused");
            $(this).prev().prev().addClass("focused");
        });
        filtersValueMin[i].blur(function () {
            $(this).removeClass("focused");
            $(this).prev().prev().removeClass("focused");
            if ($(this).val() == '') $(this).change();
        });
        filtersValueMax[i].focus(function () {
            $(this).val($.trim($(this).val().replace('>', '')));
            $(this).addClass("focused");
            $(this).prev().prev().addClass("focused");
        });
        filtersValueMax[i].blur(function () {
            $(this).removeClass("focused");
            $(this).prev().prev().removeClass("focused");
            if ($(this).val() == '') $(this).change();
        });

        RangeFilterInit.RangeSlider(filtersRangeInit[i], filtersMax[i], filtersW1[i], filtersW2[i],
           filtersValueMin[i], filtersValueMax[i], filtersRealValueMax[i], filtersRealValueMin[i], filtersRanges[i], i);
    };

    // Do not call onPopState on the initialization (sometimes was called on tablets)
    window.isFiltersInit = true;
    window.addEventListener('popstate', onPopState);

    setTimeout(function() {
        window.isFiltersInit = false;
    }, 300);

    if ($.urlParam('advancedSearch')) {
        openFilters(true);
    }
}

/********************* Filter Init Function **********************/

RangeFilterInit = {
    RangeSlider: function (filterRangeInit, filterMax, filterW1, filterW2, filterValueMin, filterValueMax, filterRealValueMax, filterRealValueMin, filtersRange, order) {
        filterW1 = filterW1 == '' ? 0 : filterW1;
        filterW2 = filterW2 == '' ? filterMax : filterW2;
        window.isInit = true;

        noUiSlider.create(filterRangeInit, {
            start: [filterW1, filterW2],
            behaviour: 'tap',
            // don't jump between values for rooms and bedrooms sliders
            snap: (order !== 2 && order !== 4),
            connect: true,
            step: 1,
            direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
            range: filtersRange
        });

        filterRangeInit.noUiSlider.on('start', function () {
            window.isInit = false;
        });

        filterRangeInit.noUiSlider.on('update', function (values, handle) {
            var value = values[handle];
            if (window.fromInputField === true || window.isInit === true) {
                if (window.fromInputField === true) {
                    setTimeout(function () {
                        window.fromInputField = false;
                    }, 100);
                }
            } else {
                if (handle) {
                    // Max Value
                    filterValueMax.value = filterValueMax.masked(Math.round(value));
                    filterValueMax.val((filterMax === Math.round(value) ? '> ' : '') + filterValueMax.masked(Math.round(value)));
                    filterRealValueMax.val(filterMax === Math.round(value) && (order === 2 || order === 4) ? Math.round(value) + 1 : Math.round(value));
                } else {
                    // Min Value
                    filterValueMin.value = filterValueMin.masked(Math.round(value));
                    filterValueMin.val(filterValueMin.masked(Math.round(value)));
                    filterRealValueMin.val(Math.round(value));
                }
            } 
        });

        if (!window.oldValues) window.oldValues = {};
        window.oldValues[order] = [filterW1, filterW2];
        filterRangeInit.noUiSlider.on('change', function (values, handle) {
            window.isInit = false;
            var value = values[handle];
            if (handle && value == 0) {
                // Max Value
                filterRangeInit.noUiSlider.set([null, filterMax + 1]);
            }
            if (window.is_submitting !== true && (Math.round(window.oldValues[order][0]) != values[0] || Math.round(window.oldValues[order][1]) != values[1])) {
                if (($("html.opened-filters").length == 0) && (document.documentElement.clientWidth > 600)) {
                    window.isSubmitting = true;
                    searchFormAjaxSubmit();
                    setTimeout(function() {
                        window.isSubmitting = false;
                    }, 200);
                } else {
                    enableApplyButtonIfChanged();
                }
            }
            window.oldValues[order] = [values[0], values[1]];
        });

        filterValueMin.on('change', function () {
            window.isInit = false;
            var newValue = this.value.replace(/[^0-9]/g, '');
            if (newValue == '' || newValue <= 0 || newValue > filterMax) {
                newValue = 0;
                filterRangeInit.noUiSlider.set([newValue, null]);
            }
            else if (order !== 2 && order !== 4) {
                filterRealValueMin.val(newValue);
                var newSliderValue = 0;
                if (newValue > filterMax) newSliderValue = filterMax;
                else if (newValue > 0) {
                    var minIndex = 'min';
                    for (var key in filtersRange) {
                        if (!filtersRange.hasOwnProperty(key)) { continue; }
                        if (Math.abs(newValue - filtersRange[key]) < Math.abs(newValue - filtersRange[minIndex])) {
                            minIndex = key;
                        }
                    }
                    newSliderValue = filtersRange[minIndex];
                }
                window.fromInputField = true;
                filterRangeInit.noUiSlider.set([newSliderValue, null]);
            } else {
                filterRangeInit.noUiSlider.set([this.value, null]);
            }

            if (window.oldValues[order][0] != newValue && !window.isSubmitting) {
                if (($("html.opened-filters").length == 0) && (document.documentElement.clientWidth > 600)) {
                    window.oldValues[order][0] = newValue;
                    searchFormAjaxSubmit();
                } else {
                    enableApplyButtonIfChanged();
                }
            }
            
        });

        filterValueMax.on('change', function () {
            window.isInit = false;
            var newValue = this.value.replace(/[^0-9]/g, '');
            if (newValue == '' || newValue <= 0 || newValue >= filterMax) {
                newValue = filterMax;
                filterRangeInit.noUiSlider.set([null, filterMax + 1]);
            }
            else if (order !== 2 && order !== 4) {
                filterRealValueMax.val(newValue);
                var newSliderValue = 0;
                if (newValue > filterMax) newSliderValue = filterMax;
                else if (newValue > 0) {
                    var minIndex = 'min';
                    for (var key in filtersRange) {
                        if (!filtersRange.hasOwnProperty(key)) { continue; }
                        if (Math.abs(newValue - filtersRange[key]) < Math.abs(newValue - filtersRange[minIndex])) {
                            minIndex = key;
                        }
                    }
                    newSliderValue = filtersRange[minIndex];
                }
                window.fromInputField = true;
                filterRangeInit.noUiSlider.set([null, newSliderValue]);
            } else {
                filterRangeInit.noUiSlider.set([null, this.value]);
            }

            if (window.oldValues[order][1] != newValue && !window.isSubmitting) {
                if (($("html.opened-filters").length == 0) && (document.documentElement.clientWidth > 600)) {
                    window.oldValues[order][1] = newValue;
                    searchFormAjaxSubmit();
                } else {
                    enableApplyButtonIfChanged();
                }
            }
        });
    }
};

function beforeSearchFormAjaxSubmit() {
    $(".btn-alert").prop('disabled', true);
    $(".photo-area").addClass('advert-transparent');
    if ($('#createMailAlertDialog').is(':visible')) {
        // if modal is shown => close before
        $("#createMailAlertDialog").modal('hide');
    }
    if($("body").hasClass("open-filters")){
        closeFilters();
        console.log("hello1");
    }
}

function searchFormAjaxSubmit() {
    if (window.searchFormAjaxDesactivated !== true) {

        beforeSearchFormAjaxSubmit();
        if (document.documentElement.clientWidth < 600) {
            $(".city-block").css("display","none");
            $(".filters-row").css("display","none");
        }
        console.log("hello2");
        // wait for filters to be closed
        if ($("html").hasClass("opened-filters")) {
            console.log("hello3");
            setTimeout(function() {
                $("form#searchForm").submit();
            }, 400);
        } else {
            $("form#searchForm").submit();
        }
    } 
}

function pushHistoryState(htmlData, isInitialState) {
    // If data is given or it is initialization call
    if (htmlData || isInitialState === true) {
        var data = getCurrentHistoryStateData();
        window.previousState = data;
        if (isInitialState === true) {
            data['htmlData'] = $('#searchAjaxContent').html();
            data['searchCookie'] = Cookies(jsModel['AdvertType'] + '_search');
            history.replaceState(data, null);
        } else {
            var url = "http://" + window.location.hostname + "/" + jsModel.Lang +
                "/prog_show_" + jsModel['AdvertType'] + ".html?searchQuery=" + Cookies(jsModel['AdvertType'] + '_search');
            data['htmlData'] = htmlData;
            data['searchCookie'] = Cookies(jsModel['AdvertType'] + '_search');
            history.pushState(data, null, url);
        }
    }
    $('.btn-apply').prop('disabled', true);
}

function restoreFilterValuesFromState(dataObject, restoreAdvertsArea) {
    if (dataObject && dataObject !== "null" && dataObject !== "undefined") {
        for (var dataField in dataObject) {
            if (typeof dataObject[dataField] !== 'function') {
                if (dataField != 'htmlData') {
                    var elem = $('#' + dataField);
                    var value = dataObject[dataField];
                    if (elem.length && elem.is("input[type=checkbox]")) {
                        elem.prop("checked", value);
                    } else {
                        elem.val(value);
                        elem.trigger('change');
                    }
                } else if (restoreAdvertsArea === true) {
                    $('#searchAjaxContent').html($.parseHTML(dataObject[dataField]));
                }
            }
        }
        $('.sorting-by .components-selected').html($('.sorting-by option[value=' + dataObject["order"] + ']').html());
        $('.component-currency > p.search-par').html($('.component-currency p.option[value=' + dataObject["currency"] + ']').html());
        $('.component-neighbourhood-list p.search-par').html($('.component-neighbourhood-list p.option[value=' + dataObject["radius"] + ']').html());
        $('span.budget-currency').html($('.component-currency p.option[value=' + dataObject["currency"] + ']').data('currency-icon'));
    }
    $('.btn-apply').prop('disabled', true);
}

function onPopState(event) {
    if (window.isFiltersInit === true) {
        return;
    }
    var dataObject = event.state;
    // I didn't find why, but on ipad the variable was not set correctly to false after, so do not desactivate for ipad
    if ($('body.ipad').length == 0) {
        window.searchFormAjaxDesactivated = true;
    }
    restoreFilterValuesFromState(dataObject, true);
    if (dataObject && dataObject['searchCookie']) {
        // Set cookie with old value and expire in 1 year
        Cookies.set(jsModel['AdvertType'] + '_search', dataObject['searchCookie'], { expires: new Date(new Date().getTime() + 365 * 24 * 60 * 1000) });
    }
    $('#city').importTags($('#city').val());
    window[$('#searchForm').data('ajax-success')]();
    // I didn't find why, but on ipad the variable was not set correctly to false after, so do not desactivate for ipad
    if ($('body.ipad').length == 0) {
        window.searchFormAjaxDesactivated = false;
    }
}

function updateSearchLanguageURL(data) {
    var searchQuery = data && data['searchCookies'] ? data['searchCookies'] : Cookies(jsModel['AdvertType'] + '_search');
    if (searchQuery) {
        $("div.language-list a").each(function () {
            $(this).attr("href", "/" + $(this).attr("data-language") + "/prog_show_" + jsModel['AdvertType'] + ".html?searchQuery=" + searchQuery);
        });
        if ($('.btn-language').length && isLocalStorageNameSupported()) {
            var languageLinks = {};
            $('link[rel="alternate"]').each(function() {
                languageLinks[$(this).attr('hreflang')] = $(this).attr("href", "/" + $(this).attr('hreflang') + "/prog_show_" + jsModel['AdvertType'] + ".html?searchQuery=" + searchQuery);
            });
            localStorage.setItem("languageLinks", JSON.stringify(languageLinks));
        }
    }
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
}