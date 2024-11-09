import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/Master';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {


  employeeObj: Employee = new Employee();
  parentDepId: any;
  deptList: any;
  childDeptList: any;
  childDeptListArray: any = {};
  employeeList: any;
  empList!: Employee[];
  isAddBtn: boolean = true;

  constructor(private http: HttpService) {

  }

  ngOnInit(): void {

    this.getParentDepartment()
    this.getChildDepartment()
    this.getEmployees()

  }

  getParentDepartment() {
    this.http.httpGet('http://localhost:7000/api/getDepartment', '').subscribe(dat => {
      // console.log(dat)

      let t = dat
      if (dat.result) {
        this.deptList = t.data
      } else {
      }
    })
  }

  getChildDepartment() {
    this.http.httpGet('http://localhost:7000/api/getChildDepartment', '').subscribe(dat => {
      let t = dat
      if (dat.result) {
        this.childDeptList = t.data
      } else {
      }
      console.log(this.childDeptList)

      for (let i of this.childDeptList) {
        this.childDeptListArray[i.childDeptId] = i.departmentName
        // console.log(i.childDeptId)
      }

      // console.log(this.childDeptListArray)c
    })
  }

  getEmployees() {
    this.http.httpGet('http://localhost:7000/api/getEmployees', '').subscribe(dat => {
      // console.log(dat)

      // t = dat
      // if(dat.result){
      this.empList = dat.data
      // }else{
      // }
    })

    // this.addEmployeeRow()

  }

  addEmployees() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.httpPost('http://localhost:7000/api/addEmployee', this.employeeObj, headers).subscribe((data: any) => {
      // console.log(data)
      this.getEmployees()
      if (data.result) {
        this.employeeObj = new Employee();
      } else {
      }
      // empList.add(dat.data);
    }, (error) => {
      console.error('Error occurred:', error);
    })
  }

  getEmployee(id: any) {
    
    let addOrUpdateHeader = document.querySelector('#addOrUpdateHeader');
    addOrUpdateHeader!.textContent = 'Update Employee Details'

    this.isAddBtn = false

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams()
      .set('code', id);


    this.http.httpGetWithParams('http://localhost:7000/api/getEmployee', params, headers).subscribe((data: any) => {
      // console.log(data)
      this.getEmployees()
      let emp = data.data
      if (data.result) {

        this.employeeObj.employeeId = emp.employeeId
        this.employeeObj.employeeName = emp.employeeName
        this.employeeObj.contactNo = emp.contactNo
        this.employeeObj.emailId = emp.emailId
        this.employeeObj.gender = emp.gender
        this.employeeObj.deptId = emp.deptId

      } else {
      }
      // empList.add(dat.data);
    }, (error) => {
      console.error('Error occurred:', error);
    })
  }

  updateEmployees() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.httpPost('http://localhost:7000/api/updateEmployee', this.employeeObj, headers).subscribe((data: any) => {
      console.log(data.data)
      // this.getEmployees()
      this.updateEmployeeRow(data.data)
      if (data.result) {
        this.employeeObj = new Employee();

      } else {
      }
      let addOrUpdateHeader = document.querySelector('#addOrUpdateHeader');
      addOrUpdateHeader!.textContent = 'New Employee'
    this.isAddBtn = true

      // empList.add(dat.data);
    }, (error) => {
      console.error('Error occurred:', error);
    })
  }

  addEmployeeRow() {
    const tableBody = document.querySelector('#employeeTable tbody');

    if (tableBody) {
      const newRow = document.createElement('tr');
      newRow.id = `employeeRow-${Math.random().toString(36).substr(2, 9)}`; // Set a unique ID

      const idCell = document.createElement('td');
      idCell.textContent = '2';

      const nameCell = document.createElement('td');
      nameCell.textContent = 'John Doe';

      const contactCell = document.createElement('td');
      contactCell.textContent = '1234567890';

      const emailCell = document.createElement('td');
      emailCell.textContent = 'johndoegmail.com';

      const departmentCell = document.createElement('td');
      departmentCell.textContent = 'Sales';

      const actionsCell = document.createElement('td');

      const editButton = document.createElement('button');
      editButton.className = 'btn btn-warning btn-sm';
      editButton.textContent = 'Edit';
      editButton.onclick = () => this.editEmployee();

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger btn-sm mx-1';
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => this.deleteEmployee();

      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);

      newRow.appendChild(idCell);
      newRow.appendChild(nameCell);
      newRow.appendChild(contactCell);
      newRow.appendChild(emailCell);
      newRow.appendChild(departmentCell);
      newRow.appendChild(actionsCell);

      tableBody.appendChild(newRow);
    }
  }

  updateEmployeeRow(emp: any) {
    let employeeName = document.querySelector('#employeeName_' + emp.employeeId) as HTMLElement;
    employeeName!.textContent = emp.employeeName
    let contactNo = document.querySelector('#contactNo_' + emp.employeeId) as HTMLElement;
    contactNo!.textContent = emp.contactNo
    let emailId = document.querySelector('#emailId_' + emp.employeeId) as HTMLElement;
    emailId!.textContent = emp.emailId
    let gender = document.querySelector('#gender_' + emp.employeeId) as HTMLElement;
    gender!.textContent = emp.gender
    let deptId = document.querySelector('#deptId_' + emp.employeeId) as HTMLElement;
    deptId!.textContent = this.childDeptListArray[emp.deptId]

  }
  deleteEmployee(): any {
    console.log("")
  }
  editEmployee(): any {
    console.log("")
  }


}
