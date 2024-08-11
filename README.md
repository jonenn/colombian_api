# Exercise-00

# Problem Definition Summary

**Objective**: Create a dashboard using data from public APIs and visualization libraries.

## 1. Data Source

Use the API from [https://api-colombia.com/](https://api-colombia.com/) to retrieve information on:

-  Presidents
-  Airports
-  Tourist Attractions

## 2. Processing

-  **Presidents**:

   -  Group data by political party.
   -  Return a structure (array of objects or object of objects) sorted by the count of elected presidents in descending order.

-  **Tourist Attractions**:

   -  Group data by department and city.
   -  Return a structure with the field values and counts of attractions.

-  **Airports**:

   -  Group data by department and city.
   -  Return a structure with the field values and counts of airports.

-  **Airports (Detailed)**:
   -  Group data by region, department, city, and type.
   -  Return a detailed structure with field values and counts, including a visual representation of this grouping.

## 3. Visualization

-  **React Application**:

   -  Create a React app with a single route `/colombia_dash`.

-  **Tabs Component**:

   -  Implement a tabbed component to view different entities (Presidents, Airports, Tourist Attractions).

-  **Entity Views**:
   -  Each view should include:
      -  A component showing the count of records for each entity.
      -  A component displaying all records for each entity.
      -  Components for each processing function as specified in the Processing section.
      -  A component to show the API response time for data requests.

**Design Note**: The layout and design of each component are up to the participant.
