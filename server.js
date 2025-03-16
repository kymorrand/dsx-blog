const express = require('express');
const { marked } = require('marked');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

// Navigation structure based on our docs organization
const navigation = {
    'Home': [
        { title: 'Mission & Status', path: '/' }
    ],
    'Documentation': [
        { title: 'Vision & Core Principles', path: '/docs/blog/vision' },
        { title: 'User Experience', path: '/docs/design/ux-principles' },
        { title: 'Technical Architecture', path: '/docs/technical/architecture' },
        { title: 'Features & Components', path: '/docs/design/features' },
        { title: 'Impact & Metrics', path: '/docs/blog/impact' }
    ],
    'Builder Blog': [
        { title: 'Recent Updates', path: '/blog' }
    ],
    'App': [
        { title: 'DSX Web App', path: '/app' }
    ]
};

// Function to generate navigation HTML
function generateNavigation(currentPath) {
    let nav = '';
    
    for (const [section, items] of Object.entries(navigation)) {
        nav += `
            <div class="nav-section">
                <h3>${section}</h3>
                <div class="nav-items">`;
        
        for (const item of items) {
            const isActive = currentPath === item.path;
            nav += `
                    <a href="${item.path}" 
                       class="nav-item${isActive ? ' active' : ''}"
                       ${isActive ? 'aria-current="page"' : ''}>
                        ${item.title}
                    </a>`;
        }
        
        nav += `
                </div>
            </div>`;
    }
    
    return nav;
}

// Function to read and parse MDX files
async function readMdxFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        // Remove frontmatter (content between --- markers)
        const cleanContent = content.replace(/^---[\s\S]*?---\s*/m, '');
        return cleanContent;
    } catch (err) {
        console.error('Error reading MDX file:', err);
        return null;
    }
}

// Serve static files
app.use(express.static('public'));

// Route handlers
app.get('/', async (req, res) => {
    const html = await marked.parse(`
# Digital Sunshine

Welcome to Digital Sunshine, where we're building the future of digital experiences in public.

## Our Mission

Digital Sunshine (DSX) is dedicated to creating innovative digital solutions that bring transparency and accessibility to the digital world. We believe in building in public, sharing our journey, and fostering a community of builders.

## Current Status

We are currently in the early stages of development, focusing on:
- Building our core infrastructure
- Designing user experiences
- Documenting our journey
- Growing our builder community

## Documentation Structure

Our documentation is organized into several key sections:
- **Vision & Core Principles**: Our guiding principles and long-term vision
- **User Experience**: Design decisions and UX principles
- **Technical Architecture**: System design and technical specifications
- **Features & Components**: Detailed feature documentation
- **Impact & Metrics**: Measuring our progress and impact

[Start exploring our documentation →](/docs/blog/vision)
    `);
    res.send(createPage('Digital Sunshine', html, req.path));
});

app.get('/docs/*', async (req, res) => {
    const docPath = req.params[0];
    const filePath = path.join(__dirname, 'docs', docPath);
    
    // Try both .mdx and .md extensions
    let content = null;
    for (const ext of ['.mdx', '.md']) {
        try {
            content = await readMdxFile(filePath + ext);
            if (content) break;
        } catch (err) {
            continue;
        }
    }
    
    if (!content) {
        return res.status(404).send(createPage('Not Found', marked.parse(`
# Page Not Found

The documentation page you're looking for could not be found. 
[Return to home](/)
        `), req.path));
    }
    
    const html = await marked.parse(content);
    res.send(createPage(docPath.split('/').pop().replace(/-/g, ' '), html, '/docs/' + docPath));
});

app.get('/blog', async (req, res) => {
    const html = await marked.parse(`
# Builder Blog

Welcome to the Digital Sunshine Builder Blog, where our team shares daily insights, progress updates, and learnings from building DSX in public.

## Recent Updates
*Coming soon - Builder login required*

Our builder blog will feature:
- Daily development logs
- Design decisions and rationale
- Technical challenges and solutions
- Community feedback and iterations

[Learn about our vision →](/docs/blog/vision)
    `);
    res.send(createPage('Builder Blog', html, req.path));
});

app.get('/app', async (req, res) => {
    const html = await marked.parse(`
# DSX Web Application

## Coming Soon

We're working hard to bring you the Digital Sunshine web application. Our focus is on creating a platform that:

- Enhances digital transparency
- Promotes accessibility
- Builds community
- Empowers builders

While we develop the application, explore our [documentation](/docs/blog/vision) to learn more about what we're building.
    `);
    res.send(createPage('DSX App', html, req.path));
});

