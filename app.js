const inquirer = require('inquirer');
const fs = require('fs');

const teamHTML = ({}) => 
`
`;

inquirer.prompt([
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
]).then((response) => {
    const teamInfoHTML = teamHTML(response);
    fs.writeFile('index.html', teamInfoHTML, (err) =>
    err ? console.log(err) : console.log('Success!'));
});