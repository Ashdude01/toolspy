import pandas as pd

# Read the existing CSV file
df = pd.read_csv('toolspy-active-tools-schedule.csv')

# Create a new CSV file with proper formatting
df.to_csv('toolspy-active-tools-inventory.csv', index=False, encoding='utf-8')

print('CSV file created successfully!')
print(f'Total tools in inventory: {len(df)}')
print(f'Active tools: {len(df[df["Status"] == "Active"])}')
print(f'Featured tools: {len(df[df["Featured"] == "Yes"])}')
print(f'Categories: {df["Category"].nunique()}')

# Display category breakdown
print('\nCategory Breakdown:')
category_counts = df['Category'].value_counts()
for category, count in category_counts.items():
    print(f'  {category}: {count} tools')

# Display featured tools
print('\nFeatured Tools:')
featured_tools = df[df['Featured'] == 'Yes']['Tool Name'].tolist()
for i, tool in enumerate(featured_tools, 1):
    print(f'  {i}. {tool}')