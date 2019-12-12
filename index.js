const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const phantom = require('phantom');

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

function generateHTML(answers) {
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
  <img 
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
<h4> I write code for sensors and operating system </h4>
<div class="row">
      <div class="col-sm-6">
              <div class="card-body">
                      <p class="card-text">Public Repositories</p>
              </div>
              <div class="card-body">
                      <p class="card-text">Followers</p>
              </div>
      </div>
      <div class="col-sm-6">
              <div class="card-body">
                      <p class="card-text">GitHub Stars</p>
               </div>
               <div class="card-body">
                      <p class="card-text">Following</p>
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
        const answers = await promptUser();
        const html = generateHTML(answers);
        const gitUser = answers.username

        const queryUrl = 'https://api.github.com/users/' + gitUser;
    
            axios.get(queryUrl).then(function(res) {
                console.log(res);
                console.log(res.data.bio);
                console.log(res.data.public_repos);
                console.log(res.data.followers);
                console.log(res.data.following);
                // const repoNames = res.data
            })

        await writeFileAsync('index.html', html);

        console.log("Successfully wrote to index.html");
    } 
    catch(err) {
        console.log(err);
    }
}

init();

// Create a pdf

phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.open("https://madhumitha.github.io/DeveloperProfileGenerator/").then(function(status) {
            page.render('developerProfile.pdf').then(function() {
                console.log('Page Rendered');
                ph.exit();
            });
        });
    });
})
