# GitHub Repository Finder

A simple Node.js CLI tool for searching GitHub repositories, filtering them by creation date, and displaying the top repositories sorted by stars.

## Features

- Search GitHub repositories by keyword
- Filter repositories by creation date
- Validate date format (`YYYY-MM-DD`)
- Validate real calendar dates
- Validate date range
- Sort repositories by stars
- Display the top 10 repositories
- Display repository name, stars, description, language, and URL
- Handle GitHub API errors
- Handle empty search results

## Requirements

- Node.js 18+ 

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/github-repository-finder.git
cd github-repository-finder
```

No external dependencies are required.

## Usage

### Search repositories

```bash
node app.js react
```

### Search with a date range

```bash
node app.js react 2026-01-01 2026-03-01
```

The date format must be:

```text
YYYY-MM-DD
```

Both dates must be provided when using a date range.

## Example Output

```text
1. facebook/react
⭐ 245321
📝 The library for web and native user interfaces.
💻 JavaScript
https://github.com/facebook/react
----------------
```

## Validation

The CLI validates:

- Missing search term
- Missing `fromDate` or `toDate`
- Invalid date format
- Invalid calendar dates
- Date ranges where `fromDate` is after `toDate`

For example:

```bash
node app.js react 2026-02-31 2026-03-01
```

will be rejected because February 31 does not exist.

## Tech Stack

- Node.js
- JavaScript
- GitHub REST API
- Fetch API
- Async/Await

## Project Structure

```text
github-repository-finder/
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## License

This project was created as a learning project for practicing Node.js, CLI development, API requests, error handling, validation, and asynchronous JavaScript.
