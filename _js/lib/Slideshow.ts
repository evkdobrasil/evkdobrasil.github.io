export type SlideshowOptions = {
  initialIndex: number;
  interval: number;
  childSelector: string;
};

const defaultOptions = {
  initialIndex: 0,
  interval: 3000,
  childSelector: '.slide',
};

export default class Slideshow {
  private _container: Element;
  private _childSelector: string;
  private _options;
  private _index: number;
  private _intervalIndex: NodeJS.Timer | undefined;

  constructor(
    container: HTMLElement,
    options: Partial<SlideshowOptions> = defaultOptions
  ) {
    this._container = container;
    this._childSelector = options.childSelector || '.slide';
    this._options = { ...defaultOptions, ...options };
    this._index = this.options.initialIndex;

    this._container.classList.add('slideshow--initialized');
    this.render();
  }

  get container() {
    return this._container;
  }

  get index() {
    return this._index;
  }

  set index(value) {
    if (value < 0) {
      this._index = this.slides.length - 1;
    } else if (value >= this.slides.length) {
      this._index = 0;
    } else {
      this._index = value;
    }
    this.render();
  }

  get previousIndex() {
    return this.index === 0 ? this.slides.length - 1 : this.index - 1;
  }

  get nextIndex() {
    return this.index === this.slides.length - 1 ? 0 : this.index + 1;
  }

  get slides(): HTMLElement[] {
    return Array.from(this._container.querySelectorAll(this._childSelector));
  }

  get currentSlide() {
    return this.slides[this.index];
  }

  get previousSlide() {
    if (this.slides.length < 2) {
      return null;
    }
    return this.slides[this.previousIndex];
  }

  get nextSlide() {
    if (this.slides.length < 2) {
      return null;
    }
    return this.slides[this.nextIndex];
  }

  get options() {
    return this._options;
  }

  on(eventName: string, callback: (e: Event) => void) {
    this._container.addEventListener(eventName, callback);
  }

  goToPrev() {
    this.index--;
  }

  goToNext() {
    this.index++;
  }

  play() {
    this._intervalIndex = setInterval(
      () => this.goToNext(),
      this.options.interval || defaultOptions.interval
    );
  }

  pause() {
    clearInterval(this._intervalIndex);
  }

  render() {
    this.slides.forEach((element) => {
      element.classList.remove('current');
      element.classList.remove('prev');
      element.classList.remove('next');
    });

    this.currentSlide?.classList.add('current');
    this.previousSlide?.classList.add('prev');
    this.nextSlide?.classList.add('next');
  }
}
