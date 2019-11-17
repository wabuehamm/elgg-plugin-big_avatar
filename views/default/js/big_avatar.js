var BigAvatar = function () {
    this._bigAvatarSmallAvatar = $('.elgg-avatar-large');
    this._bigAvatarScreen = $('#bigAvatarScreen')
    this._bigAvatar = $('#bigAvatar')
    this._bigAvatarWidth = this._bigAvatar.width()
    this._bigAvatarHeight = this._bigAvatar.height()

    var self = this;

    this._bigAvatarSmallAvatar.on('click',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            if (self._bigAvatar.css('display') === 'none') {
                self.show()
            } else {
                self.hide()
            }

        }
    )
    this._bigAvatarScreen.on('click',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            self.hide()
        }
    )
    this._bigAvatar.on('click',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            self.hide()
        }
    )
}


BigAvatar.prototype.show = function() {
    this._bigAvatar.css('display', 'block')
    this._bigAvatar.offset(this._bigAvatarSmallAvatar.offset())
    this._bigAvatar.width(this._bigAvatarSmallAvatar.width())
    this._bigAvatar.height(this._bigAvatarSmallAvatar.height())
    this._bigAvatar.animate({
        top: $(window).height() / 2 - this._bigAvatarHeight / 2,
        left: $(window).width() / 2 - this._bigAvatarWidth / 2,
        width: this._bigAvatarWidth,
        height: this._bigAvatarHeight
    })
    this._bigAvatarScreen.css('display', 'block')
    this._bigAvatarScreen.animate({
        backgroundColor: $.Color('#000000').transition(
            'transparent',
            0.3
        )
    })
}

BigAvatar.prototype.hide = function() {
    var self = this;
    this._bigAvatar.animate({
            left: this._bigAvatarSmallAvatar.offset().left,
            top: this._bigAvatarSmallAvatar.offset().top,
            width: this._bigAvatarSmallAvatar.width(),
            height: this._bigAvatarSmallAvatar.height()
        },
        function () {
            self._bigAvatar.css('display', 'none');
        }
    )
    this._bigAvatarScreen.animate({
            backgroundColor: $.Color('#000000').transition(
                'transparent',
                1
            )
        },
        function () {
            self._bigAvatarScreen.css('display', 'none')
        }
    )
}

/**
 * Adds the big avatar feature
 */
function registerBigAvatar() {
    var bigAvatar = new BigAvatar();
}

$.when($.ready).then(registerBigAvatar);
