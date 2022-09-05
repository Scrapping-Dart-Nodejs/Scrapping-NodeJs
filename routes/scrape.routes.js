const { Router } = require("express");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validate-fields.middleware");
const router = Router();

const { scrapePost } = require("../controllers/scrapePost.controller");

router.post("/scrape",
    [
        check("url", "Url is required").not().isEmpty(),
        validateFields
    ],

    scrapePost


  /* function (req, res) {
    scrapePost;
    } */
  
);

module.exports = router;
