import fs from "fs";

const reposInJSON = fs.readFileSync("sponsored-repos.json");

function jsonToCsv(json) {
  const objects = JSON.parse(json);

  let result = "";
  result += "name,owner,description,topic,language,stars\n";
  objects.sort((a, b) => b.stars - a.stars);
  objects.forEach((obj) => {
    result += `"${obj.name}","${obj.owner}","${obj.description}","${obj.topic}","${obj.language}","${obj.stars}"\n`;
  });
  fs.writeFileSync("most-famous-sponsored-repos.csv", result);
}

jsonToCsv(reposInJSON);
