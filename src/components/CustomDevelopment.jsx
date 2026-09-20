/* eslint-disable react/prop-types -- project does not use the PropTypes package */
import { useEffect, useMemo, useRef, useState } from 'react'

const demoLabels = {
    duda: 'View live widget',
    shopify: 'View live page',
}
const projects = [
    {
        id: 'dynamic-property-listings',
        platform: 'duda',
        label: 'Duda custom widget',
        title: 'Dynamic Property Listings',
        image: '/assets/dynamic-property-listings.png',
        demoUrl: 'https://kickstartlocal.responsivewebsitebuilder.io/site/59da2a01/properties?preview=true&insitepreview=true&dm_device=desktop',
        description: 'A Duda Collections-powered real-estate listing widget with property-type filters, price and acreage sorting, owner-financing logic, status states, and responsive cards.',
        technologies: ['Duda Collections', 'Handlebars', 'JavaScript', 'Filtering',  'Sorting', 'Responsive Design'],
        code: {
            HTML: `{{#each listings}}
<article class="dpl-card{{#equals featured "Yes"}} is-featured{{/equals}}{{#if status}}{{#notEquals status "Available"}} is-unavailable{{/notEquals}}{{/if}}"
data-sort-acres="{{acresDisplay}}"
data-sort-price="{{#if downPayment}}{{downPayment}}{{else}}{{price}}{{/if}}"
data-sort-financed="{{#if downPayment}}1{{else}}0{{/if}}">

<div class="dpl-card__media">
    {{#if hero_image}}
    <img class="dpl-card__img" src="{{hero_image}}" alt="{{hero_image_alt}}" loading="lazy">
    {{/if}}

    {{#if propertyType}}<span class="dpl-pill">{{propertyType}}</span>{{/if}}
    {{#if status}}{{#notEquals status "Available"}}<span class="dpl-stamp">{{status}}</span>{{/notEquals}}{{/if}}

    {{#equals ownerFinancing "Yes"}}
    <span class="dpl-badge">{{@root.financingText}}</span>
    {{/equals}}
</div>

<div class="dpl-card__body">
    <p class="dpl-card__loc">{{locationLine}}</p>
    <h3>{{listingTitle}}</h3>
    <p>{{cardSummary}}</p>
    <ul class="dpl-meta">
    {{#if acresDisplay}}<li>{{acresDisplay}} acres</li>{{/if}}
    {{#if bedrooms}}<li>{{bedrooms}} bed</li>{{/if}}
    {{#if bathrooms}}<li>{{bathrooms}} bath</li>{{/if}}
    </ul>
</div>
</article>
{{/each}}`,
            CSS: `.dpl {
--dpl-accent: #2E9E6B;
--dpl-price: #0C3729;
--dpl-bg: #FFFFFF;
--dpl-line: #DBE3E4;
--dpl-cols: 3;
--dpl-gap: 28px;
}

.dpl-grid {
display: grid;
grid-template-columns: repeat(var(--dpl-cols), minmax(0, 1fr));
gap: var(--dpl-gap);
}

.dpl-card {
display: flex;
flex-direction: column;
height: 100%;
background: var(--dpl-bg);
border: 1px solid var(--dpl-line);
transition: border-color .28s, transform .28s, box-shadow .28s;
}

.dpl-card:hover {
border-color: var(--dpl-accent);
transform: translateY(-5px);
box-shadow: 0 20px 44px rgba(6, 37, 30, .12);
}

.dpl-card.is-featured {
box-shadow: inset 0 3px 0 0 var(--dpl-accent);
}

@media (max-width: 1024px) {
.dpl-grid {
    grid-template-columns: repeat(min(var(--dpl-cols), 2), minmax(0, 1fr));
}
}

@media (max-width: 768px) {
.dpl-grid { grid-template-columns: minmax(0, 1fr); }
}`,
            JavaScript: `var symbol = '$';
if (data?.config?.currencySymbol) {
symbol = data.config.currencySymbol;
}

function group(digits) {
return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function format(el, withSymbol) {
var raw = (el.textContent || '').trim();
if (!/^\d+(\.\d+)?$/.test(raw)) return;

var parts = raw.split('.');
var amount = group(parts[0]);

if (parts[1] && parseInt(parts[1], 10) > 0) {
    amount += '.' + (parts[1] + '00').slice(0, 2);
}

el.textContent = withSymbol ? symbol + amount : amount;
}

element.querySelectorAll('[data-dpl-money]')
.forEach(function (item) { format(item, true); });

element.querySelectorAll('[data-dpl-number]')
.forEach(function (item) { format(item, false); });`,
        },
    },
    {
        id: 'featured-projects-grid',
        platform: 'duda',
        label: 'Duda custom widget',
        title: 'Featured Projects Grid',
        image: '/assets/featured-projects-grid.png',
        demoUrl: 'https://www.studiospinola.com/#featured-projects-grid',
        description: 'A configurable client-work gallery with category filtering, responsive grid controls, image captions, optional links, and an accessible lightbox for image-only projects.',
        technologies: ['Duda Custom Widget', 'Handlebars', 'JavaScript', 'Filtering', 'Lightbox', 'Responsive Design'],
        code: {
            HTML: `<div class="fp-tabs-wrapper">
  <div class="fp-tabs" aria-label="Project categories">
    <button class="fp-tab fp-tab--active" aria-pressed="true" data-category="all">
      All
    </button>

    {{#each filterTabs}}
      <button class="fp-tab" aria-pressed="false" data-category="{{categoryValue}}">
        {{tabLabel}}
      </button>
    {{/each}}
  </div>
</div>

<div class="fp-grid" role="list">
  {{#each projects}}
    <div
      class="fp-tile{{#if tallTile}} fp-tile--tall{{/if}}"
      role="listitem"
      data-category="{{category}}"
    >
      {{#if link}}
        {{#custom_link link}}
          <div class="fp-tile__inner">
            <img class="fp-tile__img" src="{{image}}" alt="{{altText}}" loading="lazy">
            {{#if ../showCaptions}}
              {{#if caption}}
                <div class="fp-tile__caption">
                  <span>{{caption}}</span>
                </div>
              {{/if}}
            {{/if}}
          </div>
        {{/custom_link}}
      {{else}}
        <div
          class="fp-tile__inner fp-tile__inner--lightbox"
          data-img="{{image}}"
          data-caption="{{caption}}"
          role="button"
          tabindex="0"
          aria-label="View image"
        >
          <img class="fp-tile__img" src="{{image}}" alt="{{altText}}" loading="lazy">
        </div>
      {{/if}}
    </div>
  {{/each}}
</div>

<div class="fp-empty-msg" aria-live="polite"></div>`,
            CSS: `.widget-dcab67 {
  --fp-cols-desktop: 4;
  --fp-cols-tablet: 3;
  --fp-cols-mobile: 1;
  --fp-gap: 14px;
  --fp-tile-aspect: 1 / 1;
  --fp-img-fit: cover;
}

.widget-dcab67 .fp-grid {
  display: grid;
  grid-template-columns: repeat(var(--fp-cols-desktop), 1fr);
  gap: var(--fp-gap);
}

.widget-dcab67 .fp-tile {
  overflow: hidden;
  animation: fp-tile-in 0.28s ease both;
}

.widget-dcab67 .fp-tile__inner {
  position: relative;
  overflow: hidden;
  aspect-ratio: var(--fp-tile-aspect);
}

.widget-dcab67 .fp-tile__img {
  width: 100%;
  height: 100%;
  object-fit: var(--fp-img-fit);
  transition: transform 0.38s ease;
}

.widget-dcab67 .fp-tile__inner:hover .fp-tile__img {
  transform: scale(1.06);
}

.widget-dcab67 .fp-tile--hidden {
  display: none;
}

@keyframes fp-tile-in {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .widget-dcab67 .fp-grid {
    grid-template-columns: repeat(var(--fp-cols-tablet), 1fr);
  }
}

@media (max-width: 767px) {
  .widget-dcab67 .fp-grid {
    grid-template-columns: repeat(var(--fp-cols-mobile), 1fr);
  }
}`,
            JavaScript: `function getSlidesPerView() {
  const width = window.innerWidth;

  if (width <= 767) return 1;
  if (width <= 1024) return 2;

  return 3;
}

function clampIndex(index) {
  const max = Math.max(0, cards.length - slidesPerView);

  if (infiniteLoop) {
    if (index < 0) return max;
    if (index > max) return 0;
  }

  return Math.max(0, Math.min(index, max));
}

function goTo(index, skipAnimation) {
  if (isAnimating && !skipAnimation) return;

  currentIndex = clampIndex(index);
  isAnimating = true;

  const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
  const offset = (cards[0].offsetWidth + gap) * currentIndex;

  track.style.transform = 'translateX(-' + offset + 'px)';

  updateDots();
  updateArrows();

  setTimeout(function () {
    isAnimating = false;
  }, 480);
}

function buildDots() {
  if (!dotsNav) return;

  dotsNav.innerHTML = '';
  const count = Math.max(0, cards.length - slidesPerView) + 1;

  for (let index = 0; index < count; index++) {
    const dot = document.createElement('button');

    dot.className = 'vs-dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
    dot.addEventListener('click', function () {
      goTo(index);
    });

    dotsNav.appendChild(dot);
  }
}`,
        },
    },
    {
        id: 'video-slider',
        platform: 'duda',
        label: 'Duda custom widget',
        title: 'Video Slider',
        image: '/assets/video-slider.png',
        demoUrl: 'https://www.valentinedetailingllc.com/gallery#video-slider',
        description: 'A responsive video carousel supporting YouTube and Duda-hosted videos, configurable autoplay and transitions, swipe navigation, generated thumbnails, and modal playback.',
        technologies: ['Duda Custom Widget', 'Handlebars', 'JavaScript', 'Filtering', 'Lightbox', 'Responsive Design'],
        code: {
            HTML: `<div class="vs-slider-viewport">
  <div class="vs-track">
    {{#each videos}}
      <div
        class="vs-video-card"
        data-video-type="{{videoType}}"
        data-video-title="{{videoTitle}}"
        {{#equals videoType "youtube"}}
          data-video-url="{{videoUrl}}"
          data-thumb="{{videoThumb}}"
        {{/equals}}
        {{#equals videoType "duda"}}
          data-video-url="{{videoFile.videoUrl}}"
          data-video-poster="{{videoFile.poster}}"
          data-thumb="{{videoThumb}}"
        {{/equals}}
      >
        <div class="vs-thumbnail-wrap">
          {{#equals videoType "youtube"}}
            <img
              class="vs-thumbnail vs-thumb-youtube"
              src=""
              data-yt-url="{{videoUrl}}"
              data-custom-thumb="{{videoThumb}}"
              alt="{{videoTitle}}"
              loading="lazy"
            >
          {{/equals}}

          {{#equals videoType "duda"}}
            <img
              class="vs-thumbnail vs-thumb-duda"
              src=""
              data-custom-thumb="{{videoThumb}}"
              data-poster="{{videoFile.poster}}"
              data-video-src="{{videoFile.videoUrl}}"
              alt="{{videoTitle}}"
              loading="lazy"
            >
          {{/equals}}

          <div class="vs-play-btn" aria-label="Play video">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      </div>
    {{/each}}
  </div>
</div>`,
            CSS: `.vs-track {
  display: flex;
  gap: var(--vs-gap, 20px);
  transition: transform var(--vs-transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.vs-video-card {
  flex: 0 0 clamp(220px, 24vw, 290px);
  overflow: hidden;
  border-radius: var(--vs-card-radius, 12px);
  cursor: pointer;
  box-shadow: var(--vs-card-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.vs-video-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--vs-card-shadow-hover);
}

.vs-thumbnail-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  background: #000;
}

.vs-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease, opacity 0.45s ease;
}

@media (max-width: 767px) {
  .vs-video-card {
    flex: 0 0 min(78vw, 280px);
  }
}`,
            JavaScript: `const tabs = Array.from(element.querySelectorAll('.fp-tab'));
const tiles = Array.from(element.querySelectorAll('.fp-tile'));
const emptyMsg = element.querySelector('.fp-empty-msg');

const filterTiles = (category) => {
  let visibleCount = 0;

  tiles.forEach((tile) => {
    const tileCategory = (tile.getAttribute('data-category') || '')
      .trim()
      .toLowerCase();

    const matches = category === 'all'
      || tileCategory === category.toLowerCase();

    tile.classList.toggle('fp-tile--hidden', !matches);

    if (matches) {
      tile.style.animation = 'none';
      void tile.offsetHeight;
      tile.style.animation = '';
      visibleCount++;
    }
  });

  emptyMsg.textContent = visibleCount
    ? ''
    : 'No projects in this category yet.';

  emptyMsg.classList.toggle(
    'fp-empty-msg--visible',
    visibleCount === 0
  );
};

const activateTab = (tab) => {
  tabs.forEach((item) => {
    item.classList.remove('fp-tab--active');
    item.setAttribute('aria-pressed', 'false');
  });

  tab.classList.add('fp-tab--active');
  tab.setAttribute('aria-pressed', 'true');

  filterTiles(tab.getAttribute('data-category') || 'all');
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab));
});

filterTiles('all');`,
        },
    },
{
        id: 'infinite-logo-slider',
        platform: 'duda',
        label: 'Duda custom widget',
        title: 'Infinite Logo Slider',
        image: '/assets/infinite-slider.png',
        demoUrl: 'https://www.santerian.com/#infinite-slider',
        description: 'A configurable logo carousel with seamless infinite scrolling, optional manual navigation, pause-on-hover behavior, grayscale effects, linked logos, and responsive sizing.',
        technologies: ['Duda Custom Widget', 'Handlebars', 'JavaScript', 'CSS Animation', 'Accessible Navigation', 'Responsive Design'],
        code: {
            HTML: `<div class="logo-slider-wrapper">
  <button class="slider-arrow slider-arrow--prev" aria-label="Previous logos">
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2"/>
    </svg>
  </button>

  <div class="slider-track-container">
    <div class="slider-track">
      {{#each logos}}
        <div class="logo-item">
          {{#if link.href}}
            {{#custom_link link}}
              <img
                src="{{image}}"
                alt="{{altText}}"
                loading="lazy"
                class="logo-img"
              >
            {{/custom_link}}
          {{else}}
            <img
              src="{{image}}"
              alt="{{altText}}"
              loading="lazy"
              class="logo-img"
            >
          {{/if}}
        </div>
      {{/each}}
    </div>
  </div>

  <button class="slider-arrow slider-arrow--next" aria-label="Next logos">
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
    </svg>
  </button>
</div>`,
            CSS: `.widget-25d90b {
  --logo-height: 60px;
  --logo-gap: 48px;
  --slider-speed: 30s;
  --gradient-color: #ffffff;
}

.slider-track {
  display: flex;
  align-items: center;
  gap: var(--logo-gap);
  width: max-content;
  will-change: transform;
}

@keyframes logo-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(var(--scroll-distance, -50%));
  }
}

.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.logo-item:hover {
  transform: translateY(-4px);
}

.logo-img {
  height: var(--logo-height);
  width: auto;
  max-width: 160px;
  object-fit: contain;
}

.widget-25d90b.autoplay-mode.pause-on-hover
.slider-track-container:hover .slider-track {
  animation-play-state: paused;
}

.widget-25d90b.grayscale-logos .logo-img {
  filter: grayscale(100%);
  opacity: 0.6;
}

.widget-25d90b.grayscale-logos .logo-item:hover .logo-img {
  filter: grayscale(0%);
  opacity: 1;
}`,
            JavaScript: `const sliderMode = data.config.sliderMode || 'autoplay';
const logoGap = data.config.logoGap || '48';
const sliderSpeed = data.config.sliderSpeed || '30';
const isManual = sliderMode === 'manual';

const track = element.querySelector('.slider-track');
if (!track) return;

track.querySelectorAll('[aria-hidden="true"]').forEach(function (item) {
  item.remove();
});

const originalItems = Array.from(track.querySelectorAll('.logo-item'));
if (!originalItems.length) return;

if (!isManual) {
  originalItems.forEach(function (item) {
    const clone = item.cloneNode(true);

    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  function initAutoplay() {
    const allItems = track.querySelectorAll('.logo-item');
    const gap = parseFloat(logoGap) || 48;
    const itemWidth = allItems[0].getBoundingClientRect().width;
    const originalWidth =
      (originalItems.length * itemWidth) +
      ((originalItems.length - 1) * gap);

    track.style.setProperty(
      '--scroll-distance',
      '-' + (originalWidth + gap) + 'px'
    );

    track.style.animation =
      'logo-scroll ' + sliderSpeed + 's linear infinite';
  }

  setTimeout(initAutoplay, 150);
}
  
const container = element.querySelector('.slider-track-container');
const previousButton = element.querySelector('.slider-arrow--prev');
const nextButton = element.querySelector('.slider-arrow--next');

let currentOffset = 0;
const gap = parseFloat(logoGap) || 48;

function getItemWidth() {
  const items = track.querySelectorAll('.logo-item');
  return items.length ? items[0].getBoundingClientRect().width : 0;
}

function getVisibleCount() {
  const containerWidth = container.getBoundingClientRect().width;
  const itemWidth = getItemWidth();

  return Math.floor((containerWidth + gap) / (itemWidth + gap)) || 1;
}

function updateArrows() {
  const maximumOffset = Math.max(
    0,
    (originalItems.length - getVisibleCount()) * (getItemWidth() + gap)
  );

  previousButton.disabled = currentOffset <= 0;
  nextButton.disabled = currentOffset >= maximumOffset;
}

function slide(direction) {
  const step = (getItemWidth() + gap) * getVisibleCount();
  const maximumOffset = Math.max(
    0,
    (originalItems.length - getVisibleCount()) * (getItemWidth() + gap)
  );

  currentOffset = Math.max(
    0,
    Math.min(maximumOffset, currentOffset + (step * direction))
  );

  track.style.transform = 'translateX(-' + currentOffset + 'px)';
  updateArrows();
}

previousButton.addEventListener('click', function () {
  slide(-1);
});

nextButton.addEventListener('click', function () {
  slide(1);
});`,
        },
    },
    {
    id: 'it-services-landing-page',
    platform: 'shopify',
    label: 'Custom Shopify Liquid',
    title: 'IT Services Landing Page',
    image: '/assets/it-service-page.png', // cropped hero + services, same ratio as your other card images
    demoUrl: 'https://capmiddleast.com/pages/cap-professional-it-services',
    description: 'A full service landing page built section by section in Shopify Liquid. Nine custom, block-based sections cover the hero, trust bar, IT and web services, project case studies with gallery popups, industries, tiered support plans with consultation forms, a partner logo marquee and a contact form, all configurable from the theme editor.',
    technologies: ['Liquid', 'JSON schema', 'Section Blocks', 'Modals & Galleries', 'JavaScript', 'Responsive Design'],
    code: {
        Hero: `{% style %}
.cap-hero {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: #000;
}
 
.cap-hero .cap-hero__image--mobile { display: none; }
 
.cap-hero__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: right;
}
 
/* Gradient overlay is driven by theme editor settings */
.cap-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    {{ section.settings.gradient_direction }},
    {{ section.settings.gradient_color_1 }} 60%,
    {{ section.settings.gradient_color_2 }} 100%
  );
}
 
.cap-hero h1 {
  color: {{ section.settings.heading_color }};
  font-size: {{ section.settings.heading_size_mobile }}px;
}
 
@media (min-width: 769px) {
  .cap-hero h1 { font-size: {{ section.settings.heading_size }}px; }
}
 
/* Swap to the dedicated mobile image */
@media (max-width: 768px) {
  .cap-hero .cap-hero__image--desktop { display: none; }
  .cap-hero .cap-hero__image--mobile { display: block; }
  .cap-hero__image { object-fit: cover !important; }
}
{% endstyle %}
 
<section class="cap-hero">
  <div class="cap-hero__bg">
    {% if section.settings.background_image %}
      <div class="cap-hero__image-wrapper">
        {% if section.settings.background_image_mobile %}
          {{
            section.settings.background_image_mobile
            | image_url: width: 2000
            | image_tag:
              widths: '480,750,1000,1500,2000',
              sizes: '100vw',
              loading: 'eager',
              fetchpriority: 'high',
              class: 'cap-hero__image cap-hero__image--mobile'
          }}
        {% endif %}
 
        {{
          section.settings.background_image
          | image_url: width: 3840
          | image_tag:
            widths: '768,1200,1600,2000,2560,3840',
            sizes: '100vw',
            loading: 'eager',
            fetchpriority: 'high',
            class: 'cap-hero__image cap-hero__image--desktop'
        }}
      </div>
    {% endif %}
  </div>
 
  <div class="page-width">
    <div class="cap-hero__content">
      <div class="cap-hero__text">
        {% if section.settings.heading != blank %}
          <h1>{{ section.settings.heading }}</h1>
        {% endif %}
 
        <div class="cap-hero__buttons">
          {% if section.settings.primary_button_text != blank %}
            <a href="{{ section.settings.primary_button_link }}" class="cap-btn cap-btn--primary">
              {{ section.settings.primary_button_text }}
            </a>
          {% endif %}
          {% if section.settings.secondary_button_text != blank %}
            <a href="{{ section.settings.secondary_button_link }}" class="cap-btn cap-btn--outline">
              {{ section.settings.secondary_button_text }}
            </a>
          {% endif %}
        </div>
 
        {% if section.settings.trust_text != blank %}
          <div class="cap-hero__trust">
            {% if section.settings.trust_icon != blank %}
              <img src="{{ section.settings.trust_icon | image_url }}" alt="" loading="lazy">
            {% else %}
              <span class="cap-hero__check">✓</span>
            {% endif %}
            <p class="cap-hero__trust-text">{{ section.settings.trust_text }}</p>
          </div>
        {% endif %}
      </div>
    </div>
  </div>
</section>
 
{% schema %}
{
  "name": "CAP Hero",
  "settings": [
    { "type": "image_picker", "id": "background_image", "label": "Background Image" },
    { "type": "image_picker", "id": "background_image_mobile", "label": "Mobile Background Image" },
    { "type": "color", "id": "gradient_color_1", "label": "Gradient Color 1", "default": "#031835" },
    { "type": "color", "id": "gradient_color_2", "label": "Gradient Color 2", "default": "#000000" },
    {
      "type": "select",
      "id": "gradient_direction",
      "label": "Gradient Direction",
      "default": "to right",
      "options": [
        { "value": "to right", "label": "Left → Right" },
        { "value": "to left", "label": "Right → Left" },
        { "value": "to bottom", "label": "Top → Bottom" },
        { "value": "135deg", "label": "Diagonal ↘" }
      ]
    },
    { "type": "textarea", "id": "heading", "label": "Heading" },
    { "type": "richtext", "id": "description", "label": "Description" },
    { "type": "text", "id": "primary_button_text", "label": "Primary Button Text" },
    { "type": "url", "id": "primary_button_link", "label": "Primary Button Link" },
    { "type": "range", "id": "heading_size", "min": 20, "max": 100, "step": 2, "unit": "px", "label": "Heading Size (Desktop)", "default": 64 },
    { "type": "range", "id": "heading_size_mobile", "min": 20, "max": 60, "step": 2, "unit": "px", "label": "Heading Size (Mobile)", "default": 40 }
  ],
  "presets": [{ "name": "CAP Hero" }]
}
{% endschema %}`,
 
        'Trust Bar': `{% style %}
.cap-trustbar__marquee {
  overflow: hidden;
  width: 100%;
}
 
.cap-trustbar__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
 
.cap-trustbar__item {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 180px;
  justify-content: center;
}
 
/* Desktop shows the items in a row. On phones the same markup becomes a marquee */
@media screen and (max-width: 768px) {
  .cap-trustbar__container {
    max-width: none;
    margin: 0;
    width: max-content;
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 40px;
    animation: trustbar-marquee linear infinite;
    will-change: transform;
  }
 
  .cap-trustbar__item {
    flex: 0 0 auto;
    width: 200px;
    justify-content: flex-start;
  }
 
  @keyframes trustbar-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
}
{% endstyle %}
 
<div class="cap-trustbar" style="background-color: {{ section.settings.bg_color }};">
  <div class="cap-trustbar__marquee">
    <div
      class="cap-trustbar__container"
      id="trustbar-container-{{ section.id }}"
      data-scroll-speed="{{ section.settings.scroll_speed }}"
    >
      {% for block in section.blocks %}
        <div class="cap-trustbar__item">
          <div class="cap-trustbar__icon">
            {% if block.settings.icon != blank %}
              <img
                src="{{ block.settings.icon | image_url }}"
                alt="{{ block.settings.text | escape }}"
                loading="lazy"
              >
            {% endif %}
          </div>
 
          {% if block.settings.text != blank %}
            <div class="cap-trustbar__text">{{ block.settings.text }}</div>
          {% endif %}
        </div>
      {% endfor %}
    </div>
  </div>
</div>
 
<script>
(function () {
  function initTrustBar(sectionId) {
    const container = document.getElementById(sectionId);
    if (!container) return;
 
    // Remove previous clones so a resize starts clean
    container.querySelectorAll('.trustbar-clone').forEach(el => el.remove());
    container.style.animation = 'none';
 
    // The marquee is mobile only
    if (window.innerWidth > 768) return;
 
    const originals = [...container.children];
    if (originals.length === 0) return;
 
    function appendClones() {
      originals.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('trustbar-clone');
        clone.setAttribute('aria-hidden', 'true');
        container.appendChild(clone);
      });
    }
 
    // Duplicate until the track is at least twice the viewport wide
    while (container.scrollWidth < window.innerWidth * 2) appendClones();
 
    // One extra complete set keeps the loop seamless
    appendClones();
 
    // Theme setting (1-90) becomes pixels per second, then a duration
    const speed = parseInt(container.dataset.scrollSpeed) || 50;
    const pixelsPerSecond = 20 + (speed * 2);
    const duration = (container.scrollWidth / 2) / pixelsPerSecond;
 
    container.style.animation = \`trustbar-marquee \${duration}s linear infinite\`;
  }
 
  function init() {
    initTrustBar('trustbar-container-{{ section.id }}');
  }
 
  document.addEventListener('DOMContentLoaded', init);
 
  document.addEventListener('shopify:section:load', function (e) {
    if (e.target.querySelector('#trustbar-container-{{ section.id }}')) init();
  });
 
  // Rebuild after a resize, debounced
  window.addEventListener('resize', function () {
    clearTimeout(window.trustbarResize);
    window.trustbarResize = setTimeout(init, 250);
  });
})();
</script>
 
{% schema %}
{
  "name": "Trust Bar",
  "settings": [
    { "type": "color", "id": "bg_color", "label": "Background Color", "default": "#ffffff" },
    { "type": "color", "id": "text_color", "label": "Text Color", "default": "#111111" },
    { "type": "range", "id": "text_size", "label": "Text Size", "min": 10, "max": 20, "step": 1, "default": 14 },
    { "type": "range", "id": "padding_top", "label": "Padding Top", "min": 0, "max": 200, "step": 10, "default": 100 },
    { "type": "range", "id": "padding_top_mobile", "label": "Padding Top (Mobile)", "min": 0, "max": 200, "step": 10, "default": 100 },
    {
      "type": "range",
      "id": "scroll_speed",
      "label": "Mobile Scroll Speed",
      "min": 1,
      "max": 90,
      "step": 1,
      "default": 50,
      "info": "1 = Slow, 90 = Fast"
    }
  ],
  "blocks": [
    {
      "type": "trust_item",
      "name": "Trust Item",
      "settings": [
        { "type": "image_picker", "id": "icon", "label": "Icon (SVG/PNG)" },
        { "type": "text", "id": "text", "label": "Text" }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [
    { "name": "Trust Bar", "blocks": [{ "type": "trust_item" }, { "type": "trust_item" }, { "type": "trust_item" }] }
  ]
}
{% endschema %}`,
 
        'IT Services': `<section
  class="cap-services"
  style="
    --heading-size:{{ section.settings.heading_size }}px;
    --card-title-size:{{ section.settings.card_title_size }}px;
    --content_layout_section_color:{{ section.settings.content_layout_section_color }};
    --border_left_top:{{ section.settings.border_left_top }}px;
    --border_left_bottom:{{ section.settings.border_left_bottom }}px;
    --border_right_top:{{ section.settings.border_right_top }}px;
    --border_right_bottom:{{ section.settings.border_right_bottom }}px;
    --icon-position:{{ section.settings.icon_position }};
    --service-divider-color:{{ section.settings.service_divider_color }};
    --service-divider-width:{{ section.settings.service_divider_width }}px;
    --show-service-divider:{% if section.settings.show_service_divider %}1{% else %}0{% endif %};
    --mobile-service-columns:{{ section.settings.mobile_service_columns }};
  "
>
  <div class="page-width">
    <div class="cap-services__layout cap-services__layout--{{ section.settings.image_position }}">
 
      <div class="cap-services__image"
        {% if section.settings.image %}
          style="background-image:url('{{ section.settings.image | image_url: width: 1400 }}');"
        {% endif %}>
      </div>
 
      <div class="cap-services__content">
        <div class="cap-eyebrow">{{ section.settings.eyebrow }}</div>
        <h2>{{ section.settings.heading }}</h2>
        <div class="cap-services__intro">{{ section.settings.intro }}</div>
 
        <div class="cap-services-grid">
          {% for block in section.blocks %}
            <div class="cap-service-card" {{ block.shopify_attributes }}>
              {% if block.settings.icon %}
                <div class="cap-service-card__icon">
                  {{ block.settings.icon | image_url: width: 100 | image_tag: loading: 'lazy' }}
                </div>
              {% endif %}
 
              <div class="cap-service-card__content">
                <h3>{{ block.settings.title }}</h3>
                <p>{{ block.settings.description }}</p>
              </div>
            </div>
          {% endfor %}
        </div>
      </div>
 
    </div>
  </div>
</section>
 
{% style %}
/* Image and content swap sides by redefining the grid areas */
.cap-services__layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  grid-template-areas: "image content";
  gap: 25px;
  background-color: var(--content_layout_section_color);
  border-radius: var(--border_left_top) var(--border_right_top) var(--border_right_bottom) var(--border_left_bottom);
}
 
.cap-services__layout--right {
  grid-template-areas: "content image";
  grid-template-columns: 1fr 380px;
}
 
.cap-services__image {
  grid-area: image;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
}
 
.cap-services__content { grid-area: content; padding: 25px; }
 
.cap-services-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}
 
.cap-service-card {
  position: relative;
  display: flex;
  padding-right: 24px;
}
 
/* Icon position is a select setting, read back through the inline style */
.cap-services[style*="--icon-position:left"] .cap-service-card { flex-direction: row; align-items: flex-start; }
.cap-services[style*="--icon-position:top"] .cap-service-card { flex-direction: column; }
 
/* Optional vertical dividers: every card except the last in each row of four */
.cap-services[style*="--show-service-divider:1"] .cap-service-card:not(:nth-child(4n))::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: var(--service-divider-width);
  height: 100%;
  background: var(--service-divider-color);
}
 
@media (max-width: 990px) {
  .cap-services__layout {
    grid-template-columns: 1fr;
    grid-template-areas: "image" "content";
  }
  .cap-services__image { min-height: 320px; }
  .cap-services-grid { grid-template-columns: repeat(2, 1fr); }
}
 
@media (max-width: 768px) {
  .cap-services-grid {
    grid-template-columns: repeat(var(--mobile-service-columns), minmax(0, 1fr));
  }
 
  /* Vertical dividers become horizontal ones on mobile */
  .cap-services[style*="--show-service-divider:1"] .cap-service-card::after { display: none !important; }
}
{% endstyle %}
 
{% schema %}
{
  "name": "CAP Services",
  "max_blocks": 12,
  "settings": [
    { "type": "color", "id": "content_layout_section_color", "label": "Container Background Color", "default": "#EFEFEF" },
    { "type": "range", "id": "border_left_top", "label": "Border Radius Left Top", "min": 0, "max": 100, "step": 1, "default": 8 },
    { "type": "checkbox", "id": "show_service_divider", "label": "Show Service Dividers", "default": false },
    { "type": "color", "id": "service_divider_color", "label": "Divider Color", "default": "#D9D9D9" },
    {
      "type": "select",
      "id": "icon_position",
      "label": "Icon Position",
      "options": [
        { "value": "top", "label": "Top of Text" },
        { "value": "left", "label": "Left of Text" }
      ],
      "default": "top"
    },
    {
      "type": "select",
      "id": "image_position",
      "label": "Image Position",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "right", "label": "Right" }
      ]
    },
    {
      "type": "select",
      "id": "mobile_service_columns",
      "label": "Mobile Service Columns",
      "options": [
        { "value": "1", "label": "1 Column" },
        { "value": "2", "label": "2 Columns" }
      ],
      "default": "1"
    },
    { "type": "image_picker", "id": "image", "label": "Image" }
  ],
  "blocks": [
    {
      "type": "service",
      "name": "Service",
      "settings": [
        { "type": "image_picker", "id": "icon", "label": "Icon" },
        { "type": "text", "id": "title", "label": "Title" },
        { "type": "textarea", "id": "description", "label": "Description" }
      ]
    }
  ],
  "presets": [{ "name": "CAP Services" }]
}
{% endschema %}`,
 
        'Web Services': `{%- liquid
  assign cols = section.settings.columns | plus: 0
  assign next_row = cols | plus: 1
  assign heading_min = section.settings.heading_font_size | times: 0.62 | round
  assign panel_start = section.settings.panel_color_start
  assign panel_end = section.settings.panel_color_end
-%}
 
{% style %}
  #shopify-section-{{ section.id }} .cap-web-services {
    --cws-heading: {{ section.settings.heading_color }};
    --cws-divider: {{ section.settings.divider_color }};
    --cws-icon: {{ section.settings.icon_color }};
    --cws-radius: {{ section.settings.corner_radius }}px;
  }
 
  #shopify-section-{{ section.id }} .cap-web-services__inner {
    display: grid;
    grid-template-columns: {{ section.settings.image_width }}px minmax(0, 1fr);
    gap: {{ section.settings.column_gap }}px;
    padding: {{ section.settings.panel_padding }}px;
    border-radius: var(--cws-radius);
    {% if section.settings.use_gradient %}
      background: linear-gradient(110deg, {{ panel_start }} 0%, {{ panel_end }} 48%, {{ panel_start }} 100%);
    {% else %}
      background: {{ panel_start }};
    {% endif %}
  }
 
  {% if section.settings.image_position == 'right' %}
    #shopify-section-{{ section.id }} .cap-web-services__inner {
      grid-template-columns: minmax(0, 1fr) {{ section.settings.image_width }}px;
    }
    #shopify-section-{{ section.id }} .cap-web-services__media { order: 2; }
  {% endif %}
 
  /* Heading scales fluidly between a computed minimum and the editor size */
  #shopify-section-{{ section.id }} .cap-web-services__content h2 {
    font-size: clamp({{ heading_min }}px, 3vw, {{ section.settings.heading_font_size }}px);
  }
 
  #shopify-section-{{ section.id }} .cap-web-services__grid {
    display: grid;
    grid-template-columns: repeat({{ cols }}, minmax(0, 1fr));
  }
 
  #shopify-section-{{ section.id }} .cap-web-services__item {
    padding: 5px 26px 10px;
    border-inline-start: 1px solid var(--cws-divider);
  }
 
  /* Divider rules are derived from the column count chosen in the editor */
  #shopify-section-{{ section.id }} .cap-web-services__item:nth-child({{ cols }}n + 1) {
    padding-inline-start: 0;
    border-inline-start: 0;
  }
 
  #shopify-section-{{ section.id }} .cap-web-services__item:nth-child(n + {{ next_row }}) {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid var(--cws-divider);
  }
 
  #shopify-section-{{ section.id }} .cap-web-services__icon svg {
    width: 54%;
    height: 54%;
    fill: none;
    stroke: var(--cws-icon);
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
 
  @media (max-width: 850px) {
    #shopify-section-{{ section.id }} .cap-web-services__inner {
      grid-template-columns: minmax(0, 1fr);
    }
  }
 
  @media (prefers-reduced-motion: reduce) {
    #shopify-section-{{ section.id }} .cap-web-services__button { transition: none; }
  }
{% endstyle %}
 
{%- comment -%} Built-in SVG icon library, captured once and reused by every block and the CTA {%- endcomment -%}
{%- capture icon_design -%}
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="4" width="14" height="12" rx="1.5"></rect><path d="M6 19h8"></path><path d="M10 16v3"></path><path d="M16.5 8.5l3-3 1.5 1.5-3 3-2 .5.5-2z"></path></svg>
{%- endcapture -%}
 
{%- capture icon_shield -%}
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3l7 3v5.5c0 4-2.9 7.6-7 8.5-4.1-.9-7-4.5-7-8.5V6z"></path><path d="M9 12l2 2 4-4"></path></svg>
{%- endcapture -%}
 
<section class="cap-web-services">
  <div class="cap-web-services__inner">
 
    <div class="cap-web-services__media">
      {%- if section.settings.image != blank -%}
        {{
          section.settings.image
          | image_url: width: 1200
          | image_tag:
            loading: 'lazy',
            widths: '400, 600, 800, 1000, 1200',
            sizes: '(max-width: 850px) 100vw, 480px',
            alt: section.settings.image_alt
        }}
      {%- else -%}
        {{ 'image' | placeholder_svg_tag: 'cap-web-services__image placeholder-svg' }}
      {%- endif -%}
    </div>
 
    <div class="cap-web-services__content">
      <h2>{{ section.settings.heading }}</h2>
 
      {%- if section.blocks.size > 0 -%}
        <div class="cap-web-services__grid">
          {%- for block in section.blocks -%}
            <div class="cap-web-services__item" {{ block.shopify_attributes }}>
              {%- if block.settings.icon_image != blank or block.settings.icon != 'none' -%}
                <div class="cap-web-services__icon">
                  {%- comment -%} An uploaded icon wins, otherwise use the built-in SVG {%- endcomment -%}
                  {%- if block.settings.icon_image != blank -%}
                    {{ block.settings.icon_image | image_url: width: 160 | image_tag: loading: 'lazy', alt: '' }}
                  {%- else -%}
                    {%- case block.settings.icon -%}
                      {%- when 'design' -%}{{ icon_design }}
                      {%- when 'shield' -%}{{ icon_shield }}
                    {%- endcase -%}
                  {%- endif -%}
                </div>
              {%- endif -%}
 
              <h3>{{ block.settings.title }}</h3>
              <p>{{ block.settings.text }}</p>
            </div>
          {%- endfor -%}
        </div>
      {%- endif -%}
 
      {%- if section.settings.show_cta -%}
        <div class="cap-web-services__cta-row">
          <div class="cap-web-services__cta-text">
            <strong>{{ section.settings.cta_title }}</strong>
            <span>{{ section.settings.cta_text }}</span>
          </div>
 
          <a
            class="cap-web-services__button"
            href="{{ section.settings.button_link | default: '#' }}"
            {% if section.settings.button_new_tab %}target="_blank" rel="noopener"{% endif %}
          >
            {{ section.settings.button_label }}
            <span class="cap-web-services__button-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      {%- endif -%}
    </div>
 
  </div>
</section>
 
{% schema %}
{
  "name": "Web Services",
  "tag": "section",
  "max_blocks": 8,
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading" },
    { "type": "image_picker", "id": "image", "label": "Section Image" },
    {
      "type": "select",
      "id": "image_position",
      "label": "Image Position (Desktop)",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "right", "label": "Right" }
      ],
      "default": "left"
    },
    { "type": "range", "id": "image_width", "min": 300, "max": 620, "step": 10, "unit": "px", "label": "Image Column Width", "default": 480 },
    {
      "type": "select",
      "id": "columns",
      "label": "Service Columns (Desktop)",
      "options": [
        { "value": "2", "label": "2 columns" },
        { "value": "3", "label": "3 columns" },
        { "value": "4", "label": "4 columns" }
      ],
      "default": "4",
      "info": "Tablet drops to 2 columns and mobile to 1 automatically."
    },
    { "type": "checkbox", "id": "use_gradient", "label": "Use gradient on panel", "default": true },
    { "type": "color", "id": "panel_color_start", "label": "Panel Color 1", "default": "#eef5ff" },
    { "type": "checkbox", "id": "show_cta", "label": "Show CTA row", "default": true }
  ],
  "blocks": [
    {
      "type": "service",
      "name": "Service",
      "settings": [
        { "type": "image_picker", "id": "icon_image", "label": "Icon Image", "info": "Optional. Overrides the built-in icon." },
        {
          "type": "select",
          "id": "icon",
          "label": "Built-in Icon",
          "options": [
            { "value": "none", "label": "None" },
            { "value": "design", "label": "Design" },
            { "value": "shield", "label": "Shield" }
          ],
          "default": "design"
        },
        { "type": "text", "id": "title", "label": "Title" },
        { "type": "textarea", "id": "text", "label": "Description" }
      ]
    }
  ],
  "presets": [{ "name": "Web Services" }]
}
{% endschema %}`,
 
        'Recent Projects': `{%- liquid
  assign sid = section.id
  assign s = section.settings
-%}
 
<style>
  /* Editor settings become CSS variables, scoped to this section instance */
  #cap-projects-{{ sid }},
  [data-cap-modal-section="{{ sid }}"] {
    --cap-blue: {{ s.color_accent }};
    --cap-navy: {{ s.color_heading }};
    --cap-radius: {{ s.corner_radius }}px;
  }
 
  #cap-projects-{{ sid }} .cap-projects__grid {
    display: grid;
    grid-template-columns: repeat({{ s.columns_desktop }}, minmax(0, 1fr));
    gap: {{ s.grid_gap }}px;
  }
 
  {%- if s.card_hover -%}
  #cap-projects-{{ sid }} .cap-project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(24, 36, 59, 0.12);
  }
  {%- endif -%}
 
  /* Popup overlay: sized to the dynamic viewport so mobile browser bars never cover it */
  [data-cap-modal-section="{{ sid }}"] {
    position: fixed;
    inset: 0;
    z-index: 999999;
    display: none;
    height: 100dvh;
    background: rgba(9, 20, 45, .72);
    backdrop-filter: blur(5px);
  }
  [data-cap-modal-section="{{ sid }}"].is-open { display: flex; }
 
  @media (max-width: 750px) {
    #cap-projects-{{ sid }} .cap-projects__grid {
      grid-template-columns: repeat({{ s.columns_mobile }}, minmax(0, 1fr));
    }
  }
</style>
 
<section id="cap-projects-{{ sid }}" class="cap-projects">
  <div class="cap-projects__grid">
    {%- for block in section.blocks -%}
      {%- assign b = block.settings -%}
      <article class="cap-project-card" {{ block.shopify_attributes }}>
        <img
          class="cap-project-card__image"
          src="{{ b.image | image_url: width: 800 }}"
          srcset="{{ b.image | image_url: width: 400 }} 400w,
                  {{ b.image | image_url: width: 800 }} 800w,
                  {{ b.image | image_url: width: 1200 }} 1200w"
          sizes="(max-width: 750px) 100vw, 33vw"
          alt="{{ b.image.alt | default: b.title | escape }}"
          loading="lazy">
 
        <h3 class="cap-project-card__title">{{ b.title }}</h3>
        <span class="cap-project-card__client">{{ b.client }}</span>
        <div class="cap-project-card__text">{{ b.description }}</div>
 
        {%- if b.enable_popup -%}
          <button type="button" class="cap-project-card__link"
                  data-project-modal="{{ block.id }}" aria-haspopup="dialog">
            {{ b.link_label | default: 'View Project' }} <span aria-hidden="true">→</span>
          </button>
        {%- elsif b.link_url != blank -%}
          <a class="cap-project-card__link" href="{{ b.link_url }}">
            {{ b.link_label | default: 'View Project' }} <span aria-hidden="true">→</span>
          </a>
        {%- endif -%}
      </article>
    {%- endfor -%}
  </div>
 
  <div class="cap-project-modals">
    {%- for block in section.blocks -%}
      {%- liquid
        assign b = block.settings
        unless b.enable_popup
          continue
        endunless
 
        comment
          Build gallery lists from up to five optional image pickers
        endcomment
        assign main_urls = ''
        assign thumb_urls = ''
 
        for i in (1..5)
          case i
            when 1
              assign img = b.gallery_1
            when 2
              assign img = b.gallery_2
            when 3
              assign img = b.gallery_3
            when 4
              assign img = b.gallery_4
            when 5
              assign img = b.gallery_5
          endcase
 
          if img != blank
            assign main_url = img | image_url: width: 1400
            assign thumb_url = img | image_url: width: 400
            assign main_urls = main_urls | append: main_url | append: '||'
            assign thumb_urls = thumb_urls | append: thumb_url | append: '||'
          endif
        endfor
 
        assign main_list = main_urls | split: '||'
        assign thumb_list = thumb_urls | split: '||'
        assign features = b.features | newline_to_br | split: '<br />'
      -%}
 
      <div class="cap-project-modal"
           id="cap-project-{{ sid }}-{{ block.id }}"
           data-cap-modal-section="{{ sid }}"
           role="dialog" aria-modal="true">
        <button class="cap-project-modal__close" type="button" aria-label="Close">&times;</button>
 
        <ul>
          {%- for feature in features -%}
            {%- assign f = feature | strip_html | strip -%}
            {%- if f != blank -%}<li>{{ f }}</li>{%- endif -%}
          {%- endfor -%}
        </ul>
 
        <img class="cap-gallery-main" src="{{ main_list[0] }}" alt="">
        <div class="cap-project-gallery__thumbs">
          {%- for thumb in thumb_list -%}
            <img src="{{ thumb }}" data-full="{{ main_list[forloop.index0] }}" loading="lazy" alt="">
          {%- endfor -%}
        </div>
      </div>
    {%- endfor -%}
  </div>
</section>
 
<script>
(function () {
  var sectionId = {{ sid | json }};
 
  function initSection() {
    var root = document.getElementById('cap-projects-' + sectionId);
    if (!root || root.dataset.capInit === 'true') return;
    root.dataset.capInit = 'true';
 
    // Move popups to body so transformed parents cannot clip them
    var host = root.querySelector('.cap-project-modals');
    while (host && host.firstElementChild) {
      document.body.appendChild(host.firstElementChild);
    }
 
    // iOS: pin the overlay to the visual viewport so the close button
    // never ends up behind the browser address bar or keyboard
    function syncViewport(modal) {
      var vv = window.visualViewport;
      if (!vv) return;
      modal.style.top = vv.offsetTop + 'px';
      modal.style.height = vv.height + 'px';
    }
 
    function openModal(id) {
      var modal = document.getElementById('cap-project-' + sectionId + '-' + id);
      if (!modal) return;
      modal.classList.add('is-open');
      syncViewport(modal);
      document.body.classList.add('cap-project-modal-open');
      modal.querySelector('.cap-project-modal__close').focus();
    }
 
    root.querySelectorAll('[data-project-modal]').forEach(function (button) {
      button.addEventListener('click', function () {
        openModal(button.getAttribute('data-project-modal'));
      });
    });
 
    // Gallery: thumbnails plus prev / next that wrap around
    document.querySelectorAll('[data-cap-modal-section="' + sectionId + '"]').forEach(function (modal) {
      var mainImage = modal.querySelector('.cap-gallery-main');
      var thumbs = modal.querySelectorAll('.cap-project-gallery__thumbs img');
      var current = 0;
 
      function update(index) {
        current = index;
        mainImage.src = thumbs[current].getAttribute('data-full') || thumbs[current].src;
        thumbs.forEach(function (t) { t.classList.remove('is-active'); });
        thumbs[current].classList.add('is-active');
      }
 
      thumbs.forEach(function (thumb, index) {
        thumb.addEventListener('click', function () { update(index); });
      });
    });
 
    // Theme editor: preview a popup when its block is selected
    document.addEventListener('shopify:block:select', function (event) {
      if (event.detail.sectionId === sectionId) openModal(event.detail.blockId);
    });
  }
 
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSection);
  } else {
    initSection();
  }
 
  // Re-initialise when the section is re-rendered in the theme editor
  document.addEventListener('shopify:section:load', function (event) {
    if (event.detail.sectionId === sectionId) initSection();
  });
})();
</script>
 
{% schema %}
{
  "name": "Recent Projects",
  "tag": "section",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow label" },
    { "type": "text", "id": "heading", "label": "Heading" },
    { "type": "range", "id": "columns_desktop", "min": 1, "max": 5, "step": 1, "label": "Columns on desktop", "default": 3 },
    { "type": "range", "id": "grid_gap", "min": 8, "max": 48, "step": 2, "unit": "px", "label": "Space between cards", "default": 24 },
    { "type": "checkbox", "id": "card_hover", "label": "Lift cards on hover", "default": true },
    { "type": "color", "id": "color_accent", "label": "Accent", "default": "#3865e8" },
    { "type": "range", "id": "modal_width", "min": 700, "max": 1300, "step": 20, "unit": "px", "label": "Popup width", "default": 1000 }
  ],
  "blocks": [
    {
      "type": "project",
      "name": "Project",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Card image" },
        { "type": "text", "id": "title", "label": "Project title" },
        { "type": "text", "id": "client", "label": "Client / location" },
        { "type": "richtext", "id": "description", "label": "Card description" },
        { "type": "checkbox", "id": "enable_popup", "label": "Open a popup", "default": true },
        { "type": "url", "id": "link_url", "label": "Link URL", "info": "Used only when the popup is turned off." },
        { "type": "textarea", "id": "features", "label": "List items", "info": "One item per line." },
        { "type": "image_picker", "id": "gallery_1", "label": "Gallery image 1" },
        { "type": "image_picker", "id": "gallery_2", "label": "Gallery image 2" }
      ]
    }
  ],
  "presets": [{ "name": "Recent Projects" }]
}
{% endschema %}`,
 
        Industries: `<section
  class="cap-industries"
  style="
    --section-bg: {{ section.settings.section_bg }};
    --grid-bg: {{ section.settings.grid_bg }};
    --heading-size: {{ section.settings.heading_size }}px;
    --item-title-size: {{ section.settings.item_title_size }}px;
    --grid-gap: {{ section.settings.grid_gap }}px;
    --grid-radius: {{ section.settings.grid_radius }}px;
    --item-min-height: {{ section.settings.item_height }}px;
  "
>
  <div class="page-width">
    {% if section.settings.eyebrow != blank %}
      <div class="cap-eyebrow">{{ section.settings.eyebrow }}</div>
    {% endif %}
 
    {% if section.settings.heading != blank %}
      <h2 class="cap-industries__heading">{{ section.settings.heading }}</h2>
    {% endif %}
 
    <div class="industry-grid">
      {% for block in section.blocks %}
        <div class="industry-item" {{ block.shopify_attributes }}>
          {% if block.settings.icon %}
            {{
              block.settings.icon
              | image_url: width: 150
              | image_tag: loading: 'lazy', class: 'industry-icon'
            }}
          {% endif %}
          <span>{{ block.settings.title }}</span>
        </div>
      {% endfor %}
    </div>
  </div>
</section>
 
{% style %}
/* Prefixing with the section id keeps the styles isolated when the section is reused */
#shopify-section-{{ section.id }} .industry-grid {
  display: grid;
  grid-template-columns: repeat({{ section.settings.desktop_columns }}, minmax(0, 1fr));
  gap: var(--grid-gap);
  background: var(--grid-bg);
  border-radius: var(--grid-radius);
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(6, 37, 74, .08);
}
 
#shopify-section-{{ section.id }} .industry-item {
  min-height: var(--item-min-height);
  padding: 22px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  border-right: 1px solid rgba(0, 0, 0, .08);
}
 
#shopify-section-{{ section.id }} .industry-icon {
  width: {{ section.settings.icon_size }}px;
  height: auto;
  object-fit: contain;
}
 
@media (max-width: 990px) {
  #shopify-section-{{ section.id }} .industry-grid {
    grid-template-columns: repeat({{ section.settings.tablet_columns }}, minmax(0, 1fr));
  }
}
 
@media (max-width: 768px) {
  #shopify-section-{{ section.id }} .industry-grid {
    grid-template-columns: repeat({{ section.settings.mobile_columns }}, minmax(0, 1fr));
  }
  #shopify-section-{{ section.id }} .cap-industries__heading {
    font-size: calc(var(--heading-size) * 0.9);
  }
}
{% endstyle %}
 
{% schema %}
{
  "name": "CAP Industries",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "WHO WE HELP" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Built for Growing Businesses" },
    { "type": "color", "id": "section_bg", "label": "Section Background", "default": "#f4f8ff" },
    { "type": "range", "id": "item_height", "label": "Item Height", "min": 80, "max": 250, "step": 5, "default": 125 },
    { "type": "range", "id": "icon_size", "label": "Icon Size", "min": 20, "max": 100, "step": 2, "default": 48 },
    {
      "type": "select",
      "id": "desktop_columns",
      "label": "Desktop Columns",
      "options": [
        { "value": "4", "label": "4 Column" },
        { "value": "6", "label": "6 Column" },
        { "value": "8", "label": "8 Column" }
      ]
    }
  ],
  "blocks": [
    {
      "type": "industry",
      "name": "Industry",
      "settings": [
        { "type": "image_picker", "id": "icon", "label": "Icon" },
        { "type": "text", "id": "title", "label": "Industry Name" }
      ]
    }
  ],
  "presets": [
    {
      "name": "CAP Industries",
      "blocks": [{ "type": "industry" }, { "type": "industry" }, { "type": "industry" }]
    }
  ]
}
{% endschema %}`,
 
        'Support Plans': `{% style %}
/* Theme editor colours are exposed as variables to both the section and its popups */
#shopify-section-{{ section.id }} .plans-section,
.cap-it-modal[data-cap-section="{{ section.id }}"] {
  --cap-brand: {{ section.settings.modal_cta_bg }};
  --cap-modal-bg: {{ section.settings.modal_bg }};
  --cap-modal-width: {{ section.settings.modal_max_width }}px;
  --cap-modal-radius: {{ section.settings.modal_radius }}px;
}
 
/* Self-sizing so a 5th or 6th card does not strand a row */
#shopify-section-{{ section.id }} .plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
 
/* Each block carries its own accent colour */
#shopify-section-{{ section.id }} .plan-card.highlighted .plan-header {
  background: var(--block-accent-bg-color);
  color: #fff;
  margin: -26px -26px 20px;
  padding: 18px 26px;
}
{% endstyle %}
 
<section class="plans-section">
  <div class="plans-grid">
    {% for block in section.blocks %}
      {% if block.type == 'plan' %}
        <div
          class="plan-card {% if block.settings.highlight %}highlighted{% endif %}"
          style="--block-accent-bg-color: {{ block.settings.accent_color }};"
          {{ block.shopify_attributes }}
        >
          <h3>{{ block.settings.title }}</h3>
          <p>{{ block.settings.description }}</p>
 
          <ul class="plan-features">
            {% assign feature_list = block.settings.features | newline_to_br | split: '<br />' %}
            {% for item in feature_list %}
              {% assign item_text = item | strip %}
              {% if item_text != blank %}<li>{{ item_text }}</li>{% endif %}
            {% endfor %}
          </ul>
 
          {% comment %} Button opens a popup, or falls back to a normal link {% endcomment %}
          {% if block.settings.modal_enabled %}
            <button type="button" class="btn-plan" data-cap-open="cap-modal-{{ block.id }}">
              {{ block.settings.modal_button_text }}
            </button>
          {% elsif block.settings.button_text != blank %}
            <a href="{{ block.settings.button_link }}" class="btn-plan">
              {{ block.settings.button_text }}
            </a>
          {% endif %}
        </div>
      {% endif %}
    {% endfor %}
  </div>
 
  {% comment %} One popup per block, layout chosen in the theme editor {% endcomment %}
  {% for block in section.blocks %}
    {% if block.settings.modal_enabled %}
      {%- assign layout = block.settings.modal_layout | default: 'detail' -%}
 
      <div class="cap-it-modal" id="cap-modal-{{ block.id }}"
           data-cap-section="{{ section.id }}" aria-hidden="true">
        {%- case layout -%}
          {%- when 'consultation' -%}
            {% comment %} Sends to Shopify contact form or builds a WhatsApp message {% endcomment %}
            {%- if block.settings.form_destination == 'contact' -%}
              {% form 'contact', class: 'cap-form' %}
                {% if form.posted_successfully? %}
                  <p class="cap-form__message">{{ block.settings.form_success_message }}</p>
                {% endif %}
                <input id="cap-name-{{ block.id }}" type="text" name="contact[name]" required>
                <input id="cap-email-{{ block.id }}" type="email" name="contact[email]" required>
                <textarea id="cap-msg-{{ block.id }}" name="contact[body]"></textarea>
                <button type="submit">{{ block.settings.form_submit_text }}</button>
              {% endform %}
            {%- else -%}
              <form class="cap-form" data-cap-whatsapp="{{ block.settings.whatsapp_number | remove: ' ' | remove: '+' | remove: '-' }}">
                <input id="cap-name-{{ block.id }}" type="text" name="full_name" required>
                <button type="submit">{{ block.settings.form_submit_text }}</button>
              </form>
            {%- endif -%}
 
          {%- else -%}
            <h2>{{ block.settings.modal_heading }}</h2>
            <ul class="cap-it-modal__list">
              {% assign modal_features = block.settings.modal_features | newline_to_br | split: '<br />' %}
              {% for item in modal_features %}
                {% assign item_text = item | strip %}
                {% if item_text != blank %}<li>{{ item_text }}</li>{% endif %}
              {% endfor %}
            </ul>
        {%- endcase -%}
      </div>
    {% endif %}
  {% endfor %}
</section>
 
<script>
(function () {
  var SECTION_ID = {{ section.id | json }};
 
  function openModal(modal) {
    if (!modal || modal.classList.contains('is-open')) return;
    modal.capReturnFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cap-modal-open');
  }
 
  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.cap-it-modal.is-open')) {
      document.body.classList.remove('cap-modal-open');
    }
    if (modal.capReturnFocus) modal.capReturnFocus.focus();
  }
 
  // Move modals out of the section so parent transforms cannot clip the overlay
  function portalModals(sectionId) {
    var root = document.getElementById('shopify-section-' + sectionId);
    if (!root) return;
    root.querySelectorAll('.cap-it-modal').forEach(function (m) {
      document.body.appendChild(m);
    });
  }
 
  // Keep Tab focus inside the open dialog
  function trapFocus(modal, event) {
    var focusables = modal.querySelectorAll('a[href], button:not([disabled]), input, select, textarea');
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
 
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
 
  // Turn the form fields into a pre-filled WhatsApp message
  function buildWhatsAppUrl(form) {
    var lines = [];
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      if (!field.name || !field.value) return;
      var label = form.querySelector('label[for="' + field.id + '"]');
      lines.push((label ? label.textContent.trim() : field.name) + ': ' + field.value);
    });
    var body = form.getAttribute('data-cap-intro') || 'Hello, I would like to book a free IT consultation.';
    return 'https://wa.me/' + form.getAttribute('data-cap-whatsapp') +
      '?text=' + encodeURIComponent(body + '\\n\\n' + lines.join('\\n'));
  }
 
  // Document-level listeners are registered once so they survive
  // theme editor section re-renders
  if (!window.capITModalBound) {
    window.capITModalBound = true;
 
    document.addEventListener('click', function (event) {
      var opener = event.target.closest('[data-cap-open]');
      if (opener) {
        event.preventDefault();
        openModal(document.getElementById(opener.getAttribute('data-cap-open')));
      }
    });
 
    document.addEventListener('keydown', function (event) {
      var modal = document.querySelector('.cap-it-modal.is-open');
      if (!modal) return;
      if (event.key === 'Escape') closeModal(modal);
      if (event.key === 'Tab') trapFocus(modal, event);
    });
 
    document.addEventListener('submit', function (event) {
      var form = event.target;
      if (!form.matches('form[data-cap-whatsapp]') || !form.checkValidity()) return;
      event.preventDefault();
      window.open(buildWhatsAppUrl(form), '_blank');
    });
  }
 
  portalModals(SECTION_ID);
})();
</script>
 
{% schema %}
{
  "name": "IT Support Plans",
  "max_blocks": 12,
  "settings": [
    { "type": "color", "id": "modal_cta_bg", "label": "Popup accent", "default": "#0068ff" },
    { "type": "range", "id": "modal_max_width", "min": 700, "max": 1300, "step": 20, "unit": "px", "label": "Popup width", "default": 1000 }
  ],
  "blocks": [
    {
      "type": "plan",
      "name": "Plan Card",
      "settings": [
        { "type": "text", "id": "title", "label": "Plan Title" },
        { "type": "color", "id": "accent_color", "label": "Accent Color", "default": "#2563eb" },
        { "type": "textarea", "id": "features", "label": "Card Features (one per line)" },
        { "type": "checkbox", "id": "highlight", "label": "Highlight Plan", "default": false },
        { "type": "checkbox", "id": "modal_enabled", "label": "Open modal on button click", "default": true },
        {
          "type": "select",
          "id": "modal_layout",
          "label": "Modal Type",
          "options": [
            { "value": "detail", "label": "Plan details" },
            { "value": "consultation", "label": "Consultation form" }
          ],
          "default": "detail"
        },
        {
          "type": "select",
          "id": "form_destination",
          "label": "Send Submissions To",
          "options": [
            { "value": "whatsapp", "label": "WhatsApp" },
            { "value": "contact", "label": "Shopify contact form (store email)" }
          ],
          "default": "whatsapp"
        }
      ]
    },
    {
      "type": "help",
      "name": "Help Card",
      "settings": [
        { "type": "image_picker", "id": "help_image", "label": "Card Image" },
        { "type": "text", "id": "help_title", "label": "Card Title" }
      ]
    }
  ],
  "presets": [
    { "name": "IT Support Plans", "blocks": [{ "type": "plan" }, { "type": "plan" }, { "type": "help" }] }
  ]
}
{% endschema %}`,
 
        Experience: `{% style %}
@keyframes infiniteScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
 
#shopify-section-{{ section.id }} .cap-proof-grid {
  display: grid;
  grid-template-columns: repeat({{ section.settings.cards_per_row }}, 1fr);
  gap: 28px;
}
 
/* Logo marquee: pure CSS, pauses on hover */
#shopify-section-{{ section.id }} .cap-logo-slider-container {
  overflow: hidden;
  width: 100%;
}
 
#shopify-section-{{ section.id }} .cap-logo-slider {
  display: flex;
  gap: 18px;
  width: fit-content;
  animation: infiniteScroll 30s linear infinite;
}
 
#shopify-section-{{ section.id }} .cap-logo-slider-container:hover .cap-logo-slider {
  animation-play-state: paused;
}
 
@media screen and (max-width: 749px) {
  /* Proof cards become a horizontal swipe row on phones */
  #shopify-section-{{ section.id }} .cap-proof-grid {
    display: flex;
    overflow-x: auto;
    gap: 16px;
  }
 
  #shopify-section-{{ section.id }} .cap-proof-card {
    flex-shrink: 0;
    width: 280px;
  }
 
  #shopify-section-{{ section.id }} .cap-experience-header h2 {
    font-size: calc({{ section.settings.heading_size }}px * .9);
  }
}
{% endstyle %}
 
<section class="cap-experience-section">
  <div class="cap-experience-container">
    <div class="cap-proof-grid">
      {% for block in section.blocks %}
        {% if block.type == 'proof_card' %}
          <div class="cap-proof-card" {{ block.shopify_attributes }}>
            {% if block.settings.icon %}
              <div class="cap-proof-icon">
                {{ block.settings.icon | image_url: width: 120 | image_tag: loading: 'lazy' }}
              </div>
            {% endif %}
            <h3>{{ block.settings.title }}</h3>
            <p>{{ block.settings.description }}</p>
          </div>
        {% endif %}
      {% endfor %}
    </div>
 
    <div class="cap-logo-slider-container">
      <div class="cap-logo-slider">
        {% comment %} Set 1: the real logos, editable in the theme editor {% endcomment %}
        {% for block in section.blocks %}
          {% if block.type == 'partner_logo' %}
            {% if block.settings.link != blank %}
              <a href="{{ block.settings.link }}" class="cap-logo-card cap-logo-slider-item" {{ block.shopify_attributes }}>
            {% else %}
              <div class="cap-logo-card cap-logo-slider-item" {{ block.shopify_attributes }}>
            {% endif %}
 
              {% if block.settings.logo %}
                {{
                  block.settings.logo
                  | image_url: width: 300
                  | image_tag: loading: 'lazy', widths: '150,200,300', alt: block.settings.alt_text
                }}
              {% else %}
                {{ block.settings.alt_text }}
              {% endif %}
 
            {% if block.settings.link != blank %}</a>{% else %}</div>{% endif %}
          {% endif %}
        {% endfor %}
 
        {% comment %}
          Set 2: the same loop again with aria-hidden="true" and no shopify_attributes.
          The duplicate makes the -50% translate loop seamless without hiding
          the real logos from screen readers.
        {% endcomment %}
      </div>
    </div>
  </div>
</section>
 
{% schema %}
{
  "name": "CAP IT Experience",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow" },
    { "type": "text", "id": "heading", "label": "Heading" },
    { "type": "text", "id": "partner_heading", "label": "Partner Heading", "default": "TRUSTED TECHNOLOGY PARTNERS" },
    { "type": "range", "id": "cards_per_row", "min": 2, "max": 4, "step": 1, "label": "Cards Per Row", "default": 3 },
    { "type": "range", "id": "heading_size", "min": 24, "max": 80, "step": 2, "unit": "px", "label": "Heading Size", "default": 56 },
    { "type": "color", "id": "section_bg", "label": "Section Background", "default": "#f7fbff" }
  ],
  "blocks": [
    {
      "type": "proof_card",
      "name": "Proof Card",
      "settings": [
        { "type": "image_picker", "id": "icon", "label": "Icon" },
        { "type": "text", "id": "title", "label": "Title", "default": "40+ Years" },
        { "type": "textarea", "id": "description", "label": "Description" }
      ]
    },
    {
      "type": "partner_logo",
      "name": "Partner Logo",
      "settings": [
        { "type": "image_picker", "id": "logo", "label": "Logo" },
        { "type": "text", "id": "alt_text", "label": "Alt Text", "default": "Partner Logo" },
        { "type": "url", "id": "link", "label": "Optional Link" }
      ]
    }
  ],
  "presets": [
    {
      "name": "CAP IT Experience",
      "blocks": [{ "type": "proof_card" }, { "type": "proof_card" }, { "type": "partner_logo" }]
    }
  ]
}
{% endschema %}`,
 
        Contact: `{% style %}
.contact-section {
  background: var(--bg-color);
  color: var(--text-color);
  padding-top: var(--padding-top);
  padding-bottom: var(--padding-bottom);
}
 
.contact-grid {
  display: grid;
  grid-template-columns: 280px 1fr 250px;
  gap: 38px;
  align-items: start;
}
 
.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 12px;
}
 
/* Scoped to the section so the theme's other inputs are not affected */
.contact-section input,
.contact-section select,
.contact-section textarea {
  width: 100%;
  padding: 13px 14px;
  border-radius: 4px;
  border: 1px solid #c7d4e4;
  font-family: inherit;
}
 
.btn-submit {
  width: 100%;
  padding: 14px;
  border: none;
  cursor: pointer;
  background: {{ section.settings.button_bg }};
  color: {{ section.settings.button_text_color }};
  font-weight: 600;
}
 
@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
}
{% endstyle %}
 
<section
  class="contact-section"
  style="
    --bg-color: {{ section.settings.bg_color }};
    --text-color: {{ section.settings.text_color }};
    --padding-top: {{ section.settings.padding_top }}px;
    --padding-bottom: {{ section.settings.padding_bottom }}px;
  "
>
  <div class="page-width">
    <div class="contact-grid">
 
      {% comment %} Left: heading plus benefit blocks {% endcomment %}
      <div class="contact-left">
        <h2>{{ section.settings.heading }}</h2>
        <p>{{ section.settings.description }}</p>
        <ul class="contact-benefits">
          {% for block in section.blocks %}
            {% if block.type == 'benefit' %}
              <li class="benefit-item" {{ block.shopify_attributes }}>
                {% if block.settings.icon != blank %}
                  <img src="{{ block.settings.icon | image_url: width: 24 }}" alt="">
                {% endif %}
                <span>{{ block.settings.text }}</span>
              </li>
            {% endif %}
          {% endfor %}
        </ul>
      </div>
 
      {% comment %} Middle: native Shopify contact form, delivered to the store email {% endcomment %}
      <div class="contact-form-wrapper">
        {% form 'contact' %}
          <div class="form-row">
            <input type="text" name="contact[name]" placeholder="Your Name*" required>
            <input type="text" name="contact[company]" placeholder="Company Name*" required>
          </div>
 
          <div class="form-row">
            <input type="tel" name="contact[phone]" placeholder="Phone Number*" required>
            <input type="email" name="contact[email]" placeholder="Email Address*" required>
          </div>
 
          <div class="form-row">
            <select name="contact[employees]">
              <option>Number of Employees*</option>
              <option>1-10</option>
              <option>11-25</option>
              <option>26-50</option>
            </select>
            <select name="contact[service]">
              <option>What do you need help with?</option>
              <option>IT AMC</option>
              <option>Office Setup</option>
              <option>Microsoft 365</option>
            </select>
          </div>
 
          <textarea name="contact[body]" placeholder="Tell us more about your requirement"></textarea>
 
          <button type="submit" class="btn-submit">{{ section.settings.button_text }}</button>
        {% endform %}
      </div>
 
      {% comment %} Right: contact detail blocks, each with an optional tel: / mailto: link {% endcomment %}
      <div class="contact-details">
        {% for block in section.blocks %}
          {% if block.type == 'contact_item' %}
            <div class="contact-item" {{ block.shopify_attributes }}>
              <div>
                <strong>{{ block.settings.label }}</strong><br>
                {% if block.settings.link != blank %}
                  <a href="{{ block.settings.link }}">{{ block.settings.value }}</a>
                {% else %}
                  {{ block.settings.value }}
                {% endif %}
              </div>
            </div>
          {% endif %}
        {% endfor %}
      </div>
 
    </div>
  </div>
</section>
 
{% schema %}
{
  "name": "Contact Section",
  "max_blocks": 10,
  "settings": [
    { "type": "color", "id": "bg_color", "label": "Background Color", "default": "#0b1b2b" },
    { "type": "color", "id": "text_color", "label": "Text Color", "default": "#ffffff" },
    { "type": "range", "id": "padding_top", "label": "Padding Top", "min": 0, "max": 120, "step": 4, "default": 44 },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Need IT Support for Your Business?" },
    { "type": "textarea", "id": "description", "label": "Description" },
    { "type": "text", "id": "button_text", "label": "Button Text", "default": "Request a Free IT Consultation" },
    { "type": "color", "id": "button_bg", "label": "Button Background", "default": "#1e90ff" }
  ],
  "blocks": [
    {
      "type": "benefit",
      "name": "Benefit Item",
      "settings": [
        { "type": "image_picker", "id": "icon", "label": "Icon" },
        { "type": "text", "id": "text", "label": "Text", "default": "Quick Response" }
      ]
    },
    {
      "type": "contact_item",
      "name": "Contact Item",
      "settings": [
        { "type": "text", "id": "label", "label": "Label", "default": "Call Us" },
        { "type": "text", "id": "value", "label": "Value" },
        { "type": "url", "id": "link", "label": "Optional Link (tel:, mailto:, https)" }
      ]
    }
  ],
  "presets": [{ "name": "Contact Section" }]
}
{% endschema %}`,
    },
},
]

