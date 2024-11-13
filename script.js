import { OpenAI } from "openai";
import dotenv from "dotenv";
import fs from "fs/promises";
dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const getResponse = async (content) => {
	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "user",
					content: content,
				},
			],
		});
		return completion.choices[0].message.content;
	} catch (error) {
		console.error("Error fetching response:", error);
	}
};

const fetchArticle = async () => {
	try {
		const response = await fetch(process.env.ARTICLE_URL);
		const data = await response.text();

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

const createPrompt = (articleContent) => {
	return `
	You are a helpful assistant and an expert in HTML content creation.
	Your task is to convert the following article into structured HTML content.
	Please use appropriate HTML tags to structure the content.

	For images, identify suitable places in the article where images could enhance the content.
	Use the <img> tag with src="image_placeholder.jpg" and provide a descriptive alt attribute
	that can be used as a prompt to generate the image. Add captions under each image using
	appropriate HTML tags.

	Wrap the entire content in an <article> tag.

	Do not include any CSS or JavaScript. The returned HTML should only contain content to be
	placed between <body> and </body> tags. Do not include <html>, <head>, or <body> tags.

	Do not add any additional commentary, footnotes, or disclaimers in the article. 

	Here is the article:
	${articleContent}
	`;
};

const main = async () => {
	const articleContent = await fetchArticle();
	if (articleContent) {
		const prompt = createPrompt(articleContent);
		const response = await getResponse(prompt);
		if (response) {
			const cleanedResponse = response.replace(/```html|```/g, "").trim();
			try {
				await fs.writeFile("artykul.html", cleanedResponse);
				console.log("HTML content saved to artykul.html");
			} catch (error) {
				console.error("Error writing to file:", error);
			}
		}
	}
};

main();
