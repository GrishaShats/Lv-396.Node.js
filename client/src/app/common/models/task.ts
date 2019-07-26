export class TaskUser {
  constructor(public _id?: string,
              public firstName?: string,
              public lastName?: string) {
  }
}
export  class Task {
  constructor(public id?: any,
              public name?: string,
              public author: TaskUser = new TaskUser(),
              public sharedFrom: TaskUser = new TaskUser(),
              public sharedTo: TaskUser = new TaskUser()) {}
}

export class TaskCreateRequestBody {
  constructor(public id?: any,
              public name?: string,
              public author: TaskUser = new TaskUser()) {
  }
}

export class TaskEditRequestBody {
  constructor(public id?: any,
              public name?: string,
              public sharedFrom?: string,
              public sharedTo?: string) {
  }
}
