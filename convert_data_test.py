import csv
import sys

if len(sys.argv) != 4:
    sys.exit("Error: Not enough arguments. There should be 2 arguments for input filename and output filename respectively")
input_filename = sys.argv[1] #'Website_CBSE_EdTech_caterorization.csv'
output_filename = sys.argv[2] #'final_edtech_csf.csv'
user = sys.argv[3]
skip_cols = [2,3] # can be changed based on its position in the input file.
comma_cols_student = [6,9] # columns that contians comma
comma_cols_teacher = [4,7] # columns that contians comma

def create_combinations(row):
    '''
    This method is to create all the cominations of the columns which contains
    comma separated values apart from skip_cols
    '''
    temp = []
    if user=='Student':
        for i in row[comma_cols_student[0]].split(','):
            for j in row[comma_cols_student[1]].split(','):
                temp.append((i,j))
    elif user=='Teacher':
        for i in row[comma_cols_teacher[0]].split(','):
            for j in row[comma_cols_teacher[1]].split(','):
                temp.append((i,j))
    return temp


def process_file(filereader):
    processed_data = []
    for row in filereader:
        combinations = create_combinations(row)
        for tup in combinations:
            if user=='Student':
                row_data = [row[1],row[2],row[3],row[4],row[5],tup[0].strip(),row[7],row[8],tup[1].strip(),row[10]]
            elif user=='Teacher':
                row_data = [row[1],row[2],row[3],tup[0].strip(),row[5],row[6],tup[1].strip(),row[8]]
            processed_data.append(row_data)
    return processed_data


with open(input_filename, 'r') as csvfile:
    filereader = csv.reader(csvfile, delimiter=',')
    sequenced_data = process_file(filereader)


with open(output_filename, mode='w+') as output_file:
    file_writer = csv.writer(output_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    file_writer.writerows(sequenced_data)

print("Done")
