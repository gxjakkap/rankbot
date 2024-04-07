import { defineConfig } from 'vitepress'
import { getSidebar } from 'vitepress-plugin-auto-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rankbot",
  description: "Query any player's rank without hassle",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/getting-started' },
      { text: 'Privacy Policy', link: '/privacy-policy' },
      { text: 'Invite', link: 'https://guntxjakka.me/rankbot' }
    ],

    sidebar: [
      { text: 'Privacy Policy', link: '/privacy-policy' }, 
      { text: 'General', items: [
        { text: 'Getting Started', link: '/docs/getting-started' }, 
        { text: 'Prefix', link: '/docs/prefix' }, 
      ]},
      ...getSidebar({ 
        contentRoot: 'www', 
        contentDirs: ['docs/valorant', 'docs/apex'], 
        collapsible: true, collapsed: false, 
        useFrontmatter: true
      })
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gxjakkap/rankbot' },
      { icon: 'discord', link: 'https://guntxjakka.me/rankbot' }
    ],

    footer: {
      message: 'Made with 🔥 by jakka.',
      copyright: 'Copyright © 2021-present <a href="https://guntxjakka.me">Jakkaphat Ch.</a>'
    }
  }
})
