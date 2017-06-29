// init model variables if not defined
function initJsModel() {
    window.jsModel = typeof window.jsModel === "undefined" ? {} : window.jsModel;
    jsModel.Lang = typeof jsModel.Lang === "undefined" ? "en" : jsModel.Lang;
    jsModel.Country = typeof jsModel.Country === "undefined" ? "fr" : jsModel.Country;
    jsModel.AdvertTooltipBedrooms = typeof jsModel.AdvertTooltipBedrooms === "undefined" ? null : jsModel.AdvertTooltipBedrooms;
    jsModel.NumberSeparator = typeof jsModel.NumberSeparator === "undefined" ? " " : jsModel.NumberSeparator;
    jsModel.BudgetValues = typeof jsModel.BudgetValues === "undefined" ? null : jsModel.BudgetValues;
    jsModel.SurfaceValues = typeof jsModel.SurfaceValues === "undefined" ? null : jsModel.SurfaceValues;
    jsModel.LandValues = typeof jsModel.LandValues === "undefined" ? null : jsModel.LandValues;
    jsModel.AdvertTooltipArea = typeof jsModel.AdvertTooltipArea === "undefined" ? null : jsModel.AdvertTooltipArea;
    jsModel.AdvertTooltipLand = typeof jsModel.AdvertTooltipLand === "undefined" ? null : jsModel.AdvertTooltipLand;
    jsModel.AdvertTooltipRooms = typeof jsModel.AdvertTooltipRooms === "undefined" ? null : jsModel.AdvertTooltipRooms;
    jsModel.AdvertType = typeof jsModel.AdvertType === "undefined" ? "properties" : jsModel.AdvertType;
}

