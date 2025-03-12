var addDuration = $('.uuu-popup-add').attr('data-duration');
var addCookieDuration = $('.uuu-popup-add').attr('data-cookie-duration');
var addRepeat = $('.uuu-popup-add').attr('data-is-repeat');
//Home page Carousel video
$('.hero-play-button').on('click', function (ev) {
    $(".hero-video-iframe iframe")[0].src += "&autoplay=1";
    ev.preventDefault();
    $(".hero-iframe-video .hero-video-iframe").css('display', 'block');
    $(".hero-play-button").css('display', 'none');
    $(".hero-iframe-video img").css('display', 'none');
});


//Iframe Video Section
$('.play-button').on('click', function (ev) {
    $('#carouselVideo').attr('data-bs-interval', "false");
    ev.preventDefault();
    var selectedId = $(this).attr("data-id");
    console.log(selectedId);
    $(".iframe-video").each(function () {
        var cId = $(this).attr("data-id");
        console.log(cId);
        if (cId == selectedId) {
            $("#iframe-video-iframe-" + cId)[0].src += "&autoplay=1";
            $("#iframe-video-container-" + cId).css('display', 'block');
            $("#iframe-play-button-" + cId).css('display', 'none');
            $("#iframe-video-img-" + cId).css('display', 'none');
        }
        else {
            $("#iframe-video-iframe-" + cId)[0].src += "?autoplay=1";
            $("#iframe-video-container-" + cId).css('display', 'none');
            $("#iframe-play-button-" + cId).css('display', 'flex');
            $("#iframe-video-img-" + cId).css('display', 'block');
        }
    });
});
//Pop Up Add
$(document).on('click', '.uuu-popup-add .btn-close-add', function () {
    $('.uuu-popup-add').addClass('d-none');
    setCookie("addCloseBtnClick", "true", addCookieDuration);
});
setTimeout(function () {
    $('.uuu-popup-add').addClass('d-none');
}, addDuration * 1000);

var addCloseBtnClick = getCookie("addCloseBtnClick");
if (addRepeat != null) {
    addRepeat = addRepeat.toLowerCase();
}
if (addCloseBtnClick != null) {    
    if (addCloseBtnClick == 'true' && addRepeat == 'true') {
        $('.uuu-popup-add').removeClass('d-none');
    } else {
        $('.uuu-popup-add').addClass('d-none');
    }
}
//Course Details Video
$('.course-iframe-video .course-play-button').on('click', function (ev) {
    $(".course-iframe-video iframe")[0].src += "&autoplay=1";
    ev.preventDefault();
    $(".course-iframe-video .video-iframe").css('display', 'block');
    $(".course-iframe-video .course-play-button").css('display', 'none');
    $(".course-iframe-video img").css('display', 'none');
});

//hero slider responsive script
if (window.matchMedia('(max-width: 1140px)').matches) {
    $(".hero-fluid").removeClass("container-fluid").addClass("container");
}

$(document).ready(function () {
    LoadMoreFunction(isShowLoadMore);
});
var isShowLoadMore = 1;
var programLoadMoreNumber = $('#programLoadMoreNumber').val();
var programShowProgramNumber = $('#programShowProgramNumber').val();
programLoadMoreNumber = parseInt(programLoadMoreNumber);
programShowProgramNumber = parseInt(programShowProgramNumber);
function LoadMoreFunction(isShowLoadMore) {
    const coursePageHome = document.querySelector('.course-home-section');
    const coursePageLoadMore = document.querySelector('.course-home-section .load-more');
    const coursePageBtnMore = document.querySelector('.course-home-section .btn-more');
    if (coursePageBtnMore != null) {
        const coursePageElementList = [...document.querySelectorAll('.course-home-section .course')];
        let coursePageCurrentItems = programShowProgramNumber;
        if (isShowLoadMore == 1) {
            if (coursePageElementList.length <= coursePageCurrentItems) {
                coursePageLoadMore.style.display = 'none';
                coursePageHome.style.marginBottom = '0px';
            }
            if (coursePageElementList != null) {
                for (var i = 1; i <= coursePageCurrentItems; i++) {
                    var element = document.querySelector(`.course-home-section .course:nth-child(${i})`);
                    if (element != null || element != undefined) {
                        element.style.display = 'flex';
                    }
                }
            }
            coursePageBtnMore.addEventListener('click', function (event) {
                for (let k = coursePageCurrentItems; k < coursePageCurrentItems + programLoadMoreNumber; k++) {
                    if (coursePageElementList[k]) {
                        coursePageElementList[k].style.display = 'flex';
                    }
                }
                coursePageCurrentItems += programLoadMoreNumber;
                if (coursePageCurrentItems >= coursePageElementList.length) {
                    event.target.style.display = 'none';
                    coursePageLoadMore.style.display = 'none';
                    coursePageHome.style.marginBottom = '0px';
                }
            });
            if (coursePageElementList.length <= 6) {
                coursePageLoadMore.style.display = 'none';
            }
        }
        else {
            coursePageLoadMore.style.display = 'none';
            coursePageHome.style.marginBottom = '0px';
        }
    }
}

