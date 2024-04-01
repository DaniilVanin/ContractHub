from dataclasses import dataclass


@dataclass
class AuthStorage:
    id: int
    token: str

    def dict(self):
        _dict = self.__dict__.copy()
        _dict["id"] = int(_dict["id"])
        _dict["token"] = str(_dict["token"])
        return _dict