function CodePreview({ type }) {
    if (type === 'faq') return <div className="space-y-2 text-left text-[10px] text-gray-700"><div className="flex items-center justify-between p-2 bg-white rounded"><span>Can I edit the content?</span><b>+</b></div><div className="p-2 bg-white rounded"><span>Does it work on mobile?</span><b className="float-right">−</b><p className="pt-1 text-gray-400">Yes, with editor-controlled content.</p></div><div className="flex items-center justify-between p-2 bg-white rounded"><span>Can I reuse it?</span><b>+</b></div></div>
    if (type === 'product') return <div className="grid h-full grid-cols-2 gap-3 p-3 text-left"><div className="rounded-lg bg-gradient-to-br from-amber-100 to-orange-200" /><div className="flex flex-col justify-center"><span className="text-[9px] font-semibold tracking-widest text-fuchsia-600">NEW ARRIVAL</span><b className="mt-1 text-sm leading-tight">Made for everyday use.</b><span className="w-16 h-2 mt-2 bg-gray-900 rounded-full" /></div></div>
    if (type === 'collection') return <div className="grid h-full grid-cols-3 gap-2 p-3"><div className="rounded bg-gradient-to-br from-lime-200 to-green-400" /><div className="rounded bg-gradient-to-br from-pink-200 to-rose-400" /><div className="rounded bg-gradient-to-br from-sky-200 to-blue-400" /></div>
    return <div className="grid h-full grid-cols-3 gap-2 p-3"><div className="flex flex-col justify-end p-2 rounded bg-white/80"><span className="w-4 h-4 mb-auto rounded-full bg-fuchsia-300" /><b className="text-xs">Brand</b><span className="mt-1 text-[8px] text-gray-500">Strategy</span></div><div className="flex flex-col justify-end p-2 rounded bg-white/80"><span className="w-4 h-4 mb-auto rounded-full bg-lime-300" /><b className="text-xs">Design</b><span className="mt-1 text-[8px] text-gray-500">Systems</span></div><div className="flex flex-col justify-end p-2 rounded bg-white/80"><span className="w-4 h-4 mb-auto bg-orange-300 rounded-full" /><b className="text-xs">Build</b><span className="mt-1 text-[8px] text-gray-500">Launch</span></div></div>
}

