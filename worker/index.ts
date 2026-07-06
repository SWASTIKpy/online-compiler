import { createClient } from "redis";
import fs from "fs";
import { spawn } from "child_process";

console.log(process.env.REDIS_URL);
const client = createClient({
  url: process.env.REDIS_URL,
});
client.connect()
    .then(async () => {
        while(1) {
            const response = await client.rPop("problems");
            if (!response) {
                await new Promise((r) => setTimeout(r, 1000));
                continue;
            }

            const parsedResponse = JSON.parse(response);
            const code = parsedResponse.code;
            const language = parsedResponse.language;
            console.log("processing question for user " + parsedResponse.userId);
            if (language === "c++") {
                console.log("Running users c++ code")
                const filePath = __dirname + "/code/a.cpp";
                fs.writeFileSync(filePath, code);
                const res = spawn("g++", [filePath, "-o", __dirname + "/code/a.out"]);
                res.stdout.on("data", (data) => {
                    console.log(data.toString());
                });
            }

            if (language === "js") {
                const filePath = __dirname + "/code/a.js";
                console.log("Running users js code")
                fs.writeFileSync(filePath, code);
                const res = spawn("node", [filePath]);
                res.stdout.on("data", (data) => {
                    console.log(data.toString());
                });
            }

            if(language === "python") {
                const filePath = __dirname + "/code/a.py";
                console.log("Running users python code")
                fs.writeFileSync(filePath, code);
                const res = spawn("python3", [filePath]);
                res.stdout.on("data", (data) => {
                    console.log(data.toString());
                });
            }


            // Update the status in the DB
        }
    });
