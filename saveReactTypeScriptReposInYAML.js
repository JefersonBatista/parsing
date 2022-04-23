import fs from "fs";
import yaml from "js-yaml";

const reposInJSON = fs.readFileSync("react-typescript-repos.json");

function jsonToYaml(json) {
  const repositories = JSON.parse(json);

  const yamlStr = yaml.dump({ repositories });
  fs.writeFileSync("react-typescript-repos.yaml", yamlStr);
}

jsonToYaml(reposInJSON);
