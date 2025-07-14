# Georg Fischer WMS Documentation - Deployment Checklist

## Pre-Deployment Verification

### Content Validation ✅
- [x] All WIP pages transformed to full content
- [x] Contact information standardized
- [x] Emergency hotline numbers unified
- [x] Breadcrumb navigation consistent
- [x] Internal links validated
- [x] Terminology standardized

### Technical Requirements ✅
- [x] Jekyll configuration complete (_config.yml)
- [x] All layouts functional (default, wiki, training, error)
- [x] CSS styling complete and responsive
- [x] JavaScript functionality tested
- [x] Manifest.json configured
- [x] Service worker (sw.js) present

### Quality Assurance ✅
- [x] Mobile responsiveness verified
- [x] Cross-browser compatibility considered
- [x] Search functionality implemented
- [x] Navigation menus functional
- [x] All interactive components working

## Deployment Steps

### 1. Pre-Deployment Tasks
```bash
# Install Jekyll dependencies
bundle install

# Build the site
bundle exec jekyll build

# Test locally
bundle exec jekyll serve
# Visit http://localhost:4000 to verify
```

### 2. Configuration Updates

Update `_config.yml` with production values:
```yaml
# Update these values for production
url: "https://your-production-url.com"
baseurl: "/path-if-needed"
```

### 3. Asset Verification

Ensure these directories contain required files:
- `/downloads/` - Software and document downloads
- `/videos/` - Training videos (if referenced)
- `/tools/` - Online tools (if referenced)

### 4. External Dependencies

Verify these external resources:
- Font Awesome icons (CDN or local)
- Google Fonts (if used)
- Any JavaScript libraries

### 5. Security Considerations

- [ ] Remove any development/debug code
- [ ] Verify no sensitive information in commits
- [ ] Check file permissions
- [ ] Enable HTTPS for production
- [ ] Configure proper CORS headers if needed

### 6. Performance Optimization

- [ ] Minify CSS and JavaScript files
- [ ] Optimize images (PDF extracts in assets/images/)
- [ ] Enable caching headers
- [ ] Consider CDN for static assets

### 7. Backup and Version Control

- [ ] Create full backup of current production (if updating)
- [ ] Tag the release in Git
- [ ] Document deployment version

### 8. Post-Deployment Testing

- [ ] Verify all pages load correctly
- [ ] Test search functionality
- [ ] Check all navigation menus
- [ ] Validate contact forms/emails
- [ ] Test on multiple devices
- [ ] Verify 404 page works

### 9. Monitoring Setup

- [ ] Configure uptime monitoring
- [ ] Set up error logging
- [ ] Enable analytics (if required)
- [ ] Create automated backups

### 10. Communication

- [ ] Notify stakeholders of deployment
- [ ] Update internal documentation
- [ ] Inform support team of go-live
- [ ] Schedule training sessions if needed

## Rollback Plan

In case of issues:
1. Keep previous version backup accessible
2. Document rollback procedure
3. Test rollback process
4. Maintain version control tags

## Support Contacts for Deployment

- **Technical Lead:** Erick Hernandez Zenil (erick.hernandez.zenil@georgfischer.com)
- **IT Support:** +41 81 770 5678
- **Emergency:** +41 81 770 9999

## Final Verification

- [ ] All content reviewed and approved
- [ ] Legal/compliance requirements met
- [ ] Accessibility standards checked
- [ ] Documentation complete
- [ ] Training materials ready

---

**Note:** This checklist should be reviewed and customized based on your specific deployment environment and requirements.