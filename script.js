var page = 'top';

document.ontouchstart = function () { };
document.addEventListener('touchstart', function () { }, true);
document.addEventListener('touchstart', function () { }, false);

$(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
        $('.themes-header').addClass('header-fade-in');
    } else { }
});

$(window).on('load', function () {
    $('#btn-nav-icon').on('click', function () {
        $('.tmp-menu').toggleClass('none');
    });
    $('#btn-nav-icon').on('click', function () {
        $('body').toggleClass('menu-opened');
        if ($('body').hasClass('menu-opened')) {
            disableScrolling();
        } else {
            enableScrolling();
        }
    });
    $('#btn-nav-icon-cross').on('click', function () {
        $('.tmp-menu').addClass('none');
    });
    $('footer').hide().delay(2000).fadeIn(1000,);
    if ($('.js-scroll-trigger').length) {
        scrollAnimation();
    }
    $(window).trigger('scroll');
});

function scrollAnimation() {
    $(window).scroll(function () {
        $(".js-scroll-trigger").each(function () {
            let position = $(this).offset().top,
                scroll = $(window).scrollTop(),
                windowHeight = $(window).height();
            if (page != undefined && page == 'top') {
                if (scroll > position - windowHeight + 50) {
                    $(this).addClass('is-active');
                }
            } else {
                if (scroll > position - windowHeight) {
                    $(this).addClass('is-active');
                }
            }
        });
    });
}

function displayAlert() {
    if (page != undefined && page == 'lp202111') {
    } else {
        var windowSize = window.innerWidth;
        if (windowSize < 992 && windowSize >= 465) {
            $('#modal_qrcode').modal('show');
        } else {
            $('#modal_qrcode').modal('hide');
        }
    }
}
function checkIosVersion() {
    var ua = navigator.userAgent.toLowerCase();
    var modalIosSafari = $('#modal_ios_safari');
    if (ua.indexOf('edge') != -1 || ua.indexOf('chrome') != -1) {
        modalIosSafari.modal('hide');
    } else if (ua.indexOf('safari') != -1) {
        if (ua.match(/(iphone|ipad) os (1[4-9]|[2-9]\d)/)) {
            modalIosSafari.modal('hide');
        } else if (ua.match(/iphone|ipad/)) {
            modalIosSafari.modal('show');
        } else {
            modalIosSafari.modal('hide');
        }
    }
}
if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    onReadyHandler();
} else {
    document.addEventListener("DOMContentLoaded", onReadyHandler);
}
function onReadyHandler() {
    setAccordion();
    setModal();
    setScrollObserver();
}

$(document).ready(function () {
    $('footer').removeClass('d-none');
    checkIosVersion();

    $('a[href^="#"]').click(function () {
        var h2Hight = 155;
        var time = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" ? 'html' : href);
        var distance = target.offset().top - h2Hight;
        $("html, body").animate({
            scrollTop: distance
        }, time, "swing");
        return false;
    });

});

function setAccordion() {
    $('.accordion-trigger,.accordion-close').on('click', function () {
        const accordion_wrapper = $(this).closest('.accordion-wrapper')
        if (accordion_wrapper) {
            const accordion_body = accordion_wrapper.find('.accordion-body');
            if (accordion_body.is(':visible')) {
                accordion_body.slideUp();
                accordion_wrapper.removeClass('is-open');
            } else {
                accordion_body.slideDown();
                accordion_wrapper.addClass('is-open');
            }
        }
    })
}

function setModal() {
    $('.modal-trigger').on('click', function () {
        const target = $(this).attr('data-target');
        if ($(target).length > 0) {
            $('.modal-wrapper').find('.modal-body').hide();
            $(target).show()
            $('.modal-wrapper').fadeIn();
            disableScrolling();
        }
    })
    $('.modal-wrapper').on('click', function (e) {
        if ($(e.target).closest('.modal-body').length == 0) {
            $('.modal-wrapper').fadeOut();
            enableScrolling();
        }
    })
}

function setScrollObserver() {
    const observer = new IntersectionObserver(onHideVisual, {
        root: null,
        rootMargin: "0% 0%",
        threshold: 0
    });
    const elm = document.querySelector('.js-mainvisual');
    if (elm) {
        observer.observe(elm);
    }
}

function onHideVisual(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.body.classList.remove("is-scroll");
        } else {
            document.body.classList.add("is-scroll");
        }
    });
}