function isLocalStorageNameSupported() {
    var testKey = "test", storage = window.localStorage;
    try {
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

function commonOnDocumentReady() {
    initJsModel();

    var select = $(".component-list"),
        options_area = $(".options-list"),
        option = $(".option"),
        option_sort_list = $(".sorting-by .option"),
        add_to_favourite_adv = $(".add-to-favourites"),
        details = $(".item-details ul li"),
        filters_title = $(".filters-title-area"),
        show_social = $(".show-social-sharing"),
        option_currency = $(".currency-list .option"),
        currency_icon = $(".budget-currency");

    $(".icon-cookies-close").on("click", function () {
        $(this).parent().parent().remove();
    });

    setTimeout(function () {
        $(".cookies-message").fadeToggle(2000);
    }, 15000);

    $(".btn-language").click(function () {
        if ($(this).data("language-link")) {
            if (isLocalStorageNameSupported()) {
                var languageLinks = {};
                $('link[rel="alternate"]').each(function () {
                    languageLinks[$(this).attr("hreflang")] = $(this).attr("href");
                });
                window.localStorage.setItem("languageLinks", JSON.stringify(languageLinks));
            }
            window.location.href = $(this).data("language-link");
        }
    });
    var panelHeight;
    var screenHeight;
    var menuListHeight;
    var panelMenu = $("#panel-menu");
    var mainAsideTop;
    var homeHeight;

    if (!($(".home").hasClass("other-pages")) && (document.documentElement.clientWidth < 604)) {
        $(".home").css("height", $(window).height());
        $(".options-list").css("max-height", $(window).height() - 60).css("overflow-y", "scroll");
        mainAsideTop = parseInt($(".home").css("height")) - parseInt($(".main-aside").css("height"));
        $(".main-aside").css("top", mainAsideTop);
    }

    $("#basketForgotPassword").on("show.bs.modal", function () {
        $("#basketModal").css("z-index", "1000");
    });
    $("#basketForgotPassword").on("hide.bs.modal", function () {
        $("#basketModal").css("z-index", "1050");
    });

    /**** Advert Page ****/
    if (document.documentElement.clientWidth < 604) {
        $(".float-form").affix().on("affix.bs.affix affix-top.bs.affix affix-bottom.bs.affix", function (evt) {
            evt.preventDefault();
        });

        setTimeout(function () {
            if ($("#mainPicture").height() < $(".item-photo-prev").height()) {
                $(".item-photo-prev")
                    .css("height", $("#mainPicture").height())
                    .css("min-height", $("#mainPicture").height());
            }
            if ($("#youtubePlayer").height() < $(".item-photo-prev").height()) {
                $(".item-photo-prev")
                    .css("height", $("#youtubePlayer").height())
                    .css("min-height", $("#youtubePlayer").height());
            }
            $(".float-form").css("top", $(".item-content").height());
        }, 100);
        $(".standard-input").val("");
    }

    $(window).scroll(function () {
        if ($(document).scrollTop() > (parseInt($(".float-form").css("top")) - 100)) {
            $(".fixed-button-area").hide();
        } else {
            $(".fixed-button-area").show();
        }
    });
    /**** END Advert Page ****/

    $(window).on("orientationchange", function () {
        if (document.documentElement.clientWidth > 604) {
            setTimeout(function () {
                $(".previousAdvert").removeClass("hidden");
                $(".nextAdvert").removeClass("hidden");
                $(".backToSearch").removeClass("hidden");
                $(".float-form").css("top", $(".item-content").height());
                console.log("<604");
            }, 200);
        } else {
            setTimeout(function () {
                $(".previousAdvert").addClass("hidden");
                $(".nextAdvert").addClass("hidden");
                $(".backToSearch").addClass("hidden");
                console.log(">604");
            }, 200);
        }

        if (!($(".home").hasClass("other-pages"))) { //&& (document.documentElement.clientWidth < 604)) {
            setTimeout(function () {
                $(".search-line").find(".show-list").removeClass("show-list");
                select.css("height", select.css("min-height"));
                $(".search-line").css("height", $(".search-line").css("min-height"));
                $(".home").css("height", $(window).height());
                $(".options-list").css("max-height", $(window).height() - 60);
                mainAsideTop = parseInt($(".home").css("height")) - parseInt($(".main-aside").css("height"));
                $(".main-aside").css("top", mainAsideTop);
            }, 400);
        }

        if (panelMenu.hasClass("panel-on")) {
            setTimeout(function () {
                screenHeight = $(window).height();
                if (document.documentElement.clientWidth > 600) {
                    $("body").removeClass("position-fixed");
                }
                else if (document.documentElement.clientWidth < 376) {
                    panelMenu.css("height", (screenHeight - 80) + "px");
                    menuListHeight = panelHeight = panelMenu.css("height");
                    $(".menu-list").css("height", menuListHeight);
                }
                else {
                    panelMenu.css("height", (screenHeight - 95) + "px");
                    menuListHeight = panelHeight = panelMenu.css("height");
                    $(".menu-list").css("height", menuListHeight);
                }
            }, 500);
        }
    });

    $(".btn-m-menu").click(function () {
        if (panelMenu.hasClass("panel-on")) {
            setTimeout(function () {
                panelMenu.toggleClass("panel-on");
            }, 500);
            $("#icon-menu").removeClass("open");
            $("body").removeClass("position-fixed");
            panelMenu.css("animation", "mymoveback 1s 1 forwards");
        }
        else {
            setTimeout(function () {
                panelMenu.toggleClass("panel-on");
            }, 500);
            $("#icon-menu").addClass("open");
            $("body").addClass("position-fixed");
            panelMenu.css("animation", "mymove 1s 1 forwards");
        }

        screenHeight = $(window).height();
        if (document.documentElement.clientWidth < 376) {
            panelMenu.css("height", (screenHeight - 80) + "px");
            menuListHeight = panelHeight = panelMenu.css("height");
            $(".menu-list").css("height", menuListHeight);
        }
        else {
            panelMenu.css("height", (screenHeight - 95) + "px");
            menuListHeight = panelHeight = panelMenu.css("height");
            $(".menu-list").css("height", menuListHeight);
        }
    });
    $(document).on("mousedown touchstart", function (e) {
        var container = $(".menu-list");
        var container2 = $(".btn-m-menu");
        if ((container.has(e.target).length === 0) && (container2.has(e.target).length === 0) && (panelMenu.hasClass("panel-on"))) {
            setTimeout(function () {
                panelMenu.removeClass("panel-on");
                panelMenu.css("animation", "mymoveback 1s 1 forwards");
                $("#icon-menu").removeClass("open");
                $("body").removeClass("position-fixed");
            }, 500);
        }
    });

    var filter_hover_height;
    var filter_hover_list;
    var search_line_height;

    select.on("click", function (e) {
        var filter_hover = $(this);
        var closeList = filter_hover.find(options_area).hasClass("show-list");
        if (!options_area.has(e.target).length || filter_hover.hasClass("component-currency")) {
            filter_hover.find(".show-list").removeClass("show-list");
            if ((!($(".home").hasClass("other-pages"))) &&
                (document.documentElement.clientWidth < 604) &&
                (filter_hover.hasClass("component-apartment") || filter_hover.hasClass("component-currency"))) {
                setTimeout(function () {
                    filter_hover_height = parseInt(filter_hover.css("height"));
                    filter_hover.css("height", filter_hover.css("min-height"));
                    if (filter_hover_height > parseInt(filter_hover.css("min-height"))) {
                        search_line_height = parseInt($(".search-line").css("height")) - filter_hover_height;
                        if (search_line_height < $(".search-line").css("min-height")) {
                            search_line_height = $(".search-line").css("min-height");
                        }
                        $(".search-line").css("height", search_line_height);
                        homeHeight = parseInt($(".home").css("height")) - filter_hover_height;
                        if (homeHeight < $(window).height()) {
                            homeHeight = $(window).height();
                        }
                    } else {
                        homeHeight = parseInt($(".home").css("height"));
                    }
                    $(".home").css("height", homeHeight);
                    mainAsideTop = homeHeight;
                    $(".main-aside").css("top", mainAsideTop);
                }, 100);
            }
            if (closeList === false) {
                filter_hover.find(options_area).addClass("show-list");
                if ((!($(".home").hasClass("other-pages"))) &&
                    (document.documentElement.clientWidth < 604) &&
                    (filter_hover.hasClass("component-apartment") || filter_hover.hasClass("component-currency"))) {
                    setTimeout(function () {
                        filter_hover_height += parseInt(filter_hover.find(options_area).css("height"));
                        filter_hover.css("height", filter_hover_height);
                        search_line_height = parseInt($(".search-line").css("height")) + filter_hover_height;
                        $(".search-line").css("height", search_line_height);
                        homeHeight = parseInt($(".home").css("height")) + filter_hover_height;
                        $(".home").css("height", homeHeight);
                        mainAsideTop = homeHeight;
                        $(".main-aside").css("top", mainAsideTop);
                        $("html, body").scrollTop(filter_hover.offset().top - 10);
                    }, 100);
                }
            }
        }
    });

    option.on("click", function () {
        $(this).parent().parent().find(".component-selected").html($(this).html());
        if ($(this).closest(".sorting-by").length) {
            if ($(this).attr("value") !== $("#order").val()) {
                $("#order").val($(this).attr("value")).trigger("change");
            }
        } else {
            var previousVal = $(this).parent().parent().find(".component-selected-hidden").val();
            if (previousVal !== $(this).attr("value")) {
                $(this).parent().parent().find(".component-selected-hidden").val($(this).attr("value")).trigger("change");
            }
        }
        if (!$(this).closest(options_area).hasClass("filter-properties-list")) {
            $(this).parent().find(".show-list").removeClass("show-list");
        }
        if ($(this).is("[data-currency-icon]")) {
            $("span.budget-currency").html($(this).data("currency-icon"));
            if ($(this).data("currency-icon").length >= 3) {
                currency_icon.addClass("small-currency");
            } else {
                currency_icon.removeClass("small-currency");
            }
        }
        setTimeout(function () {
            $("body").trigger("click");
        }, 0);
    });

    /**** Additional Function on Advert Page (Hover on Form elements) ****/
    show_social.on("mouseover", function () {
        $(".social-sharing").show();
    });

    show_social.on("mouseleave", function () {
        $(".social-sharing").hide();
    });

    $(window).on("click touchend", function (e) {
        var target = $(e.target);

        if ($(e.target).closest(show_social).length) {
            e.stopPropagation();
        } else {
            $(".social-sharing").hide();
        }
    });
    /**** END Additional Function on Advert Page (Hover on Form elements) ****/

    /**** Close Select Area after click on some area ****/
    $(window).on("click touchend", function (e) {

        var target = $(e.target);

        if ($(e.target).closest(options_area).length || $(e.target).closest(option).length || $(e.target).closest(select).length) {
            e.stopPropagation();
        } else {
            if (!options_area.hasClass("filter-properties-list")) {
                options_area.removeClass("show-list");
            }
        }

        /**** Touch on Add To Favourites ****/
        if ($(e.target).closest($(".item-main a")).length) {
            if ($(e.target).closest($(".item-favourite")).length) {
                e.stopPropagation();
                return false;
            }
            if ($(e.target).closest($(".item-show-info")).length) {
                e.stopPropagation();
                return false;
            }
            if ($(e.target).closest($(".swiper-button-next")).length) {
                e.stopPropagation();
            }
            if ($(e.target).closest($(".swiper-button-prev")).length) {
                e.stopPropagation();
            }
        }
        /**** END Touch on Add To Favourites ****/
    });
    /**** END Close Select Area after click on some area ****/

    /**** Tabs with Properties ****/
    var prop_tab = $(".prop-tab");

    prop_tab.on("click", function () {
        $(this).parent().find(".active-tab").removeClass("active-tab");
        $(this).addClass("active-tab");
        $("html,body").animate({ scrollTop: $(".active-tab").offset().top - 30 }, 500);
        var image = $($(this).attr("href") + " img");
        if (image.attr("src") == "") {
            var src = $(image).data("lazy-load-src");
            if (typeof src !== "undefined" && src != "") {
                image.attr("src", src);
                image.data("lazy-load-src", "");
            }
        }
    });
    /**** END Tabs with Properties ****/

    /**** Filter - Property Type ****/
    var filter_prop_btn = $(".filter-properties-list li input[type=checkbox]"),
        filter_prop_text = $(".prop-name"),
        filter_type_text = $(".filter-property-type, .filter-properties-area .filter-property-type-text"),
        filter_hover = $(".filter-properties-area"),
        counter = 0;
    /**** END Filter - Property Type ****/

    /**** Block input ****/
    var this_val,
        this_length;

    filter_type_text.on("focus", function () {
        this_val = $(this).val();
        this_length = this_val.length;
    });

    filter_type_text.on("keydown", function () {
        if (this_length == this_length + 1) {
            this_val = $(this).val();
        }
    });

    filter_type_text.on("keyup", function () {
        $(this).val(this_val);
    });

    filter_type_text.on("keypress", function () {
        if (this_length == this_length + 1) {
            this_val = $(this).val();
        } else {
            $(this).val(this_val);
        }
    });
    /**** END Block input ****/

    $(window).on("click touchend", function (e) {
        if ($(e.target).closest(filter_hover).length) {
            e.stopPropagation();
        } else {
            // Bug home page ipad, I didn't find the source of the problem, it didn't work on iPad only, function was called 3 times with different arguments on a single touch
            if ($("body.ipad").length && $(".search-row .home-search-filter").length) {
                if (window.doNotHidePropertiesList === true) {
                    setTimeout(function () {
                        window.doNotHidePropertiesList = false;
                    }, 100);
                } else {
                    filter_hover.find(".filter-properties-list").hide();
                }
            }
        }
    });


    /***** Properties types dropdown list *****/
    filter_prop_btn.on("click", function () {
        window.doNotHidePropertiesList = true;
        var parent_val = $(this).parent().parent().parent().parent().parent();
        var counter = parseInt(parent_val.find(filter_type_text).attr("data-counter"));
        if ($(this).is(":checked")) {
            /*** Counter ***/
            counter++;
            parent_val.find(filter_type_text).attr("data-counter", counter);
            /*** Counter ***/
            if (counter > 1) {
                parent_val.find(filter_type_text).val(parent_val.find(filter_type_text).val() + ", " + $(this).parent().find(filter_prop_text).text());
            } else {
                parent_val.find(filter_type_text).val($(this).parent().find(filter_prop_text).text());
            }
        } else {
            /*** Counter ***/
            counter--;
            parent_val.find(filter_type_text).attr("data-counter", counter);
            /*** Counter ***/
            var str = parent_val.find(filter_type_text).val();
            str = str.replace(", " + $(this).parent().find(filter_prop_text).text(), "");
            str = str.replace($(this).parent().find(filter_prop_text).text() + ", ", "");
            if (counter < 1) {
                parent_val.find(filter_type_text).val(parent_val.find(filter_type_text).attr("data-default"));
            } else {
                parent_val.find(filter_type_text).val(str);
            }
        }
    });

    if ($(".no-match").length > 0 && $(".no-area").length === 0) {
        $(".no-match").parent().css("margin-bottom", "300px");
    }

    $(".big-number-format").each(function () {
        $(this).formatBigNumber();
    });

    $("#mx_p, #mn_p").numeric();

    $('[data-link]:not([data-link=""])').on("click", function (event) {
        if ($(this).is('[target="_blank"]')) {
            window.open($(this).data("link").toString(), "_blank");
        } else {
            window.location.href = $(this).data("link").toString();
        }
    });

    filter_prop_btn.each(function () {
        var parent_val = $(this).parent().parent().parent().parent().parent();
        console.log(parent_val);
        var counter = parseInt(parent_val.find(filter_type_text).attr("data-counter"));
        if ($(this).is(":checked")) {
            /*** Counter ***/
            counter++;
            parent_val.find(filter_type_text).attr("data-counter", counter);
            console.log(counter);
            /*** Counter ***/
            if (counter > 1) {
                parent_val.find(filter_type_text).val(parent_val.find(filter_type_text).val() + ", " + $(this).parent().find(filter_prop_text).text());
            } else {
                parent_val.find(filter_type_text).val($(this).parent().find(filter_prop_text).text());
            }
        }
    });

    // if (jsModel.Country == "fr") {
    //     /***** Mouse flow cookies *****/
    //     var _mfq = _mfq || [];
    //     (function () {
    //         var mf = document.createElement("script");
    //         mf.type = "text/javascript";
    //         mf.async = true;
    //         mf.src = "//cdn.mouseflow.com/projects/35cf9549-a91a-4424-97bc-707d0d8cd309.js";
    //         document.getElementsByTagName("head")[0].appendChild(mf);
    //     })();
    // }

    $(".country-item").each(function () {
        var src = $(this).data("background-src");
        if (typeof src !== "undefined" && src != "") {
            $(this).css("background-image", "url('" + src + "')");
        }
    });

    /***************** Decorate cross domain links for google analytics ****************/
    $(".decorate-google-analytics").on("click", function (e) {
        if (typeof decorateMeForCountryMap !== "undefined" && $.isFunction(decorateMeForCountryMap)) {
            e.preventDefault();
            decorateMeForCountryMap($(this).attr("href"));
            return false;
        };
        return true;
    });

    $(window).load(function () {
        var count_fav_text = $(".favourites-counter"),
            count_fav = count_fav_text.text();
        if ($(".icon-favourite-list").length) {
            window.c_top = $(".icon-favourite-list").offset().top;
            window.c_left = $(".icon-favourite-list").offset().left;
        }

        // Toogle all favorites
        if (Cookies("SelectedAdvert") != null && Cookies("SelectedAdvert") !== "") {
            var selectedAdverts = Cookies("SelectedAdvert").split(":");
            if (selectedAdverts.length == 0) {
                count_fav_text.hide();
            } else {
                count_fav_text.html(selectedAdverts.length);
                count_fav_text.show();
            }
            removeFromArray(selectedAdverts, "");
            var i;
            for (i = 0; i < selectedAdverts.length; i++) {
                $("div[data-advertid='" + selectedAdverts[i] + "']").addClass("fav-active");
                $("span[data-advertid='" + selectedAdverts[i] + "']").addClass("ga-icon-favourite-active");
            }
        } else {
            count_fav_text.hide();
        }

        $(window).on("resize", function () {
            if ($(".icon-favourite-list").length > 0) {
                window.c_top = $(".icon-favourite-list").offset().top,
                    window.c_left = $(".icon-favourite-list").offset().left;
            }
        });
        window.isFavoriteListenersSet = true;
    });

    // Fix for internet explorer not compatible with attribute form when input is outside the form
    (function ($) {
        /**
         * polyfill for html5 form attr
         */
        // detect if browser supports this
        var sampleElement = $("[form]").get(0);
        var isIE11 = !(window.ActiveXObject) && "ActiveXObject" in window;
        if (sampleElement && window.HTMLFormElement && sampleElement.form instanceof HTMLFormElement && !isIE11) {
            // browser supports it, no need to fix
            return;
        }
        /**
         * Append a field to a form
         *
         */
        $.fn.appendField = function (data) {
            // for form only
            if (!this.is("form")) return;

            // wrap data
            if (!$.isArray(data) && data.name && data.value) {
                data = [data];
            }

            var $form = this;

            // attach new params
            $.each(data, function (i, item) {
                $("<input/>")
                    .attr("type", "hidden")
                    .attr("name", item.name)
                    .val(item.value).appendTo($form);
            });

            return $form;
        };

        /**
         * Find all input fields with form attribute point to jQuery object
         * 
         */
        $("form[id]").submit(function (e) {
            var $form = $(this);
            if ($form.attr("id") == "searchForm") {
                $("#searchForm input[name=city]").remove();
                $("#searchForm input[name=city_id]").remove();
            }
            // serialize data
            var data = $("[form=" + $form.attr("id") + "]").serializeArray();
            // append data to form
            $form.appendField(data);
        }).each(function () {
            var form = this,
                $form = $(form),
                $fields = $("[form=" + $form.attr("id") + "]");

            $fields.filter("button, input").filter("[type=reset],[type=submit]").click(function () {
                var type = this.type.toLowerCase();
                if (type === "reset") {
                    // reset form
                    form.reset();
                    // for elements outside form
                    $fields.each(function () {
                        this.value = this.defaultValue;
                        this.checked = this.defaultChecked;
                    }).filter("select").each(function () {
                        $(this).find("option").each(function () {
                            this.selected = this.defaultSelected;
                        });
                    });
                } else if (type.match(/^submit|image$/i)) {
                    $(form).appendField({ name: this.name, value: this.value }).submit();
                }
            });
        });
    })(jQuery);
    carouselLazyOnDocumentReady();
    HomeConnectOnDocumentReady();
    DefaultSubmitButton();
    $(".modal.auto-show").modal();
    $("#internationalPhone").intlTelInput({
        initialCountry: jsModel.Country === "uk" ? "gb" : jsModel.Country,
        utilsScript: "utils.js"
    });
    $("#phoneCountryId").val(jsModel.Country);
    $("#internationalPhone").on("countrychange", function (e, countryData) {
        $("#phoneCountryId").val(countryData.iso2);
    });
}

function languageSelectionOnDocumentReady() {
    if (isLocalStorageNameSupported() && localStorage.getItem("languageLinks") != null) {
        var languageLinks = JSON.parse(localStorage["languageLinks"]);
        for (var language in languageLinks) {
            $(".language-option[data-language-code=" + language + "]").data("language-option-link", languageLinks[language]);
        }
    }

    $(".language-option:not(.selected)").mouseover(function () {
        $(this).addClass("background-color-gagreen");
    }).mouseout(function () {
        $(this).removeClass("background-color-gagreen");
    });

    $(".language-option").click(function () {
        $(".language-option").css({ 'cursor': "wait" });
        if (typeof (decorateMeForCountryMap) === typeof (Function)) {
            decorateMeForCountryMap($(this).data("language-option-link"));
        } else {
            window.location = $(this).data("language-option-link");
        }

    });
}

function checkElementOnscreen(el) {
    if ($(el).length <= 0) {
        return false;
    }
    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(el).offset().top,
        elementHeight = $(el).height();

    return ((y < (vpH + st)) && (y > (st - elementHeight)));
}

function searchContentOnDocumentReady() {
    /***************** Adverts photos slider ****************/
    //if (document.documentElement.clientWidth > 568) {
    $(".swiper-container").each(function () {
        Swiper($(this), {
            nextButton: $(this).find(".ga-icon-chevron-thin-right"),
            prevButton: $(this).find(".ga-icon-chevron-thin-left"),
            loop: true,
            effect: "fade",
            simulateTouch: false,
            lazyLoading: true
        });
        setTimeout(1);
    });
    //}
    //else if ($(".item-main").hasClass("rtl-version")) {
    //    $(".swiper-slide").css("width", "100%");
    //    $(".swiper-slide").css("transform", "translate3d(100%, 0, 0)");
    //}
    //else {
    //    $(".swiper-slide").css("width", "100%");
    //    $(".swiper-slide").css("transform", "translate3d(-100%, 0, 0)");
    //}

    /*************************** Details on each item after hover icon *********************************/
    var details = $(".item-details ul li");
    details.on("mouseover", function () {
        $(this).find(".details-tip").css("left", $(this).find(".ga-icons").position().left +
            ($(this).find(".ga-icon-Rooms").length === 1 ? -5 : $(this).find(".ga-icon-territory-square").length === 1 ? 20 : -15) + "px");
        var tooltipText = null;
        if (typeof window.jsModel !== "undefined") {
            switch ($(this).find(".details-tip").data("advert-tooltip")) {
                case "area":
                    tooltipText = jsModel.AdvertTooltipArea;
                    break;
                case "land":
                    tooltipText = jsModel.AdvertTooltipLand;
                    break;
                case "rooms":
                    tooltipText = jsModel.AdvertTooltipRooms;
                    break;
                case "bedrooms":
                    tooltipText = jsModel.AdvertTooltipBedrooms;
                    break;
            }
            if (tooltipText != null && tooltipText != "") {
                $(this).find(".details-tip").text(tooltipText);
                $(this).find(".details-tip").show();
            }
        }
    });

    details.on("mouseleave", function () {
        $(this).find(".details-tip").hide();
    });

    /*************************** Show details each item after click on [+] *********************************/
    $(".item-show-info").on("click touchend", function () {
        $(this).parent().parent().parent().parent().toggleClass("item-open");
        $(this).parent().parent().find(".ellipsis").toggleClass("item-open");
        $(this).parent().parent().find(".item-more-info").toggleClass("item-descr-open");
    });
}

function searchOrderOnDocumentReady() {
    var select = $(".sorting-by .component-list"),
        options_area = $(".sorting-by .options-list"),
        option = $(".sorting-by .option");

    select.on("click", function () {
        var closeList = $(this).find(options_area).hasClass("show-list");
        select.parent().find(".show-list").removeClass("show-list");
        if (closeList == false)
            $(this).find(options_area).addClass("show-list");
    });

    option.on("click", function () {
        $(this).parent().parent().find(".component-selected").html($(this).html());
        if ($(this).attr("value") !== $("#order").val()) {
            $("#order").val($(this).attr("value")).trigger("change");
        }
        $(this).parent().find(".show-list").removeClass("show-list");

        if (document.documentElement.clientWidth > 600) {
            setTimeout(function () {
                $("body").trigger("click");
            }, 0);
        }
        else {
            enableApplyButtonIfChanged();
        }
    });

    $(window).on("click touchend", function (e) {
        if ($(e.target).closest(options_area).length || $(e.target).closest(option).length || $(e.target).closest(select).length) {
            e.stopPropagation();
        } else {
            options_area.removeClass("show-list");
        }
    });
}

function carouselLazyOnDocumentReady() {
    // Load images for first 3 adverts, lazy loading for others
    $("#featured-carousel-mobile, #featured-carousel, #photos-carousel").on("slide.bs.carousel", function (e) {
        var nextImage = $(e.relatedTarget).find("img");

        $(nextImage).each(function () {
            var src = $(this).data("lazy-load-src");
            if (typeof src !== "undefined" && src != "") {
                $(this).attr("src", src);
                $(this).data("lazy-load-src", "");
            }
        });
    });
}

function homeMainOnDocumentReady() {
    // If SEO content exist switch alternate color in countryMosaic
    if ($(".property").length) {
        $(".country").switchClass("country", "featured");
    }

    $('[data-toggle="tooltip"]').tooltip();
    $("button.btn-search").on("click", function () {
        if ($("#city_id").val()) {
            $(this).closest("form").submit();
        } else {
            $(".city-autocomplete-wrapper").tooltip("show");
        }
    });
    $("button.btn-sell").on("click", function () {
        $("html,body").animate({ scrollTop: $(".commercial").offset().top }, 500);
    });
    $("#choice-buy, #choice-rent").click(function () {
        if ($(this).is(":checked")) {
            $(this).closest("form").attr("action", $(this).data("action"));
        }
    });
    $("#gamap").rwdImageMaps();
    $("#gamap-cities").responsiveCities("gamap");
    $("#gamap-circles").responsiveCities("gamap");

    // No tooltips for tablets
    if ($("body.tablet").length === 0) {
        //Tooltip boostrap creation
        $(".map-area, .map-circle, a.area-tooltip").mouseenter(function () {
            var searchingId = $(this).attr("data-id");
            $("#tooltips").children("div").each(function () {
                if ($(this).attr("data-id") == searchingId) {
                    $(this).popover("show");
                    return;
                }
            });
        });

        $(".map-area, .map-circle, a.area-tooltip").mouseleave(function () {
            var searchingId = $(this).attr("data-id");
            $("#tooltips").children("div").each(function () {
                if ($(this).attr("data-id") == searchingId) {
                    $(this).popover("hide");
                    return;
                }
            });
        });

        $("#bigMapContainer .area-tooltip").popover({
            placement: "auto left",
            container: "body",
            mouseOffset: 25,
            followMouse: true,
            trigger: "manual",
            template: '<div class="popover map-popover" role="tooltip"><h3 class="popover-title"></h3></div>'
        });

        $("#observatory-map .area-tooltip").popover({
            placement: "auto left",
            container: "body",
            mouseOffset: 25,
            followMouse: true,
            trigger: "manual",
            template: '<div class="popover map-popover" role="tooltip"><h3 class="popover-title font-big"/></h3><div class="popover-content font-big"></div></div>'
        });

        $(".directory-main-section .area-tooltip").popover({
            placement: "auto left",
            container: "body",
            mouseOffset: 25,
            followMouse: true,
            trigger: "manual",
            template: '<div class="popover map-popover" role="tooltip"><h3 class="popover-title"/></h3></div>'
        });
    }

    $("#mn_p, #mx_p").on("click touch", function () {
        $(this).select();
        this.setSelectionRange(0, 9999);
    });

    // No highlight for ipad + manually process touch events for map
    if ($("body.ipad").length) {
        var endCoords = {};

        $("map").on("touchstart touchmove", function (event) {
            endCoords = event.originalEvent.targetTouches[0];
        });

        $("map").on("touchend", function (e) {
            var x = (endCoords.pageX - $("#gamap").offset().left),
                y = (endCoords.pageY - $("#gamap").offset().top);
            if (x && y) {
                $("map area").each(function () {
                    if (typeof $(this).data("box") !== "undefined") {
                        var box = $(this).data("box").split(",");
                        // if touch inside the bounding box
                        if (x >= box[0] && y >= box[1] && x <= box[2] && y <= box[3]) {
                            var coords = $(this).attr("coords").split(","), polygon = [];
                            for (var i = 0; i < coords.length - 2; i += 2) {
                                // add small error to process the border correctly
                                polygon.push([coords[i] * 1.0000000001, coords[i + 1] * 1.0000000001]);
                            }
                            if (inside([x, y], polygon)) {
                                window.location = $(this).attr("href");
                            }
                        }
                    }
                });
            }
        });
    }
    // Highlight for other devices
    else {
        $("#gamap").maphilight({
            fillColor: "A3CE33",
            fillOpacity: 0.8,
            strokeColor: "F5F6F8",
            strokeOpacity: 0.7
        });

        $("area.disable-area").each(function () {
            var isSquare = isSquareMap(this);
            if (!isSquare) {
                $(this).data("maphilight", {
                    fillColor: "A3A3A3",
                    fillOpacity: 1,
                    alwaysOn: true
                }).trigger("alwaysOn.maphilight");
            }
        });
    }

    $(".filter-properties-list.home-search-filter .option").click(function (event) {
        if ($(event.target).is(".option")) {
            $(this).find("input").first().click();
        }
    });

    localStorage.clear();
}

// Remove Square gray ugly
function isSquareMap(map) {
    var coords = $(map).attr("coords").split(",");
    if (coords.length === 8) {
        coords.sort();
        if (coords[0] === coords[1] && coords[2] === coords[3] && coords[4] === coords[5] && coords[6] === coords[7]) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

function inside(point, vs) {
    var x = point[0], y = point[1];

    var r = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) r = !r;
    }

    return r;
};

function searchAlertOnDocumentReady(countNewPage) {
    if ($(".no-result.no-area").length == 0) {
        $(".alert-part .btn-alert").on("click", function (e) {
            $("#createMailAlertDialog").modal("show");
        });

        window.PrepareMailAlertForm = function () {
            $("#mailAlertForm .btn-send").on("click", function (e) {
                if ($("#mailAlertForm").valid()) {
                    $(this).prop("disabled", true);
                    $("#mailAlertForm .button-ajax-loading").removeClass("hidden");
                    $("#mailAlertForm").submit();
                }
            });

            // ajax success callback function name
            $("#mailAlertForm").attr("data-ajax-success", "CreateMailAlertReturn");
        };

        PrepareMailAlertForm();

        window.CreateMailAlertReturn = function (data) {
            $("#mailAlertForm .button-ajax-loading").addClass("hidden");
            if (data == "True") {
                $("#mailAlertForm").hide();
                $("#createMailAlertResult").removeClass("hidden");
            } else {
                $("#mailAlertForm").html(data);
                PrepareMailAlertForm();
            }
        }

        if (Cookies("show_mail_alert_dialog") == undefined || Cookies("show_mail_alert_dialog") == null) {
            // nothing
        }
        else if (countNewPage && Cookies("show_mail_alert_dialog") != "false" && Cookies("show_mail_alert_dialog") == 0) {
            if (Cookies("has_mail_alert") == undefined || Cookies("has_mail_alert") == null) {
                window.setTimeout(function () {
                    if ($(".btn-alert").prop("disabled") !== true) {
                        $("#createMailAlertDialog").modal("show");
                    }
                }, 2000);
            }
            Cookies.set("show_mail_alert_dialog", "false", { expires: 365, path: "/" }); // set the cookie, with expiry after 1 year
        } else if (countNewPage && Cookies("show_mail_alert_dialog") != "false") {
            Cookies.set("show_mail_alert_dialog", Math.max(0, Cookies.get("show_mail_alert_dialog") - 1), { expires: 1, path: "/" });
        };

        $(".alert-part .btn-alert").removeAttr("disabled");
    }
}

function searchSortAlertOnDocumentReady(countNewPage) {
    if ($(".no-result.no-area").length === 0) {
        $(".sorting-by .btn-sort").on("click", function (e) {
            $("#createSortAlertDialog").modal("show");
        });
        window.PrepareSortAlertForm = function () {
            $("#sortAlertForm .btn-send").on("click", function (e) {
                $(this).prop("disabled", true);
                $("#createSortAlertDialog").modal("hide");
                searchFormAjaxSubmit();
            });
        };
        PrepareSortAlertForm();

        $(".sorting-by .btn-sort").removeAttr("disabled");
    }
}

function autocompleteOnDocumentReady() {
    // City catcomplete
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        },
        _renderMenu: function (ul, items) {
            var that = this,
                currentCategory = "";
            $.each(items, function (index, item) {
                var li;
                if (item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                    currentCategory = item.category;
                }
                li = that._renderItem(ul, item);
                if (item.category) {
                    li.attr("aria-label", item.category + " : " + item.label);
                }
            });
        },
        _renderItem: function (ul, item) {
            return $("<li class='ui-autocomplete-item option' role='menuitem' id='" + item.id + "'>")
                .data("ui-autocomplete-item", item)
                .append(item.label)
                .appendTo(ul);
        },
    });

    function highlight(s, t) {
        var matcher = new RegExp("(" + $.ui.autocomplete.escapeRegex(t) + ")", "ig");
        return s.replace(matcher, "<strong>$1</strong>");
    }

    function split(val) {
        return val.split(/,\s*/);
    }

    function extractLast(term) {
        return split(term).pop();
    }


    function onAddTag(tagValue) {
        $(".city-autocomplete-wrapper").tooltip("hide");
        $("#city_id").val($(".tagsinput .tag").map(function () { return $(this).data("id"); }).get().join());
        if (window.addTagFromAutocomplete === true) {
            window.addTagFromAutocomplete = false;
            if ($("#searchForm").length) {
                if (($("html.opened-filters").length == 0) && (document.documentElement.clientWidth > 600)) {
                    searchFormAjaxSubmit();
                } else {
                    enableApplyButtonIfChanged();
                }
            } else if ($(".home:not(.other-pages)").length === 0) {
                $(this).closest("form").submit();
            }
        } else {
            window.removeTagWithoutSubmit = true;
            $("#city").removeTag(tagValue);
        }
    }

    function onRemoveTag(tagValue) {
        $("#city_id").val($(".tagsinput .tag").map(function () { return $(this).data("id"); }).get().join());
        if (window.removeTagWithoutSubmit === true) {
            window.removeTagWithoutSubmit = false;
        } else {
            if ($("#searchForm").length) {
                if (($("html.opened-filters").length == 0) && (document.documentElement.clientWidth > 600)) {
                    searchFormAjaxSubmit();
                } else {
                    enableApplyButtonIfChanged();
                }
            } else if ($(".home:not(.other-pages)").length === 0) {
                $(this).closest("form").submit();
            }
        }
    }

    $("#city").tagsInput({
        'width': "calc(100% - 60px)",
        'height': "auto",
        'interactive': true,
        'defaultText': $("#city").attr("placeholder"),
        'delimiter': [","],   // Or a string with a single delimiter. Ex: ';'
        'removeWithBackspace': true,
        'placeholderColor': "#888888",
        'onAddTag': onAddTag,
        'onRemoveTag': onRemoveTag,
    });

    onShowHideMoreCities();

    $("#city_tagsinput").parent().click(function () {
        $("#city_tag").focus();
        $(".more-cities ").hide();
    });

    $("#city_tag").focus(function () {
        $("#city_tagsinput").parent().addClass("onfocus");
        $(".more-cities ").hide();
        $(".city-autocomplete-wrapper").tooltip("hide");
    });

    $("#city_tagsinput").parent().mouseover(function () {
        $(".more-cities ").addClass("hidden");
    });

    $("#city_tagsinput").parent().mouseout(function () {
        $(".more-cities ").removeClass("hidden");
    });

    $("#city_tag").blur(function () {
        $("#city_tagsinput").parent().removeClass("onfocus");
        $("#city_tagsinput").parent().scrollTop(0);
        onShowHideMoreCities();
    });


    $("#city_tag").catcomplete({
        minLength: 2,
        source: function (request, response) {
            $.ajax({
                url: $("#city").data("autocomplete-link").toString(),
                dataType: "json",
                data: {
                    term: extractLast(request.term)
                },
                success: function (data) {
                    response($.map(JSON.parse(data), function (item) {
                        return {
                            label: highlight(item.label, request.term),
                            value: item.label,
                            category: item.category,
                            id: item.id
                        };
                    }));
                }
            });
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        },
        open: function () {
            alignCitiesAutocomplete();
            if ($("body.tablet").length != 0) {
                $("html, body").animate({
                    scrollTop: Math.max($("#city_tag").offset().top - 70, 0)
                }, 200);
            }
        },
        select: function (event, ui) {
            // For countries redirect to country domain
            if (ui.item.id.lastIndexOf("cn_", 0) === 0) {
                window.location = "http://" + ui.item.id.substring(3) + ".green-acres.com";
            } else {
                var terms = split($("#city").val());
                var ids = split($("#city_id").val());
                $("#city_tag").val("");
                // do not add dublicates
                if (terms.indexOf(ui.item.value) < 0 && ids.indexOf(ui.item.id) < 0) {
                    window.addTagFromAutocomplete = true;
                    $("#city").addTag(ui.item.value, null, ui.item.id);
                    $("#city_tag").focus();
                }
            }
            return false;
        },
        autoFocus: $("body.tablet").length == 0
    });

    $(window).on("click touchend", function (e) {
        if ($(e.target).closest("#cityContainer").length || $(e.target).closest(".ui-autocomplete").length ||
            $(e.target).closest(".city-autocomplete-wrapper").length ||
            $(e.target).closest("#mn_p").length || $(e.target).closest("#mx_p").length ||
            $(e.target).closest(".filters-content input").length) {
            e.stopPropagation();
        } else {
            $(".city-autocomplete-wrapper input").blur();
            $("#mn_p").blur();
            $("#mx_p").blur();
            $(".filters-content input").blur();
        }
    });

    $(window).resize(function () {
        $(".city-autocomplete-wrapper").tooltip("hide");
        setTimeout(onShowHideMoreCities, 100);
    });

    /**** Login/Register on Mobile Start ****/
    $(".modal-header .ga-icon-budget-arrow").on("click", function () {
        $("body").removeClass("position-fixed");
        $(".modal-header button.close").trigger("click");

    });

    $(".custom-radio").on("click", function () {
        console.log($(this).find($("input")));
        $(this).closest("form").find($("input")).prop("checked", false).attr("checked", false);
        $(this).find($("input")).prop("checked", true).attr("checked", true);
    });
    /**** END Login/Register on Mobile Start ****/

    $("#searchForm :text").focus(function () {
        if ($("body.tablet").length != 0) {
            $(".more-filters-buttons").hide();
        }
    });

    $("#searchForm :text").blur(function () {
        if ($("body.tablet").length != 0) {
            $(".more-filters-buttons").show();
        }
    });
};

