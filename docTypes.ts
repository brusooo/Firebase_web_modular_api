type Task = {
    completed: Array<{
      id: string;
      name: string;
    }> | [];
    inProgress: Array<{
      id: string;
      name: string;
    }> | [];
  };
  
  type addUsersRequestBody = {
    userName: string;
    tasks: Task;
  };
  
  export type { addUsersRequestBody, Task };
  