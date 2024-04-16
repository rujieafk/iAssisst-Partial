// backend
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify upload directory

const dbOperation = require('./src/dbFiles/dbOperation.js');
const dbConstructors = require('./src/dbFiles/dbContructors.js');

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

app.post('/upload', upload.fields([{ name: 'Pay_Slip' }, { name: 'Disclosure_Statement' }, { name: 'Application_Date' }, { name: 'Transaction_Number' }]), async (req, res) => {
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





app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
