# HTML Content Generator

This application fetches an article from a specified URL and converts it into structured HTML content using OpenAI's GPT-4o model. The generated HTML is saved to a file named `artykul.html`.

## Prerequisites

- Node.js installed on your machine
- An OpenAI API key
- A `.env` file with the following variables:
  - `OPENAI_API_KEY`: Your OpenAI API key
  - `ARTICLE_URL`: The URL of the article you want to convert

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key and article URL:
   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   ARTICLE_URL=your_article_url
   ```

## Usage

Run the application using the following command:
  ```bash
   node script.js
   ```

The application will fetch the article, convert it to HTML, and save it to `artykul.html`.

## Troubleshooting

- Ensure your `.env` file is correctly configured.
- Check your internet connection if the article fetching fails.
- Verify that your OpenAI API key is valid and has sufficient permissions.

## License

This project is licensed under the MIT License.
