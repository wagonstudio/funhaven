# 🍄 Funhaven by Wagon Studio
This repository contains the custom **Shopify theme** developed for the project [Funhaven](https://funhaven.com).

> ✨ Designed and developed with a strong focus on animation, performance, and a seamless visual experience for a bold, modern brand.

---

## 🔧 Development Instructions

### 🛠️ Installation
1. **Clone the repository**: To start working with this theme, clone the repository to your local machine:

    ```bash
    git clone git@github.com:wagonstudio/[repository-name].git
    ```

2. **Install dependencies**: If you use tools like Shopify CLI to interact with the theme, make sure to have it installed. More details on [Shopify CLI](https://shopify.dev/tools/shopify-cli).

### 🗂️ Project Structure
The project follows this basic structure:

```bash
/assets
├── styles/
│   ├── theme.css.liquid
│   ├── _responsive.scss
│   ├── _variables.scss
│   └── main.scss
├── images/
└── fonts/

/layout
└── theme.liquid
```

- **/assets**: Contains style files, images, and fonts.
- **/layout**: Contains the main `theme.liquid` file, which is the base file of the theme.

## 🎨 Usage Instructions

#### 🧪 Master Page (Main Template)
The master page acts as a style guide, defining global layout, typography, and reusable design tokens. Font sizes and spacing use vw units for fluid responsiveness.

#### ✍️ Typography

Use title classes consistently for headings:

```html
<div class="title-1"><h1>Title Here</h1></div>
```

This structure applies to all title classes (like .title-1, .title-2, etc.) and text classes (like .text-l, .text-m). It doesn't matter if we use h1, h2, or h3, as the styles will be applied consistently.


#### 💅 CSS Sample Snippets
Below are some CSS rules from the master page that control the overall layout and text styles:

```css
* Hide specific page header */
body.page-107753341101 #shopify-section-head {
  display: none;
}

/* Layout adjustments */
main._master ._full > ._header {
  margin-top: 3rem;
}

main._master ._full ._body > ._flex {
  margin-bottom: 4vw;
  grid-gap: 4vw;
  row-gap: 4vw;
}

/* Title Styling */
._xlgh, ._xlgh * { font-weight: 100; }
._lgh, ._lgh * { font-weight: 200; }

/* Subtitle */
main._master ._subtitle {
  font-family: 'TAYAmaya', sans-serif;
  font-weight: 400;
  border-bottom: 1px solid #191919;
  color: #191919;
  line-height: 120%;
}
```

#### 📐 Font Sizes and Responsive Design
Font sizes and button dimensions are defined using vw for responsiveness across devices.

The design scales automatically based on the viewport width, ensuring a consistent look on desktop and mobile.

Example of a responsive text size definition:

```css
@media(min-width: 1200px) {
  .title-1, .title-1 * {
    font-size: 5.9vw;
  }
}
@media(max-width: 1199px) and (min-width:992px) {
  .title-1, .title-1 * {
    font-size: 7vw;
  }
}
@media(max-width: 991px) and (min-width:768px) {
  .title-1, .title-1 * {
    font-size: 8vw;
  }
}
@media(max-width: 767px) and (min-width:576px) {
  .title-1, .title-1 * {
    font-size: 16.8vw;
  }
}
@media(max-width: 575px) {
  .title-1, .title-1 * {
    font-size: 16.8vw;
  }
}
```

### 🖼️ Image Usage Guidelines
To maintain accessibility and flexibility for animations or transitions, images should be added using the following HTML structure:

```html
<figure><img src="url_img" alt="Description"></figure>
```

This ensures compatibility with A11Y (accessibility) standards. In cases where animation or positioning is needed, it's recommended to place the image as a DOM element rather than using background-image in CSS.

#### 💻 Recommended Structure

##### HTML
```html
<div class="_content">
  <div class="_info">
    <div class="text-l"><p>Sample text here</p></div>
  </div>
  <figure class="_bg">
    <img src="url_img" alt="Background description">
  </figure>
</div>
```

##### CSS
```css
._content {
  position: relative;
}

._content > ._info {
  position: relative;
  z-index: 1;
}

._content > figure._bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
```

## 🎨 Styling Guidelines

- Use `vw` units for spacing and fonts to maintain responsiveness
- Global variables can be modified in `_variables.scss`
- Typography should use `.title-*` and `.text-*` classes for consistency
- Buttons follow the `.btn-i` class with responsive full-width behavior


## 📌 Layout and Section Structure
### 🏠 Section Types
Each section in the theme follows a basic structure, which can be identified by specific class names like ._home, ._blog, ._shop, and ._product. The basic structure for these sections is as follows:


```html
Copiar
<section class="_[home|blog|shop|product]">
  <div class="_head">
    <div class="_heading">
      <!-- Title or other heading content -->
    </div>
  </div>
  
  <div class="_body">
    <div class="_boding">
      <!-- Main content, often with images or text -->
    </div>
  </div>
</section>
```

**._home:** Used for the homepage section, containing general content, animations, and marketing messages.

**._blog:** A section for blog-related pages, typically containing articles or blog entries.

**._shop:** A section dedicated to showcasing products or collections in the store.

**._product:** Used to display individual product details, including images, pricing, and descriptions.

---

### 📐 Flexbox Layouts
The .flex class is used within sections to create flexible and responsive layouts, especially for grids and content organization. It typically includes settings for item spacing, alignment, and positioning.


```css
._flex {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}
```

#### Important Notes:

The .flex class uses display: flex to enable flexible box layouts.
The flex-wrap: wrap ensures that the items will wrap onto the next line when the container is too narrow.

The gap property is used to define the spacing between items inside the .flex container, and this value may vary depending on the viewport width (breakpoints). For instance:

On larger screens (e.g., min-width: 1200px), the gap could be set to 1vw.

For medium-sized screens (e.g., min-width: 992px), the gap could increase to 2vw.

These variations ensure the layout adapts based on screen size, maintaining visual balance across devices.


### 🧩 Grid with Flex
Grid Layout: Inside a .body section, you might use .flex to create a responsive grid of products or images.


```html
<div class="_body">
  <div class="_flex">
    <div class="product-item">Product 1</div>
    <div class="product-item">Product 2</div>
    <div class="product-item">Product 3</div>
  </div>
</div>
```
Flexible Item Alignment: You can adjust the alignment of items inside a .flex container:


```css
._flex {
  display: flex;
  justify-content: center; /* Center items horizontally */
  align-items: flex-start; /* Align items to the top */
}
```

---

## 🎨 Funnies and Customization
In this project, we use animated characters called "Funnies" implemented using SVG graphics. These characters can be dynamically styled with different color themes by applying specific classes.

Each character is represented by an SVG element wrapped in a <figure> tag. Here’s an example of a character:


```html
<figure class="fun fun-persimmon _eating _1">
  <span class="_body _skin">
    <svg >
    </svg>
  </span>
</figure>
```

### 🎨 Color Customization for Funnies
You can change the color of each character by applying a color-specific class to the <figure> tag. The available colors are:


```bash
.fun-persimmon: #ED5C2F (Persimmon)

.fun-marigold: #FF7F4D (Marigold)

.fun-peppercorn: #383A3D (Peppercorn)

.fun-rosemary: #208961 (Rosemary)

.fun-bubblegum: #FFA9E7 (Bubblegum)

.fun-cornflower: #3973C6 (Cornflower)

.fun-canary: #FFD664 (Canary)

.fun-butter: #FBEAA8 (Butter)

.fun-dust: #1E429B (Dust)

```
For example, to apply the "Persimmon" color, you would use the fun-persimmon class as shown below:


```html
<figure class="fun fun-persimmon _eating _1">
  <!-- SVG content here -->
</figure>

```
This will apply the color #ED5C2F to the character's skin.

#### 📂 File Structure for Funnies
The animations and colors are defined in the funnies.liquid file and styled in the corresponding CSS file for funnies. When adding or modifying these characters, make sure to follow the established structure for proper integration into the page.


---

### 📦 Container Layouts
In addition to the .flex layouts, the theme uses .container classes to manage the width and positioning of elements within sections. The .container ensures consistent margins and spacing across devices.

These containers ensure that your layout is well-structured and responsive, adapting seamlessly to different screen sizes.



---

## 🔧 Technologies Used

This theme leverages modern, high-performance front-end tools and animation libraries:

### 🧱 CSS & Frameworks

- [Bootstrap 5.3.3](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Splide.js Core CSS](https://splidejs.com/)
- [Splitting.js](https://splitting.js.org/)

### ⚙️ JavaScript & Animations

- [CartJS](https://cartjs.org/)
- [GSAP 3 (GreenSock)](https://gsap.com/)
  - Includes: GSAP Core, ScrollToPlugin, TweenMax, TimelineMax
- [ScrollMagic](https://scrollmagic.io/)
  - With GSAP integration and debug indicators
- [Flickity](https://flickity.metafizzy.co/)
- [Splide.js (v3.1.5)](https://splidejs.com/)
- [Lenis](https://lenis.studiofreight.com/) – Smooth scrolling
- [Splitting.js](https://splitting.js.org/)
- [jQuery 3.6.0](https://jquery.com/)
- [Popper.js](https://popper.js.org/) – Required for Bootstrap tooltips

---

## 🧠 Project Overview

This theme is fully structured for Shopify and can be installed directly via the admin panel.

- Built with flexible, modular sections
- Enhanced with smooth scroll animations and visual effects
- Mobile-first and responsive-ready
- Lightweight and optimized for fast rendering


---

## 👤 Credits

### 💻 Developed by  
**[@codevamon](https://github.com/codevamon)** – Fullstack developer specializing in advanced front-end animation, Shopify, and high-impact interface design.

### 🎨 In collaboration with  
**[Wagon Studio](https://github.com/wagonstudio)** – A creative studio focused on branding, web development, and digital design for startups.  
🌐 Website: [wagondesignstudio.com](https://wagondesignstudio.com)


---

## ⚠️ License
This project is private and exclusive to the Funhaven brand.  
For collaborations or theme licensing inquiries, contact us via [Wagon Studio](https://wagondesignstudio.com).