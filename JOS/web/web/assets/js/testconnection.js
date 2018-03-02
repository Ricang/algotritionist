var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = 
   {
     userName: 'admin4db4JOS', // update me
     password: 'password4db4JOS', // update me
     server: 'database4jos.database.windows.net', // update me
     options: 
        {
           database: 'db4JOS' //update me
           , encrypt: true
        }
   }
var connection = new Connection(config);

connection.on('connect', function(err) 
   {
     if (err) 
       {
          console.log(err)
       }
    else
       {
           queryDatabase()
       }
   }
 );

function queryDatabase()
   { console.log('Reading rows from the Table...');
     request = new Request(
          "SELECT TOP 10 * FROM dbo.ABBREV",
             function(err, rowCount, rows) 
                {
                    console.log(rowCount + ' row(s) returned');
                    process.exit();
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
         });
             });
     connection.execSql(request);
}

