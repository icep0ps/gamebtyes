import db from '../db/client';
import { articles } from '../db/schemas/articles';

import fetchPageHTML from '../utils/scrapper/fetchPageHTML';
import extractContent from '../utils/scrapper/extractContent';
import extractArticleLinksToContent from '../utils/scrapper/extractArticleLinksToContent';
import { categories } from '../db/schemas/categories';
import { articlesWithCategories } from '../db/schemas/articlesWithCategories';

export default async function getLatestArticles(pageURL?: string) {
  try {
    // replace this hard coded url in fetchPageHTML with pageURL
    const html = await fetchPageHTML(`https://www.gamesradar.com/uk/games`);

    const articleLinks = extractArticleLinksToContent(
      html,
      'div.listingResult > a.article-link'
    );

    const extractedArticles = await Promise.all(
      articleLinks.map(async (link) => {
        const html = await fetchPageHTML(link);
        return extractContent(html, 'div#article-body');
      })
    ).catch((error) => {
      throw new Error(error);
    });

    if (extractedArticles.length === 0) {
      return console.log('No articles found');
    }

    console.log('Inserting articles into database');

    const articlesCategories: (typeof categories.$inferInsert)[] = [];

    extractedArticles.forEach((article) => {
      article.categories.forEach(
        (category) =>
          !articlesCategories.find(
            (articleCategory) => articleCategory.name === category.name
          ) && articlesCategories.push(category)
      );
    });

    // create any new categories
    await db
      .insert(categories)
      .values(articlesCategories)
      .onConflictDoNothing({ target: categories.name });

    Promise.all(
      extractedArticles.map(async (article) => {
        // insert article into database
        const articleId = await db
          .insert(articles)
          .values(article)
          .returning({ id: articles.id })
          .then((row) => row[0].id);

        // insert categories into database
        await Promise.all(
          article.categories.map(async (category) => {
            await db
              .insert(articlesWithCategories)
              .values({ articleId, categoryId: category.name });
          })
        );
      })
    ).then((res) => {
      console.log(`successfully add ${res.length} articles to the database`);
      process.exit();
    });
  } catch (error) {
    console.log('Error getting latests articles: ' + error);
  }
}

getLatestArticles();
