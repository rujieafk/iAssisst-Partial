// dbOperation.js
const config = require('./dbConfig');
const sql = require('mssql');
const fs = require('fs'); // Import fs module to read files
const dbConstructors = require('./dbContructors');



const insertPDF = async (dbConstructors) => {
    try {
        // Assuming you have already initialized SQL connection pool
        let pool = await sql.connect(config);

        // console.log(dbConstructors);

        const PaySlip = fs.readFileSync(`uploads/${dbConstructors.paySlipFiles[0].filename}`);
        const DisclosureStatement = fs.readFileSync(`uploads/${dbConstructors.disclosureStatementFiles[0].filename}`);

        const PaySlip_base64 = Buffer.from(PaySlip).toString('base64');
        const DisclosureStatement_base64 = Buffer.from(DisclosureStatement).toString('base64');

        let file = await pool.request()
            .input('sssApplication_Date', dbConstructors.Application_Date)
            .input('sssTransaction_Num', dbConstructors.Transaction_Number)
            .input('sssPay_Slip', sql.NVarChar(sql.MAX), PaySlip_base64) 
            .input('sssLoan_Disclosure', sql.NVarChar(sql.MAX), DisclosureStatement_base64) 
            .query(`
                INSERT INTO sssLoan (sssApplication_Date, sssTransaction_Num, sssPay_Slip, sssLoan_Disclosure)
                VALUES (@sssApplication_Date, @sssTransaction_Num, @sssPay_Slip, @sssLoan_Disclosure)
            `); 

        console.log("Successfully inserted: ",file);
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}




module.exports = {
    insertPDF
};
