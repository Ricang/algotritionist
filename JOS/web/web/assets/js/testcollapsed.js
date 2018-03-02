var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var sampleArray=["BANANA", "EGG", "FISH"];  //used to test appendQueryString()
var originalSQLQuery="DECLARE @maxEnergy FLOAT;SET @maxEnergy = 2000.0;DECLARE @maxItems INT;SET @maxItems=10;DECLARE @maxSodium FLOAT;SET @maxSodium= 2000;DECLARE @maxCholes FLOAT;SET @maxCholes=2000;DECLARE @Shrt_Desc NVARCHAR(50);DECLARE @NDB_No INT;DECLARE @Water_g FLOAT;DECLARE @Energ_Kcal FLOAT;DECLARE @Protein_g FLOAT;DECLARE @Lipid_Tot_g FLOAT;DECLARE @Ash_g FLOAT;DECLARE @Carbohydrt_g FLOAT;DECLARE @Fiber_TD_g FLOAT;DECLARE @Sugar_Tot_g FLOAT;DECLARE @Calcium_mg FLOAT;DECLARE @Iron_mg FLOAT;DECLARE @Magnesium_mg FLOAT;DECLARE @Phosphorus_mg FLOAT;DECLARE @Potassium_mg FLOAT;DECLARE @Sodium_mg FLOAT;DECLARE @Zinc_mg FLOAT;DECLARE @Copper_mg FLOAT;DECLARE @Manganese_mg FLOAT;DECLARE @Selenium_ug FLOAT;DECLARE @Vit_C_mg FLOAT;DECLARE @Vit_B6_mg FLOAT;DECLARE @Vit_B12_ug FLOAT;DECLARE @Vit_A_IU FLOAT;DECLARE @Vit_A_RAE FLOAT;DECLARE @Vit_E_mg FLOAT;DECLARE @Vit_D_ug FLOAT;DECLARE @Vit_D_IU FLOAT;DECLARE @FA_Sat_g FLOAT;DECLARE @FA_Mono_g FLOAT;DECLARE @FA_Poly_g FLOAT;DECLARE @Cholestrl_mg FLOAT;DECLARE @GmWt_1 FLOAT;DECLARE @GmWt_Desc1 NVARCHAR(100);DECLARE @GmWt_2 FLOAT;DECLARE @GmWt_Desc2 NVARCHAR(100);DECLARE @temp_energy_sum INT;SET @temp_energy_sum = 0;DECLARE @temp_itemCount INT;SET @temp_itemCount = 0;DECLARE @temp_sodium_sum INT;SET @temp_sodium_sum = 0;DECLARE @temp_choles_sum INT;SET @temp_choles_sum = 0; DECLARE tempcursor CURSOR FOR SELECT [Shrt_Desc],[NDB_No],[Water_g],[Energ_Kcal],[Protein_g],[Lipid_Tot_g],[Ash_g],[Carbohydrt_g],[Fiber_TD_g],[Sugar_Tot_g],[Calcium_mg],[Iron_mg],[Magnesium_mg],[Phosphorus_mg],[Potassium_mg],[Sodium_mg],[Zinc_mg],[Copper_mg],[Manganese_mg],[Selenium_ug],[Vit_C_mg],[Vit_B6_mg],[Vit_B12_ug],[Vit_A_IU],[Vit_A_RAE],[Vit_E_mg],[Vit_D_ug],[Vit_D_IU],[FA_Sat_g],[FA_Mono_g],[FA_Poly_g],[Cholestrl_mg],[GmWt_1],[GmWt_Desc1],[GmWt_2],[GmWt_Desc2] FROM [dbo].[nutrition_collapsed] WHERE Shrt_Desc NOT LIKE '%OIL%'";
var originalSQLQueryEnd="ORDER BY NEWID(); OPEN tempcursor;FETCH NEXT FROM tempcursor INTO @Shrt_Desc,@NDB_No,@Water_g,@Energ_Kcal,@Protein_g,@Lipid_Tot_g,@Ash_g,@Carbohydrt_g,@Fiber_TD_g,@Sugar_Tot_g,@Calcium_mg,@Iron_mg,@Magnesium_mg,@Phosphorus_mg,@Potassium_mg,@Sodium_mg,@Zinc_mg,@Copper_mg,@Manganese_mg,@Selenium_ug,@Vit_C_mg,@Vit_B6_mg,@Vit_B12_ug,@Vit_A_IU,@Vit_A_RAE,@Vit_E_mg,@Vit_D_ug,@Vit_D_IU,@FA_Sat_g,@FA_Mono_g,@FA_Poly_g,@Cholestrl_mg,@GmWt_1,@GmWt_Desc1,@GmWt_2,@GmWt_Desc2;DELETE FROM [temptablefull]; WHILE(@@FETCH_STATUS = 0) BEGIN IF (@temp_energy_sum < @maxEnergy AND @temp_itemCount< @maxItems) INSERT INTO [temptablefull](Shrt_Desc,NDB_No,Water_g,Energ_Kcal,Protein_g,Lipid_Tot_g,Ash_g,Carbohydrt_g,Fiber_TD_g,Sugar_Tot_g,Calcium_mg,Iron_mg,Magnesium_mg,Phosphorus_mg,Potassium_mg,Sodium_mg,Zinc_mg,Copper_mg,Manganese_mg,Selenium_ug,Vit_C_mg,Vit_B6_mg,Vit_B12_ug,Vit_A_IU,Vit_A_RAE,Vit_E_mg,Vit_D_ug,Vit_D_IU,FA_Sat_g,FA_Mono_g,FA_Poly_g,Cholestrl_mg,GmWt_1,GmWt_Desc1,GmWt_2,GmWt_Desc2) VALUES( @Shrt_Desc,@NDB_No,@Water_g,@Energ_Kcal,@Protein_g,@Lipid_Tot_g,@Ash_g,@Carbohydrt_g,@Fiber_TD_g,@Sugar_Tot_g,@Calcium_mg,@Iron_mg,@Magnesium_mg,@Phosphorus_mg,@Potassium_mg,@Sodium_mg,@Zinc_mg,@Copper_mg,@Manganese_mg,@Selenium_ug,@Vit_C_mg,@Vit_B6_mg,@Vit_B12_ug,@Vit_A_IU,@Vit_A_RAE,@Vit_E_mg,@Vit_D_ug,@Vit_D_IU,@FA_Sat_g,@FA_Mono_g,@FA_Poly_g,@Cholestrl_mg,@GmWt_1,@GmWt_Desc1,@GmWt_2,@GmWt_Desc2); SET @temp_energy_sum = @temp_energy_sum + @Energ_Kcal;SET @temp_sodium_sum = @temp_sodium_sum + @Sodium_mg;SET @temp_choles_sum = @temp_choles_sum + @Cholestrl_mg;SET @temp_itemCount = @temp_itemCount+1;FETCH NEXT FROM tempcursor INTO @Shrt_Desc,@NDB_No,@Water_g,@Energ_Kcal,@Protein_g,@Lipid_Tot_g,@Ash_g,@Carbohydrt_g,@Fiber_TD_g,@Sugar_Tot_g,@Calcium_mg,@Iron_mg,@Magnesium_mg,@Phosphorus_mg,@Potassium_mg,@Sodium_mg,@Zinc_mg,@Copper_mg,@Manganese_mg,@Selenium_ug,@Vit_C_mg,@Vit_B6_mg,@Vit_B12_ug,@Vit_A_IU,@Vit_A_RAE,@Vit_E_mg,@Vit_D_ug,@Vit_D_IU,@FA_Sat_g,@FA_Mono_g,@FA_Poly_g,@Cholestrl_mg,@GmWt_1,@GmWt_Desc1,@GmWt_2,@GmWt_Desc2; END; CLOSE tempcursor;DEALLOCATE tempcursor;SELECT * FROM [temptablefull];";
var tempString=" AND Shrt_Desc NOT LIKE \'%";
var newSQLQuery="";



