const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const colors = require('colors')
const jsonServer = require('json-server')

// write the db (aka endpoints) to file if it doesn't exit
let db = null;
if (!fs.existsSync(path.join(__dirname, 'db.json'))) {
    // generate the db
    const endpointFiles = fs.readdirSync(path.join(__dirname, 'endpoints'));
    db = endpointFiles.reduce((o, filename) => {
        const endpointName = filename.substring(0, filename.lastIndexOf('.'));
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'endpoints', filename), 'utf8'));
        return {...o, [endpointName]: data};
    }, {});
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(db));
    console.log('Created the "mock/db.json" file. Delete this file to clear the database.'.green)
} else {
    db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'))
    console.log('Using existing "mock/db.json" file. Delete this file to clear the database.'.cyan)
}

// print out some stats
console.log('Total users:', `${db.users.length}`.green);
console.log('Total projects:', `${db.projects.length}`.green);
console.log('Total workflows:', `${db.workflows.length}`.green);
console.log('Total jobs:', `${db.jobs.length}`.green);

// start the mock server
const port = 3001;
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
server.use(middlewares);
server.use(router);
server.listen(port, () => {
    console.log(`\nJSON Server is running on port ${port}...`.blue)
});
