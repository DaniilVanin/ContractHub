from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from contextlib import contextmanager
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
from .reportStatement.report import Report


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config())

    return app


Base = declarative_base()

app = create_app()
db = SQLAlchemy(app, model_class=Base)
migrate = Migrate(app, db)
report = Report()


from flask_server.routes import main_bp

from flask_server.api.routes import api_getTable


app.register_blueprint(main_bp, url_prefix="/")

app.register_blueprint(api_getTable, url_prefix="/api")

main_engine = sa.create_engine(
    app.config["SQLALCHEMY_DATABASE_URI"],
    echo=True,
)

DBSession = sessionmaker(
    bind=main_engine,
    expire_on_commit=False,
)


@contextmanager
def session_scope():
    """Provides a transactional scope around a series of operations."""
    session = DBSession()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()
