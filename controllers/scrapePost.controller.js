const puppeteer = require("puppeteer");
const { req, res } = require("express");



const scrapePost = async(req, res) => {
  const { url } = req.body;
  console.log("URL FROM CONTROLLER")
  console.log(url)

   const browser = await puppeteer.launch();
   const page = await browser.newPage();

  await page.goto(url);
  
   for (i = 1; i < 6; i++) {
     var element = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".div")).map((a) => ({
    
        result: a.querySelector('.any-div') && a.querySelector('.any-div').textContent.trim()
    }))
);
       
       
       
       
      /*  .waitForSelector(
          // "#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(" + i + ") > a"
         "img"
       ).then(() => console.log("First <span> from: " + url)); */



     var text = await page.evaluate((element) => element.textContent , element);
     console.log(text);
   }
  await browser.close();
  

   res.status(200).json({
     msg: "File created succesfully",
     status_title: "Scrapping",
     status_message: "caption",
     url: url,
     text: text,
   });
  
  
  }















module.exports = {scrapePost}