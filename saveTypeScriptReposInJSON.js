import pg from "pg";
import fs from "fs";

const databaseURL =
  "postgres://postgres:nuvenssaolegais@localhost:5432/repositories";

const { Pool } = pg;

const connection = new Pool({
  connectionString: databaseURL,
});

async function saveTypeScriptReposInJSON() {
  try {
    const result = await connection.query(
      `SELECT * FROM repositories WHERE "language"='TypeScript'`
    );

    const typeScriptRepos = result.rows;
    const reposToBeSaved = typeScriptRepos.filter((repo) => {
      const tagsStr = repo.tags.replaceAll("'", '"');
      const tags = JSON.parse(tagsStr);
      return tags.includes("react");
    });

    const reposToBeSavedStr = JSON.stringify(reposToBeSaved);
    fs.writeFileSync("typescript-repos.json", reposToBeSavedStr);
  } catch (error) {
    console.error(error);
  }
}

await saveTypeScriptReposInJSON();
