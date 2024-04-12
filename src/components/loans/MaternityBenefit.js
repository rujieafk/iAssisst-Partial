import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar';
import TopNavbar from '../topnavbar';
import Footer from '../footer';
import '../../App.css';
import { variables } from '../../variables';

 function MaternityBenefit() {
   
    const { employeeId } = useParams();
    const [employeeData, setEmployeeData] = useState({
      LastName: '',
      FirstName: '',
      MiddleName: '',
      MaidenName: '',
      Birthdate: '',
      Age: '',
      BirthMonth: '',
      AgeBracket: '',
      Aender: '',
      MaritalStatus: '',
      SSS: '',
      PHIC: '',
      HDMF: '',
      TIN: '',
      HRANID: '',
      ContactNumber: '',
      EmailAddress: ''
    });
  
    useEffect(() => {
      // Fetch employee data based on employeeId
      const fetchEmployeeData = async () => {
        try {
          const response = await fetch(variables.API_URL + 'UploadEmp/' + employeeId);
          if (!response.ok) {
            throw new Error('Failed to fetch employee data');
          }
          const data = await response.json();
          setEmployeeData(data);
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      };
  
      fetchEmployeeData();
    }, [employeeId]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEmployeeData({
        ...employeeData,
        [name]: value
      });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      // try {
      //   const response = await fetch(variables.API_URL + 'UploadEmp/' + employeeId, {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(employeeData)
      //   });
      //   if (!response.ok) {
      //     throw new Error('Failed to update employee');
      //   }
      //   // Handle successful update
      //   console.log('Employee updated successfully');
      // } catch (error) {
      //   console.error('Error updating employee:', error);
      // }
    };
  
    if (!employeeData) {
      return <div>Loading...</div>;
    }
    return (
      <div id="wrapper">
          <Navbar />
          <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <TopNavbar />
              <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-xl-9">
              <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <ul className="nav nav-tabs nav-fill">
                      <li className="nav-item">
                          <a className="nav-link active " id="personalDetails-tab" data-toggle="tab" href="#personalDetails" role="tab" aria-controls="personalDetails" 
                          aria-selected="false">Maternity Benefit</a>
                      </li> 
                  </ul>
                  </div>
                 <br/>
                  <div className="tab-content">
                      <div className="tab-pane fade show active" id="personalDetails" role="tabpanel" aria-labelledby="personalDetails-tab">
                          {/* Personal Details Form */}
                        <div className="container">
                            <form onSubmit={handleFormSubmit}> 
                                <div className="row">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label htmlFor="middleName">SSS Maternity Reimbursement Application Form</label>
                                      <input type="file" className="form-control-file" aria-describedby="fileHelp"/>
                                      <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                    </div>
                                  </div> 
                                </div>
                                <div className="row justify-content-center">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label htmlFor="middleName">Type of Delivery</label>
                                      <input type="text" className="form-control" id="name" name="name" value={employeeData.Name} onChange={handleInputChange} />
                                    </div>
                                  </div> 
                                </div>
                                <div className="row justify-content-center">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label htmlFor="middleName">If Live Birth</label>  
                                    </div>
                                  </div> 
                                </div>  
                                <div className="row justify-content-center">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label htmlFor="middleName">Proof of Child's Birth (Live Birth Certificate)</label> 
                                      <input type="file" className="form-control-file" aria-describedby="fileHelp"/>
                                      <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                    </div>
                                  </div> 
                                </div>  
                                <div className="row justify-content-center">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label htmlFor="middleName">Solo Parent ID or Certificate of Eligibility (If Solo Parent)</label> 
                                      <input type="file" className="form-control-file" aria-describedby="fileHelp"/>
                                      <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                    </div>
                                  </div> 
                                </div>  
                                <div className="row justify-content-center">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label htmlFor="middleName">If Terminated</label>  
                                    </div>
                                  </div> 
                                </div>  
                                <div className="row justify-content-center">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label htmlFor="middleName">Proof of Termination (If Still Birth/Fetal Death)</label> 
                                      <input type="file" className="form-control-file" aria-describedby="fileHelp"/>
                                      <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                    </div>
                                  </div> 
                                </div>  
                                <div className="row justify-content-center">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label htmlFor="middleName">Fetal Certificate of Death</label> 
                                      <input type="file" className="form-control-file" aria-describedby="fileHelp"/>
                                      <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                    </div>
                                  </div> 
                                </div>  
                                <button type="submit" className="btn btn-primary d-block mx-auto">Submit</button>
                            </form>
                        </div>
                      <br/>
                      </div> 
                      {/* Add more tab content here */}
                  </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              <Footer />
          </div>
      </div>
  );
}

export default MaternityBenefit;

