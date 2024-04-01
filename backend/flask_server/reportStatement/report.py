from docxtpl import DocxTemplate
from pathlib import Path
import pymorphy3
from pytrovich.detector import PetrovichGenderDetector
from pytrovich.enums import NamePart, Gender, Case
from pytrovich.maker import PetrovichDeclinationMaker
from io import BytesIO
from flask import send_file


class Report:
    def __init__(self):
        self.morph = pymorphy3.MorphAnalyzer(lang="ru")
        self.detector = PetrovichGenderDetector()
        self.maker = PetrovichDeclinationMaker()

    def genitive_position(self, position_comman):
        text = position_comman
        result = " ".join(
            self.morph.parse(word)[0].inflect({"gent"}).word for word in text.split()
        )
        return result

    def genitive_fullname(self, fullname_comman):
        name_list = fullname_comman.split(" ")
        gender = self.detector.detect(
            firstname=name_list[1], middlename=name_list[2], lastname=name_list[0]
        )
        fullname_genitive = ""

        fullname_genitive += self.maker.make(
            NamePart.LASTNAME, gender, Case.GENITIVE, name_list[0]
        )
        fullname_genitive += " " + self.maker.make(
            NamePart.FIRSTNAME, gender, Case.GENITIVE, name_list[1]
        )
        fullname_genitive += " " + self.maker.make(
            NamePart.MIDDLENAME, gender, Case.GENITIVE, name_list[2]
        )

        if gender == Gender.FEMALE:
            acting = "действующей"
        else:
            acting = "действующего"

        return fullname_genitive, acting

    def initials_fullname(self, fullname_comman):
        fullname_comman_list = fullname_comman.split(" ")
        return f"{fullname_comman_list[1][0:1]}.{fullname_comman_list[2][0:1]}. {fullname_comman_list[0]}"

    def getyears(self, years):
        return {
            years < 0: "ошибка",
            years % 10 == 0: "лет",
            years % 10 == 1: "года",
            years % 10 > 1 and years % 10 < 5: "лет",
            years % 10 > 4: "лет",
            years % 100 > 10 and years % 100 < 20: "лет",
        }[True]

    def create_doc(self, row: dict):
        document_path = Path(__file__).parent / "template/my_word_template.docx"
        doc = DocxTemplate(document_path)
        fullname_comman_genitive, acting_comman = self.genitive_fullname(
            row["fullname_comman"]
        )
        position_comman_genitive = self.genitive_position(row["position_comman"])
        fullname_comman_initials = self.initials_fullname(row["fullname_comman"])
        contract_period = (
            row["contract_period"] + " " + self.getyears(int(row["contract_period"]))
        )
        context = {
            "ACTING_COMMAN": acting_comman,  # created
            "ENTERPRISE_NAME": row["enterprise_name"],
            "POSITION_COMMAN_GENT": position_comman_genitive,  # mod
            "FULLNAME_COMMAN_GENT": fullname_comman_genitive,  # mod
            "FULLNAME_COMRUDN": row["fullname_comrudn"],
            "POSITION_COMRUDN": row["position_comrudn"],
            "PHONE_COMRUDN": row["phone_comrudn"],
            "EMAIL_COMRUDN": row["email_comrudn"],
            "FULLNAME_RESPER": row["fullname_resper"],
            "POSITION_RESPER": row["position_resper"],
            "PHONE_RESPER": row["phone_resper"],
            "EMAIL_RESPER": row["email_resper"],
            "CONTRACT_PERIOD": contract_period,  # mod
            "ENTERPRISE_JURIDICAL_ADDRESS": row["enterprise_juridical_address"],
            "ENTERPRISE_ACTUAL_ADDRESS": row["enterprise_actual_address"],
            "ENTERPRISE_INN": row["enterprise_inn"],
            "ENTERPRISE_KPP": row["enterprise_kpp"],
            "ENTERPRISE_RS": row["enterprise_rs"],
            "ENTERPRISE_KS": row["enterprise_ks"],
            "ENTERPRISE_BANK": row["enteprise_bank"],
            "ENTERPRISE_BIK": row["enterprise_bik"],
            "ENTERPRISE_ORGN": row["enterprise_ogrn"],
            "ENTERPRISE_ORGNIP": row["enterprise_ogrnip"],
            "ENTERPRISE_EMAIL": row["enterprise_email"],
            "POSITION_COMMAN": row["position_comman"],
            "FULLNAME_COMMAN_INITIALS": fullname_comman_initials,  # mod
        }
        docx_in_memory = BytesIO()
        doc.render(context)
        doc.save(docx_in_memory)
        docx_in_memory.seek(0)
        return send_file(
            docx_in_memory,
            download_name=f"{row['enterprise_name']}-svinka.docx",
            as_attachment=True,
        )
