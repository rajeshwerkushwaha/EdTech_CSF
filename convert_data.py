import csv
import sys

if len(sys.argv) != 4:
    sys.exit("Error: Not enough arguments. There should be 2 arguments for input filename and output filename respectively")
input_filename = sys.argv[1] #'Website_CBSE_EdTech_caterorization.csv'
output_filename = sys.argv[2] #'final_edtech_csf.csv'

input_data = []
content_description_col = 2 # can be changed based on its position in the input file.
if sys.argv[3] == "Student":
    max_col = 9
else:
    max_col = 7


def create_multiple_rows(input_row, cell_data, multi_count):
    cell_data_list = []
    multi_rows = []
    while cell_data.find(",") != -1:
        position = cell_data.find(",")
        cell_data_list.append(cell_data[:position])
        cell_data = cell_data[position+1:]
    if cell_data != '':
        cell_data_list.append(cell_data)
    for data in cell_data_list:
        row_data = []
        for count in range(len(input_row)):
            if count == multi_count:
                row_data.append(data.strip())
            else:
                row_data.append(input_row[count].strip())
        multi_rows.append(row_data)
    return multi_rows


def process_file(filereader):
    processing_flag = 0
    processed_data = []
    row_count = -1
    for input_row in filereader:
        row_count = row_count+1
        row_data = []
        for count in range(len(input_row)):
            cell_data = input_row[count]
            if cell_data.count(",") != 0 and count != content_description_col and row_count != 0:
                processing_flag = 1
                multi_rows = create_multiple_rows(input_row, cell_data.strip(), count)
                for row in multi_rows:
                    processed_data.append(row)
            else:
                row_data.append(input_row[count].strip())
        processed_data.append(row_data)
    return processed_data, processing_flag


with open(input_filename, 'r') as csvfile:
    filereader = csv.reader(csvfile, delimiter=',')
    input_data = filereader
    processing_flag = 1
    while processing_flag == 1:
        input_data, processing_flag = process_file(input_data)
    cleaned_data = []
    for row in input_data:
        if row not in cleaned_data:
            if len(row) == max_col:
                cleaned_data.append(row)
    sequenced_data = []
    row_count = 0
    for row in cleaned_data:
        row_count = row_count + 1
        row[0] = row_count
        sequenced_data.append(row)



with open(output_filename, mode='w+') as output_file:
    file_writer = csv.writer(output_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    file_writer.writerows(sequenced_data)

print("Done")
