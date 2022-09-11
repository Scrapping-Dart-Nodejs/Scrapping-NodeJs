const puppeteer = require("puppeteer");
// const fs = require("fs/promises");
const fs = require("fs");
const path = require("path");
const { req, res } = require("express");




  /* 
  url
  parameters to extract or default to DEPAU, selector from warehouses
  photos to client - View photos in client from url
  Touch the photo to save this
  
  
  */







const scrapePost = async(req, res) => {
  const { url } = req.body;
  console.log("URL FROM CONTROLLER");
  console.log(url);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  /*    for (i = 1; i < 6; i++) {
     var element = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".div")).map((a) => ({
        result: a.querySelector('.any-div') && a.querySelector('.any-div').textContent.trim()
    }))
);
      //   .waitForSelector(
      //     // "#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(" + i + ") > a"
      //    "img"
      //  ).then(() => console.log("First <span> from: " + url)); 
     var text = await page.evaluate((element) => element.textContent , element);
     console.log(text);
} */

  const title = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(".main-product h1")
      // document.querySelectorAll(".precio")
    ).map((x) => x.textContent);
  });

  const divData = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(".ficha-producto div p span")
      // document.querySelectorAll(".precio")
    ).map((x) => x.textContent);
  });

  const especifications = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(".especificaciones ul")
      // document.querySelectorAll(".precio")
    ).map((x) => x.textContent);
  });

  // await page.click("#clickme");
  // const clickedData = await page.$eval("#data", (el) => el.textContent);
  // console.log(clickedData);

  const photos = await page.$$eval("img", (imgs) => {
    return imgs.map((x) => x.src);
  });

  // await page.type("#ourfield", "blue")
  // await Promise.all([page.click("#ourform button"), page.waitForNavigation()])
  // const info = await page.$eval("#message", el => el.textContent)
  // console.log(info)

  /*   fs.mkdir(path.join(__dirname, "/.loud", 0777), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Directory created successfully!");
  }); */

  const __dirname = `IMAGES/${divData[1]}/`;
  // const __dirname = `IMAGES`;

  fs.mkdir(path.join(__dirname), { recursive: true }, function (err) {
    // fs.mkdir(path.join(__dirname, `${divData[1]}`), {recursive: true}, function (err) {
    if (err) console.log("Failed to create file at " + __dirname);
  });

  // await fs.writeFile("PRODUCT.txt", divData.join("\r\n"));

  for (const photo of photos) {
    const imagepage = await page.goto(photo);
fs.writeFile(`./${__dirname}/${photo.split("/").pop()}`,await imagepage.buffer(), function (err) {
  if (err) throw err;
  console.log("File is created successfully");
});
    /* FS PROMISES */
    // await fs.writeFile(
    //   `./${__dirname}/${photo.split("/").pop()}`,
    //   await imagepage.buffer()
    // );
  }

  await browser.close();

  res.status(200).json({
    msg: "File scrapped succesfully",
    url: url,
    title: title.toString().toUpperCase(),
    name: divData[0],
    ref: divData[1],
    weight: divData[2],
    ean: divData[3],
    // div: divData,
    especifications: especifications.join("\r\n").replace(/[\r\n]/gm, " "),
    // especifications: especifications.replace(/[\r\n]/gm, " "),
    photos: photos,
  });
}















module.exports = {scrapePost}