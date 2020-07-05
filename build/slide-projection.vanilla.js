/**
 *
 * @source: http://www.lduros.net/some-javascript-source.js
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2020  Vishal J. Turi
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

!(function (d) {

    // SP CLASSES / IDENTITIES
    let spIdentity = {
        attributePrefix: 'data-sp-',
        wrapperClass: '.sp-wrapper',
        slideshowClass: '.sp-slideshow',
        slideClass: '.sp-slide',
        initialClass: 'initial',
        overlayClass: '.sp-overlay'
    };

    // SP FX CLASSES
    let spFx = {
        slide: {
            next: "next-slide",
            prev: "prev-slide",
            initial: "initial-slide",
            active: "active-slide"
        },
        fade: {
            next: "next-fade",
            prev: "prev-fade",
            initial: "initial-fade",
            active: "active-fade"
        }
    };

    // SP DEFAULT SETTINGS
    let spSetting = {
        fx: 'fade',
        fxClass: spFx.fade,
        fxNextClass: spFx.fade.next,
        fxPrevClass: spFx.fade.prev,
        fxActiveClass: spFx.fade.active,
        fxInitialClass: spFx.fade.initial,

        defaultCaption: 'sp-caption',
        caption: '.sp-caption',
        captionTemplate: '{{slideNum}} / {{slideCount}}',

        pauseOnHover: false,
        pauseOnHoverClass: '',

        speed: 2000,
        autoPlay: true,
        initialSlide: 0,

        prev: '.sp-button-prev',
        next: '.sp-button-next',

        overlay: false,
        overlayElements: null,
        overlayTemplate: '<div><b>{{title}}</b></div><div>{{desc}}</div>'
    };

    // SP WRAPPER
    let spWrappers = d.querySelectorAll(spIdentity.wrapperClass);
    spWrappers.forEach(function (wrapperElement) {

        // SP SLIDESHOW
        let spSlideshow = wrapperElement.querySelectorAll(spIdentity.slideshowClass);
        spSlideshow.forEach(async function (slideshowElement) {


            // LOCALIZE FOR PERTICULAR SLIDESHOW
            let _spSetting = spSetting;
            // SP SLIDES
            let spSlides = slideshowElement.querySelectorAll(spIdentity.slideClass);
            let slidesCount = spSlides.length;
            let slideLocations = await spGetSlideLocations();

            // SP ATTRIBUTES
            let attributes = getElemAttributes(slideshowElement.attributes);


            // INIT SETTINGS
            (function spInitSettings() {
                // SP SPEED IN MS
                _spSetting.speed = attributes['speed'] ? attributes['speed'] : _spSetting.speed;
                // SP AUTO PLAY
                _spSetting.autoPlay = (attributes['auto-play'] == "false" ? false : _spSetting.autoPlay);
                // SP FX INIT SETTINGS
                spFXSettings();
                // SP PUSH ON HOVER
                spPauseOnHoverSettings();
                // SP NEXT PREV SETTINGS
                spNextPrevSettings();
                // SP CAPTION
                spCaptionTemplate();
                // SP OVERLAY SETTINGS
                spOverlaySettings();
            })();


            // SP SHOW INITIALIZE
            _spSetting.initialSlide = spInitialIndex(spSlides, _spSetting.initialSlide) || _spSetting.initialSlide;
            let activeSlide = _spSetting.initialSlide;
            spSlides[activeSlide].classList.remove(spIdentity.initialClass);
            spProjection('next');

            // SP AUTO PLAY
            let spStartInterval;
            if (_spSetting.autoPlay) spAutoPlay();
            function spAutoPlay() {
                spStartInterval = setInterval(spNextShow, _spSetting.speed);
            }


            // PROJECTION
            async function spProjection(action) {
                let oldActiveSlide = activeSlide;
                activeSlide = (action == 'next' ? slideLocations[activeSlide].next : slideLocations[activeSlide].prev);

                spSlides[slideLocations[oldActiveSlide].prev].classList.remove(_spSetting.fxClass.prev);
                spSlides[slideLocations[oldActiveSlide].active].classList.remove(_spSetting.fxClass.active);
                spSlides[slideLocations[activeSlide].prev].classList.add(_spSetting.fxClass.prev);
                spSlides[slideLocations[oldActiveSlide].next].classList.remove(_spSetting.fxClass.next);
                spSlides[slideLocations[activeSlide].active].classList.add(_spSetting.fxClass.active);
                spSlides[slideLocations[activeSlide].next].classList.add(_spSetting.fxClass.next);
                spSetCaption();
                spSetOverlay(spSlides[slideLocations[activeSlide].active]);
            }

            // NEXT SHOW
            function spNextShow() {
                spProjection('next');
            }
            // PREV SHOW
            function spPrevShow() {
                spProjection('prev');
            }

            // SP SETTINGS FX
            function spFXSettings() {
                _spSetting.fx = attributes['fx'] ? attributes['fx'] : _spSetting.fx;
                _spSetting.fxClass = spFx[_spSetting.fx] ? spFx[_spSetting.fx] : _spSetting.fxClass;
                // SP MANUAL FX
                if (!attributes['fx']) {
                    _spSetting.fxClass = {
                        next: attributes['fx-next'] ? attributes['fx-next'] : _spSetting.fxClass.next,
                        prev: attributes['fx-prev'] ? attributes['fx-prev'] : _spSetting.fxClass.prev,
                        active: attributes['fx-active'] ? attributes['fx-active'] : _spSetting.fxClass.active,
                        initial: attributes['fx-initial'] ? attributes['fx-initial'] : _spSetting.fxClass.initial,
                    };
                }
            }

            // SP SETTINGS PUSH ON HOVER
            function spPauseOnHoverSettings() {

                if (attributes['pause-on-hover']) {
                    _spSetting.pauseOnHover = (attributes['pause-on-hover'] == "false" ? false : true);
                    if (attributes['pause-on-hover'] == "false" || attributes['pause-on-hover'] == "true") {
                        _spSetting.pauseOnHoverClass = [wrapperElement];
                    } else {
                        _spSetting.pauseOnHoverClass = d.querySelectorAll(attributes['pause-on-hover']);
                    }
                }

                // MOUSE EVENT
                if (_spSetting.pauseOnHover) {
                    _spSetting.pauseOnHoverClass.forEach(pauserElement => {
                        // ENTER
                        pauserElement.addEventListener("mouseenter", function (event) {
                            clearInterval(spStartInterval);
                        });
                        // LEAVE
                        pauserElement.addEventListener("mouseleave", function (event) {
                            spAutoPlay();
                        });
                    });

                }
            }

            // SP SETTINGS NEXT PREV
            function spNextPrevSettings() {
                // NEXT
                _spSetting.next = attributes['next'] ? attributes['next'] : _spSetting.next;
                let spNextElement = wrapperElement.querySelectorAll(_spSetting.next);
                if (attributes['next']) spNextElement = d.querySelectorAll(_spSetting.next);
                // NEXT CLICK EVENT
                (function (spNextElement) {
                    spNextElement.forEach(function (nextElement) {
                        nextElement.addEventListener("click", function (event) {
                            spNextShow();
                        });
                    });
                })(spNextElement);

                // PREV
                _spSetting.prev = attributes['prev'] ? attributes['prev'] : _spSetting.prev;
                let spPrevElement = wrapperElement.querySelectorAll(_spSetting.prev);
                if (attributes['prev']) spPrevElement = d.querySelectorAll(_spSetting.prev);
                // PREV CLICK EVENT
                (function (spPrevElement) {
                    spPrevElement.forEach(function (prevElement) {
                        prevElement.addEventListener("click", function (event) {
                            spPrevShow();
                        });
                    });
                })(spPrevElement);
            }

            // SP SET CAPTION
            function spSetCaption() {
                let caption = d.querySelectorAll(_spSetting.caption);
                if (caption.length) {
                    caption.forEach(captionElement => {
                        captionElement.innerHTML = _spSetting.captionTemplate.replace('{{slideNum}}', activeSlide + 1).replace('{{slideCount}}', slidesCount);
                    });
                }
            }

            // SP SETTINGS CAPTION
            function spCaptionTemplate() {
                _spSetting.caption = attributes['caption'] ? attributes['caption'] : _spSetting.caption;
                _spSetting.captionTemplate = attributes['caption-template'] ? attributes['caption-template'] : _spSetting.captionTemplate;
            }

            // SP SET OVERLAY
            function spSetOverlay(activeElement) {
                
                let overlayClass = wrapperElement.querySelectorAll(spIdentity.overlayClass);
                if (_spSetting.overlay) {
                    let overlayAttr = getElemAttributes(activeElement.attributes);
                    overlayClass.forEach(function (overlayElement) {

                        let overlayHTML = _spSetting.overlayTemplate
                            .replace("{{title}}", overlayAttr['title'] || '')
                            .replace("{{desc}}", overlayAttr['desc'] || '')
                            .replace('{{slideNum}}', activeSlide + 1)
                            .replace('{{slideCount}}', slidesCount);
                        overlayElement.innerHTML = overlayHTML;

                    });
                }
            }

            // SP OVERLAY SETTINGS
            function spOverlaySettings() {

                if (wrapperElement.querySelectorAll(spIdentity.overlayClass).length) _spSetting.overlay = true;
                // TEMPLATE
                _spSetting.overlayTemplate = attributes['overlay-template'] ? attributes['overlay-template'] : _spSetting.overlayTemplate;

            }

            // SP GET SLIDE LOCATIONS
            async function spGetSlideLocations() {
                let locations = [];
                for (let i = 0; i < slidesCount; i++) {
                    locations.push({
                        prev: await (((i == 0 ? slidesCount : i) - 1) % slidesCount),
                        active: i,
                        next: await ((i + 1) % slidesCount)
                    });
                }
                return locations;
            }


        });

    });


    // SP GET INITIAL SLIDE
    function spInitialIndex(spSlides, initialSlide) {
        let initial = initialSlide;
        spSlides.forEach(function (spSlide, index) {
            if (spSlide.classList.contains(spIdentity.initialClass)) {
                initial = index; return;
            }
        })
        return initial;
    }


    // SP GET ATTRIBUTES
    function getElemAttributes(elem) {
        let obj = {};
        for (i = 0; i < elem.length; i++) obj[elem[i].name.replace(spIdentity.attributePrefix, '')] = elem[i].value;
        return obj;
    }


}(document));