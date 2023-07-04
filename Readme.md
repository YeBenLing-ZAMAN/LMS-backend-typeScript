## testing Link: http://localhost:5000

## Application Routes:

### Auth (user login | facility create| student create | admin create )

---

- http://localhost:5000/api/v1/auth/login (POST)✔

```javascript
{
    "id": "240200002",
    "password": "000000"
}
```

- http://localhost:5000/api/v1/user/create-faculty (POST)✔

```javascript
{
    "password": "123456",
    "faculty": {
        "name": {
            "firstName": "spider",
            "lastName": "man",
            "middleName": ""
        },
        "dateOfBirth": "24-04-1998",
        "gender": "male",
        "bloodGroup": "O+",
        "email": "user@gmail.com",
        "contactNo": "user_4",
        "emergencyContactNo": "01600000000",
        "designation":"a good techer",
        "presentAddress": "CTG",
        "permanentAddress": "CTG",
        "academicFaculty": "6486e736af02ce81da2fdde2",
        "academicDepartment": "6486f35e49c295c3e318778d"
    }
}
```

- http://localhost:5000/api/v1/user/create-student (POST)✔

```javascript
{
    "password": "123456",
    "student": {
        "name": {
            "firstName": "messi",
            "lastName": "leo",
            "middleName": ""
        },
        "dateOfBirth": "24-04-1998",
        "gender": "male",
        "bloodGroup": "O+",
        "email": "user@gmail.com",
        "contactNo": "user_4",
        "emergencyContactNo": "01600000000",
        "presentAddress": "CTG",
        "permanentAddress": "CTG",
        "academicFaculty": "6486e736af02ce81da2fdde2",
        "academicDepartment": "6486f35e49c295c3e318778d",
        "academicSemester": "64868733611ddc8fdcb339a7",
        "guardian": {
            "fatherName": "MD.ABBU",
            "fatherOccupation": "Retired Teacher",
            "fatherContactNo": "01600000000",
            "motherName": "Mrs.Ammu",
            "motherOccupation": "Housewife",
            "motherContactNo": "01600000000",
            "address": "CTG"
        },
        "localGuardian": {
            "name": "Zahid Hasan",
            "occupation": "Service Holder",
            "contactNo": "01600000000",
            "address": "Dhaka"
        }
    }
}
```

- http://localhost:5000/api/v1/auth/refresh-token (POST)✔ take access token from cookies

### Auth (admin)

---

- http://localhost:5000/api/v1/admins/create-admin (POST)✔

```javascript
{
    "admin": {
        "name": {
            "firstName": "cr7",
            "lastName": "hoooooooo.......",
            "middleName": ""
        },
        "dateOfBirth": "24-04-1990",
        "gender": "male",
        "bloodGroup": "O+",
        "email": "cr7@gmail.com",
        "contactNo": "78465734673",
        "emergencyContactNo": "sister-borther",
        "designation":"world class jump trainer",
        "presentAddress": "riyad, Saudi Arabia",
        "permanentAddress": "portugal",
        "managementDepartment": "648927ea5f2a5901dafe6fa2"
    }
}
```

- http://localhost:5000/api/v1/auth/login (POST)✔

```javascript
{
    "id": "A-00002",
    "password": "admin123456@"
}
```

### student

---

- http://localhost:5000/api/v1/students (GET) | admin✔
- http://localhost:5000/api/v1/students/64a3cf87989c22a7262d286f (Single GET) | admin✔
- http://localhost:5000/api/v1/students/update (PATCH) |student it's self✔
- http://localhost:5000/api/v1/students/240200001 (PATCH) |admin✔
- http://localhost:5000/api/v1/students/240200001 (DELETE) |admin✔✔

### faculty

---

- http://localhost:5000/api/v1/faculties (GET) | admin✔
- http://localhost:5000/api/v1/faculties/649284040fadc99a14c1fb27 (Single GET) | admin✔
- http://localhost:5000/api/v1/faculties/update (PATCH) |student it's self✔
- http://localhost:5000/api/v1/faculties/F-00002 (PATCH) |admin✔

