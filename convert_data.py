import csv

input_data = []
content_description_col = 2 # can be changed based on its position in the input file.
input_filename = 'Website CBSE EdTech caterorization.csv'

def create_multiple_rows(input_row,cell_data,multi_count):
    cell_data_list = []
    multi_rows = []
    while cell_data.find(",") != -1:
        position = cell_data.find(",")
        cell_data_list.append(cell_data[:position])
        cell_data = cell_data[position+1:]
    for data in cell_data_list:
        row_data = []
        for count in range(len(input_row)):
            if count == multi_count:
                row_data.append(data)
            else:
                row_data.append(input_row[count])
        print(row_data)
        multi_rows.append(row_data)
    print(multi_rows)
    return multi_rows


row_count = -1

with open(input_filename,'r') as csvfile:
    filereader = csv.reader(csvfile,delimiter=',')

    for input_row in filereader:
        row_count = row_count+1
        row_data = []
        for count in range(len(input_row)):
            cell_data = input_row[count]
            if cell_data.count(",") != 0 and count != content_description_col and row_count != 0:
                multi_rows = create_multiple_rows(input_row,cell_data,count)
                for row in multi_rows:
                    input_data.append(row)
            else:
                row_data.append(input_row[count])
        input_data.append(row_data)

print(input_data)

with open('final_edtech_csf.csv', mode='w+') as final_file:
    file_writer = csv.writer(final_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    file_writer.writerows(input_data)

print("Done")
