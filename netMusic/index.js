//goal: download music .mp3
//1. get the info of song, get the .mp3 address



// const axios = require("axios");
// const fs = require("fs");

// async function getPage(num) {
//     let httpUrl = "https://www.app-echo.com/api/recommend/sound-day?page=" + num;
//     let res = await axios.get(httpUrl);
//     // console.log(res.data.list);
//     res.data.list.forEach(function (item, i) {
//         let title = item.sound.name;
//         let mp3Url = item.sound.source;
//         console.log(title);
//         console.log(mp3Url);
//         download(mp3Url, title);
//     })
// }

// async function download(mp3Url, title) {
//     let res = axios.get(mp3Url, { responseType: "stream" });
//     let ws = fs.createWriteStream('./mp3/' + title + ".mp3");
//     res.data.pipe(ws);
//     res.data.on('close', function () {
//         ws.close();
//     })
// }


// getPage(8);




























const axios = require("axios");
const fs = require("fs");
const path = require('path');

async function getPage(num) {
    let httpUrl = "https://www.app-echo.com/api/recommend/sound-day?page=" + num;
    let res = await axios.get(httpUrl);
    // console.log(res.data.list);
    res.data.list.forEach(function (item, i) {
        let title = item.sound.name;
        let mp3Url = item.sound.source;
        let fileName = path.parse(mp3Url).name;

        let content = `${title},${mp3Url},${fileName}\n`
        fs.writeFile('music.txt', content, { flag: 'a' }, function () {
            console.log("Written: " + title);
        });
        console.log(fileName);
        console.log(mp3Url);
        download(mp3Url, fileName);
    })
}

async function download(mp3Url, fileName) {
    axios.get(mp3Url, { responseType: "stream" }).then(function (res) {
        let ws = fs.createWriteStream('./mp3/' + fileName + ".mp3");
        res.data.pipe(ws);
    });
    // res.data.on('close', function () {
    //     ws.close();
    // })
}


getPage(8);