import json
import pycountry

# Load the city list
with open('city.list.json', 'r', encoding='utf-8') as f:
    cities = json.load(f)

# Function to convert country code to full country name
def get_country_name(code):
    try:
        return pycountry.countries.get(alpha_2=code).name
    except:
        return code  # fallback if not found

# Format: "City, Country Name"
city_names = sorted(set(
    f"{city['name']}, {get_country_name(city['country'])}"
    for city in cities
))

# Save to JSON
with open('cities.json', 'w', encoding='utf-8') as f:
    json.dump(city_names, f, indent=2, ensure_ascii=False)