function highlight(code) {
    return code.split(/(\/\/.*|<[^>]*?>|"[^"\n]*"|'[^'\n]*'|\{[%{].*?[}%]\}|\b(?:const|class|for|if|return|section|assign)\b)/g).map((part, index) => {
        const className = part.startsWith('//') ? 'text-gray-500' : /^['"]/.test(part) ? 'text-amber-300' : /^(const|class|for|if|return|section|assign)$/.test(part) ? 'text-fuchsia-300' : /<|\{%|\{\{/.test(part) ? 'text-lime-300' : ''
        return <span key={index} className={className}>{part}</span>
    })
}

function CodeModal({ project, onClose }) {
    const tabs = Object.keys(project.code)
    const [tab, setTab] = useState(tabs[0])
    const [copied, setCopied] = useState(false)
    const overlayRef = useRef(null)
    useEffect(() => {
        const closeOnEscape = (event) => event.key === 'Escape' && onClose()
        document.addEventListener('keydown', closeOnEscape)
        return () => document.removeEventListener('keydown', closeOnEscape)
    }, [onClose])

    useEffect(() => {
    const { body, documentElement: html } = document
    const previous = {
        bodyOverflow: body.style.overflow,
        htmlOverflow: html.style.overflow,
        paddingRight: body.style.paddingRight,
    }
    // Keep the layout from shifting when the scrollbar disappears
    const scrollbarWidth = window.innerWidth - html.clientWidth

    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
        body.style.overflow = previous.bodyOverflow
        html.style.overflow = previous.htmlOverflow
        body.style.paddingRight = previous.paddingRight
    }
}, [])

    const copyCode = async () => {
        await navigator.clipboard.writeText(project.code[tab])
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
    }
    return <div data-lenis-prevent ref={overlayRef} className="fixed inset-0 z-[60] flex overflow-y-auto overscroll-contain p-4 bg-black/65 backdrop-blur-sm" role="presentation" onMouseDown={onClose}>
        <section role="dialog" aria-modal="true" aria-labelledby="code-dialog-title" className="w-full max-w-3xl m-auto overflow-hidden bg-white border border-gray-200 shadow-2xl rounded-2xl dark:border-white/20 dark:bg-darkTheme" onMouseDown={(event) => event.stopPropagation()}>
            <header className="flex items-start justify-between gap-4 p-5 border-b border-gray-200 dark:border-white/15"><div><p className="text-xs font-semibold tracking-widest uppercase text-fuchsia-600">{project.label}</p><h2 id="code-dialog-title" className="mt-1 text-xl font-semibold font-Poppins">{project.title}</h2></div><button aria-label="Close code preview" onClick={onClose} className="grid text-xl border border-gray-300 rounded-full w-9 h-9 place-items-center dark:border-white/30">×</button></header>
            <div className="flex gap-2 px-5 pt-4 overflow-x-auto border-b border-gray-200 dark:border-white/15">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`shrink-0 px-3 py-2 text-sm border-b-2 ${tab === item ? 'border-fuchsia-600 text-fuchsia-700 dark:text-fuchsia-300' : 'border-transparent text-gray-500 dark:text-white/60'}`}>{item}</button>)}</div>
            <pre className="max-h-[55vh] min-h-72 overflow-auto overscroll-contain bg-[#180923] p-5 text-xs leading-6 text-gray-100"><code>{highlight(project.code[tab])}</code></pre>
            <footer className="flex items-center justify-between gap-4 p-4 border-t border-gray-200 dark:border-white/15"><span className="text-sm text-gray-500 dark:text-white/60">Representative implementation snippet</span><button onClick={copyCode} className="px-5 py-2 text-sm font-medium text-white bg-black rounded-full dark:bg-white dark:text-black">{copied ? 'Copied!' : 'Copy code'}</button></footer>
        </section>
    </div>
}

