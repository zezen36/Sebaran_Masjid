var developmentDatabase = {
    postgres: {
    host: 'ec2-3-230-149-158.compute-1.amazonaws.com',
    port: 5432,
    database: 'dfagnmumg1fgjf',
    user: 'dypsiacwenifrj',
    password: '03a97de22176f96f8397fc45a9d5018bc4673a20d34784bcab6efd135709bfa09'
    }
    }
    
    var connectionString ="dypsiacwenifrj:03a97de22176f96f8397fc45a9d5018bc4673a20d34784bcab6efd135709bfa0@ec2-3-230-149-158.compute-1.amazonaws.com:5432/dfagnmumg1fgjf?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }