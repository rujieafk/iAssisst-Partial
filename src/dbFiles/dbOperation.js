// dbOperation.js
const config = require('./dbConfig');
const sql = require('mssql');
const fs = require('fs'); // Import fs module to read files



const sssLoan = (data, dataPDF) => {
    try {
        const currentDate = data.currentDate + " " +data.currentTime;

        const TransactionType = data.TransactionType;
        const Status = data.Status;
        const DateTime = currentDate;
        const TurnAround = data.TurnAround;
        const Application_Date = data.Application_Date;
        const Transaction_Num = data.Transaction_Number;
        const EmpId = data.EmpId;

        insertIntoSubmission(TransactionType,Status,DateTime,TurnAround,Application_Date,Transaction_Num,EmpId, dataPDF)
      
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}

const insertPagIbig_Landbank = async (data, dataPDF) => {
    try {
        const currentDate = data.currentDate + " " +data.currentTime;

        const TransactionType = data.TransactionType;
        const Status = data.Status;
        const DateTime = currentDate;
        const TurnAround = data.TurnAround;
        const Application_Date = data.Application_Date;
        const Transaction_Num = data.Transaction_Number;
        const EmpId = data.EmpId;

        insertIntoSubmission(TransactionType,Status,DateTime,TurnAround,Application_Date,Transaction_Num,EmpId, dataPDF)
       
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}


const insertPagIbig_DBP = async (data, dataPDF) => {
    try {
        const currentDate = data.currentDate + " " +data.currentTime;

        const TransactionType = data.TransactionType;
        const Status = data.Status;
        const DateTime = currentDate;
        const TurnAround = data.TurnAround;
        const Application_Date = data.Application_Date;
        const Transaction_Num = data.Transaction_Number;
        const EmpId = data.EmpId;

        insertIntoSubmission(TransactionType,Status,DateTime,TurnAround,Application_Date,Transaction_Num,EmpId, dataPDF)
       
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}
const insertPagIbig_VirtualAcc = async (data, dataPDF) => {
    try {
        const currentDate = data.currentDate + " " +data.currentTime;

        const TransactionType = data.TransactionType;
        const Status = data.Status;
        const DateTime = currentDate;
        const TurnAround = data.TurnAround;
        const Application_Date = data.Application_Date;
        const Transaction_Num = data.Transaction_Number;
        const EmpId = data.EmpId;

        insertIntoSubmission(TransactionType,Status,DateTime,TurnAround,Application_Date,Transaction_Num,EmpId, dataPDF)
       
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}
const insertMaternityNotification = async (data, dataPDF) => {
    try {
        const currentDate = data.currentDate + " " +data.currentTime;

        const TransactionType = data.TransactionType;
        const Status = data.Status;
        const DateTime = currentDate;
        const TurnAround = data.TurnAround;
        const Application_Date = data.Application_Date;
        const Transaction_Num = data.Transaction_Number;
        const EmpId = data.EmpId;

        insertIntoSubmission(TransactionType,Status,DateTime,TurnAround,Application_Date,Transaction_Num,EmpId, dataPDF)
       
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}



//-----------------------------------------------------------------------
const insertIntoSubmission = async (TransactionType,Status,DateTime,TurnAround,Application_Date,Transaction_Num,EmpId, dataPDF) => {
    try {
        // Assuming you have already initialized SQL connection pool
        let pool = await sql.connect(config);
        
        const RequirementName1 = "1 Month Pay Slip";
        const RequirementName2 = "Loan Disclosure Statement";

        const RequirementName3 = "Application Form";
        const RequirementName4 = "1 Month Payslip";
        const RequirementName5 = "Valid ID";

        const RequirementName6 = "Application Form";
        const RequirementName7 = "1 Month Payslip";
        const RequirementName8 = "Valid ID";

        const RequirementName9 = "Screenshot of Filed Loan via Virtual Account";
        const RequirementName10 = "1 Month Payslip";
        const RequirementName11 = "1 Month Gross Income";

        const RequirementName12 = "SSS Maternity Notification Form";
        const RequirementName13 = "Screenshot of SSS Maternity Eligibility";
        const RequirementName14 = "SSS Allocation of Maternity Leave Credit Form";
        const RequirementName15 = "Medical Certificate or Ultrasound Report";

        const file = await pool.request()
            .input('TransactionType', TransactionType)
            .input('Status', Status)
            .input('DateTime', DateTime)
            .input('TurnAround', TurnAround)
            .input('Application_Date', Application_Date)
            .input('Transaction_Num', Transaction_Num)
            .input('EmpId', EmpId) 
            .query(`
                INSERT INTO Submission (TransactionType,Status,DateTime,TurnAround,LoanAppDate,TransactionNum,EmpId)
                OUTPUT inserted.SubmissionID
                VALUES (@TransactionType,@Status,@DateTime,@TurnAround,@Application_Date,@Transaction_Num,@EmpId)
            `); 

            const SubmissionID = file.recordset[0].SubmissionID;

            console.log(dataPDF);
            if(TransactionType === "SSS Loan"){
                PdfFile(dataPDF.paySlipFiles,SubmissionID,RequirementName1);
                PdfFile(dataPDF.disclosureStatementFiles,SubmissionID,RequirementName2);
            }else if(TransactionType === "Pag-Ibig Landbank Card"){
                PdfFile(dataPDF.ApplicationFormFile,SubmissionID,RequirementName3);
                PdfFile(dataPDF.paySlipFiles,SubmissionID,RequirementName4);
                PdfFile(dataPDF.Valid_ID,SubmissionID,RequirementName5);
            }else if(TransactionType === "Pag-Ibig DBP Card"){
                PdfFile(dataPDF.ApplicationFormFile,SubmissionID,RequirementName6);
                PdfFile(dataPDF.paySlipFiles,SubmissionID,RequirementName7);
                PdfFile(dataPDF.Valid_ID,SubmissionID,RequirementName8);
            }else if(TransactionType === "Pag-Ibig Virtual Account"){
                PdfFile(dataPDF.paySlip,SubmissionID,RequirementName9);
                PdfFile(dataPDF.Screenshot_Virtual,SubmissionID,RequirementName10);
                PdfFile(dataPDF.GrossIncome,SubmissionID,RequirementName11);
            }else if(TransactionType === "Maternity Notication"){
                PdfFile(dataPDF.Notication_Form,SubmissionID,RequirementName12);
                PdfFile(dataPDF.Maternity_Eligibility,SubmissionID,RequirementName13);
                PdfFile(dataPDF.Credit_Form,SubmissionID,RequirementName14);
                PdfFile(dataPDF.Medical_Reports,SubmissionID,RequirementName15);
            }

            console.log("Successfully inserted: ",file);
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}

const PdfFile = async (insertPDF,SubmissionID,RequirementName) => {
    try {
    
        const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }); // Format: HH:MM

        let pool = await sql.connect(config);

        const thisRequirementName = RequirementName;
        const Filename = insertPDF[0].originalname;
        const ContentType = "pdf";
        const Size = insertPDF[0].size;
        const UploadDate = currentDate + " " + currentTime;

        const pdf = fs.readFileSync(`uploads/${insertPDF[0].filename}`);

        const pdf_base64 = Buffer.from(pdf).toString('base64');

        const Resubmit = "0";
        const ResubmitReason = "";
        const thisSubmissionID = SubmissionID;

        let file = await pool.request()
            .input('RequirementName', thisRequirementName)
            .input('Filename', Filename)
            .input('ContentType', ContentType)
            .input('Size', Size)
            .input('UploadDate', UploadDate)
            .input('pdfData', sql.NVarChar(sql.MAX), pdf_base64)  
            .input('Resubmit',Resubmit)
            .input('ResubmitReason',ResubmitReason)
            .input('SubmissionID',thisSubmissionID)
            .query(`
                INSERT INTO PdfFile (RequirementName,FileName,ContentType,FileSize,UploadDate, PdfData, Resubmit,ResubmitReason,SubmissionID)
                VALUES (@RequirementName,@Filename,@ContentType,@Size,@UploadDate,@pdfData,@Resubmit,@ResubmitReason,@SubmissionID)
            `); 

        console.log("Successfully inserted: ",file);
    } catch (error) {
        console.error("Error inserting PDF:", error);
        throw error;
    }
}
//-----------------------------------------------------------------------

module.exports = {
    sssLoan,
    insertPagIbig_Landbank,
    insertPagIbig_DBP,
    insertPagIbig_VirtualAcc,
    insertMaternityNotification
};