export default function CustomDevelopment() {
    const [filter, setFilter] = useState('all')
    const [selected, setSelected] = useState(null)
    const visibleProjects = useMemo(() => filter === 'all' ? projects : projects.filter((project) => project.platform === filter), [filter])
    return <section id="custom-development" className="w-full px-[8%] py-20 scroll-mt-20 font-Poppins" aria-labelledby="custom-development-title">
        <div className="max-w-6xl mx-auto">
            <div className="grid gap-10 pb-12 border-b border-gray-200 lg:grid-cols-[1.2fr_.8fr] dark:border-white/15">
                <div><p className="mb-3 text-sm font-semibold tracking-[0.2em] uppercase text-fuchsia-600">Custom development</p><h2 id="custom-development-title" className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">From design to <span className="text-transparent bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text">custom code.</span></h2><p className="max-w-2xl mt-5 leading-7 text-gray-600 dark:text-white/70">Custom Duda widgets and Shopify Liquid sections that extend the platform while staying flexible for content editors and maintainable for teams.</p></div>
                <div className="grid grid-cols-2 gap-3 p-4 border border-gray-200 rounded-2xl bg-gradient-to-br from-fuchsia-50 to-orange-50 dark:border-white/15 dark:from-darkHover dark:to-darkTheme"><div className="p-3 bg-white rounded-xl dark:bg-white/10"><span className="text-2xl">◈</span><h3 className="mt-3 font-semibold">Duda widgets</h3><p className="mt-1 text-xs text-gray-500 dark:text-white/60">HTML · CSS · JS · Handlebars</p></div><div className="p-3 bg-white rounded-xl dark:bg-white/10"><span className="text-2xl">⌘</span><h3 className="mt-3 font-semibold">Shopify sections</h3><p className="mt-1 text-xs text-gray-500 dark:text-white/60">Liquid · Schema · CSS</p></div></div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-5 mt-10"><div><p className="text-sm font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-white/60">Code + result</p><h3 className="mt-1 text-3xl font-bold">Component showcase</h3></div><div className="flex gap-2 p-1 border border-gray-200 rounded-full dark:border-white/20" role="tablist" aria-label="Platform filters">{[['all', 'All'], ['duda', 'Duda'], ['shopify', 'Shopify']].map(([value, label]) => <button key={value} onClick={() => setFilter(value)} role="tab" aria-selected={filter === value} className={`px-4 py-2 text-sm rounded-full transition ${filter === value ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-white/10'}`}>{label}</button>)}</div></div>
            <div className="grid gap-6 mt-8 md:grid-cols-2">{visibleProjects.map((project, index) => <article key={project.id} className="overflow-hidden transition duration-300 border border-gray-200 group rounded-2xl dark:border-white/20 hover:-translate-y-1 hover:shadow-black dark:hover:shadow-white" style={{ animation: `custom-card-enter .45s ease-out ${index * 70}ms both` }}><div className="bg-gray-100 dark:bg-white/10">
  <img
    src={project.image}
    alt={`${project.title} preview`}
    className="block w-full h-auto transition duration-500 group-hover:scale-[1.02]"
  />
</div>
<div className="p-6"><p className="text-xs font-semibold tracking-widest uppercase text-fuchsia-600">{project.label}</p><h4 className="mt-2 text-xl font-semibold">{project.title}</h4><p className="mt-3 text-sm leading-6 text-gray-600 dark:text-white/70">{project.description}</p><div className="flex flex-wrap gap-2 mt-5">{project.technologies.map((technology) => <span key={technology} className="px-2.5 py-1 text-xs border border-gray-200 rounded-full dark:border-white/20">{technology}</span>)}</div><div className="flex flex-wrap items-center gap-4 mt-6">
  <button
    onClick={() => setSelected(project)}
    className="flex items-center gap-2 text-sm font-semibold transition hover:text-fuchsia-600"
  >
    &lt;/&gt; View code <span aria-hidden="true">→</span>
  </button>

  {project.demoUrl && (
    <a
      href={project.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm font-semibold transition hover:text-fuchsia-600"
    >
      {project.demoLabel ?? demoLabels[project.platform] ?? 'View live demo'} <span aria-hidden="true">↗</span>
    </a>
  )}
</div></div></article>)}</div>
            <a href="#contact" className="flex items-center justify-center gap-2 px-8 py-2 mx-auto mt-12 border border-gray-300 rounded-full w-max hover:bg-slate-100/70 dark:border-white/25 dark:hover:bg-darkHover">Have a component in mind? Let&apos;s talk <span>→</span></a>
        </div>
        {selected && <CodeModal project={selected} onClose={() => setSelected(null)} />}
    </section>
}