function alignCitiesAutocomplete() {
    var offset = $(".city-autocomplete-wrapper").offset();
    var height = $(".city-autocomplete-wrapper").height();
    var width = $(".city-autocomplete-wrapper").width() + 40;
    var top = offset.top + height + "px";
    var left = offset.left + "px";
    $("ul.ui-autocomplete").css({
        'position': "absolute",
        'left': left,
        'top': top,
        'width': width - 15
    });
    if ($("body.tablet").length != 0) {
        $(".ui-autocomplete").off("menufocus hover mouseover mouseenter");
    }
}

function onShowHideMoreCities() {
    var tags = $("#city_tagsinput .tag").toArray();
    var allPositions = tags.map(function (x) { return $(x).position(); });
    var allFirstLine = jQuery.grep(allPositions, function (x) { return (allPositions[0].top == x.top); });
    if (allFirstLine.length !== allPositions.length) {
        var leftPos = $(".home.other-pages").length ? 60 : 50;
        for (var i = 0; i < allFirstLine.length; i++) {
            // 21px = margin + padding + border
            leftPos += $(tags[i]).width() + 21;
        }
        $(".more-cities ").css("left", leftPos);
        $(".more-cities ").show();
    } else {
        $(".more-cities ").hide();
    }
}

function removeFromArray(array, value) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === value) {
            array.splice(i, 1);
        }
    }
}