function createPage(title, content, currentPath) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} - Digital Sunshine</title>
            <style>
                :root {
                    --bg-color: #ffffff;
                    --text-color: #1a1a1a;
                    --nav-bg: #f8f9fa;
                    --nav-border: #e9ecef;
                    --link-color: #228be6;
                    --code-bg: #f6f8fa;
                    --heading-color: #1a1a1a;
                    --header-height: 3.5rem;
                }
                .dark {
                    --bg-color: #1a1a1a;
                    --text-color: #e9ecef;
                    --nav-bg: #2d2d2d;
                    --nav-border: #404040;
                    --link-color: #74c0fc;
                    --code-bg: #2d2d2d;
                    --heading-color: #ffffff;
                }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background: var(--bg-color);
                    color: var(--text-color);
                    transition: background-color 0.3s ease;
                    padding-top: var(--header-height);
                }
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: var(--header-height);
                    background: var(--nav-bg);
                    border-bottom: 1px solid var(--nav-border);
                    display: flex;
                    align-items: center;
                    padding: 0 1rem;
                    z-index: 30;
                }
                .content-wrapper {
                    display: flex;
                    min-height: calc(100vh - var(--header-height));
                }
                .nav-container {
                    position: sticky;
                    top: var(--header-height);
                    height: calc(100vh - var(--header-height));
                    flex: 0 0 250px;
                    background: var(--nav-bg);
                    border-right: 1px solid var(--nav-border);
                    transition: transform 0.3s ease;
                    overflow-y: auto;
                }
                .nav {
                    padding: 1.5rem;
                }
                .nav-hidden .nav-container {
                    transform: translateX(-250px);
                }
                body.nav-visible::after {
                    content: '';
                    position: fixed;
                    top: var(--header-height);
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 9;
                }
                .nav-toggle {
                    background: transparent;
                    border: none;
                    padding: 0.5rem;
                    cursor: pointer;
                    color: var(--text-color);
                    display: flex;
                    align-items: center;
                    margin-right: 1rem;
                }
                .nav-toggle:hover {
                    color: var(--link-color);
                }
                .site-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--text-color);
                    text-decoration: none;
                    margin-right: auto;
                }
                .theme-toggle {
                    background: transparent;
                    border: none;
                    padding: 0.5rem;
                    cursor: pointer;
                    color: var(--text-color);
                    display: flex;
                    align-items: center;
                }
                .theme-toggle:hover {
                    color: var(--link-color);
                }
                .nav-section h3 {
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-color);
                    margin: 1.5rem 0 0.5rem;
                    opacity: 0.8;
                }
                .nav-section:first-child h3 {
                    margin-top: 0;
                }
                .nav-items {
                    margin-left: 0.5rem;
                }
                .nav-item {
                    display: block;
                    padding: 0.375rem 0;
                    color: var(--text-color);
                    text-decoration: none;
                    font-size: 0.9375rem;
                    opacity: 0.8;
                }
                .nav-item:hover {
                    color: var(--link-color);
                    opacity: 1;
                }
                .nav-item.active {
                    color: var(--link-color);
                    font-weight: 500;
                    opacity: 1;
                }
                main {
                    flex: 1;
                    padding: 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .nav-hidden main {
                    margin-left: 0;
                }
                pre {
                    background: var(--code-bg);
                    padding: 1rem;
                    border-radius: 4px;
                    overflow-x: auto;
                }
                a { color: var(--link-color); }
                h1, h2, h3 { 
                    margin-top: 2rem;
                    color: var(--heading-color);
                }
                h1:first-child {
                    margin-top: 0;
                }
                .sun-icon, .moon-icon {
                    display: none;
                }
                .dark .moon-icon {
                    display: block;
                }
                :not(.dark) .sun-icon {
                    display: block;
                }
                @media (max-width: 768px) {
                    .nav-container {
                        position: fixed;
                        left: 0;
                        transform: translateX(-250px);
                    }
                    main {
                        padding: 1rem;
                    }
                    .nav-visible .nav-container {
                        transform: translateX(0);
                    }
                    body.nav-visible::after {
                        content: '';
                        position: fixed;
                        top: var(--header-height);
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.5);
                        z-index: 9;
                    }
                }
            </style>
        </head>
        <body class="dark">
            <header class="header">
                <button id="toggleNav" class="nav-toggle" aria-label="Toggle navigation">
                    <svg class="menu-icon" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                    </svg>
                </button>
                <a href="/" class="site-title">Digital Sunshine</a>
                <button id="toggleTheme" class="theme-toggle" aria-label="Toggle theme">
                    <svg class="sun-icon" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <svg class="moon-icon" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                    </svg>
                </button>
            </header>
            <div class="content-wrapper">
                <div class="nav-container">
                    <nav class="nav">
                        ${generateNavigation(currentPath)}
                    </nav>
                </div>
                <main>
                    ${content}
                </main>
            </div>
            <script>
                // Navigation toggle
                const body = document.body;
                const toggleNav = document.getElementById('toggleNav');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
                
                toggleNav.addEventListener('click', () => {
                    body.classList.toggle('nav-hidden');
                    if (window.innerWidth <= 768) {
                        body.classList.toggle('nav-visible');
                    }
                });

                // Set initial navigation state based on screen size
                if (window.innerWidth <= 768) {
                    body.classList.add('nav-hidden');
                }

                // Theme toggle
                const html = document.documentElement;
                const toggleTheme = document.getElementById('toggleTheme');
                
                // Set dark mode as default
                if (!localStorage.getItem('theme')) {
                    localStorage.setItem('theme', 'dark');
                }

                // Apply theme from localStorage
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                    html.classList.add('dark');
                } else {
                    html.classList.remove('dark');
                }

                toggleTheme.addEventListener('click', () => {
                    html.classList.toggle('dark');
                    localStorage.setItem('theme', 
                        html.classList.contains('dark') ? 'dark' : 'light'
                    );
                });
            </script>
        </body>
    </html>`;
}

app.listen(port, () => {
    console.log(`Documentation server running at http://localhost:${port}`);
});
