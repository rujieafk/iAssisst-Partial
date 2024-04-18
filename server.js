// backend
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify upload directory

const dbOperation = require('./src/dbFiles/dbOperation.js');

const DefaultPdfFile = require('./src/dbFiles/dbContructors/DefaultPdfFile.js');
const DefualtSubmissionContructor = require('./src/dbFiles/dbContructors/DefualtSubmissionContructor.js');

const sssLoan = require('./src/dbFiles/dbContructors/sssLoan.js');
const sssLoanPDF = require('./src/dbFiles/dbContructors/sssLoanPDF.js');

const PagIbigVirtualAccountPDF = require('./src/dbFiles/dbContructors/PagIbigVirtualAccountPDF.js');
const MaternityNotification = require('./src/dbFiles/dbContructors/MaternityNotification.js');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//SSS Loan
app.post('/SSS_upload', upload.fields([{ name: 'Pay_Slip' }, { name: 'Disclosure_Statement' }, { name: 'Application_Date' }, { name: 'Transaction_Number' }]), async (req, res) => {
  try {
      const TransactionType = "SSS Loan";
      const Status = "Pending";
      const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }); // Format: HH:MM
      const TurnAround = "5"

      const { Application_Date, Transaction_Number } = req.body;
      const paySlipFiles = req.files['Pay_Slip']; // Assuming Pay_Slip can have multiple files
      const disclosureStatementFiles = req.files['Disclosure_Statement']; // Assuming Disclosure_Statement can have multiple files
      const EmpId = "10023";
      
      const dbData = new sssLoan(TransactionType,Status,currentDate,currentTime,TurnAround,Application_Date, Transaction_Number,EmpId);
      const dbDataPDF = new sssLoanPDF(paySlipFiles,disclosureStatementFiles);

      // Pass the required parameters to insertPDF function
      await dbOperation.sssLoan(dbData,dbDataPDF);
      
      res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//Pag-ibig Landbank Card
app.post('/Landbank_upload', upload.fields([{ name: 'Application_Form' }, { name: 'paySlipFiles' }, { name: 'Valid_ID' } ]), async (req, res) => {
  try {
      const TransactionType = "Pag-Ibig Landbank Card";
      const Status = "Pending";
      const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }); // Format: HH:MM
      const TurnAround = "5"

      const ApplicationFormFile = req.files['Application_Form'];
      const paySlipFiles = req.files['paySlipFiles'];
      const Valid_ID= req.files['Valid_ID'];

      const EmpId = "10023";

      const dbData = new DefualtSubmissionContructor(TransactionType,Status,currentDate,currentTime,TurnAround,EmpId);
      const dbDataPDF = new PagIbigLandbankCard(ApplicationFormFile,paySlipFiles,Valid_ID);

      // Pass the required parameters to insertPDF function
      await dbOperation.insertPagIbig_Landbank(dbData,dbDataPDF);
      
      res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//Pag-ibig DBP Card
app.post('/DBP_upload', upload.fields([{ name: 'Application_Form' }, { name: 'paySlipFiles' }, { name: 'Valid_ID' } ]), async (req, res) => {
  try {
      const TransactionType = "Pag-Ibig DBP Card";
      const Status = "Pending";
      const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }); // Format: HH:MM
      const TurnAround = "5"

      const ApplicationFormFile = req.files['Application_Form'];
      const paySlipFiles = req.files['paySlipFiles'];
      const Valid_ID= req.files['Valid_ID'];

      const EmpId = "10023";

      const dbData = new DefualtSubmissionContructor(TransactionType,Status,currentDate,currentTime,TurnAround,EmpId);
      const dbDataPDF = new DefaultPdfFile(ApplicationFormFile,paySlipFiles,Valid_ID);

      // Pass the required parameters to insertPDF function
      await dbOperation.insertPagIbig_DBP(dbData,dbDataPDF);
      
      res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//Pag-ibig Virtual Account
app.post('/VirtualAcc_upload', upload.fields([ { name: 'paySlip' }, { name: 'Screenshot_Virtual' }, { name: 'GrossIncome' } ]), async (req, res) => {
  try {
      const TransactionType = "Pag-Ibig Virtual Account";
      const Status = "Pending";
      const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }); // Format: HH:MM
      const TurnAround = "5"

      const paySlip = req.files['paySlip'];
      const Screenshot_Virtual = req.files['Screenshot_Virtual'];
      const GrossIncome= req.files['GrossIncome'];

      const EmpId = "10023";

      const dbData = new DefualtSubmissionContructor(TransactionType,Status,currentDate,currentTime,TurnAround,EmpId);
      const dbDataPDF = new PagIbigVirtualAccountPDF(paySlip,Screenshot_Virtual,GrossIncome);

      // Pass the required parameters to insertPDF function
      await dbOperation.insertPagIbig_VirtualAcc(dbData,dbDataPDF);
      
      res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/Maternity_upload', upload.fields([ { name: 'Notication_Form' }, { name: 'Maternity_Eligibility' }, { name: 'Credit_Form' }, { name: 'Medical_Reports' } ]), async (req, res) => {
  try {
    const TransactionType = "Maternity Notication";
      const Status = "Pending";
      const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }); // Format: HH:MM
      const TurnAround = "5"

      const Notication_Form = req.files['Notication_Form'];
      const Maternity_Eligibility = req.files['Maternity_Eligibility'];
      const Credit_Form= req.files['Credit_Form'];
      const Medical_Reports= req.files['Medical_Reports'];

      const EmpId = "10023";

      const dbData = new DefualtSubmissionContructor(TransactionType,Status,currentDate,currentTime,TurnAround,EmpId);
      const dbDataPDF = new MaternityNotification(Notication_Form,Maternity_Eligibility,Credit_Form,Medical_Reports);

      // console.log(dbData);
      // Pass the required parameters to insertPDF function
      await dbOperation.insertMaternityNotification(dbData, dbDataPDF);
      
      res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {``
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});





app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
