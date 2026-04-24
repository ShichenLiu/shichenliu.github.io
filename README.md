# Personal Website

A clean, minimal personal website built with Hugo, inspired by modern academic and professional websites.

## Features

- Clean, minimal design
- Responsive layout
- Academic-style homepage with publications
- Blog functionality
- Easy content management with Markdown
- Fast static site generation

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (Extended version recommended)

### Development

1. **Start the development server:**
   ```bash
   hugo server --buildDrafts
   ```

2. **Open your browser** and navigate to `http://localhost:1313`

3. **Build the site for production:**
   ```bash
   hugo --minify
   ```

## Customization

### Site Configuration

Edit `hugo.toml` to customize:
- Site title and description
- Personal information
- Publications list
- Navigation menu

### Content

- **Homepage**: The homepage content is configured in `hugo.toml` under `[params]`
- **About page**: Edit `content/about.md`
- **Publications**: Edit `content/publications.md`
- **Blog posts**: Create new posts with `hugo new content blog/your-post-title.md`

### Styling

The theme uses a clean, minimal design with:
- Inter font family
- Responsive grid layout
- Clean typography
- Subtle hover effects

Styles are located in `themes/clean-minimal/static/css/style.css`.

## Deployment

The site generates static files in the `public/` directory. You can deploy to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Structure

```
├── content/           # Site content
│   ├── about.md      # About page
│   ├── publications.md # Publications page
│   └── blog/         # Blog posts
├── themes/           # Custom theme
│   └── clean-minimal/
├── hugo.toml         # Site configuration
└── README.md         # This file
```

## License

This project is open source and available under the [MIT License](LICENSE).
