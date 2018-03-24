var bigAvatarSmallAvatar = $('.elgg-avatar-medium');
var bigAvatarScreen = $('#bigAvatarScreen')
var bigAvatar = $('#bigAvatar')
var bigAvatarWidth = bigAvatar.width()
var bigAvatarHeight = bigAvatar.height()

function bigAvatarShow() {
    bigAvatar.css('display', 'block')
    bigAvatar.offset(bigAvatarSmallAvatar.offset())
    bigAvatar.width(bigAvatarSmallAvatar.width())
    bigAvatar.height(bigAvatarSmallAvatar.height())
    bigAvatar.animate({
        top: $(window).height() / 2 - bigAvatarHeight / 2,
        left: $(window).width() / 2 - bigAvatarWidth / 2,
        width: bigAvatarWidth,
        height: bigAvatarHeight
    })
    bigAvatarScreen.css('display', 'block')
    bigAvatarScreen.animate({
        backgroundColor: jQuery.Color('#000000').transition(
            'transparent',
            0.3
        )
    })
}

function bigAvatarHide() {
    bigAvatar.animate({
            left: bigAvatarSmallAvatar.offset().left,
            top: bigAvatarSmallAvatar.offset().top,
            width: bigAvatarSmallAvatar.width(),
            height: bigAvatarSmallAvatar.height()
        },
        function () {
            bigAvatar.css('display', 'none');
        }
    )
    bigAvatarScreen.animate({
            backgroundColor: jQuery.Color('#000000').transition(
                'transparent',
                1
            )
        },
        function () {
            bigAvatarScreen.css('display', 'none')
        }
    )
}

/**
 * Adds the big avatar feature
 */
function registerBigAvatar() {
    bigAvatarSmallAvatar.on('click',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            if (bigAvatar.css('display') === 'none') {
                bigAvatarShow()
            } else {
                bigAvatarHide()
            }

        }
    )
    bigAvatarScreen.on('click',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            bigAvatarHide()
        }
    )
    bigAvatar.on('click',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            bigAvatarHide()
        }
    )
}

$.when($.ready).then(registerBigAvatar);
