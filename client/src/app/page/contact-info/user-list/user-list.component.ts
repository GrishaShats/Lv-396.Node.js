import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../common/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../common/services/department.service';
import { UserService } from '../../../common/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users: User[];
  @Input() filterText: string;
  departments: any;
  id: any;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute,
   private readonly departmentService: DepartmentService, private readonly userService: UserService) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  selectUser(uid: number) {
    this.router.navigate(['/profile/my-profile/', uid], {relativeTo: this.route});
  }

  loadAllUsers(): any {
    if(this.getDepartmentId()) {
      return this.getAllEmployees();
    }
    return this.getAllUsers(); 
  }

  getDepartmentId(): string {
    return this.id = this.route.snapshot.paramMap.get('id');
  }

  getAllEmployees(): any {
    this.departmentService.getAllDepartments().subscribe((department: any) => {
      department.filter((item: any) => item.name === this.id).map((item: any) => this.users = item.employees);
    });
  }

  getAllUsers()  {
    this.userService.getAll().subscribe(users => this.users = users );
  }

}
