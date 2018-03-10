(function ($) {
    $.fn.jsCarousel = function (options) {
        
        // default settings
        var settings = $.extend({
            slideDuration: 500,
            slideWidth: 200,
            visibleItems: 1,
            orientation: 'H'
        }, options);


        // create carousel structure
        var _self = this;
        _self.settings = settings;
        _self.carouselWrapper = _self.wrap('<div class="js_carousel_wrapper"></div>');
        _self.carouselSlides = _self.find('ul.carousel_items > li');
        _self.carouselPagination = $('<p class="js_carousel_pagination"></p>');
        _self.carouselMask = _self.find('ul.carousel_items');
        _self.carouselPagers = '';
        _self.lastElementIndex = '';
        _self.currentSlideIndex = 0;

        // add controls: prev, next and dots
        _self.addCarouselControls = function () {
            _self.carouselWrapper.width( _self.settings.slideWidth * _self.settings.visibleItems);
            _self.carouselWrapper.append('<a href="javascript:void(0);" class="js_carousel_previous">‹</a>');
            _self.carouselWrapper.append('<a href="javascript:void(0);" class="js_carousel_next">›</a>');

            var totalWidth = 0;

            for (var i = 0; i < _self.carouselSlides.length; i++) {
                var j = i + 1;
                _self.carouselPagination.append('<a href="javascript:void(0);">' + j + '</a>');
                var slide = _self.carouselSlides[i];
                totalWidth += $(slide).width();
                $(slide).find('.slide-item-content').width(_self.settings.slideWidth + 'px');
            }
            _self.carouselMask.width(totalWidth);
            _self.carouselPagination.find('a:first-child').addClass('active');
            _self.carouselWrapper.append(_self.carouselPagination);
            _self.carouselPagers = _self.find('.js_carousel_pagination a');
            _self.lastElementIndex = _self.carouselPagers.length - 1;
        };

        // function to add controls
        _self.addCarouselControls();

        // carousel dot click handlers
        _self.carouselPagers.click(function () {
            if (!$(this).hasClass('active')) {
                _self.currentSlideIndex = $(this).index();
                _self.slideSwitch();
            }
        });

        // add next click handler
        _self.next = _self.find('.js_carousel_next');
        _self.next.click(function () {
            _self.currentSlideIndex = _self.find('.js_carousel_pagination a.active').index();
            _self.currentSlideIndex = _self.currentSlideIndex === _self.lastElementIndex ? 0 : _self.currentSlideIndex + 1;
            _self.slideSwitch();
        });

        // add prev click handler
        _self.prev = _self.find('.js_carousel_previous');
        _self.prev.click(function () {
            _self.currentSlideIndex = _self.find('.js_carousel_pagination a.active').index();
            _self.currentSlideIndex = _self.currentSlideIndex === 0 ? _self.lastElementIndex : _self.currentSlideIndex - 1;
            _self.slideSwitch();
        });

        // initially hide prev 
        _self.prev.hide();

        // switch slide
        _self.slideSwitch = function () {
           
          // if last slide, hide next button
          // else show
           if( _self.currentSlideIndex == _self.lastElementIndex) {
            _self.next.hide();
           } else {
            _self.next.show();
           }
            
           // if first slide, hide prev buton
           // else show 
           if(_self.currentSlideIndex == 0) {
            _self.prev.hide();
           } else {
            _self.prev.show();
           }

            var slideWidth = _self.find('ul.carousel_items li').width();
            _self.carouselMask
            .stop(true, false)
            .animate({ 'left': '-' + slideWidth * _self.currentSlideIndex + 'px' }, _self.settings.slideDuration, function () {});
            _self.carouselPagers.removeClass('active').eq(_self.currentSlideIndex).addClass('active');
        };

        return _self;
    };
}(jQuery));