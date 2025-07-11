# GF WMS Knowledge Wiki - GitHub Pages

A comprehensive, modern knowledge base for Warehouse Management System (WMS) documentation, training, and support built with Jekyll and GitHub Pages.

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Dark/Light Theme**: Automatic theme switching with user preference storage
- **Advanced Search**: Client-side search with real-time results
- **Interactive Navigation**: Smooth scrolling and breadcrumb navigation
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation and screen reader support

### Content Sections
- **Training Center**: Progressive learning modules with difficulty levels
- **Knowledge Wiki**: Comprehensive documentation with categorized articles
- **AI Chatbot**: Intelligent assistant for instant WMS help
- **Error Documentation**: Detailed troubleshooting guides with severity levels

### Technical Features
- **Jekyll Static Site Generator**: Fast, secure, and SEO-optimized
- **GitHub Pages Ready**: Easy deployment and hosting
- **Progressive Web App**: Service worker support for offline access
- **Analytics Ready**: Built-in tracking and performance monitoring
- **SEO Optimized**: Meta tags, structured data, and sitemap generation

## 📁 Project Structure

```
github-pages/
├── _config.yml              # Jekyll configuration
├── _layouts/                 # Page templates
│   ├── default.html         # Main layout template
│   ├── training.html        # Training module layout
│   ├── wiki.html           # Wiki article layout
│   └── error.html          # Error documentation layout
├── _includes/               # Reusable components
├── _data/                   # Data files
├── assets/                  # Static assets
│   ├── css/
│   │   └── main.css        # Main stylesheet
│   ├── js/
│   │   └── main.js         # Main JavaScript
│   └── images/             # Image assets
├── pages/                   # Main content pages
│   ├── training/
│   │   └── index.html      # Training center
│   ├── wiki/
│   │   └── index.html      # Knowledge wiki
│   ├── chatbot/
│   │   └── index.html      # AI chatbot
│   └── errors/
│       └── index.html      # Error documentation
├── index.html              # Homepage
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Git
- Ruby 2.7 or higher
- Bundler gem

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gfwms.git
   cd gfwms/github-pages
   ```

2. **Install dependencies**
   ```bash
   # Install Bundler if not already installed
   gem install bundler
   
   # Create Gemfile
   cat > Gemfile << EOF
   source 'https://rubygems.org'
   
   gem 'github-pages', group: :jekyll_plugins
   gem 'jekyll-feed'
   gem 'jekyll-sitemap'
   gem 'jekyll-seo-tag'
   EOF
   
   # Install Jekyll and dependencies
   bundle install
   ```

3. **Configure the site**
   ```bash
   # Update _config.yml with your settings
   # Change baseurl to your repository name
   # Update URL to your GitHub Pages URL
   ```

4. **Run locally**
   ```bash
   bundle exec jekyll serve
   ```
   
   The site will be available at `http://localhost:4000`

### GitHub Pages Deployment

#### Method 1: Direct Push (Recommended)

1. **Create a new GitHub repository**
   - Repository name: `gfwms` (or your preferred name)
   - Make it public (required for free GitHub Pages)

2. **Update configuration**
   ```yaml
   # In _config.yml
   baseurl: "/gfwms"  # Your repository name
   url: "https://yourusername.github.io"  # Your GitHub Pages URL
   ```

3. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: GF WMS Knowledge Wiki"
   git branch -M main
   git remote add origin https://github.com/yourusername/gfwms.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
   - Save

5. **Access your site**
   - Your site will be available at: `https://yourusername.github.io/gfwms`
   - Allow 5-10 minutes for initial deployment

#### Method 2: GitHub Actions (Advanced)

Create `.github/workflows/pages.yml`:

```yaml
name: Build and Deploy to Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
      
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v3
      
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

## 🎨 Customization

### Theme Customization

Edit `assets/css/main.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* Update other CSS variables */
}
```

### Content Management

#### Adding Training Modules

1. Create a new file in `_training/` directory
2. Use the training layout:
   ```yaml
   ---
   layout: training
   title: "Your Training Module"
   description: "Module description"
   duration: "30 min"
   difficulty: "Beginner"
   ---
   ```

#### Adding Wiki Articles

1. Create a new file in `_wiki/` directory
2. Use the wiki layout:
   ```yaml
   ---
   layout: wiki
   title: "Your Wiki Article"
   description: "Article description"
   category: "Operations"
   ---
   ```

#### Adding Error Documentation

1. Create a new file in `_errors/` directory
2. Use the error layout:
   ```yaml
   ---
   layout: error
   title: "Error Title"
   error_code: "SYS-001"
   severity: "Critical"
   ---
   ```

### Navigation Configuration

Update `_config.yml`:

```yaml
navigation:
  - name: "Custom Page"
    url: "/custom/"
