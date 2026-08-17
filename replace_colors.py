import re

with open(r'C:\Users\egecr\Desktop\learn-with-Archie\styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

with open(r'C:\Users\egecr\Desktop\learn-with-Archie\new_root.txt', 'r', encoding='utf-8') as f:
    new_root = f.read().strip()

with open(r'C:\Users\egecr\Desktop\learn-with-Archie\new_dark.txt', 'r', encoding='utf-8') as f:
    new_dark = f.read().strip()

# Replace :root block
css = re.sub(r':root\s*\{[^}]+\}', new_root, css, count=1, flags=re.DOTALL)

# Replace body.dark-mode block
css = re.sub(r'body\.dark-mode\s*\{[^}]+\}', new_dark, css, count=1, flags=re.DOTALL)

with open(r'C:\Users\egecr\Desktop\learn-with-Archie\styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Done!')
