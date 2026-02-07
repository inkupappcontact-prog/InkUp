import xml.etree.ElementTree as ET
import sys

sys.stdout.reconfigure(encoding='utf-8')

file = sys.argv[1]
tree = ET.parse(file)
root = tree.getroot()
ns = {'text': 'urn:oasis:names:tc:opendocument:xmlns:text:1.0'}
for p in root.findall('.//text:p', ns):
    if p.text:
        print(p.text)
