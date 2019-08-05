import Parser from "rss-parser";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

function stripHTML(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
/*
    NewsItem:
    {
        title: String,
        date: String,
        link: String,
        guid: Number,
        Description: String // Needs to be passed through to a pre?,
        source: String
        sourceLink: String
    }
*/

/*
    RSSParser returns an initialized rss parser.
    It exposes the following methods:
    getGoogleNews

    They all return a list of News and deal with the asynchronous needs of the network bound operation
*/
function RSSParser() {
  const parser = new Parser({
    customFields: {
      item: ["source"]
    }
  });
  const googleFeed =
    "https://news.google.com/rss/search?q=commodity&hl=en-IN&gl=IN&ceid=IN:en";

  return {
    getGoogleNews: async () => {
      console.log("Querying google news");
      const feed = await parser.parseURL(CORS_PROXY + googleFeed);
      return feed.items
        .map(feedItem => {
          return {
            title: feedItem.title.split("-")[0],
            date: new Date(feedItem.pubDate),
            link: feedItem.link,
            guid: feedItem.guid,
            description: stripHTML(feedItem.content).substr(
              feedItem.title.length - 1
            ),
            source: feedItem.source._,
            sourceLink: feedItem.source.$.url
          };
        })
        .sort((a, b) => a.date < b.date);
    }
  };
}

export default RSSParser;
