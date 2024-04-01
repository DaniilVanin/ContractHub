## 📝 | Tutorial
> First, you need to separately deploy the mssql server, inside which you run the sql/sqlstatementcreate.sql file, which will create the table.

### 🐳 Docker
> The `settings.py` file in backend folder should be configured.

```sh
docker-compose build
docker-compose up
```
### 💪🏻 Non-Docker
> The `settings.py` file in backend folder should be configured.

#### Frontend
> Inside frontend folder
Install all dependencies 
```sh
npm install
```
Run front
```sh
npm start
```

#### Backend
> Inside backend folder
Install all libraries     
```sh
pip install -r requirements.txt
```

Run back
```sh
python run.py
```