import pg from "pg";
import fs from "fs";

const databaseURL =
  "postgres://postgres:nuvenssaolegais@localhost:5432/repositories";

const { Pool } = pg;

const connection = new Pool({
  connectionString: databaseURL,
});

async function saveSponsoredReposInJSON() {
  try {
    const result = await connection.query(
      `SELECT
        name, owner, description, topic, language, stars
      FROM repositories WHERE "hasSponsorship"=true ORDER BY stars DESC;`
    );

    const sponsoredRepos = JSON.stringify(result.rows);

    fs.writeFileSync("sponsored-repos.json", sponsoredRepos);
  } catch (error) {
    console.error(error);
  }
}

await saveSponsoredReposInJSON();
