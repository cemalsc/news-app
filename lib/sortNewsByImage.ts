export default function sortNewsByImage(news: NewsResponse) {
  const sortedData = news.data.sort((a, b) => {
    // Move items with images before items without images
    return a.image ? -1 : b.image ? 1 : 0;
  });

  return { ...news, data: sortedData };
}