var Tabs = function(options) {
    this.links = options.links;
    this.pages = options.pages;
    this.onChange    = options.onChange || function() {};
    this.defaultPage = options.defaultPage || pages.first();

    var tabs = this;

    var updateLinks = function(target) {
        $(tabs.links).removeClass('target');
        $(tabs.links)
            .filter('[href="#' + $(target).attr('id') + '"]')
            .addClass('target');
    };

    var slideOut = function(element) {
        return $(element)
            .transition({opacity: 0, x: '50px'})
            .queue(function() { $(this).hide().dequeue(); });
    };

    var slideIn = function(element) {
        $(element)
            .css({opacity: 0, transform: 'translate(50px, 0px)'})
            .show();
        tabs.onChange({target: $(element)});
        return $(element)
            .transition({opacity: 1, x: '0px'})
    }

    this.change = function(target) {
        var oldTarget = $(this.links).filter('.target').attr('href');
        updateLinks(target)
        slideOut(oldTarget)
            .queue(function() { $(this).dequeue(); slideIn(target); });
    };

    $(this.pages).hide();
    $(this.defaultPage).show();
    updateLinks(this.defaultPage);
    
    $(this.links).on('click', function(event) {
        event.preventDefault();
        tabs.change(event.target.hash);
    });
};
