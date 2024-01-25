(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MWBSDZK');


function resizeVH(){
    let h = .01 * window.innerHeight;
    setTimeout(function(){
        document.documentElement.style.setProperty("--vh", `${h}px`)    
    }, 250);
}

resizeVH();
$(window).on('resize', resizeVH);

function headerMenu(){
    let btnOpen = $(document).find('.js-header--burger');
    let menu = $(document).find('.js-header--menu');
    let btnClose = menu.find('.js-header--menu__close');
    let bg = $(document).find('.js-header--bg');

    btnOpen.on('click', function(){
        menu.addClass('show');
        bg.addClass('show');
    });

    btnClose.on('click', function(){
        menu.removeClass('show');
        bg.removeClass('show');
    });

    bg.on('click', function(){
        btnClose.trigger('click');
    });
}

function headerNav(){}{
    let navLink = $(document).find('.js-header--nav a, .js-header--menu__nav a');
    navLink.on('click', function(e){
        e.preventDefault();
        let $this = $(this);
        let target = $(e.target);
        let dest = $this.attr('href');
        let parent = $this.closest('nav');

        let mobileMenuClose = $(document).find('.js-header--menu__close');

        if (target.is('.js-header--menu__nav a')) { mobileMenuClose.trigger('click'); }

        if(dest !== undefined && dest !== '') {
            $('html').animate({
                scrollTop: ($(dest).offset().top) - 125
            }, 800 );
        }
    });
}

headerNav();

const casesCarousel = new Swiper('.js-cases--carousel', {
    spaceBetween: 24,
    slidesPerView: 1,
    loop: true,
    breakpoints: {
        501: {
            spaceBetween: 34,
            slidesPerView: 1,
            loop: true,
        },
        769: {
            spaceBetween: 24,
            slidesPerView: 2,
            loop: true,
        },
        1025: {
            slidesPerView: 2,
            spaceBetween: 50,
            loop: true,
        },
        1201: {
          slidesPerView: 3,
          spaceBetween: 29,
          loop: true,
        },
    },
    navigation: {
        nextEl: '.js-cases--next',
        prevEl: '.js-cases--prev',
    },
    pagination: {
        el: '.js-cases--pagination',
        type: 'bullets',
    },
});

headerMenu();

let inputs = $(document).find('input[type="text"]');

inputs.on('focus', function(){
    let $this = $(this);
    $this.removeClass('error');
});

function formValidate(form){
    let inputs = form.find('input[type="text"]');
    let status = true;

    inputs.each(function(){
        let $this = $(this);
        if ($this.val() == ''){
            $this.addClass('error');
            status = false;
        }
    });

    return status;
}

$(document).on('submit', '.js-consult--form', function(e){
    e.preventDefault();
    let f = $(this);
    let wrap = f.closest('section');
    if (formValidate(f)){
        $.ajax({
            type: "POST",
            url: "/assets/php/mail.php",
            data: f.serialize(),
        }).done(function(res) {
            if (res == 'OK'){
                dataLayer.push({"event": "SendForm"});
                f.find('input, button').prop('disabled', true);
                wrap.addClass('success');
                setTimeout(function(){
                    wrap.removeClass('success');
                }, 4000);
            } else {
                console.log('Error');
            }
        });   
    }
});

let caseImagesCarousel = new Swiper('.js-case--center__item--images', {
    slidesPerView: 1.3,
    spaceBetween: 20,
    breakpoints: {
        501: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1025: {
            slidesPerView: 4,
            spaceBetween: 36
        }
    },
    navigation: {
        nextEl: '.js-case--center__item--arrow.next',
        prevEl: '.js-case--center__item--arrow.prev',
    },
});

function modalConsult(){
    let modal = $(document).find('.js-consult--modal');
    let btnClose = modal.find('.js-consult--modal__close');
    let modalBg = modal.find('.js-consult--modal__bg');
    let btnOpen = $(document).find('.js-consult');

    btnOpen.on('click', function(){
        modal.addClass('open');
    });

    btnClose.on('click', function(){
        modal.removeClass('open');
    });

    modalBg.on('click', function(){
        btnClose.trigger('click');
    });
}

modalConsult();

$(document).find('input[name="phone"]').on('keypress', function() {
    return event.charCode >= 48 && event.charCode <= 57;
});


$(document).on('click', '.iti__country', function(){
    let $this = $(this);
    let thisCode = $this.find('.iti__dial-code').text();
    
    $(document).find('input[name="country_code"]').attr('value', thisCode);
});

$(function(){
    
});