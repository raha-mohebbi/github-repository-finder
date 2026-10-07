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
      console.log("No repositories found");
      return;
    }

    let topTen = repositories.sort(
      (a, b) => b.stargazers_count - a.stargazers_count,
    );

    topTen = topTen.slice(0, 10);

    topTen.forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.full_name}`);
      console.log(`⭐ ${repo.stargazers_count}`);

      if (repo.description === null) {
        console.log(`📝 No description available`);
      } else {
        console.log(`📝 ${repo.description}`);
      }

      console.log(`💻 ${repo.language}`);
      console.log(repo.html_url);
      console.log("----------------");
    });
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
  }
}

if (!searchTerm) {
  console.log("Please provide a search term");
  process.exit(1);
}

if ((!fromDate && toDate) || (fromDate && !toDate)) {
  console.log("Please provide both fromDate and toDate");
  process.exit(1);
}

getRepositories(searchTerm);
