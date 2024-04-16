class dbContructors{
    constructor(Application_Date, Transaction_Number, paySlipFiles, disclosureStatementFiles){
        this.Application_Date = Application_Date;
        this.Transaction_Number = Transaction_Number;
        this.paySlipFiles = paySlipFiles;
        this.disclosureStatementFiles = disclosureStatementFiles;
    }
}
module.exports = dbContructors;