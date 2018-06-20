import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const app = express();

app.get("/search", async (req, res) => {
  const { endpoint, tag } = req.query;
  const { data: pageContent } = await axios.get(endpoint);
  const $ = cheerio.load(pageContent);
  const results = [];
  $(tag).each(function(i, elem) {
    results.push({
      innerText: $(this).text(),
      innerHtml: $(this).html()
    })
  });
  res.send({ [tag]: results });
});

app.get("/exists", async (req, res) => {
  const { endpoint, tag, text } = req.query;
  const { data: pageContent } = await axios.get(endpoint);
  const $ = cheerio.load(pageContent);
  const exists = $(`${tag}:contains(${text})`).length ? true:false;
  res.send({ exists });
})


app.listen(process.env.PORT || 5000, () => console.log('App listening on port 5000!'))