```javascript
{
    "gender": "female"
}
```

- http://localhost:5000/api/v1/faculties/240200001 (DELETE) |admin✔✔

### Management Departments

---

- http://localhost:5000/api/v1/management-departments/create-management (post) | admin✔

```javascript
  {
  "title":"Physical Training"
  }
```

- http://localhost:5000/api/v1/management-departments (GET) | admin✔
- http://localhost:5000/api/v1/management-departments/648927ea5f2a5901dafe6fa2 (Single GET) | admin✔
- http://localhost:5000/api/v1/management-departments/update (PATCH) |student it's self✔
- http://localhost:5000/api/v1/management-departments/648927ea5f2a5901dafe6fa2 (PATCH) |admin✔

```javascript
  {
  "title":"Teacher Management"
  }
```

- http://localhost:5000/api/v1/management-departments/648927ea5f2a5901dafe6fa2 (DELETE) |admin✔✔

### Academic Departments

---

- http://localhost:5000/api/v1/academic-departments/create-department (post) | admin✔

```javascript
 {
    "title":"Department of deep learning",
    "academicFaculty":"6486e736af02ce81da2fdde2"
}
```

- http://localhost:5000/api/v1/academic-departments (GET) | admin✔
- http://localhost:5000/api/v1/academic-departments/6486f37649c295c3e3187792 (Single GET) | admin✔
- http://localhost:5000/api/v1/academic-departments/update (PATCH) |student it's self✔
- http://localhost:5000/api/v1/academic-departments/6486f37649c295c3e3187792 (PATCH) |admin✔

```javascript
{
    "title":"Department of deep learning",
    "academicFaculty":"6486e736af02ce81da2fdde2"
}
```

- http://localhost:5000/api/v1/students/648927ea5f2a5901dafe6fa2 (DELETE) |admin✔✔

### Academic Semester

---

- http://localhost:5000/api/v1/academic-semester/create-semester (post) | admin✔

```javascript
{
    "title": "Autumn",
    "year": "2322",
    "code": "01",
    "startMonth": "January",
    "endMonth": "May"
}
```

- http://localhost:5000/api/v1/academic-semester/?page=2&limit=3&sortBy=code&sortOrder=desc (GET) | admin✔
- http://localhost:5000/api/v1/academic-semester/academic-semester/?searchTeam=fall (GET) | admin✔
- http://localhost:5000/api/v1/academic-semester/academic-semester/?title=Fall&year=2024 (GET) | admin✔
- http://localhost:5000/api/v1/academic-semester/academic-semester/?page=1&limit=10&sortBy=code&sortOrder=desc&title=Fall&year=2024 (GET) | admin✔
- http://localhost:5000/api/v1/academic-semester/6486870d611ddc8fdcb33998 (Single GET) | admin✔
- http://localhost:5000/api/v1/academic-semester/update (PATCH) |student it's self✔
- http://localhost:5000/api/v1/academic-semester/6486870d611ddc8fdcb33998 (PATCH) |admin✔

```javascript
{
    "title": "Fall",
    "code":"03",
    "year": "2020"
}
```

- http://localhost:5000/api/v1/academic-semester/6486870d611ddc8fdcb33998 (DELETE) |admin✔✔

### Pagination

---

- http://localhost:5000/api/v1/academic-semester/?page=2&limit=3&sortBy=code&sortOrder=desc (GET) | admin✔
- http://localhost:5000/api/v1/academic-semester/academic-semester/?searchTeam=fall (GET) | admin✔
- http://localhost:5000/api/v1/academic-semester/academic-semester/?title=Fall&year=2024 (GET) | admin✔
- http://localhost:5000/api/v1/academic-semester/academic-semester/?page=1&limit=10&sortBy=code&sortOrder=desc&title=Fall&year=2024 (GET)
