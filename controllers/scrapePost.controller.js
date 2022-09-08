const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const { req, res } = require("express");




const scrapePost = async(req, res) => {
  const { url } = req.body;
  console.log("URL FROM CONTROLLER")
  console.log(url)

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



  
  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".ficha-producto")).map(x => x.textContent)
  })
  await fs.writeFile("names.txt", names.join("\r\n"))

/*   await page.click("#clickme")
  const clickedData = await page.$eval("#data", el => el.textContent)
  console.log(clickedData)

  const photos = await page.$$eval("img", imgs => {
    return imgs.map(x => x.src)
  })

  await page.type("#ourfield", "blue")
  await Promise.all([page.click("#ourform button"), page.waitForNavigation()])
  const info = await page.$eval("#message", el => el.textContent)

  console.log(info)

  for (const photo of photos) {
    const imagepage = await page.goto(photo)
    await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
  } */


  await browser.close();
  

   res.status(200).json({
     msg: "File created succesfully",
     status_title: "Scrapping",
     status_message: "caption",
     url: url,
     text: names,
   });
  
  }















module.exports = {scrapePost}