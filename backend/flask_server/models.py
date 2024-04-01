from flask_server import db
from sqlalchemy.inspection import inspect


def implement_as_dict(model):
    if not hasattr(model, "as_dict"):
        column_names = []
        imodel = inspect(model)
        for c in imodel.columns:
            column_names.append(c.key)

        def as_dict(self):
            rows = []
            foo = []
            for c in column_names:
                foo.append(getattr(self, c))

            rows.append(foo)
            return {
                "headers": self.__table__.columns.keys(),
                "rows": rows,
                "headers_ru": headers_ru(),
            }

        setattr(model, "as_dict", as_dict)


class Statement(db.Model):
    __tablename__ = "statements"

    statement_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    number_statement = db.Column(db.Unicode(10), nullable=False, unique=True)
    contract_period = db.Column(db.Unicode(255))
    start_practice = db.Column(db.Date, nullable=False)
    fullname_comman = db.Column(db.Unicode(100), nullable=False)
    position_comman = db.Column(db.Unicode(255), nullable=False)
    phone_comman = db.Column(db.Unicode(20))
    email_comman = db.Column(db.Unicode(50))
    fullname_resper = db.Column(db.Unicode(100), nullable=False)
    position_resper = db.Column(db.Unicode(255), nullable=False)
    phone_resper = db.Column(db.Unicode(20))
    email_resper = db.Column(db.Unicode(50))
    fullname_comrudn = db.Column(db.Unicode(100), nullable=False)
    position_comrudn = db.Column(db.Unicode(255), nullable=False)
    phone_comrudn = db.Column(db.Unicode(20))
    email_comrudn = db.Column(db.Unicode(50))
    enterprise_name = db.Column(db.Unicode(255))
    enterprise_inn = db.Column(db.Unicode(15), nullable=False)
    enterprise_kpp = db.Column(db.Unicode(15))
    enterprise_juridical_address = db.Column(db.Unicode(255), nullable=False)
    enterprise_actual_address = db.Column(db.Unicode(255))
    enterprise_ogrn = db.Column(db.Unicode(30))
    enterprise_ogrnip = db.Column(db.Unicode(30))
    enterprise_rs = db.Column(db.Unicode(50))
    enterprise_ks = db.Column(db.Unicode(50))
    enteprise_bank = db.Column(db.Unicode(255))
    enterprise_bik = db.Column(db.Unicode(20))
    enterprise_email = db.Column(db.Unicode(50))


def headers_ru():
    return [
        "Индекс",
        "Номер договора",
        "Срок действия договора",
        "Начало практики",
        "ФИО руководителя предприятия",
        "Должность руководителя предприятия",
        "Контактный телефон руководителя предприятия",
        "Email руководителя предприятия",
        "ФИО ответственного лица",
        "Должность ответственного лица",
        "Контактный телефон ответственного лица",
        "Email ответственного лица",
        "ФИО руководителя практики",
        "Должность руководителя практики",
        "Контактный телефон руководителя практики",
        "Email руководителя практики",
        "Название предприятия",
        "ИНН предприятия",
        "КПП предприятия",
        "Юридический адрес предприятия",
        "Фактический адрес предприятия",
        "ОРГН предприятия",
        "ОРГНИП предприятия",
        "P/c предприятия",
        "K/c предприятия",
        "Банк предприятия",
        "БИК предприятия",
        "Email предприятия",
    ]


implement_as_dict(Statement)
