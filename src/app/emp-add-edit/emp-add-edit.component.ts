import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;


  education: string[] = [
    'SMA',
    'Diploma',
    'Intermediat',
    'Pascasarjana',
  ];

  constructor(
    private _fb: FormBuilder, 
    private _empService:EmployeeService, 
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      NamaDepan:'',
      NamaBelakang:'',
      Email:'',
      TanggalLahir: '',
      JenisKelamin: '',
      Pendidikan: '',
      Perusahaan: '',
      Pengalaman: '',
      Package: '',
    });
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.empForm.valid) {
      if(this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value)
        .subscribe({
          next: (val: any ) => {
            this._coreService.openSnackBar('Data Telah Diperbarui');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      } else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any ) => {
            this._coreService.openSnackBar('Data Karyawan Berhasil Ditambahkan');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
      
    }
  }
}
