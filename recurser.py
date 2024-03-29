t = '''

text
text2
text3
sh-row
text
sh-ytb
Youtube
/sh-ytb
ANANAS
sh-col
sh-ytb
/sh-ytb
/sh-col
sh-col
Text
/sh-col
sh-col
sh-ytb
/sh-ytb
/sh-col
text
/sh-row
end-text
'''



t = '''
text-start
🔘
sh-row-1
INSIDE
/sh-row-1
🔘
🔘
🔘
sh-row-2
INSIDE-2
INSIDE-22
/sh-row-2
🔘
🔘
🔘
🔘
sh-row
sh-col
🟣 COL-1
/sh-col
sh-col
🟣 COL-2
/sh-col
sh-col
🟣 COL-3
/sh-col
/sh-row
🔘
text-end
'''






names = [
    'sh-row',
    'sh-row-1',
    'sh-row-2',
    'sh-col',
    'sh-ytb',
]

import re

all_n = '|'.join(names)

pattern = f'/?({all_n})$'
test_string = 'abyss'
result = re.match(pattern, test_string)


def recursor(rows, index, name=''):
    print()
    print('🔮 NameBlock: ', name, 'index: ', index)
    items = []
    skip_to_child_index = None
    index_return = None
    for idx, row in reversed(list(enumerate(rows))[:index+1]):
        print('🥎 idx: ', idx, '\t', row)


        if skip_to_child_index and idx > skip_to_child_index:
            print('🏹 Skip', idx)
            print() 
            continue
            
        match = re.match(pattern, row)
        if match:
            print('🏓 match: ', match[1], match[0])
            if '/' in match[0]:
                items_child, index_child = recursor(rows, idx-1, match[1])
                print('🛍 itemsParent: ', items)
                print('🛍 itemsChild: ', items_child)
                print('🛍 index_child: ', index_child)
                print()
                
                items = items + items_child
                skip_to_child_index = index_child
                
            else:
                index_return = idx-1
                break
        else:
            items.append(row)
    
    items = [f'- {item}' for item in items]
    items = [f'< {name.upper()} 🔹'] + items + [f'</{name.upper()} 🔹']
    print('ITEMS', items)
    return items, index_return

def rootParser(rows):
    items, index = recursor(rows, len(rows)-1)

    items = list(reversed(items))
    print()
    print('🪀 Results:', type(items))
    [print(item) for item in items]
    
    return items


rows = t.strip().split('\n')


_b = [print(idx, ': ', value) for idx, value in enumerate(rows)]
print()

print('len(rows): ', len(rows))
results = rootParser(rows)



