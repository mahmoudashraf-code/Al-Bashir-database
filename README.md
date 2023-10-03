
# Al-Bashir Database

for make new non-relational database using node js



## Features

- Create Tabeles and databases using GUI
- List all Tables and database
- Make query Using GUI
- Full API for database


## Requirements

- Node.js v16 or higher

## Installation
-  Clone this repository:

```bash
  git clone https://github.com/mahmoudashraf-code/Al-Bashir-database.git
  cd Al-Bashir-database
```
- Install front dependencies:

```bash
  npm i
```


## Usage

-  Start Database:
```bash
  npm run start
```

- Open a web browser and go to http://localhost:3000


## API Reference For Database

#### Get all Databases
```http
  GET /api/database
```


#### Create New Database
```http
  POST /api/database/
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of database |



#### Delete database
```http
  DELETE /api/database/${name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of database |


#### Rename Database
```http
  PUT /api/database/${name}
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of database |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of database |

---



## API Reference For Query



#### Insert New Item
```http
  POST /api/query
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `database`      | `string` | **Required**. Name of database |
| `table`      | `string` | **Required**. Name of table |
| `item`      | `any` | **Required**. item to insert |



#### Update Item
```http
  PUT /api/query
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `database`      | `string` | **Required**. Name of database |
| `table`      | `string` | **Required**. Name of table |
| `label`      | `string` | **Required**. label in row (id) |
| `value`      | `string` | **Required**. value for label |
| `item`      | `any` | **Required**. item to insert |



#### Delete Item
```http
  DELETE /api/query
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `database`      | `string` | **Required**. Name of database |
| `table`      | `string` | **Required**. Name of table |
| `label`      | `string` | **Required**. label in row (id) |
| `value`      | `string` | **Required**. value for label |


## Security
This app does not store any of your personal information. All communication between the client and server is encrypted over HTTPS.


## Troubleshooting
If you are having any problems with this app, please open an issue on GitHub.


## License
This app is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.


