import re

with open(r'C:\Users\egecr\Desktop\learn-with-Archie\styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Button system replacements
replacements = [
    # Primary button - use majestic gradient
    (r'\.btn-primary\s*\{[^}]+\}', 
     '.btn-primary {\n  background: var(--gradient-majestic);\n  color: var(--text-inverse);\n  box-shadow: 0 4px 0 var(--accent-deep), 0 0 20px rgba(255, 215, 0, 0.2);\n}'),
    
    (r'\.btn-primary:hover:not\(:disabled\)\s*\{[^}]+\}',
     '.btn-primary:hover:not(:disabled) {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.35), 0 4px 12px rgba(11, 19, 43, 0.2);\n  filter: brightness(1.08);\n}'),
    
    (r'\.btn-primary:active:not\(:disabled\)\s*\{[^}]+\}',
     '.btn-primary:active:not(:disabled) {\n  transform: translateY(1px);\n  box-shadow: 0 2px 0 var(--accent-deep), 0 0 12px rgba(255, 215, 0, 0.2);\n}'),
    
    # Secondary button
    (r'\.btn-secondary:hover:not\(:disabled\)\s*\{[^}]+\}',
     '.btn-secondary:hover:not(:disabled) {\n  background: var(--hover-bg);\n  border-color: var(--accent);\n  box-shadow: var(--shadow-md), 0 0 16px rgba(255, 215, 0, 0.15);\n  transform: translateY(-1px);\n}'),
    
    # Outline button - use gold
    (r'\.btn-outline\s*\{[^}]+\}',
     '.btn-outline {\n  background: transparent;\n  color: var(--accent-deep);\n  border: 2px solid var(--accent);\n}'),
    
    (r'\.btn-outline:hover:not\(:disabled\)\s*\{[^}]+\}',
     '.btn-outline:hover:not(:disabled) {\n  background: var(--gradient-gold-soft);\n  transform: translateY(-1px);\n  box-shadow: var(--shadow-gold);\n}'),
    
    (r'\.btn-outline:active:not\(:disabled\)\s*\{[^}]+\}',
     '.btn-outline:active:not(:disabled) {\n  transform: translateY(0);\n  background: var(--gradient-gold);\n  color: var(--text-inverse);\n}'),
    
    # Ghost button
    (r'\.btn-ghost:hover:not\(:disabled\)\s*\{[^}]+\}',
     '.btn-ghost:hover:not(:disabled) {\n  background: var(--hover-bg);\n  color: var(--accent-deep);\n}'),
    
    # Danger button - keep but with navy/gold accent
    (r'\.btn-danger\s*\{[^}]+\}',
     '.btn-danger {\n  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);\n  color: #fff;\n  box-shadow: 0 4px 0 #991b1b;\n}'),
    
    # Warning button - use gold gradient
    (r'\.btn-warning\s*\{[^}]+\}',
     '.btn-warning {\n  background: var(--gradient-gold);\n  color: var(--navy-900);\n  box-shadow: 0 4px 0 var(--gold-700);\n}'),
    
    (r'\.btn-warning:hover:not\(:disabled\)\s*\{[^}]+\}',
     '.btn-warning:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.4), 0 4px 12px rgba(196, 150, 0, 0.3);\n  filter: brightness(1.05);\n}'),
    
    (r'\.btn-warning:active:not\(:disabled\)\s*\{[^}]+\}',
     '.btn-warning:active:not(:disabled) {\n  transform: translateY(1px);\n  box-shadow: 0 2px 0 var(--gold-700);\n}'),
    
    # Info button - use navy gradient
    (r'\.btn-info\s*\{[^}]+\}',
     '.btn-info {\n  background: var(--gradient-primary);\n  color: #fff;\n  box-shadow: 0 4px 0 var(--navy-700);\n}'),
    
    (r'\.btn-info:hover:not\(:disabled\)\s*\{[^}]+\}',
     '.btn-info:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(44, 74, 122, 0.4), 0 4px 12px rgba(11, 19, 43, 0.2);\n  filter: brightness(1.05);\n}'),
    
    (r'\.btn-info:active:not\(:disabled\)\s*\{[^}]+\}',
     '.btn-info:active:not(:disabled) {\n  transform: translateY(1px);\n  box-shadow: 0 2px 0 var(--navy-700);\n}'),
    
    # Focus visible - use gold focus ring
    (r'\.btn:focus-visible\s*\{[^}]+\}',
     '.btn:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px var(--focus-ring), 0 0 0 6px rgba(255, 215, 0, 0.2);\n}'),
    
    # Dark mode button adjustments
    (r'body\.dark-mode\s*\.btn-primary:hover:not\(:disabled\)\s*\{[^}]+\}',
     'body.dark-mode .btn-primary:hover:not(:disabled) {\n  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.4), 0 4px 12px rgba(0,0,0,0.3);\n}'),
    
    (r'body\.dark-mode\s*\.btn-secondary:hover:not\(:disabled\)\s*\{[^}]+\}',
     'body.dark-mode .btn-secondary:hover:not(:disabled) {\n  background: var(--hover-bg);\n  border-color: var(--accent-light);\n  box-shadow: var(--shadow-md), 0 0 16px rgba(255, 215, 0, 0.2);\n}'),
    
    (r'body\.dark-mode\s*\.btn-outline:hover:not\(:disabled\)\s*\{[^}]+\}',
     'body.dark-mode .btn-outline:hover:not(:disabled) {\n  background: var(--gradient-gold-soft);\n  box-shadow: var(--shadow-gold);\n}'),
    
    (r'body\.dark-mode\s*\.btn-ghost:hover:not\(:disabled\)\s*\{[^}]+\}',
     'body.dark-mode .btn-ghost:hover:not(:disabled) {\n  background: var(--hover-bg);\n  color: var(--accent-light);\n}'),
    
    (r'body\.dark-mode\s*\.btn-danger:hover:not\(:disabled\)\s*\{[^}]+\}',
     'body.dark-mode .btn-danger:hover:not(:disabled) {\n  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4), 0 4px 12px rgba(0,0,0,0.3);\n}'),
    
    (r'body\.dark-mode\s*\.btn-warning:hover:not\(:disabled\)\s*\{[^}]+\}',
     'body.dark-mode .btn-warning:hover:not(:disabled) {\n  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.45), 0 4px 12px rgba(0,0,0,0.3);\n}'),
    
    (r'body\.dark-mode\s*\.btn-info:hover:not\(:disabled\)\s*\{[^}]+\}',
     'body.dark-mode .btn-info:hover:not(:disabled) {\n  box-shadow: 0 8px 24px rgba(77, 123, 198, 0.4), 0 4px 12px rgba(0,0,0,0.3);\n}'),
    
    (r'body\.dark-mode\s*\.btn:focus-visible\s*\{[^}]+\}',
     'body.dark-mode .btn:focus-visible {\n  box-shadow: 0 0 0 3px var(--focus-ring), 0 0 0 6px rgba(255, 215, 0, 0.3);\n}'),
]

for pattern, replacement in replacements:
    css = re.sub(pattern, replacement, css, flags=re.DOTALL)

# Replace remaining hardcoded green/blue/yellow references in the rest of the file
# These are scattered throughout - replace common patterns
color_replacements = [
    (r'var\(--green\)', 'var(--accent)'),
    (r'var\(--green-dark\)', 'var(--accent-deep)'),
    (r'var\(--blue\)', 'var(--primary-light)'),
    (r'var\(--yellow\)', 'var(--accent)'),
    (r'var\(--red\)', 'var(--error)'),
    (r'rgba\(88,\s*204,\s*2', 'rgba(255, 215, 0'),  # green rgb
    (r'rgba\(28,\s*176,\s*246', 'rgba(77, 123, 198'),  # blue rgb
    (r'rgba\(255,\s*200,\s*0', 'rgba(255, 215, 0'),  # yellow rgb
    (r'rgba\(255,\s*75,\s*75', 'rgba(239, 68, 68'),  # red rgb
    (r'#58cc02', 'var(--accent)'),
    (r'#46a302', 'var(--accent-deep)'),
    (r'#1cb0f6', 'var(--primary-light)'),
    (r'#ffc800', 'var(--accent)'),
    (r'#ff9600', 'var(--accent-dark)'),
    (r'#ff4b4b', 'var(--error)'),
    (r'#cc3a3a', '#991b1b'),
    (r'#cc8800', 'var(--gold-700)'),
    (r'#5b21b6', 'var(--navy-700)'),
    (r'#7c3aed', 'var(--navy-600)'),
    (r'#f0fbd8', 'var(--gold-100)'),
    (r'#d7ffb8', 'var(--success-bg)'),
    (r'#fff3d6', 'var(--warning-bg)'),
    (r'rgba\(88,\s*204,\s*2,\s*0\.1\)', 'rgba(255, 215, 0, 0.1)'),
    (r'rgba\(88,\s*204,\s*2,\s*0\.15\)', 'rgba(255, 215, 0, 0.15)'),
    (r'rgba\(88,\s*204,\s*2,\s*0\.2\)', 'rgba(255, 215, 0, 0.2)'),
    (r'rgba\(88,\s*204,\s*2,\s*0\.3\)', 'rgba(255, 215, 0, 0.3)'),
    (r'rgba\(88,\s*204,\s*2,\s*0\.4\)', 'rgba(255, 215, 0, 0.4)'),
    (r'rgba\(88,\s*204,\s*2,\s*0\.5\)', 'rgba(255, 215, 0, 0.5)'),
]

for pattern, replacement in color_replacements:
    css = re.sub(pattern, replacement, css)

with open(r'C:\Users\egecr\Desktop\learn-with-Archie\styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('All button and color replacements done!')

