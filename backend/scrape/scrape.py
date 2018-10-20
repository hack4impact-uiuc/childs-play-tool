import xlrd

book = xlrd.open_workbook("Sept2018.xlsx")
first_sheet = book.sheet_by_index(0)
cell = first_sheet.cell(0,1)
print("{0}".format(first_sheet.ncols))
list_sheets = book.sheets()

# for i in range(len(book.sheets())):
#     sheet = list_sheets[i]
#     print("Game: {0}".format(sheet.cell(0,1).value))
#     for j in range (sheet.nrows):
#         if not sheet.cell(j,1).value: 
#             break
#         print("{0}".format(sheet.cell(j,1).value))

for i in range(3, first_sheet.nrows, 1):
    if first_sheet.cell(i,0).value: 
        print("Rank:{}, Name:{}, Avatar:{}".format(first_sheet.cell(i,0).value, first_sheet.cell(i,1).value, first_sheet.cell(i,2).value))