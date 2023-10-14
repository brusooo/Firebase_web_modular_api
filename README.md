# Firebase Realtime Database Integration in Next.js 13 🚀

![Next.js](https://img.shields.io/badge/Next.js-13-informational?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-12-yellow?style=for-the-badge)

Firebase Realtime Database ( Web modular API) in Next.js 13! 🌟 A simple Todo app, no frontend hassle – just a seamless API experience. Easy, breezy, and perfect for your tasks! 📝

## Usage Overview: ✨

- **Database:** Firebase Realtime Database 📊
- **Framework:** Next.js 13 🌐
- **Application Type:** Simple Todo Tasks 📝
- **Frontend:** None! Just a robust API setup 🚫
- **Configuration:** Effortlessly set up with intuitive rewrites and configurations! 🛠️

## API Endpoints

### `POST /api/addUser`

### Request Body

```json
{
  "userName": "John Doe",
  "tasks": {
    "completed": [],
    "inProgress": []
  }
}
```

### Response

```json
{
  "userId": "123abc",
  "message": "Successfully Added User to firebase👍"
}
```

### `POST /api/addTask`

### Request Body

```json
{
  "userId": "123abc",
  "newTask": "Sample Task Name"
}
```

### Response

```json
{
  "taskId": "456def",
  "message": "Task added to completed tasks successfully👍"
}
```

### `DELETE /api/removeTask`

### Request Body

```json
{
  "userId": "123abc",
  "taskId": "456def",
  "taskIn": "inProgress"
}
```

### Response

```json
{
  "taskId": "456def",
  "message": "Task with taskId 456def deleted successfully👍"
}
```

### `PUT /api/moveTask`

### Request Body

```json
{
  "userId": "123abc",
  "taskId": "456def",
  "source": "inProgress",
  "destination": "completed"
}
```

### Response

```json
{
  "taskId": "456def",
  "message": "Task with taskId 456def moved from source to destination successfully👍"
}
```

### `PUT /api/updateTaskDesc`

### Request Body

```json
{
  "userId": "123abc",
  "taskId": "456def",
  "source": "inProgress",
  "newDescription": "New Task Description"
}
```

### Response

```json
{
  "taskId": "456def",
  "message": "Task with taskId 456def updated successfully👍"
}
```

### `POST /api/getDocs`

### Request Body

```json
{
  "userId": "123abc",
  "source": "user"
}
```

### Response

```json
{
  "userId": "123abc",
  "data": {
    "userName": "John Doe",
    "tasks": {
      "completed": [{ "task": "Fetched from DB" }],
      "inProgress": [{ "task": "Fetched from DB" }]
    }
  }
}
```
