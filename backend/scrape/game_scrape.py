import xlrd

NUMBER_RANKING = 25
NUMBER_CATEGORIES = 12
book = xlrd.open_workbook("Sept2018.xlsx")
book_sheets = book.sheets()
for sheet_index in range(len(book_sheets)):
    sheet = book_sheets[sheet_index]
    system = sheet.cell(0,1).value
    for category_index in range(NUMBER_CATEGORIES):

        for row in range(3 + 28 * floor(category_index/2), 3 + 28 * floor(category_index/2) + 25, 1):
            temp = category_index % 2
            same_game = Game.query.filter(Game.name == sheet.cell(row, 2 * temp + 1), Game.system == system)
            if (same_game.count() == 0):
                extra = get_giantbomb_data(sheet.cell(row,1), system)
                game = {}
                game["system"] = system
                game["name"] = sheet.cell(row, 1)
                game["gender"] = sheet.cell(row,2)
                game["thumbnail"] = extra["thumbnail"]
                game["image"] = extra["image"]
                game["description"] = extra["description"]
