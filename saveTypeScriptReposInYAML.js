import fs from "fs";
import yaml from "js-yaml";

const reposInJSON = fs.readFileSync("typescript-repos.json");

function jsonToYaml(json) {
  const objects = JSON.parse(json);
  const objs = objects
    .filter((_, index) => index < 3)
    .map((obj) => ({
      url: "https://github.com/" + obj.fullName,
      description: obj.description,
      tags: JSON.parse(obj.tags.replaceAll("'", '"')),
    }));

  const yamlStr = yaml.dump({ repositories: objs });
  fs.writeFileSync("react-typescript-repos.yaml", yamlStr);
}

jsonToYaml(reposInJSON);