var config = 
   {
     userName: 'admin4db4JOS', 
     password: 'password4db4JOS', 
     server: 'database4jos.database.windows.net', 
     options: 
        {
           database: 'db4JOS'
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
          blacklistRestraintQuery(sampleArray);    //TODO: replace sampleArray with the frontend connected array
       }
   }
 );
 function updateContent (content, locationID){
    $("#sql-retrieved").html("here's some new content");
 }
 function testAlert(){
    alert("The button was clicked. Message from testcollpased.js");
}

 //the following are front-end related functions
function activateQuery(){
    blacklistRestraintQuery(sampleArray);
}
 // the following are query-related functions
 function appendQueryString(item) {
	newSQLQuery=newSQLQuery.concat(tempString);
    newSQLQuery=newSQLQuery.concat(item);
    newSQLQuery=newSQLQuery.concat("%\'");   
}

function queryDatabase()
   { 
    console.log('classic querying, checking connection...');
     request = new Request(
          "SELECT TOP 10 * FROM dbo.nutrition_collapsed",
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

function randomQuery()
   { 
    console.log('randomly querying...');
     request = new Request(
          "SELECT TOP 10 * FROM dbo.nutrition_collapsed ORDER BY NEWID();",
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

function blacklistRestraintQuery(param)     //TODO: figure out how to connect to the display
   { 
//    alert("running blacklistRestraintQuery() ");       
    //console.log('black list restrainted query...');
    newSQLQuery=originalSQLQuery;
    param.forEach(appendQueryString);
    newSQLQuery=newSQLQuery.concat(originalSQLQueryEnd);
    console.log(newSQLQuery);
     request = new Request(
         newSQLQuery,
             function(err, rowCount, rows) 
                {
                    // console.log(rowCount + ' row(s) returned');
                    process.exit();
                }
            );

     request.on('row', function(columns) {
        //alert("inside!");       
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
            /*
            var s= document.getElementById(sql-retrieved);
            s.value = s.value + column.metadata.colName+'\n';
            s.value = s.value + column.value+'\n';
            */
         });
             });
     connection.execSql(request);
     newSQLQuery="";

}


function queryRestraintedTempDB()
   { 
    console.log('querying temp database');
     request = new Request(
         "DECLARE @maxEnergy FLOAT;SET @maxEnergy = 2000.0;DECLARE @maxItems INT;SET @maxItems=10;DECLARE @maxSodium FLOAT;SET @maxSodium= 2000;DECLARE @maxCholes FLOAT;SET @maxCholes=2000;DECLARE @Shrt_Desc NVARCHAR(50);DECLARE @NDB_No INT;DECLARE @Water_g FLOAT;DECLARE @Energ_Kcal FLOAT;DECLARE @Protein_g FLOAT;DECLARE @Lipid_Tot_g FLOAT;DECLARE @Ash_g FLOAT;DECLARE @Carbohydrt_g FLOAT;DECLARE @Fiber_TD_g FLOAT;DECLARE @Sugar_Tot_g FLOAT;DECLARE @Calcium_mg FLOAT;DECLARE @Iron_mg FLOAT;DECLARE @Magnesium_mg FLOAT;DECLARE @Phosphorus_mg FLOAT;DECLARE @Potassium_mg FLOAT;DECLARE @Sodium_mg FLOAT;DECLARE @Zinc_mg FLOAT;DECLARE @Copper_mg FLOAT;DECLARE @Manganese_mg FLOAT;DECLARE @Selenium_ug FLOAT;DECLARE @Vit_C_mg FLOAT;DECLARE @Vit_B6_mg FLOAT;DECLARE @Vit_B12_ug FLOAT;DECLARE @Vit_A_IU FLOAT;DECLARE @Vit_A_RAE FLOAT;DECLARE @Vit_E_mg FLOAT;DECLARE @Vit_D_ug FLOAT;DECLARE @Vit_D_IU FLOAT;DECLARE @FA_Sat_g FLOAT;DECLARE @FA_Mono_g FLOAT;DECLARE @FA_Poly_g FLOAT;DECLARE @Cholestrl_mg FLOAT;DECLARE @GmWt_1 FLOAT;DECLARE @GmWt_Desc1 NVARCHAR(100);DECLARE @GmWt_2 FLOAT;DECLARE @GmWt_Desc2 NVARCHAR(100);DECLARE @temp_energy_sum INT;SET @temp_energy_sum = 0;DECLARE @temp_itemCount INT;SET @temp_itemCount = 0;DECLARE @temp_sodium_sum INT;SET @temp_sodium_sum = 0;DECLARE @temp_choles_sum INT;SET @temp_choles_sum = 0; DECLARE tempcursor CURSOR FOR SELECT [Shrt_Desc],[NDB_No],[Water_g],[Energ_Kcal],[Protein_g],[Lipid_Tot_g],[Ash_g],[Carbohydrt_g],[Fiber_TD_g],[Sugar_Tot_g],[Calcium_mg],[Iron_mg],[Magnesium_mg],[Phosphorus_mg],[Potassium_mg],[Sodium_mg],[Zinc_mg],[Copper_mg],[Manganese_mg],[Selenium_ug],[Vit_C_mg],[Vit_B6_mg],[Vit_B12_ug],[Vit_A_IU],[Vit_A_RAE],[Vit_E_mg],[Vit_D_ug],[Vit_D_IU],[FA_Sat_g],[FA_Mono_g],[FA_Poly_g],[Cholestrl_mg],[GmWt_1],[GmWt_Desc1],[GmWt_2],[GmWt_Desc2] FROM [dbo].[nutrition_collapsed] WHERE Shrt_Desc NOT LIKE '%EGG%' AND Shrt_Desc NOT LIKE '%HORSE%' ORDER BY NEWID(); OPEN tempcursor;FETCH NEXT FROM tempcursor INTO @Shrt_Desc,@NDB_No,@Water_g,@Energ_Kcal,@Protein_g,@Lipid_Tot_g,@Ash_g,@Carbohydrt_g,@Fiber_TD_g,@Sugar_Tot_g,@Calcium_mg,@Iron_mg,@Magnesium_mg,@Phosphorus_mg,@Potassium_mg,@Sodium_mg,@Zinc_mg,@Copper_mg,@Manganese_mg,@Selenium_ug,@Vit_C_mg,@Vit_B6_mg,@Vit_B12_ug,@Vit_A_IU,@Vit_A_RAE,@Vit_E_mg,@Vit_D_ug,@Vit_D_IU,@FA_Sat_g,@FA_Mono_g,@FA_Poly_g,@Cholestrl_mg,@GmWt_1,@GmWt_Desc1,@GmWt_2,@GmWt_Desc2;DELETE FROM [temptablefull]; WHILE(@@FETCH_STATUS = 0) BEGIN IF (@temp_energy_sum < @maxEnergy AND @temp_itemCount< @maxItems) INSERT INTO [temptablefull](Shrt_Desc,NDB_No,Water_g,Energ_Kcal,Protein_g,Lipid_Tot_g,Ash_g,Carbohydrt_g,Fiber_TD_g,Sugar_Tot_g,Calcium_mg,Iron_mg,Magnesium_mg,Phosphorus_mg,Potassium_mg,Sodium_mg,Zinc_mg,Copper_mg,Manganese_mg,Selenium_ug,Vit_C_mg,Vit_B6_mg,Vit_B12_ug,Vit_A_IU,Vit_A_RAE,Vit_E_mg,Vit_D_ug,Vit_D_IU,FA_Sat_g,FA_Mono_g,FA_Poly_g,Cholestrl_mg,GmWt_1,GmWt_Desc1,GmWt_2,GmWt_Desc2) VALUES( @Shrt_Desc,@NDB_No,@Water_g,@Energ_Kcal,@Protein_g,@Lipid_Tot_g,@Ash_g,@Carbohydrt_g,@Fiber_TD_g,@Sugar_Tot_g,@Calcium_mg,@Iron_mg,@Magnesium_mg,@Phosphorus_mg,@Potassium_mg,@Sodium_mg,@Zinc_mg,@Copper_mg,@Manganese_mg,@Selenium_ug,@Vit_C_mg,@Vit_B6_mg,@Vit_B12_ug,@Vit_A_IU,@Vit_A_RAE,@Vit_E_mg,@Vit_D_ug,@Vit_D_IU,@FA_Sat_g,@FA_Mono_g,@FA_Poly_g,@Cholestrl_mg,@GmWt_1,@GmWt_Desc1,@GmWt_2,@GmWt_Desc2); SET @temp_energy_sum = @temp_energy_sum + @Energ_Kcal;SET @temp_sodium_sum = @temp_sodium_sum + @Sodium_mg;SET @temp_choles_sum = @temp_choles_sum + @Cholestrl_mg;SET @temp_itemCount = @temp_itemCount+1;FETCH NEXT FROM tempcursor INTO @Shrt_Desc,@NDB_No,@Water_g,@Energ_Kcal,@Protein_g,@Lipid_Tot_g,@Ash_g,@Carbohydrt_g,@Fiber_TD_g,@Sugar_Tot_g,@Calcium_mg,@Iron_mg,@Magnesium_mg,@Phosphorus_mg,@Potassium_mg,@Sodium_mg,@Zinc_mg,@Copper_mg,@Manganese_mg,@Selenium_ug,@Vit_C_mg,@Vit_B6_mg,@Vit_B12_ug,@Vit_A_IU,@Vit_A_RAE,@Vit_E_mg,@Vit_D_ug,@Vit_D_IU,@FA_Sat_g,@FA_Mono_g,@FA_Poly_g,@Cholestrl_mg,@GmWt_1,@GmWt_Desc1,@GmWt_2,@GmWt_Desc2; END; CLOSE tempcursor;DEALLOCATE tempcursor;SELECT * FROM [temptablefull];"
          ,
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

