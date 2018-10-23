import xlrd
import math

NUMBER_RANKING = 25
NUMBER_CATEGORIES = 12
BEGIN_SPACE = 3
CATEGORY_SPACE = 28
book = xlrd.open_workbook("Sept2018.xlsx")
book_sheets = book.sheets()
for sheet_index in range(len(book_sheets)):
    sheet = book_sheets[sheet_index]
    system = sheet.cell(0,1).value
    for category_index in range(NUMBER_CATEGORIES):
        for row in range(BEGIN_SPACE + CATEGORY_SPACE * math.floor(category_index/2), BEGIN_SPACE + CATEGORY_SPACE * math.floor(category_index/2) + NUMBER_RANKING, 1):
            age_block = category_index % 2
            same_game = Game.query.filter(Game.name == sheet.cell(row, 2 * age_block + 1).value, Game.system == system)
            if (same_game.count() == 0):
                extra_data = get_giantbomb_data(sheet.cell(row, 2 * age_block + 1), system)
                game = {}
                game["system"] = system
                game["name"] = sheet.cell(row, 2 * age_block + 1).value
                game["gender"] = sheet.cell(row, 2 * age_block + 2).value
                game["thumbnail"] = extra_data["thumbnail"]
                game["image"] = extra_data["image"]
                game["description"] = extra_data["description"]
                db.add(game)
db.commit()



# TEST PRINTING NAMES OF ONE SHEET USING SAME VARIABLES
# sheet = book_sheets[0]
# system = sheet.cell(0,1).value
# for category_index in range(NUMBER_CATEGORIES):
#     print("\n")
#     for row in range(3 + 28 * math.floor(category_index/2), 3 + 28 * math.floor(category_index/2) + 25, 1):
#         age_block = category_index % 2
#         print(sheet.cell(row, 2 * age_block + 1).value)