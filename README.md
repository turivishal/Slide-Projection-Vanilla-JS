# Slide Projection (SP)
Slide Projection - Its a image slider which is built in pure vanilla js

**Visit** [https://slide-projection.herokuapp.com](https://slide-projection.herokuapp.com)

**CSS** [production version](https://cdn.jsdelivr.net/gh/turivishal/Slide-Projection-Vanilla-JS/build/slide-projection.styles.min.css), or the [development version](https://cdn.jsdelivr.net/gh/turivishal/Slide-Projection-Vanilla-JS/build/slide-projection.styles.css)

**JS** [production version](https://cdn.jsdelivr.net/gh/turivishal/Slide-Projection-Vanilla-JS@master/build/slide-projection.vanilla.min.js) or the [development version](https://cdn.jsdelivr.net/gh/turivishal/Slide-Projection-Vanilla-JS@master/build/slide-projection.vanilla.js) 

# Features:

- Next / Prev Controls
  - **Description:** Set inside / outside the container, Create multiple controls for single slider.
  - **Settings:**
    - `data-sp-prev` selector id or class
    - `data-sp-next` selector id or class
  - **Demo:** [Link](https://slide-projection.herokuapp.com/demos/sp-next-prev-controls-slideshow.html)
- Pause on Hover Controls
  - **Description:** Slider pause on mouse enter and play on leave.
  - **Settings:**
    - `data-sp-pause-on-hover` true or false, set selector id or class
  - **Demo:** [Link](https://slide-projection.herokuapp.com/demos/sp-pause-on-hover-slideshow.html)
- Caption Controls
  - **Description:** slide caption at bottom and customization.
  - **Settings:**
    - Default template: `{{slideNum}} / {{slideCount}}`
    - `slideNum` Active slide number
    - `slideCount` Total number of slides
    - Add new empty element with this class `sp-caption` name it will show the caption
    - Customization properties:
    - `data-sp-caption` selector id or class
    - `data-sp-caption-template` Set you own template
  - **Demo:** [Link](https://slide-projection.herokuapp.com/demos/sp-caption-slideshow.html)
- Manual Fx Controls
  - **Description:** Slide in / out effect customization, adding custom class.
  - **Settings:**
    - `data-sp-fx` default will be `fade`, another is `slide` this will slide right to left and can set own customize class name directly
    - `data-sp-fx-next` default will be `next-fade` next event class effect 
    - `data-sp-fx-prev` default will be `prev-fade` prev event class effect 
    - `data-sp-fx-active` default will be `active-fade` active event class effect 
    - `data-sp-fx-initial` default will be `initial-fade` initial event class effect 
  - **Demo:** [Link](https://slide-projection.herokuapp.com/demos/sp-manual-fx-slideshow.html)
- Overlay Options
  - **Description:** title and description of slide customization.
  - **Settings:**
    - Add new empty element with this class `sp-overlay` name it will show the overlay text from passed below property
    - below properties need to present in `sp-slide` class
    - `data-sp-title` Title of the slide
    - `data-sp-desc` Description of the slide
    - `data-sp-overlay-template` this property need to be added in `sp-slideshow` class, set template as we need using keywords `{{title}}`, `{{desc}}`, `{{slideNum}}` and `{{slideCount}}`
  - **Demo:** [Link](https://slide-projection.herokuapp.com/demos/sp-overlay-slideshow.html)
- Speed Option
  - **Description:** set interval time in milliseconds.
  - **Settings:**
    - `data-sp-speed` set milliseconds
  - **Demo:** [Link](https://slide-projection.herokuapp.com/demos/sp-speed-autoplay-slideshow.html)
- Auto Play Option
  - **Description:** set auto play on / off slider.
  - **Settings:**
    - `data-sp-auto-play` true or false
  - **Demo:** [Link](https://slide-projection.herokuapp.com/demos/sp-speed-autoplay-slideshow.html)
- Multiple Slideshow in Single Page
  - **Description:** Can define multiple slider sin a single page without any conflict.
  - **Settings:**
    - there are no need to setting anything 
  - **Demo:** above almost demo examples have doubled sliders.

---

# Review & Suggestion & Solutions:

I am really poor in CSS, so there will be most of issues, will cover as soon as possible.

I am open to accept suggestion and solutions, please add issues [Issues](https://github.com/turivishal/Slide-Projection-Vanilla-JS/issues) and will try to resolve as soon as possible.