function favoritesClickOnDocumentReady(isAuthenticated) {
    var favoritesClickOnDocumentReadyHandler =
        function (e) {
            e.preventDefault();
            var count_fav_text = $(".favourites-counter"),
                count_fav = count_fav_text.text();
            var advertId = $(this).data("advertid").toString();
            var fadeOnRemove = $(this).data("fadeonremove");
            $("div[data-advertid='" + advertId + "']").toggleClass("fav-active");
            $("span[data-advertid='" + advertId + "']").toggleClass("ga-icon-favourite-active");
            var selected = $(this).hasClass("ga-icon-favourite-active") || $(this).hasClass("fav-active");

            var cookieValues;
            if (Cookies("SelectedAdvert") != null) {
                cookieValues = Cookies("SelectedAdvert").split(":");
                removeFromArray(cookieValues, "");
            }
            else {
                cookieValues = new Array();
            }

            if (selected) {
                if (fadeOnRemove && fadeOnRemove.toString() === "True") {
                    $(this).parent().parent().removeClass("advert-transparent");
                }
                if ($.inArray(advertId, cookieValues) == -1) {
                    cookieValues.push(advertId);
                    Cookies.set("SelectedAdvert", cookieValues.join(":"), { expires: 256, path: "/" });
                }

                if (isAuthenticated === "True") {
                    var token = $("#__AjaxAntiForgeryForm").html();
                    $.ajax({
                        type: "POST", async: true,
                        data: $("<form>" + token + "</form>").serialize(),
                        url: "/Member/AddAdvertToBasket?advertId=" + advertId,
                    });
                }
            }
            else {
                if (fadeOnRemove && fadeOnRemove.toString() === "True") {
                    $(this).parent().parent().addClass("advert-transparent");
                }
                var index = $.inArray(advertId, cookieValues);
                if (index != -1) {
                    cookieValues.splice(index, 1);
                    Cookies.set("SelectedAdvert", cookieValues.join(":"), { expires: 256, path: "/" });
                }

                if (isAuthenticated === "True") {
                    var token2 = $("#__AjaxAntiForgeryForm").html();
                    $.ajax({
                        type: "POST", async: true,
                        data: $("<form>" + token2 + "</form>").serialize(),
                        url: "/Member/DeleteAdvertFromBasket?advertId=" + advertId,
                    });
                }
            }


            if (!(($("html").hasClass("this-is-old-ie"))) && !(document.documentElement.clientWidth < 568)) {
                if ($(this).is(".photo-area .ga-icon-favourite.ga-icon-favourite-active")) {
                    var clone_img = $(this).parent().parent().find(".swiper-slide-active img");
                    if ((clone_img.clone() !== null) && (clone_img.clone() !== undefined)) {

                        clone_img.clone()
                            .offset({
                                top: clone_img.offset().top,
                                left: clone_img.offset().left,
                                width: clone_img,
                                height: clone_img
                            })
                            .css({
                                'position': "absolute",
                                'z-index': "100"
                            })
                            .prependTo($("body"))
                            .animate({
                                'top': window.c_top,
                                'left': window.c_left,
                                'width': 40,
                                'opacity': 0
                            }, 3000, "easeOutQuart", function () {
                                $(this).detach();
                            });
                    }
                }
            }

            if (Cookies("SelectedAdvert") != null && Cookies("SelectedAdvert") !== "") {
                var newSelectedAdverts = Cookies("SelectedAdvert").split(":");
                if (newSelectedAdverts.length == 0) {
                    count_fav_text.hide();
                } else {
                    count_fav_text.html(newSelectedAdverts.length);
                    count_fav_text.show();
                }
            } else {
                count_fav_text.hide();
            }
        };
    $(".photo-area .ga-icons.ga-icon-favourite, .add-to-favourites, .item-photo-prev .ga-icons.ga-icon-favourite").unbind();
    $(".photo-area .ga-icons.ga-icon-favourite, .add-to-favourites, .item-photo-prev .ga-icons.ga-icon-favourite").on("click touchend", favoritesClickOnDocumentReadyHandler);
    window.isFavoriteListenersSet = true;
}

