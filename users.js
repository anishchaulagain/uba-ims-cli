
//crud application 
const fs = require('fs');
const path = require('path');

//store user data 
const dataFile = path.join(__dirname, 'users.json');

//get user data
const readData = () => {
  if (!fs.existsSync(dataFile)) return [];
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
};

// Write user data
const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
};

const [,, command, ...args] = process.argv;

//perform write operation 
switch (command) {
  case 'user:create': {
    const fnameIndex = args.indexOf('fname');
    const lnameIndex = args.indexOf('lname');
    if (fnameIndex === -1 || lnameIndex === -1) {
      console.log('Usage: user:create fname <FirstName> lname <LastName>');
      break;
    }
    const fname = args[fnameIndex + 1];
    const lname = args[lnameIndex + 1];
    
    let users = readData();
    users.push({ fname, lname });
    writeData(users);
    console.log(`User ${fname} ${lname} created successfully.`);
    break;
  }
  
  case 'user:delete': {
    const fnameIndex = args.indexOf('fname');
    if (fnameIndex === -1) {
      console.log('Usage: user:delete fname <FirstName>');
      break;
    }
    const fname = args[fnameIndex + 1];
    
    let users = readData();
    users = users.filter(user => user.fname !== fname);
    writeData(users);
    console.log(`User ${fname} deleted successfully.`);
    break;
  }
  
  case 'user:list': {
    let users = readData();
    console.table(users);
    break;
  }
  
  case 'user:update': {
    const fnameIndex = args.indexOf('fname');
    const lnameIndex = args.indexOf('lname');
    if (fnameIndex === -1 || lnameIndex === -1) {
      console.log('Usage: user:update fname <FirstName> lname <NewLastName>');
      break;
    }
    const fname = args[fnameIndex + 1];
    const lname = args[lnameIndex + 1];
    
    let users = readData();
    users = users.map(user => user.fname === fname ? { ...user, lname } : user);
    writeData(users);
    console.log(`User ${fname}'s last name updated to ${lname}.`);
    break;
  }
  
  default:
    console.log('Invalid command. Available commands:');
    console.log('- user:create fname <FirstName> lname <LastName>');
    console.log('- user:delete fname <FirstName>');
    console.log('- user:list');
    console.log('- user:update fname <FirstName> lname <NewLastName>');
}
