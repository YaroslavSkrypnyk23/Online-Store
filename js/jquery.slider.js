$(document).ready(function(){
    $('.top-slider__wrapper').slick({
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev">Prev</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
    });
});
$(document).ready(function(){
    $('.bottom-slider__wrapper').slick({
        arrows: true,
        dots: false,
        // autoplay: true,
        slidesToShow: 5,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev">Prev</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
    });
});