function RenderCaptchas() {
    // Update captchas only when jQuery and grecaptcha are loaded, it means, that it is a dialog update, so all scripts are already on the page
    if (typeof jQuery !== "undefined" && typeof grecaptcha !== "undefined") {
        $("div[class*='NoCaptchaContainer']").each(function (index) {
            var public_key = $(this).data("public-key");
            if ($.trim($(this).html()) == "") {
                grecaptcha.render($(this).attr("id"), {
                    'sitekey': public_key,
                    'theme': "light"
                });
            }
        });
    };
}

function putAdvertsToLocalStorage(nbResults) {
    if (isLocalStorageNameSupported()) {
        localStorage.clear();
        localStorage.setItem("adverts",
            jQuery("[data-advertid!=''][data-advertid]")
                .map(function () {
                    return $(this).data("advertid");
                })
                .get()
                .join(";"));

        jQuery("[data-advertid!=''][data-advertid]")
            .each(function (index, element) {
                localStorage.setItem("advert" + index, $(element).parents("a").attr("href"));
            });
        localStorage.setItem("searchQuery", Cookies(jsModel["AdvertType"] + "_search"));

        var previousPageEl = $("#previousPage");
        if (previousPageEl.length !== 0) {
            var previousPage = previousPageEl.attr("href");
            if (previousPage.lastIndexOf("=") === -1)
                localStorage.setItem("previousPage", "1");
            else
                localStorage.setItem("previousPage", previousPage.substring(previousPage.lastIndexOf("=") + 1));
        } else {
            localStorage.setItem("previousPage", "");
        }


        var nextPageEl = $("#nextPage");
        if (nextPageEl.length !== 0) {
            var nextPage = nextPageEl.attr("href");
            localStorage.setItem("nextPage", nextPage.substring(nextPage.lastIndexOf("=") + 1));
        } else {
            localStorage.setItem("nextPage", "");
        }

        if (nbResults.length !== 0) {
            localStorage.setItem("nbResults", nbResults);
        } else {
            localStorage.setItem("nbResults", "");
        }
    }
}

