from flask import Blueprint, request, jsonify
import sqlalchemy
from ..api import AuthStorage
from functools import wraps
import requests
from flask_server.env import env_path
from dotenv import load_dotenv
import os

api_getTable = Blueprint("getTable_blueprint", __name__)
users = {}

if os.path.exists(env_path):
    load_dotenv(env_path)


def check_token(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        cookies = request.cookies
        user_id = cookies.get("id")
        if user_id and user_id.lstrip("-").isdigit():
            user_id = int(user_id)
        else:
            return {"status_message": "bad request"}, 400
        token = cookies.get("data")
        user = users.get(user_id)
        if user:
            if user.id == user_id:
                if user.token == token:
                    return func(*args, **kwargs)
        return {"status_message": "bad request"}, 400

    return wrapper


@api_getTable.route("/auth", methods=["POST"])
def auth():
    if request.is_json:
        data = {
            "username": request.json["username"],
            "password": request.json["password"],
        }
        url = os.getenv("URLAUTH")
        response = requests.post(url=url, json=data)
        if response.json()["data"]["state"] != -1:
            json = response.json()["data"]["data"]
            user_data = {
                "id": json["id"],
                "token": json["accessToken"],
            }
            user = AuthStorage(**user_data)
            users[json["id"]] = user
            return user_data
        return "bad request", 400


@api_getTable.route("/logout", methods=["POST"])
@check_token
def logout():
    cookies = request.cookies
    user_id = int(cookies.get("id"))
    user = users.get(user_id)
    url = os.getenv("URLLOGOUT")
    headers = {"Authorization": "Bearer " + user.token}
    requests.post(url=url, headers=headers)
    del users[user_id]
    del user
    return jsonify(200)


@api_getTable.route("/getTable", methods=["GET"])
@check_token
def get_table():
    import flask_server.models as models
    import flask_server as server
    from sqlalchemy import select

    with server.session_scope() as s:
        query = select(models.Statement)
        results = s.execute(query)
        output = results.scalars().all()
        if len(output) > 0:
            first = output[0].as_dict()
            for i in range(1, len(output)):
                first["rows"].append(output[i].as_dict()["rows"][0])
            return first
        return {
            "headers": models.Statement.__table__.columns.keys(),
            "headers_ru": models.headers_ru(),
            "rows": [],
        }


@api_getTable.route("/createEntity", methods=["POST"])
@check_token
def create_entity():
    if request.is_json:
        import flask_server.models as models
        import flask_server as server
        from sqlalchemy import insert

        if "statement_id" in request.json["god"]:
            del request.json["god"]["statement_id"]
            json = request.json["god"]
            with server.session_scope() as s:
                query = insert(models.Statement)
                try:
                    s.execute(query, [json])
                except Exception as e:
                    if type(e) == sqlalchemy.exc.IntegrityError:
                        return {"status_message": "Дубликат номера договора"}
                    return {
                        "status_message": "Че та ошибочка то новая выполза, обращайтесь к разрабам"
                    }
                else:
                    return {"status_message": "Выполнено успешно"}
        else:
            return "Content type is not supported."


@api_getTable.route("/token", methods=["GET"])
@check_token
def created_token():
    return users.get(int(request.cookies.get("id"))).dict()


@api_getTable.route("/getFile", methods=["POST"])
@check_token
def getFile():
    if request.is_json:
        import flask_server.models as models
        import flask_server as server
        from sqlalchemy import select

        json = request.json["god"]
        with server.session_scope() as s:
            query = select(models.Statement).where(
                models.Statement.number_statement == json["number_statement"]
            )
            try:
                results = s.execute(query)
            except Exception as e:
                return {"status_message": str(e)}
            else:
                output = results.scalars().all()
            if len(output) > 0:
                row = vars(output[0])
                del row["_sa_instance_state"]
                return server.report.create_doc(row), 200
            return {
                "status_message": "Такого номера договора не существует",
            }, 500


@api_getTable.route("/getDataSearch", methods=["POST"])
@check_token
def getDataSearch():
    if request.is_json:
        import flask_server.models as models
        import flask_server as server
        from sqlalchemy import select, and_

        json = request.json["god"]
        filters = []
        for col in json:
            bin_exp = getattr(models.Statement, col) == json[col]
            filters.append(bin_exp)
        with server.session_scope() as s:
            query = select(models.Statement).where(and_(*filters))
            results = s.execute(query)
            output = results.scalars().all()
            if len(output) > 0:
                first = output[0].as_dict()
                for i in range(1, len(output)):
                    first["rows"].append(output[i].as_dict()["rows"][0])
                return first
            return {
                "headers": models.Statement.__table__.columns.keys(),
                "headers_ru": models.headers_ru(),
                "rows": [],
            }


@api_getTable.route("/deleteEntity", methods=["POST"])
@check_token
def deleteEntity():
    if request.is_json:
        import flask_server.models as models
        import flask_server as server
        from sqlalchemy import delete

        json = request.json["god"]
        print(json)
        with server.session_scope() as s:
            query = delete(models.Statement).where(
                models.Statement.statement_id == json["statement_id"]
            )
            try:
                s.execute(query)
            except Exception as e:
                if type(e) == sqlalchemy.exc.DataError:
                    return {"status_message": "Ошибка Ввода"}
                return {
                    "status_message": "Че та ошибочка то новая выполза, обращайтесь к разрабам"
                }
            else:
                return {"status_message": "Выполнено успешно"}


@api_getTable.route("/updateEntity", methods=["POST"])
@check_token
def updateEntity():
    if request.is_json:
        import flask_server.models as models
        import flask_server as server
        from sqlalchemy import update

        json = request.json["god"]
        with server.session_scope() as s:
            query = (
                update(models.Statement)
                .where(models.Statement.statement_id == json["statement_id"])
                .values(dict(filter(lambda x: x[0] != "statement_id", json.items())))
            )
            s.execute(query)
        return jsonify(200)
