// backend
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify upload directory

const dbOperation = require('./src/dbFiles/dbOperation.js');
const dbConstructors = require('./src/dbFiles/dbContructors.js');
const MaternityNotification = require('./src/dbFiles/dbContructors/MaternityNotification.js');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// app.post('/upload', upload.fields([{ name: 'Pay_Slip' }, { name: 'Disclosure_Statement' }, { name: 'Application_Date' }, { name: 'Transaction_Number' }]), async (req, res) => {
//   try {
//       const { Application_Date, Transaction_Number } = req.body;
//       const paySlipFile = req.files['Pay_Slip'][0]; // Assuming Pay_Slip is a single file input
//       const disclosureStatementFile = req.files['Disclosure_Statement'][0]; // Assuming Disclosure_Statement is a single file input

//       console.log(Application_Date);
//       console.log(Transaction_Number);
//       console.log(paySlipFile);
//       console.log(disclosureStatementFile);

//       await dbOperation.insertPDF();

//       res.status(200).json({ message: 'Files uploaded successfully' });
//   } catch (error) {
//       console.error('Error uploading files:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/SSS_upload', upload.fields([{ name: 'Pay_Slip' }, { name: 'Disclosure_Statement' }, { name: 'Application_Date' }, { name: 'Transaction_Number' }]), async (req, res) => {
  try {
      const { Application_Date, Transaction_Number } = req.body;
      const paySlipFiles = req.files['Pay_Slip']; // Assuming Pay_Slip can have multiple files
      const disclosureStatementFiles = req.files['Disclosure_Statement']; // Assuming Disclosure_Statement can have multiple files

      const dbData = new dbConstructors(Application_Date, Transaction_Number, paySlipFiles, disclosureStatementFiles);

      // Pass the required parameters to insertPDF function
      await dbOperation.insertPDF(dbData);
      
      res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/Landbank_upload', upload.fields([{ name: 'Application_Form' }, { name: 'paySlipFiles' }, { name: 'Valid_ID' } ]), async (req, res) => {
  try {
      const Action = "Landbank Card";
      const ApplicationFormFile = req.files['Application_Form'];
      const paySlipFiles = req.files['paySlipFiles'];
      const Valid_ID= req.files['Valid_ID'];

      const dbData = new dbConstructors(Action,ApplicationFormFile,paySlipFiles,Valid_ID);

      // Pass the required parameters to insertPDF function
      await dbOperation.insertPagIbig_Landbank(dbData);
      
      res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/DBP_upload', upload.fields([{ name: 'Application_Form' }, { name: 'paySlipFiles' }, { name: 'Valid_ID' } ]), async (req, res) => {
  try {
      const Action = "DBP Card";
      const ApplicationFormFile = req.files['Application_Form'];
      const paySlipFiles = req.files['paySlipFiles'];
      const Valid_ID= req.files['Valid_ID'];

      const dbData = new dbConstructors(Action,ApplicationFormFile,paySlipFiles,Valid_ID);

      // Pass the required parameters to insertPDF function
      await dbOperation.insertPagIbig_DBP(dbData);
      
      res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/VirtualAcc_upload', upload.fields([ { name: 'paySlip' }, { name: 'Screenshot_Virtual' }, { name: 'GrossIncome' } ]), async (req, res) => {
  try {
      const Action = "Virtual Account";
      const paySlip = req.files['paySlip'];
      const Screenshot_Virtual = req.files['Screenshot_Virtual'];
      const GrossIncome= req.files['GrossIncome'];

      const dbData = new dbConstructors(Action,paySlip,Screenshot_Virtual,GrossIncome);

      console.log(dbData);
      // Pass the required parameters to insertPDF function
      await dbOperation.insertPagIbig_VirtualAcc(dbData);
      
      res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/Maternity_upload', upload.fields([ { name: 'Notication_Form' }, { name: 'Maternity_Eligibility' }, { name: 'Credit_Form' }, { name: 'Medical_Reports' } ]), async (req, res) => {
  try {
      const Action = "Maternity Notication";
      const Notication_Form = req.files['Notication_Form'];
      const Maternity_Eligibility = req.files['Maternity_Eligibility'];
      const Credit_Form= req.files['Credit_Form'];
      const Medical_Reports= req.files['Medical_Reports'];

      const dbData = new MaternityNotification(Action,Notication_Form,Maternity_Eligibility,Credit_Form,Medical_Reports);

      // console.log(dbData);
      // Pass the required parameters to insertPDF function
      await dbOperation.insertMaternityNotification(dbData);
      
      res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {``
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});





app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
