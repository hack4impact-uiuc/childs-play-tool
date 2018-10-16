import xlrd

book = xlrd.open_workbook("Sept2018.xlsx")
first_sheet = book.sheet_by_index(0)
cell = first_sheet.cell(0,1)
print(cell)