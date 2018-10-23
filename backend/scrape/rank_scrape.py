import xlrd
from ../api/models import db, Game, Ranking

book = xlrd.open_workbook("Sept2018.xlsx")
i = 0
for sheet in book.sheets():
    system = sheet.cell(0,1).value
    for symptom_index in range(6):
        for age_index in range(2):
            system_symptom_age = sheet.cell(2 + 28 * symptom_index, 1 + 2 * age_index).value
            descriptors = system_symptom_age.split(" - ")
            symptom = descriptors[1]
            age = descriptors[2]
            for game_index in range(25):
                rank = int(sheet.cell(3 + 28 * symptom_index, 0).value)
                name = sheet.cell(3 + 28 * symptom_index, 1).value
                game_id = Game.query(Game.id).filter(Game.name == name).first().id
                ranking_id = i
                i = i + 1
                ranking = {}
                ranking["id"] = ranking_id
                ranking["age"] = age
                ranking["system"] = system
                ranking["symptom"] = symptom
                ranking["game_id"] = game_id
                ranking["rank"] = rank
                r = Ranking(ranking)
                db.session.add(r)



