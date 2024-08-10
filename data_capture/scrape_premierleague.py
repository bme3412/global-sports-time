import pandas as pd
from bs4 import BeautifulSoup
import requests
from datetime import datetime, timedelta
import re

def fetch_and_parse_html(url):
    matches = []
    current_date = None
    
    print(f"Fetching data from: {url}")
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    for element in soup.find_all(['h4', 'div']):
        if element.name == 'h4' and 'fixres__header2' in element.get('class', []):
            current_date = element.text.strip()
        elif element.name == 'div' and 'fixres__item' in element.get('class', []):
            match = element.find('a', class_='matches__item')
            if match:
                team1 = match.find('span', class_='matches__participant--side1').text.strip()
                team2 = match.find('span', class_='matches__participant--side2').text.strip()
                time = match.find('span', class_='matches__date').text.strip()
                
                sky_sports_logo = match.find('img', alt='On Sky')
                on_sky_sports = 'Yes' if sky_sports_logo else 'No'

                matches.append({
                    'Date': current_date,
                    'Team 1': team1,
                    'Team 2': team2,
                    'Time': time,
                    'On Sky Sports': on_sky_sports
                })

    return matches

def parse_date(date_str):
    # Remove ordinal suffixes (st, nd, rd, th)
    date_str = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', date_str)
    
    # Parse the date
    date = datetime.strptime(date_str, "%A %d %B")
    
    # Assign the correct year (2024 for Aug-Dec, 2025 for Jan-May)
    if date.month >= 8:
        date = date.replace(year=2024)
    else:
        date = date.replace(year=2025)
    
    return date

# Set the correct date range for the 2024-2025 Premier League season
start_date = datetime(2024, 8, 16)
end_date = datetime(2025, 5, 25)

# Generate URLs for each month of the 2024-2025 season
current_date = start_date.replace(day=1)  # Start from the first of the month
urls = []

while current_date <= end_date:
    url = f"https://www.skysports.com/premier-league-fixtures/{current_date.year}-{current_date.month:02d}"
    urls.append(url)
    current_date += timedelta(days=32)
    current_date = current_date.replace(day=1)

# Fetch and parse HTML for each month
all_matches = []
for url in urls:
    all_matches.extend(fetch_and_parse_html(url))

# Convert to DataFrame
df = pd.DataFrame(all_matches)

# Print column names
print("Column names:", df.columns.tolist())

# Convert date strings to datetime objects for sorting
df['Date'] = df['Date'].apply(parse_date)

# Sort the DataFrame by date
df = df.sort_values('Date')

# Remove duplicates based on available columns
duplicate_subset = ['Date'] + [col for col in ['Team 1', 'Team 2'] if col in df.columns]
df = df.drop_duplicates(subset=duplicate_subset, keep='first')

# Filter matches from August 16, 2024 to May 25, 2025
df = df[(df['Date'] >= start_date) & (df['Date'] <= end_date)]

# Convert dates back to string format for CSV
df['Date'] = df['Date'].dt.strftime('%A %d %B %Y')

# Save to CSV
df.to_csv('schedule_premierleague.csv', index=False)

print("Data has been saved to 'schedule_premierleague.csv'")
print(df)