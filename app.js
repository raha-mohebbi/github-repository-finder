const searchTerm = process.argv[2];

async function getRepositories(searchTerm) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${searchTerm}`,
  );

  const data = await response.json();
  const repositories = data.items;

  repositories.forEach((repo, index) => {
    console.log(`${index + 1}. ${repo.full_name}`);
    console.log(`⭐ ${repo.stargazers_count}`);
    console.log(repo.html_url);
    console.log("----------------");
  });
}

if (searchTerm) {
  getRepositories(searchTerm);
} else {
  console.log("please provide a value");
}
