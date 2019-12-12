const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const phantom = require('puppeteer');

// const got = require('got');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'color',
            message: 'What is your favorite color, which will be used as a background color for cards : \n'
        },
        {
            type: 'input',
            name: 'username',
            message: 'Enter your Github username: '
        }
    ]);
}

function generateHTML(answers, userDataGithub) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    
    <link rel="stylesheet" type="text/css" href="assets/style/style.css">
    
    <title>Developer Profile Generator</title>
  </head>
  <body>
  <header>
  <h2>Hi!</h2>
  <h2> My name is MADHUMITHA PRABAKARAN !</h2>
  <h3> Currently @ Linux Kernel Developer </h3>
  <div style="width: 500px; background: ${answers.color}">
    <div style="float: left; width: 200px;">Location</div>
    <div style="float: left; width: 100px;">
    <a target="_blank" href="https://github.com/Madhumitha">GitHub</a>
    </div>
    <br style="clear: left;" />
    </div>
</header>

<section>
<h4> ${userDataGithub.bio} </h4>
<div class="row">
      <div class="col-sm-6">
              <div class="card-body">
                      <p class="card-text">Public Repositories : ${userDataGithub.public_repos}</p>
              </div>
              <div class="card-body">
                      <p class="card-text">Followers : ${userDataGithub.followers}</p>
              </div>
      </div>
      <div class="col-sm-6">
              <div class="card-body">
                      <p class="card-text">GitHub Stars</p>
               </div>
               <div class="card-body">
                      <p class="card-text">Following : ${userDataGithub.following}</p>
              </div>
      </div>
  </div>
</section>

<footer>

</footer>
  </body>
  </html>`;
}

function axiosTest(data) {

        let gitUser = data.username;
        const queryUrl = 'https://api.github.com/users/' + gitUser;

        return axios.get(queryUrl).then(response => {
            console.log(response.data);
            return response.data;
        })
    }

async function init() {
    try {
        const answers = await promptUser();
        await axiosTest(answers).then(data => {
        console.log(data);
        const html=generateHTML(answers, data);
        writeFileAsync('index.html', html);
        console.log("Successfully wrote to index.html");
    })
}
    catch(err) {
        console.log(err);
    }
}

init();

// Create a pdf

const puppeteer=require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({defaultViewport: null});
  const page = await browser.newPage();
  await page.goto('https://madhumitha.github.io/DeveloperProfileGenerator/', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'index.pdf', format: 'A4', printBackground:true, preferCSSPageSize: true});
  await browser.close();
})();
