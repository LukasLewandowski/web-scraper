const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const express = require('express');

// TODO: add option to pass this from CLI
const PORT = 8000;
const URL = 'https://www.theguardian.com/international';

const app = express();

axios(URL)
	.then((response) => {
		const responseData = response.data;
		const loadedData = cheerio.load(responseData);
		const articles = [];

		// console.log('---------WHOLE HTML: ' + responseData);
		/** fc-item__title is a class name of div element on The Guardian website
		 *  which contains elements with data that we want */
		loadedData('.fc-item__title', responseData).each(function () {
			//<-- cannot be a function expression
			const title = loadedData(this).text().trim();
			const articleUrl = loadedData(this).find('a').attr('href');
			/** push title and article to empty array and structure it as object */
			articles.push({
				title,
				articleUrl,
			});
		});
		console.log(articles);
		// TODO: save result to file
	})
	.catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
