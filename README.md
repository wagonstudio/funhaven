# Shopify Theme for Funhaven

This is a Shopify theme for [client or project name]. Below are the instructions and configuration details.

## Development Instructions

### Installation

1. **Clone the repository**: To start working with this theme, clone the repository to your local machine:

    ```bash
    git clone git@github.com:wagonstudio/[repository-name].git
    ```

2. **Install dependencies**: If you use tools like Shopify CLI to interact with the theme, make sure to have it installed. More details on [Shopify CLI](https://shopify.dev/tools/shopify-cli).

### Project Structure

The project follows this basic structure:

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

- **/assets**: Contains style files, images, and fonts.
- **/layout**: Contains the main `theme.liquid` file, which is the base file of the theme.

## Usage Instructions

#### 🧪 Master Page (Main Template)
The master page acts as a style guide, defining global layout, typography, and reusable design tokens. Font sizes and spacing use vw units for fluid responsiveness.

#### Typography

Use title classes consistently for headings:

```html
<div class="title-1"><h1>Title Here</h1></div>
```

This structure applies to all title classes (like .title-1, .title-2, etc.) and text classes (like .text-l, .text-m). It doesn't matter if we use h1, h2, or h3, as the styles will be applied consistently.


#### CSS Sample Snippets
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

### Font Sizes and Responsive Design
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

### Recommended Structure
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

### CSS Example
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

---

## ✅ Final Notes

This theme is structured to support scalable, maintainable, and visually consistent development. For any questions or contributions, feel free to contact the Wagon Studio dev team.

---

Happy Theming! 🎨

Wagon Design Studio  
[codevamon](https://github.com/codevamon)
