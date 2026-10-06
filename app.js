const searchTerm = process.argv[2];

async function getRepositories(searchTerm) {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchTerm}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }
    const data = await response.json();
    const repositories = data.items;
    let topTen = repositories.sort(
      (a, b) => b.stargazers_count - a.stargazers_count,
    );
    topTen = topTen.slice(0, 10);
    if (repositories.length === 0) {
      console.log("No repositories found");
      return;
    }

    topTen.forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.full_name}`);
      console.log(`⭐ ${repo.stargazers_count}`);
      console.log(repo.html_url);
      console.log("----------------");
    });
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
  }
}

if (searchTerm) {
  getRepositories(searchTerm);
} else {
  console.log("please provide a value");
}
