import { $ } from '../lib/dollar';
import Slideshow, { SlideshowOptions } from '../lib/Slideshow';

export function initSlideshows() {
  $('.slideshow').forEach((container) => {
    const options: Partial<SlideshowOptions> = {};

    if (!Number.isNaN(container.getAttribute('data-interval'))) {
      options.interval = Number(container.getAttribute('data-interval'));
    }

    const slideshow = new Slideshow(container, options);

    if (container.hasAttribute('data-autoplay')) {
      slideshow.play();
      slideshow.on('mouseover', () => slideshow.pause());
      slideshow.on('mouseout', () => slideshow.play());
    }
  });
}
