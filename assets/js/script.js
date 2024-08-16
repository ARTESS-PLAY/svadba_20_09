const urlLink =
    'https://api.telegram.org/bot6681287357:AAG2v9iKhXAo6tW54B3rgHYNkI7tb8QoS-U/sendMessage?chat_id=-1002174643985&parse_mode=html&text=';

$(document).ready(function () {
    /**
     * Запускаем видео при загрузке страницы
     */
    var img = new Image();
    img.src = './assets/images/site_start.gif';
    img.onload = function () {
        console.log('я загрузился');

        setTimeout(() => {
            $('#preloader_animation img').show();
            $('#preloader_animation img').attr('src', './assets/images/site_start.gif');
            $('#preloader_animation').addClass('preloader_animation--active');

            // Поджигаем огонёк
            setTimeout(() => {
                $('#preloader_animation').fadeOut();
            }, 1700);
            setTimeout(() => {
                $('#preloader_animation').remove();
            }, 2000);

            // Поджигаем огонёк
            setTimeout(() => {
                $('html').removeClass('no-scroll');
                $('body').removeClass('no-scroll');
                $('#video_fire_start').show();
                $('#video_fire_start').attr('src', './assets/images/fite_start.gif');

                // Регестрируем таймаут, на смену видео на гифку
                setTimeout(() => {
                    $('#video_fire_start').hide();
                    $('#video_fire_gif').show();
                }, 11000);

                // Выводим первую секцию
                setTimeout(() => {
                    $('main .container').css('opacity', 1);
                    $('main .container').css('transform', 'translateY(0)');

                    setTimeout(() => {
                        $('main .under_line').addClass('under_line--active');
                    }, 500);
                }, 800);
            }, 1800);
        }, 10);
    };

    /**
     * Появление блоков
     */

    $(window).on('scroll', function () {
        const windowHeight = window.innerHeight;

        $('section .container, footer .container').each(function () {
            if ($(this)[0].getBoundingClientRect().top < windowHeight - 100) {
                $(this).css('opacity', 1);
                $(this).css('transform', 'translateY(0)');
            }
        });

        $('.under_line').each(function () {
            if ($(this)[0].getBoundingClientRect().top < windowHeight - 100) {
                setTimeout(() => {
                    $(this).addClass('under_line--active');
                }, 500);
            }
        });
    });

    /**
     * Кнопочки-крутилочки
     */
    $('.form__bnts .cute_btn').on('click', function (e) {
        e.preventDefault();
        $('.cute_btn--error').removeClass('cute_btn--error');

        if ($(this).hasClass('cute_btn--active')) return;

        $('.cute_btn--active').removeClass('cute_btn--active');
        $(this).addClass('cute_btn--active');
    });

    /**
     * Отправка в тг
     */
    $('#main_form').on('submit', function (e) {
        e.preventDefault();

        let valid = true;

        const name = $('#name').val();
        const surname = $('#surname').val();
        const alco = $('#alco').val();
        const can = $('.cute_btn--active').attr('data-value');

        if (!name) {
            $('#name').addClass('input--error');
            valid = false;
        }

        if (!surname) {
            $('#surname').addClass('input--error');
            valid = false;
        }

        if (!alco) {
            $('#alco').addClass('input--error');
            valid = false;
        }

        if (!can) {
            $('.form__bnts .cute_btn').addClass('cute_btn--error');
            valid = false;
        }

        if (!valid) return;

        $('.form_submin').addClass('form_submin--active ');

        let str = `<b>Новый ответ на приглашение:</b>%0A<b>Имя:</b> ${name}%0A<b>Фамилия:</b> ${surname}%0A<b>Алкоголь:</b> ${alco}%0A<b>${
            can == 'can' ? 'Смогу' : 'Не смогу'
        }</b>`;

        fetch(urlLink + str)
            .then((data) => {
                $('section.form').hide();
                $('section.tnx').fadeIn();
                $('#can_res').text($('.cute_btn--active').text());
            })
            .catch((e) => {
                $('section.form').hide();
                $('section.tnx').fadeIn();
                $('#can_res').text('Произошла ошибка');
                console.log(e);
            });
    });

    /**
     * Сброс ошибок инпутов
     */

    $('form input').on('change, keyup', function () {
        $(this).removeClass('input--error');
    });
});
