import pg from "pg";
import fs from "fs";

const databaseURL =
  "postgres://postgres:nuvenssaolegais@localhost:5432/repositories";

const { Pool } = pg;

const connection = new Pool({
  connectionString: databaseURL,
});

async function saveReactTypeScriptReposInJSON() {
  try {
    const result = await connection.query(
      `SELECT
        "fullName", description, tags
      FROM repositories WHERE language='TypeScript'`
    );

    const typeScriptRepos = result.rows;
    const reactTypeScriptRepos = typeScriptRepos
      .filter((repo) => {
        const tagsStr = repo.tags.replaceAll("'", '"');
        const tags = JSON.parse(tagsStr);
        return tags.includes("react");
      })
      .map((repo) => ({
        url: "https://github.com/" + repo.fullName,
        description: repo.description,
        tags: JSON.parse(repo.tags.replaceAll("'", '"')),
      }));

    const reactTypeScriptReposStr = JSON.stringify(reactTypeScriptRepos);
    fs.writeFileSync("react-typescript-repos.json", reactTypeScriptReposStr);
  } catch (error) {
    console.error(error);
  }
}

await saveReactTypeScriptReposInJSON();
