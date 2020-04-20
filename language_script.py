#!/usr/bin/env python3

import sys
import csv
import codecs
import os

input_directory = sys.argv[1]
excel_sheet = sys.argv[2]
destination = sys.argv[3]

languages = []
files = ["index.html", "about.html", "contact.html"]

with open(excel_sheet, 'r') as csvfile:
  csv_reader = csv.reader(csvfile, delimiter=',')
  is_first_line = True
  for row in csv_reader:
    if is_first_line:
      for i in range(len(row)-1):
        languages.append(dict())
      is_first_line = False
    
    for i in range(1, len(row)):
      languages[i-1][row[0]] = row[i]

for language_dict in languages:
  lang = language_dict['LANGUAGE']
  print("Generating files for {}".format(lang))
  if not os.path.isdir("{}/{}".format(destination, lang)):
    os.makedirs("{}/{}".format(destination, lang))
  for html_file in files:
    print(html_file)
    f = codecs.open("{}/{}".format(input_directory, html_file), "r")
    html_string = f.read()
    for key, val in language_dict.items():
      html_string = html_string.replace("{{%s}}" % key, val)
    with open("{}/{}/{}".format(destination, lang, html_file), "w") as f:
      f.write(html_string)
