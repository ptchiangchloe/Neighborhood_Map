(function(window) {

    'use strict';
    /**
     * Each helper function.
     */
    function each(collection, callback) {
        for (var i = 0; i < collection.length; i++) {
            var item = collection[i];
            callback(item);
        }
    }

    /**
     * Menu Constructor.
     */
    function Menu() {
        this._init();
    }

    /**
     * Initialise Menu.
     */
    Menu.prototype._init = function() {
        this.body = document.body;
        this.wrapper = document.querySelector('#o-wrapper');
        this.mask = document.querySelector('#c-mask');
        this.menu = document.querySelector('#c-menu--slide-left');
        this.searchBox = document.querySelector('#search-box');
        this.closeBtn = this.menu.querySelector('.c-menu__close');
        this.menuOpeners = document.querySelectorAll('.c-button');
        this._initEvents();
    };

    /**
     * Initialise Menu Events.
     */
    Menu.prototype._initEvents = function() {
        // Event for clicks on the close button inside the menu.
        this.closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.close();
        }.bind(this));

        // Event for clicks on the mask.
        // this.mask.addEventListener('click', function(e) {
        //   e.preventDefault();
        //   this.close();
        // }.bind(this));
    };

    /**
     * Open Menu.
     */
    Menu.prototype.open = function() {
        this.body.classList.add('has-active-menu');
        this.wrapper.classList.add('has-slide-left');
        this.menu.classList.add('is-active');
        // this.mask.classList.add('is-active');
        this.disableMenuOpeners();
    };

    /**
     * Close Menu.
     */
    Menu.prototype.close = function() {
        this.body.classList.remove('has-active-menu');
        this.wrapper.classList.remove('has-slide-left');
        this.menu.classList.remove('is-active');
        // this.mask.classList.remove('is-active');
        this.enableMenuOpeners();
    };

    /**
     * Disable Menu Openers.
     */
    Menu.prototype.disableMenuOpeners = function() {
        each(this.menuOpeners, function(item) {
            item.disabled = true;
        });
    };

    /**
     * Enable Menu Openers.
     */
    Menu.prototype.enableMenuOpeners = function() {
        each(this.menuOpeners, function(item) {
            item.disabled = false;
        });
    };
    /**
     * Add to global namespace.
     */
    window.Menu = Menu;

})(window);

window.onload = function() {
    var slideBar = new Menu();
    var slideBtn = document.querySelector('#c-button--slide-left');
    slideBtn.addEventListener('click', function(e) {
        slideBar.open();
    });
}
