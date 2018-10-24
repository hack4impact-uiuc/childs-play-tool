import xlrd
import math
# from ../api/models import db, Game, Ranking


#skip white space until ranking
#do stuff
#internal counter that will stop

# book = xlrd.open_workbook("Sept2018.xlsx")
# i = 0
# for sheet in book.sheets():
#     system = sheet.cell(0,1).value
#     count = 0
#     current_row = 0
#     while (count != 12):
#         while (sheet.cell(current_row, 0).value != 1):
#             current_row += 1
#         initial_row = current_row
#         for age_index in range(2):
#             name = sheet.cell(current_row, 2 * age_index + 1).value
#             while (name != ""):
#                 same_game = Game.query.filter(Game.name == name, Game.system == system)
#                 if (same_game.count() == 0):
#                     # extra_data = get_giantbomb_data(name, system)
#                     game = {}
#                     game["system"] = system
#                     game["name"] = name
#                     game["gender"] = sheet.cell(current_row, 2 * age_index + 2).value
#                     game["id"] = i
#                     i = i + 1
#                     # game["thumbnail"] = extra_data["thumbnail"]
#                     # game["image"] = extra_data["image"]
#                     # game["description"] = extra_data["description"]
#                     g = Game(game)
#                     db.session.add(g)
#                 current_row += 1
#                 if (current_row == sheet.nrows):
#                     break
#                 name = sheet.cell(current_row, 2 * age_index + 1).value
#             if (sheet.ncols < 5):
#                 count += 2
#                 break
#             if (age_index == 0):
#                 current_row = initial_row
#             count += 1

# book = xlrd.open_workbook("Sept2018.xlsx")
# i = 0
# for sheet in book.sheets():
#     system = sheet.cell(0,1).value
#     count = 0
#     current_row = 0
#     print(system)
#     while (count != 12):
#         while (sheet.cell(current_row, 0).value != 1):
#             current_row += 1
#         initial_row = current_row
#         for age_index in range(2):
#             name = sheet.cell(current_row, 2 * age_index + 1).value
#             while (name != ""):
#                 print(name)
#                 current_row += 1
#                 if (current_row == sheet.nrows):
#                     break
#                 name = sheet.cell(current_row, 2 * age_index + 1).value
#             if (sheet.ncols < 5):
#                 count += 2
#                 print("\n")
#                 break
#             if (age_index == 0):
#                 current_row = initial_row
#             count += 1
#             print("\n")
            

# NUMBER_RANKING = 25
# NUMBER_CATEGORIES = 12
# BEGIN_SPACE = 3
# CATEGORY_SPACE = 28
# book = xlrd.open_workbook("Sept2018.xlsx")
# for sheet in book.sheets():
#     system = sheet.cell(0,1).value
#     for symptom_index in range(NUMBER_CATEGORIES):
#         for row in range(BEGIN_SPACE + CATEGORY_SPACE * math.floor(symptom_index/2), BEGIN_SPACE + CATEGORY_SPACE * math.floor(symptom_index/2) + NUMBER_RANKING, 1):
#             age_index = symptom_index % 2
#             same_game = Game.query.filter(Game.name == sheet.cell(row, 2 * age_index + 1).value, Game.system == system)
#             if (same_game.count() == 0):
#                 extra_data = get_giantbomb_data(sheet.cell(row, 2 * age_index + 1), system)
#                 game = {}
#                 game["system"] = system
#                 game["name"] = sheet.cell(row, 2 * age_index + 1).value
#                 game["gender"] = sheet.cell(row, 2 * age_index + 2).value
#                 game["thumbnail"] = extra_data["thumbnail"]
#                 game["image"] = extra_data["image"]
#                 game["description"] = extra_data["description"]
#                 g = Game(game)
#                 db.session.add(g)


# TEST PRINTING NAMES OF ONE SHEET USING SAME VARIABLES
# sheet = book_sheets[0]
# for symptom_index in range(NUMBER_CATEGORIES):
#     print("\n")
#     for row in range(3 + 28 * math.floor(symptom_index/2), 3 + 28 * math.floor(symptom_index/2) + 25, 1):
#         age_index = symptom_index % 2
#         print(sheet.cell(row, 2 * age_index + 1).value == )