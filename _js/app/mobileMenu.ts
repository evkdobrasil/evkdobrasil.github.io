import { $ } from '../lib/dollar';

export const initMobileMenu = () => {
  const siteNav = $.first('.site-nav');
  const siteNavButton = $.first('.site-nav__button');
  const siteNavContainer = $.first('.site-nav__container');

  siteNavButton?.setAttribute('aria-haspopup', 'true');
  siteNavButton?.setAttribute('aria-expanded', 'false');
  siteNavButton?.setAttribute('aria-controls', siteNav?.id);

  siteNav.classList.add('off');

  siteNavButton.addEventListener('click', () => {
    siteNavButton.setAttribute(
      'aria-expanded',
      siteNav.classList.contains('off').toString()
    );
    siteNav.classList.toggle('off');
  });

  document.addEventListener('click', (e) => {
    if (siteNavContainer.contains(e.target as Node)) {
      return;
    }
    siteNavButton.setAttribute('aria-expanded', 'false');
    siteNav.classList.add('off');
  });
};
