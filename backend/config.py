from settings import Settings
import urllib


class Config(object):
    settings = Settings()
    DEBUG = True

    @property
    def SQLALCHEMY_DATABASE_URI(self):  # Note: all caps
        params = urllib.parse.quote_plus(
            f"DRIVER={self.settings.driver};\
                                   SERVER={self.settings.server};\
                                   DATABASE={self.settings.database};\
                                   UID={self.settings.username};\
                                   PWD={self.settings.password};\
                                   TrustServerCertificate={self.settings.TrustServerCertificate};"
        )
        return "mssql+pyodbc:///?odbc_connect=%s" % params

    @property
    def SQLALCHEMY_TRACK_MODIFICATIONS(self):  # Note: all caps
        return True