function favoritesLoginOnDocumentReady() {
    window.PrepareFavoritesLoginForm = function () {
        $("#memberLogin .btn-send").on("click", function (e) {
            if ($("#memberLogin").valid()) {
                $(this).prop("disabled", true);
                $("#memberLogin .button-ajax-loading").removeClass("hidden");
                $("#memberLogin").submit();
            }
        });

        // ajax success callback function name
        $("#memberLogin").attr("data-ajax-success", "PrepareFavoritesLoginForm");
    };

    PrepareFavoritesLoginForm();
}

function HomeConnectOnDocumentReady() {
    $("#agentConnect .btn-send").prop("disabled", false);
    $("#agentConnect .btn-send").on("click", function (e) {
        if ($("#agentConnect").valid()) {
            $(this).prop("disabled", true);
            $("#agentConnect .button-ajax-loading").removeClass("hidden");
            $("#agentConnect").submit();
        }
    });
}

function DefaultSubmitButton() {
    $(".btn-send.btn-send-default").on("click", function (e) {
        if ($(this).closest("form").valid()) {
            $(this).prop("disabled", true);
            $(this).find(".button-ajax-loading").removeClass("hidden");
            $(this).closest("form").submit();
        }
    });
}

function onAjaxRedirect(result) {
    DefaultSubmitButton();
    if (result.url) {
        // if the server returned a JSON object containing an url 
        // property we redirect the browser to that url
        window.location.href = result.url;
    }
}

