import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public empService: EmployeeService, public toast: ToastrService) { }
  @ViewChild('checkbox1') checkBox: ElementRef;
  isslide:string="off";
  ngOnInit() {
    this.empService.getDesignations().subscribe(data => {
      this.empService.listDesignation = data;
    });
  }

  submit(form: NgForm) {
    this.empService.employeeData.isMarried = (form.value.isMarried == true) ? 1 : 0;
    this.empService.employeeData.isActive = (form.value.isActive == true) ? 1 : 0;

    if (this.empService.employeeData.id == 0)
      this.insertEmployee(form);
    else
      this.updateEmployee(form);
  }

  insertEmployee(myform: NgForm) {
    this.empService.saveEmployee().subscribe(d => {
      this.resetForm(myform);
      this.refreshData();
      this.toast.success('Success','Record Saved Successfully');
      //console.log('Record inserted successfully !');
      //alert('Record inserted successfully !');
    });
  }

  updateEmployee(myform: NgForm) {
    this.empService.updateEmployee().subscribe(d => {
      this.resetForm(myform);
      this.refreshData();
      this.toast.warning('Success','Record Updated Successfully');
      //console.log('Record updated successfully !');
      //alert('Record updated successfully !');
    });
  }

  resetForm(myform: NgForm) {
    myform.form.reset();
    this.empService.employeeData = new Employee();
    this.hideShowSlide();
  }

  refreshData() {
    this.empService.getEmployees().subscribe(resultAllEmployees => {
      this.empService.listEmployee = resultAllEmployees;
    });
  }

  hideShowSlide()
  {
    if(this.checkBox.nativeElement.checked)
    {
      this.checkBox.nativeElement.checked=false;
      this.isslide='off';
    }
    else
    {
      this.checkBox.nativeElement.checked=true;
      this.isslide='on';
    }
  }
}