$('#ClassType').change(function () {
    $('#ProgramType').val(0);
    $('#PaymentType').val(0);
    FilterWiseCardShowHide($(this), 'data-class');
});
$('#ProgramType').change(function () {
    $('#PaymentType').val(0);
    FilterWiseCardShowHide2($(this), 'data-program');
});
$('#PaymentType').change(function () {
    FilterWiseCardShowHide3($(this), 'data-payment');
});
function FilterWiseCardShowHide(elem, data) {
    $('.course-home-section .course').removeClass('d-flex');
    $('.course-home-section .course').removeClass('d-none');
    isShowLoadMore = 0;
    LoadMoreFunction(isShowLoadMore);
    var value = $(elem).val();
    $('.course-home-section .course').each(function () {
        var dataClass = $(this).attr(data);
        var valuesArray = dataClass.split(',');

        if (valuesArray.includes(value)) {
            $(this).addClass('d-flex').removeClass('d-none');
        }
        else if (value == 0) {
            const coursePageLoadMore = document.querySelector('.course-home-section .load-more');
            coursePageLoadMore.style.display = 'inherit';
            isShowLoadMore = 1;
            LoadMoreFunction(isShowLoadMore);
        }
        else {
            $(this).removeClass('d-flex').addClass('d-none');
        }
    });
    if ($('.course-home-section .course').length == $('.course-home-section .course.d-none').length) {
        $('.not-found-message').removeClass('d-none');
    }
    else {
        $('.not-found-message').addClass('d-none');
    }
}
function FilterWiseCardShowHide2(elem, data) {
    $('.course-home-section .course').removeClass('d-flex');
    $('.course-home-section .course').removeClass('d-none');
    isShowLoadMore = 0;
    LoadMoreFunction(isShowLoadMore);
    var value = $('#ClassType').val();
    var valueProgram = $(elem).val();
    $('.course-home-section .course').each(function () {
        var dataClass = $(this).attr('data-class');
        var dataprogram = $(this).attr(data);
        var valuesArray = dataClass.split(',');
        var valuesArrayProgram = dataprogram.split(',');
        if ((valuesArray.includes(value) || value == 0) && (valuesArrayProgram.includes(valueProgram) || valueProgram == 0)) {
            $(this).addClass('d-flex').removeClass('d-none');
        }
        else if (valueProgram == 0 && value == 0) {
            const coursePageLoadMore = document.querySelector('.course-home-section .load-more');
            coursePageLoadMore.style.display = 'inherit';
            isShowLoadMore = 1;
            LoadMoreFunction(isShowLoadMore);
        }
        else {
            $(this).removeClass('d-flex').addClass('d-none');
        }
    });
    if ($('.course-home-section .course').length == $('.course-home-section .course.d-none').length) {
        $('.not-found-message').removeClass('d-none');
    }
    else {
        $('.not-found-message').addClass('d-none');
    }
}
function FilterWiseCardShowHide3(elem, data) {
    $('.course-home-section .course').removeClass('d-flex');
    $('.course-home-section .course').removeClass('d-none');
    isShowLoadMore = 0;
    LoadMoreFunction(isShowLoadMore);
    var value = $('#ClassType').val();
    var valueProgram = $('#ProgramType').val();
    var valuePayment = $(elem).val();
    $('.course-home-section .course').each(function () {
        var dataClass = $(this).attr('data-class');
        var dataprogram = $(this).attr('data-program');
        var datapayment = $(this).attr(data);
        var valuesArray = dataClass.split(',');
        var valuesArrayProgram = dataprogram.split(',');
        var valuesArrayPayment = datapayment.split(',');
        if ((valuesArray.includes(value) || value == 0) && (valuesArrayProgram.includes(valueProgram) || valueProgram == 0) && (valuesArrayPayment.includes(valuePayment) || valuePayment == 0)) {
            $(this).addClass('d-flex').removeClass('d-none');
        }
        else if (valueProgram == 0 && value == 0 && valuePayment == 0) {
            const coursePageLoadMore = document.querySelector('.course-home-section .load-more');
            coursePageLoadMore.style.display = 'inherit';
            isShowLoadMore = 1;
            LoadMoreFunction(isShowLoadMore);
        }
        else {
            $(this).removeClass('d-flex').addClass('d-none');
        }
    });
    if ($('.course-home-section .course').length == $('.course-home-section .course.d-none').length) {
        $('.not-found-message').removeClass('d-none');
    }
    else {
        $('.not-found-message').addClass('d-none');
    }
}

function setCookie(name, value, hours) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(name) {
    var cookieArray = document.cookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
} 


