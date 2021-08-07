const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const urlParser = require('url');

const seenUrls = {};

const getUrl = (link, host, protocol) => {
  if (link.includes('http')) {
    return link;
  } else if (link.startsWith('/')) {
    return `${protocol}//${host}${link}`;
  } else {
    return `${protocol}//${host}/${link}`;
  }
};

const crawl = async ({ url, ignore }) => {
  if (seenUrls[url]) return;
  console.log('crawling', url);
  seenUrls[url] = true;

  const { host, protocol } = urlParser.parse(url);

  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const links = $('a')
    .map((i, link) => link.attribs.href)
    .get();

  const imageUrls = $('img')
    .map((i, link) => link.attribs.src)
    .get();
  console.log(imageUrls, 'img');
  imageUrls.forEach((imageUrl) => {
    fetch(getUrl(imageUrl, host, protocol)).then((response) => {
      const filename = path.basename(imageUrl);
      const dest = fs.createWriteStream(`images/${filename}`);
      response.body.pipe(dest);
    });
  });

  links
    .filter((link) => link.includes(host) && !link.includes(ignore))
    .forEach((link) => {
      crawl({
        url: getUrl(link, host, protocol),
        ignore,
      });
    });
};

crawl({
  url: 'https://www.amazon.in/?ie=UTF8&ext_vrnc=hi&tag=googhydrabk-21&ascsubtag=_k_CjwKCAjw3riIBhAwEiwAzD3TiWoPxbgPx9S9On8dESvtTe4lVONxyR-EigRq4bGWXzC_3OseRzPDqxoCN_MQAvD_BwE_k_&ext_vrnc=hi&gclid=CjwKCAjw3riIBhAwEiwAzD3TiWoPxbgPx9S9On8dESvtTe4lVONxyR-EigRq4bGWXzC_3OseRzPDqxoCN_MQAvD_BwE',
  ignore: '/search',
});
