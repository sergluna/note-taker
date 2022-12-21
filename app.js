const inquirer = require('inquirer');
const fs = require('fs');
inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));

const teamHTML = ({manager, managerId, managerEmail, managerOffice, otherEmployee, otherEmpId, otherEmpEmail, otherEmpName, internName, internSchool}) => 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>${manager}</h1>
    <li>
        <ul>${managerId}</ul>
        <ul>${managerOffice}</ul>
        <ul>${managerEmail}</ul>
    </li>

    <h1>${otherEmployee}}</h1>
    <li>
        <ul>${otherEmployee}</ul>
        <ul>${otherEmpName}</ul>
        <ul>${otherEmpEmail}</ul>
        <ul>${otherEmpId}</ul>
    </li>

    <h1>${internName}</h1>
    <li>
        <ul>${otherEmployee}</ul>
        <ul>${otherEmpName}</ul>
        <ul>${otherEmpEmail}</ul>
        <ul>${otherEmpId}</ul>
        <ul>${internSchool}</ul>
    </li>
</body>
</html>

`;

inquirer.prompt([
    {
        type: 'input',
        message: "What is your manager's name?",
        name: "manager",
    },
    {
        type: 'input',
        message: "What is your manager's email?",
        name: 'managerEmail',
    },
    {
        type: 'input',
        message: "What is your manager's emmployee ID?",
        name: 'managerId',
    },
    {
        type: 'input',
        message: "What is your maganer's office number?",
        name: 'managerOffice',
    },
    {
        type: 'loop',
        message: "Do you want to add another employee?",
        name: 'employees',
        questions: [
            {
                type: 'list',
                message: 'What type of employee are they?',
                name: 'otherEmployee', 
                choices: ['Engineer', 'Intern'],
            },
            {
                type: 'input',
                message: 'What is their name?',
                name: 'otherEmpName',
            },
            {
                type: 'input',
                message: 'What is their email?',
                name: 'otherEmpEmail'
            },
            {
                type: 'input', 
                message: 'What is there employee ID?', 
                name: 'otherEmpId'
            }, 
            {
                type: 'input',
                message: 'What is there GitHub username?',
                name: 'otherEmpGitHub',
                when: (employee) => employee.type === 'Engineer'
            },
            {
                type: 'input',
                message: "What is the name of the intern?",
                name: 'internName',
                when: (employee) => employee.type === 'Intern'
            }, 
            {
                type: 'input',
                message: "What is the name of the intern's school?",
                name: 'internSchool',
                when: (employee) => employee.type === 'Intern'
            }
        ]
    },
]).then((response) => {
    const teamInfoHTML = teamHTML(response);
    fs.writeFile('index.html', teamInfoHTML, (err) =>
    err ? console.log(err) : console.log('Success!'));
});