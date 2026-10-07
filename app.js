
import chalk from "chalk";

console.log(chalk.bold.green("GitHub Repository Finder"));

const searchTerm = process.argv[2];
const fromDate = process.argv[3];
const toDate = process.argv[4];

async function getRepositories(searchTerm) {
  let query = searchTerm;

  if (fromDate && toDate) {
    query += ` created:${fromDate}..${toDate}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const data = await response.json();
    const repositories = data.items;

    if (repositories.length === 0) {
      console.log(chalk.yellow("No repositories found"));
      return;
    }

    let topTen = repositories.sort(
      (a, b) => b.stargazers_count - a.stargazers_count,
    );

    topTen = topTen.slice(0, 10);

    topTen.forEach((repo, index) => {
      console.log(
        chalk.green(`${index + 1}. ${repo.full_name}`),
      );

      console.log(
        chalk.yellow(`⭐ ${repo.stargazers_count}`),
      );

      if (repo.description === null) {
        console.log(
          chalk.gray("📝 No description available"),
        );
      } else {
        console.log(
          chalk.blue(`📝 ${repo.description}`),
        );
      }

      console.log(
        chalk.magenta(`💻 ${repo.language || "Unknown"}`),
      );

      console.log(
        chalk.cyan(repo.html_url),
      );

      console.log(
        chalk.gray("────────────────────────────"),
      );
    });
  } catch (error) {
    console.error(
      chalk.red(`Error fetching repositories: ${error.message}`),
    );
  }
}

function isValidDate(dateString) {
  const date = new Date(dateString);

  const parts = dateString.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  return (
    date instanceof Date &&
    !isNaN(date) &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

if (!searchTerm) {
  console.log(
    chalk.red("Please provide a search term"),
  );

  process.exit(1);
}

if ((!fromDate && toDate) || (fromDate && !toDate)) {
  console.log(
    chalk.red("Please provide both fromDate and toDate"),
  );

  process.exit(1);
}

if (fromDate && !/^\d{4}-\d{2}-\d{2}$/.test(fromDate)) {
  console.log(
    chalk.red("Invalid fromDate format"),
  );

  process.exit(1);
}

if (toDate && !/^\d{4}-\d{2}-\d{2}$/.test(toDate)) {
  console.log(
    chalk.red("Invalid toDate format"),
  );

  process.exit(1);
}

if (fromDate && !isValidDate(fromDate)) {
  console.log(
    chalk.red("Invalid fromDate"),
  );

  process.exit(1);
}

if (toDate && !isValidDate(toDate)) {
  console.log(
    chalk.red("Invalid toDate"),
  );

  process.exit(1);
}

if (fromDate && toDate) {
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);

  if (startDate > endDate) {
    console.log(
      chalk.red("fromDate must be before toDate"),
    );

    process.exit(1);
  }
}

getRepositories(searchTerm);