```

## 🔧 Advanced Configuration

### SEO Optimization

The site includes:
- Jekyll SEO Tag plugin
- OpenGraph meta tags
- Twitter Card support
- Structured data markup
- XML sitemap generation

### Performance Optimization

- Optimized CSS and JavaScript
- Lazy loading for images
- Service worker for caching
- Minimal HTTP requests
- Compressed assets

### Analytics Integration

Add your analytics code to `_layouts/default.html`:

```html
<!-- Add your analytics code here -->
<script>
  // Google Analytics, Adobe Analytics, etc.
</script>
```

### Search Configuration

The search functionality is client-side and can be customized by:

1. Updating the search data in `assets/js/main.js`
2. Modifying the search algorithm
3. Adding search filters and categories

## 🧪 Testing

### Local Testing

```bash
# Test the site locally
bundle exec jekyll serve --drafts

# Build for production
bundle exec jekyll build
```

### Content Validation

- Check all links are working
- Verify responsive design on different devices
- Test accessibility with screen readers
- Validate HTML and CSS
- Check site speed with tools like Lighthouse

## 📊 Performance Monitoring

### Built-in Features

- Page load time tracking
- User interaction analytics
- Error reporting
- Search query analytics

### Third-party Integration

Compatible with:
- Google Analytics
- Adobe Analytics
- Hotjar
- Mixpanel

## 🔐 Security

### Best Practices Implemented

- Content Security Policy headers
- XSS protection
- HTTPS enforcement
- Secure cookie settings
- Input validation

### GitHub Pages Security

- Automatic HTTPS
- DDoS protection
- Secure hosting infrastructure
- Regular security updates

## 🤝 Contributing

### Content Contributions

1. Fork the repository
2. Create a feature branch
3. Add your content
4. Submit a pull request

### Code Contributions

1. Follow the existing code style
2. Add comments for complex functionality
3. Test your changes locally
4. Update documentation as needed

## 📝 Content Guidelines

### Writing Style

- Use clear, concise language
- Include step-by-step instructions
- Add screenshots and diagrams
- Use consistent terminology
- Keep content up-to-date

### Formatting Standards

- Use proper heading hierarchy
- Include code blocks for commands
- Add alt text for images
- Use tables for structured data
- Include links to related content

## 🐛 Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear Jekyll cache
bundle exec jekyll clean

# Reinstall dependencies
bundle install

# Check for syntax errors
bundle exec jekyll build --verbose
```

#### GitHub Pages Not Updating

1. Check GitHub Actions tab for build errors
2. Verify _config.yml syntax
3. Ensure all files are committed
4. Check GitHub Pages settings

#### Local Development Issues

```bash
# Update Ruby gems
bundle update

# Check Ruby version
ruby --version

# Reinstall Jekyll
gem uninstall jekyll
gem install jekyll
```

## 📞 Support

### Getting Help

- **Documentation**: Check this README and Jekyll docs
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Community**: Join Jekyll community forums

### Reporting Issues

When reporting issues, include:
- Operating system and version
- Ruby version
- Jekyll version
- Error messages
- Steps to reproduce

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🎯 Roadmap

### Planned Features

- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] User authentication
- [ ] Content management dashboard
- [ ] API integration
- [ ] Mobile app
- [ ] Offline functionality
- [ ] Advanced analytics

### Version History

- **v1.0.0**: Initial release with core features
- **v1.1.0**: Enhanced search and navigation
- **v1.2.0**: Mobile optimization
- **v2.0.0**: AI chatbot integration

## 🙏 Acknowledgments

- Jekyll team for the excellent static site generator
- GitHub for free hosting via GitHub Pages
- Font Awesome for icons
- Google Fonts for typography
- Open source community for tools and libraries

---

**Made with ❤️ for the WMS community**

For more information, visit our [GitHub repository](https://github.com/yourusername/gfwms) or contact the development team.