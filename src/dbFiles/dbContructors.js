class sss_dbContructors{
    constructor(Action, Application_Date, Transaction_Number, paySlipFiles, disclosureStatementFiles){
        this.Action = Action;
        this.paySlipFiles = paySlipFiles;
        this.disclosureStatementFiles = disclosureStatementFiles;
        this.Application_Date = Application_Date;
        this.Transaction_Number = Transaction_Number;
    }
}
module.exports = sss_dbContructors;

class pagibig_dbContructorsv2{
    constructor(Action, paySlip, Screenshot_Virtual, GrossIncome){
        this.Action = Action;
        this.paySlip = paySlip;
        this.Screenshot_Virtual = Screenshot_Virtual;
        this.GrossIncome = GrossIncome;
    }
}
module.exports = pagibig_dbContructorsv2;