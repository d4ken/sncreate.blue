import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET() {
  return rss({
    title: "SNCreate",
    description: "ただのゲーム好きのブログ",
    site: "https://sncreate.blue",
    items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
    customData: `<language>ja-jp</language>`,
  });
}
