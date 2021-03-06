import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-alumini',
  templateUrl: './edit-alumini.component.html',
  styleUrls: ['./edit-alumini.component.css']
})
export class EditAluminiComponent implements OnInit {
  user: User;
  username: string;
  teams: string;
  roles: string;
  editForm: FormGroup;
  selectedItems = [];
  dropdownSettings = {};
  dropdownList = [];
  //Team
  teamSelectedItems = [];
  teamDropdownSettings = {};
  teamDropdownList = [];
  private fieldArray: Array<any> = [];
  private fieldArray2: Array<any> = [];
  private newAttribute: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
  }


  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if (!userId) {
      alert("Invalid action.")
      this.router.navigate(['admin']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      placementStatus: ['', Validators.required],
      aluminiComments: ['', Validators.required],
      companyName: ['', Validators.required],
      aluminiDesignation: ['', Validators.required],
      employementType: ['', Validators.required]
    });

    this.userService.getAluminiOneList(+userId)
      .subscribe(data => {
        if (data.status === 200) {
          this.editForm.setValue(data.result);
        } else {
          alert(data.message);
        }
      });
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit() {
    this.userService.updateAluminiRecord(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.status === 200) {
            alert('User updated successfully.');
            this.router.navigate(['alumini-list']);
          } else {
            alert(data.message);
          }
        });
  }

  back():void{
    this.router.navigate(['alumini-list']);

  }

}
