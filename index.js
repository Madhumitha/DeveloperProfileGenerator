const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const path = 'index.html';
const path1 = 'index.pdf';
const writeFileAsync = util.promisify(fs.writeFile);
const puppeteer = require('puppeteer');

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

function axiosTest(data) {

    let gitUser = data.username;
    const queryUrl = 'https://api.github.com/users/' + gitUser;

    return axios.get(queryUrl).then(response => {
        //console.log(response.data);
        return response.data;
    })
}

function starGazer(data) {

    let gitUser = data.username;
    const queryUrl = 'https://api.github.com/users/' + gitUser + '/starred';

    return axios.get(queryUrl).then(response => {
        console.log(response.data);
        return response.data;
    })
}

function generateHTML(answers, [ userDataGithub , { length }]) {
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
        <div id="overlapHead" style="background: ${answers.color}" class="container">
            <a href="#"><img src="${userDataGithub.avatar_url}"/></a>
                <h2>Hi!</h2>
                    <h2> My name is MADHUMITHA PRABAKARAN !</h2>
                        <h3> Currently @ Linux Kernel Developer </h3>
                            <div style="width: 500px">
                                <div id="map" style="float: left; width: 200px;"> Austin, Tx </div>
                                    <div id="githubLink" style="float: left; width: 100px;">
                                            <a target="_blank" href="https://github.com/Madhumitha">GitHub</a>
                                    </div>
                                    <div id="Blog" style:"float: right; width: 200px;">
                                            <a target="_blank" href="https://www.yumpu.com/en/document/view/62662967/easytoons-educational-anecdotes-for-struggling-youth-exclusion-illusion">Blog</a>
                                    </div>
                                     <br style="clear: left;" />
                                </div>
                            </div>
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
                      <p class="card-text">GitHubStars : ${length} </p>
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

async function init() {
    try {
        if(path1){
            fs.unlinkSync(path1);
        }
        const answers = await promptUser();
        const responseArray = await Promise.all([axiosTest(answers), starGazer(answers)]);
        fs.unlinkSync(path);
        const html = generateHTML(answers, responseArray);
        writeFileAsync('index.html', html);
        console.log("Successfully wrote to index.html");
        createPDF();
    }
    catch (err) {
        console.log(err);
    }
}

init();

// Create a pdf

function createPDF() {
    (async () => {
        const browser = await puppeteer.launch({ defaultViewport: null });
        const page = await browser.newPage();
        await page.goto('file:/madhu/Bootcamp/Class/Homework/DeveloperProfileGenerator/index.html', { waitUntil: 'networkidle2' });
        await page.pdf({ path: 'index.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
        await browser.close();
    })();
}
