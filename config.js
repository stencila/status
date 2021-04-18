module.exports = {
  baseUrl: "https://status.stenci.la/",
  title: "Stencila Status",
  name: "stencila",
  description: "Status reports for Stencila",
  defaultLocale: "en",
  locales: [
    {
      code: "en",
      iso: "en-US",
      name: "English",
      file: "en.json"
    }
  ],
  content: {
    frontMatterFormat: "yaml",
    systems: ["router", "manager", "broker", "overseer", "monitor", "workers", "database", "storage", "cache"]
  },
  theme: {
    links: {
      en: {
        home: "https://stenci.la",
        privacy: "https://policies.stenci.la/privacy"
      }
    }
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Lato:wght@400;700&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/uplot@1.0.8/dist/uPlot.min.css"
      }
    ],
    script: [
      {
        src: "https://unpkg.com/uplot@1.0.8/dist/uPlot.iife.min.js"
      },
      {
        src: "/plots.js"
      },
      {
        src: "/customizations.js"
      }
    ]
  }
};