function createAutoCompleteCityDropdown(countryId, twoLetterIsoLanguageName, regionId, departmentId, resetLocationInput, selectLocation, withCityGroup) {
    $("#autocompleteCity").autocomplete({
        source: function (request, response) {
            $("#loaderAutocompleteCities").removeClass("hidden");
            resetLocationInput();
            $.ajax({
                url: "/Geo/AutoCompleteCities" + "?twoLetterIsoLanguageName=" + twoLetterIsoLanguageName + "&limit=50&countryCode=" + countryId + "&regionId=" + regionId + "&departmentId=" + departmentId,
                dataType: "json",
                data: {
                    term: request.term
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        var labelAutocomplete = item.Name;
                        labelAutocomplete += (item.CityPostalCode ? " (" + item.CityPostalCode + ")" : "");
                        return {
                            label: labelAutocomplete,
                            value: item.CityId,
                            id: item.CityId,
                            name: item.Name,
                            department: item.DepartmentLoc,
                            department_id: item.DepartmentId,
                            region: item.RegionLoc,
                            region_id: item.RegionId,
                            postal_code: item.CityPostalCode,
                            latitude: item.Latitude,
                            longitude: item.Longitude
                        };
                    }));
                    $("#loaderAutocompleteCities").addClass("hidden");
                },
                error: function () {
                    $("#loaderAutocompleteCities").addClass("hidden");
                }
            });
        },
        minLength: 1,
        focus: function (event, ui) {
            $("#autocompleteCity").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            selectLocation(event, ui);
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
                $("#autocompleteCity").val("");
                resetLocationInput();
            }
        }
    })
        .autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append(
                "<div>"
                + "<span>" + item.name + (item.postal_code ? " (" + item.postal_code + ")" : "") + "</span>" +
                "<br/>" + "<span class=\"text-italic\">" + (item.department ? item.department : "") + (item.region ? ", " + item.region : "") + "</span>" +
                "</div>"
                ).appendTo(ul);
        };
}