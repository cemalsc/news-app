import {gql} from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const NEWS_QUERY = gql`
  query MyQuery(
    $access_key: String!
    $categories: String!
    $keywords: String
  ) {
    myQuery(
      access_key: $access_key
      categories: $categories
      countries: "gb"
      sort: "published_desc"
      keywords: $keywords
    ) {
      data {
        author
        category
        image
        description
        country
        language
        published_at
        source
        title
        url
      }
      pagination {
        count
        limit
        offset
        total
      }
    }
  }
`;

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  const apiKey = process.env.STEPZEN_API_KEY;
  const mediaStackApiKey = process.env.MEDIASTACK_API_KEY;

  if (!apiKey || !mediaStackApiKey) {
    throw new Error("API keys are missing.");
  }

  const queryVariables = {
    access_key: mediaStackApiKey,
    categories: category,
    keywords: keywords,
  };

  // Fetch function with Next.js caching...
  const res = await fetch("https://lubbock.stepzen.net/api/honking-beetle/__graphql", {
    method: "POST",
    cache: isDynamic ? "no-cache" : "default",
    next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey ${apiKey}`,
    },
    body: JSON.stringify({
      query: NEWS_QUERY,
      variables: queryVariables,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch news. Status: ${res.status}`);
  }

  console.log("LOADING NEW DATA FROM API for category >>> ", category, keywords);

  const newsResponse = await res.json();

  // Sort function by images vs not images present
  return sortNewsByImage(newsResponse.data.myQuery);
};

export default fetchNews;