import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar';
import TopNavbar from '../topnavbar';
import Footer from '../footer';
import '../../App.css';
import { variables } from '../../variables';

 function MaternityNotification() {
   
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
                      <h4 className="m-0 font-weight-bold text-primary header-name">Maternity Notification</h4>
                    </div>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    {/* page content begin here */}
                    <div className="container-fluid">
                      <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-7">
                          <div className="card shadow mb-4">
                            {/* Card Header - New Hire Upload */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                              <h6 className="m-0 font-weight-bold text-primary">SSS Maternity Notification Form</h6>
                            </div>
                            {/* Card Body - New Hire Options */}
                            <div className="card-body">
                              <div className="tab-content">
                                <div className="card-body">
                                  <div className="d-flex justify-content-center">
                                    <input type="file" className="form-control-file bordered-row" aria-describedby="fileHelp"/>
                                    <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Page content ends here */}

                    {/* page content begin here */}
                    <div className="container-fluid">
                      <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-7">
                          <div className="card shadow mb-4">
                            {/* Card Header - New Hire Upload */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                              <h6 className="m-0 font-weight-bold text-primary">Screenshot of SSS Maternity Eligibility</h6>
                            </div>
                            {/* Card Body - New Hire Options */}
                            <div className="card-body">
                              <div className="tab-content">
                                <div className="card-body">
                                  <div className="d-flex justify-content-center">
                                    <input type="file" className="form-control-file" aria-describedby="fileHelp"/>
                                    <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Page content ends here */}

                    {/* page content begin here */}
                    <div className="container-fluid">
                      <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-7">
                          <div className="card shadow mb-4">
                            {/* Card Header - New Hire Upload */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                              <h6 className="m-0 font-weight-bold text-primary">SSS Allocation of Maternity Leave Credit Form</h6>
                            </div>
                            {/* Card Body - New Hire Options */}
                            <div className="card-body">
                              <div className="tab-content">
                                <div className="card-body">
                                  <div className="d-flex justify-content-center">
                                    <input type="file" className="form-control-file" aria-describedby="fileHelp"/>
                                    <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Page content ends here */}

                    {/* page content begin here */}
                    <div className="container-fluid">
                      <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-7">
                          <div className="card shadow mb-4">
                            {/* Card Header - New Hire Upload */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                              <h6 className="m-0 font-weight-bold text-primary">Medical Certificate or Ultrasound Report</h6>
                            </div>
                            {/* Card Body - New Hire Options */}
                            <div className="card-body">
                              <div className="tab-content">
                                <div className="card-body">
                                  <div className="d-flex justify-content-center">
                                    <input type="file" className="form-control-file" aria-describedby="fileHelp"/>
                                    <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Page content ends here */}
                    <button type="submit" className="btn btn-primary d-block mx-auto loan-btn">Submit</button>
                  </form>
                </div>
              <Footer />
          </div>
      </div>
  );
}

export default MaternityNotification;

