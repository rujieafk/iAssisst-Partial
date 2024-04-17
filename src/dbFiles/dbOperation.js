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
const insertPagIbig_Landbank = async (dbConstructors) => {
    try {
        // Assuming you have already initialized SQL connection pool
        let pool = await sql.connect(config);

        console.log(dbConstructors);

        const Application_Form = fs.readFileSync(`uploads/${dbConstructors.Application_Form[0].filename}`);
        const paySlipFiles = fs.readFileSync(`uploads/${dbConstructors.paySlipFiles[0].filename}`);
        const Valid_ID = fs.readFileSync(`uploads/${dbConstructors.Valid_ID[0].filename}`);

        const Application_Form_base64 = Buffer.from(Application_Form).toString('base64');
        const paySlipFiles_base64 = Buffer.from(paySlipFiles).toString('base64');
        const Valid_ID_base64 = Buffer.from(Valid_ID).toString('base64');

        let file = await pool.request()
            .input('P_Action', dbConstructors.Action)
            .input('P_Application_Form', sql.NVarChar(sql.MAX), Application_Form_base64) 
            .input('P_Pay_Slip', sql.NVarChar(sql.MAX), paySlipFiles_base64) 
            .input('P_Valid_ID', sql.NVarChar(sql.MAX), Valid_ID_base64) 
            .query(`
                INSERT INTO PagIbig(P_Action,P_Application_Form, P_Pay_Slip, P_Valid_ID)
                VALUES (@P_Action, @P_Application_Form, @P_Pay_Slip, @P_Valid_ID)
            `); 

        console.log("Successfully inserted: ",file);
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}
const insertPagIbig_DBP = async (dbConstructors) => {
    try {
        // Assuming you have already initialized SQL connection pool
        let pool = await sql.connect(config);

        console.log(dbConstructors);

        const Application_Form = fs.readFileSync(`uploads/${dbConstructors.Application_Form[0].filename}`);
        const paySlipFiles = fs.readFileSync(`uploads/${dbConstructors.paySlipFiles[0].filename}`);
        const Valid_ID = fs.readFileSync(`uploads/${dbConstructors.Valid_ID[0].filename}`);

        const Application_Form_base64 = Buffer.from(Application_Form).toString('base64');
        const paySlipFiles_base64 = Buffer.from(paySlipFiles).toString('base64');
        const Valid_ID_base64 = Buffer.from(Valid_ID).toString('base64');

        let file = await pool.request()
            .input('P_Action', dbConstructors.Action)
            .input('P_Application_Form', sql.NVarChar(sql.MAX), Application_Form_base64) 
            .input('P_Pay_Slip', sql.NVarChar(sql.MAX), paySlipFiles_base64) 
            .input('P_Valid_ID', sql.NVarChar(sql.MAX), Valid_ID_base64) 
            .query(`
                INSERT INTO PagIbig(P_Action,P_Application_Form, P_Pay_Slip, P_Valid_ID)
                VALUES (@P_Action, @P_Application_Form, @P_Pay_Slip, @P_Valid_ID)
            `); 

        console.log("Successfully inserted: ",file);
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}
const insertPagIbig_VirtualAcc = async (dbConstructors) => {
    try {
        // Assuming you have already initialized SQL connection pool
        let pool = await sql.connect(config);

        console.log(dbConstructors);

        const Screenshot_VirtualAcc = fs.readFileSync(`uploads/${dbConstructors.Screenshot_Virtual[0].filename}`);
        const paySlipFiles = fs.readFileSync(`uploads/${dbConstructors.paySlip[0].filename}`);
        const GrossIncome = fs.readFileSync(`uploads/${dbConstructors.GrossIncome[0].filename}`);

        const Screenshot_VirtualAcc_base64 = Buffer.from(Screenshot_VirtualAcc).toString('base64');
        const paySlipFiles_base64 = Buffer.from(paySlipFiles).toString('base64');
        const GrossIncome_base64 = Buffer.from(GrossIncome).toString('base64');

        let file = await pool.request()
            .input('P_Action', dbConstructors.Action)
            .input('P_Screenshot_VirtualAcc', sql.NVarChar(sql.MAX), Screenshot_VirtualAcc_base64) 
            .input('P_Pay_Slip', sql.NVarChar(sql.MAX), paySlipFiles_base64) 
            .input('P_MonthGrossIncome', sql.NVarChar(sql.MAX), GrossIncome_base64) 
            .query(`
                INSERT INTO PagIbig(P_Action,P_Screenshot_VirtualAcc, P_Pay_Slip, P_MonthGrossIncome)
                VALUES (@P_Action, @P_Screenshot_VirtualAcc, @P_Pay_Slip, @P_MonthGrossIncome)
            `); 

        console.log("Successfully inserted: ",file);
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}
const insertMaternityNotification = async (dbConstructors) => {
    try {
        // Assuming you have already initialized SQL connection pool
        let pool = await sql.connect(config);

        // console.log(dbConstructors);

        const Notication_Form = fs.readFileSync(`uploads/${dbConstructors.Notication_Form[0].filename}`);
        const Maternity_Eligibility = fs.readFileSync(`uploads/${dbConstructors.Maternity_Eligibility[0].filename}`);
        const Credit_Form = fs.readFileSync(`uploads/${dbConstructors.Credit_Form[0].filename}`);
        const Medical_Reports = fs.readFileSync(`uploads/${dbConstructors.Medical_Reports[0].filename}`);

        const Notication_Form_base64 = Buffer.from(Notication_Form).toString('base64');
        const Maternity_Eligibility_base64 = Buffer.from(Maternity_Eligibility).toString('base64');
        const Credit_Form_base64 = Buffer.from(Credit_Form).toString('base64');
        const Medical_Reports_base64 = Buffer.from(Medical_Reports).toString('base64');

        let file = await pool.request()
            .input('Action', dbConstructors.Action)
            .input('Notication_Form', sql.NVarChar(sql.MAX), Notication_Form_base64) 
            .input('Maternity_Eligibility', sql.NVarChar(sql.MAX), Maternity_Eligibility_base64) 
            .input('Credit_Form', sql.NVarChar(sql.MAX), Credit_Form_base64) 
            .input('Medical_Reports', sql.NVarChar(sql.MAX), Medical_Reports_base64) 
            .query(`
                INSERT INTO SSS(SSS_Action,Notication_Form, Maternity_Eligibility, Credit_Form, Medical_Reports)
                VALUES (@Action, @Notication_Form, @Maternity_Eligibility, @Credit_Form, @Medical_Reports)
            `); 

        console.log("Successfully inserted: ",file);
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}




module.exports = {
    insertPDF,
    insertPagIbig_Landbank,
    insertPagIbig_DBP,
    insertPagIbig_VirtualAcc,
    insertMaternityNotification
};
