import fs from "fs";

const reposInJSON = fs.readFileSync("sponsored-repos.json");

function jsonToCsv(json) {
  const objects = JSON.parse(json);

  let csvStr = "name,owner,description,topic,language,stars\n";

  objects.forEach((obj) => {
    csvStr += `"${obj.name?.replaceAll('"', '""')}",`;
    csvStr += `"${obj.owner?.replaceAll('"', '""')}",`;
    csvStr += `"${obj.description?.replaceAll('"', '""')}",`;
    csvStr += `"${obj.topic?.replaceAll('"', '""')}",`;
    csvStr += `"${obj.language?.replaceAll('"', '""')}",`;
    csvStr += `"${obj.stars?.toString().replaceAll('"', '""')}"\n`;
  });

  fs.writeFileSync("sponsored-repos.csv", csvStr);
}

jsonToCsv(reposInJSON);
