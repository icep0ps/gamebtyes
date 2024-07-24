async function fetch() {
  try {
    const html = await this.fetchHTML();

    const links = this.extractMultipleLinks(html);

    const articles = await Promise.all(links.map((link) => this.fetchContent({ link })));

    return articles;
  } catch (error) {}
}
