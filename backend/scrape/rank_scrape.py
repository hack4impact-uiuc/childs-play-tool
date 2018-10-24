import xlrd
from ../api/models import db, Game, Ranking

book = xlrd.open_workbook("Sept2018.xlsx")
i = 0
for sheet in book.sheets():
    system = sheet.cell(0,1).value
    start_row = 0        
    for symptom_index in range(6):
        for age_index in range(2):
            start_row = start_row + 1
            while sheet.cell(2 + 28 * symptom_index, 1 + 2 * age_index).value != "Rank":
                start_row = start_row + 1                    
            #print("system index")
            if 1 + 2 * age_index < sheet.ncols and len(system_symptom_age = sheet.cell(start_row, 1 + 2 * age_index).value) != 0:
                system_symptom_age = sheet.cell(start_row, 1 + 2 * age_index).value
                descriptors = system_symptom_age.split("-")
                symptom = descriptors[1].strip()
                if symptom == "Pain Management":
                    symptom = "Pain"
                elif symptom == "Calming":
                    symptom = "Anxiety/Hyperactivity"
                elif symptom == "Cheering":
                    symptom = "Sadness"
                elif symptom == "Fuzzy":
                    symptom = "Cognitive Impairment"    
                age = descriptors[2].strip()
                if age == "13 and Above":
                    age = "13 and Older"
                for game_index in range(25):
                    #print(game_index)
                    #print(3 + 28 * symptom_index + game_index)
                    #print(sheet.cell(3 + 28 * symptom_index + game_index, 1 + 2 * age_index).value)
                    #print("rank index")
                    rank = int(sheet.cell(start_row + 1 + game_index, 0).value)
                    #print("name index")
                    name = sheet.cell(start_row + 1 + game_index, 1 + 2 * age_index).value
                    if (len(name) != 0):
                        game_id = Game.query.filter(Game.name == name).first().id                    
                        #print("put id")
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
    db.session.commit()