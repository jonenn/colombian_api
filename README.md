# Exercise-00: Dashboard Creation with Public APIs

## Problem Definition Summary

**Objective**: Create a dashboard using data from public APIs and visualization libraries.

### 1. Data Source

Use the API from [https://api-colombia.com/](https://api-colombia.com/) to retrieve information on:

-  **Presidents**
-  **Airports**
-  **Tourist Attractions**

### 2. Processing

#### **Presidents**:

-  Group data by political party.
-  Return a structure (array of objects or object of objects) sorted by the count of elected presidents in descending order.

#### **Tourist Attractions**:

-  Group data by department and city.
-  Return a structure with the field values and counts of attractions.

#### **Airports**:

-  Group data by department and city.
-  Return a structure with the field values and counts of airports.

#### **Airports (Detailed)**:

-  Group data by region, department, city, and type.
-  Return a detailed structure with field values and counts, including a visual representation of this grouping.

### 3. Visualization

#### **React Application**:

-  Create a React app with a single route `/colombia_dash`.

#### **Tabs Component**:

-  Implement a tabbed component to view different entities (Presidents, Airports, Tourist Attractions).

#### **Entity Views**:

Each view should include:

-  A component showing the count of records for each entity.
-  A component displaying all records for each entity.
-  Components for each processing function as specified in the Processing section.
-  A component to show the API response time for data requests.

**Design Note**: The layout and design of each component are up to the participant.

### Process Explanation

First I used Vite (build tool) as an alternative for Webpack (CRA), which will make my work easier making use of the HRM (Hot Module Replacement), just to give an example, and basically faster (developer experience), besides of it I could have just simply used CRA. Then I set up a React.js template given by Vite, which gives me minimal tools I need to start working with React. But before it all I connected my repo to Git and Github so I could keep everything under control and sent my first commit to the public repo.

After all I added some directories and went for a simple folder structure. It is a good practice to use a CSS normalizer (such as a library, but in this case a custom CSS file), the idea is for it to give consistency across all browsers and start on it all from the same foundation. I also wrote the Documentation part requested for the challenge.

Once the initial setup was done I started reading the documentation for the API, looking for the hot spots and generalities around Swagger, then I used Postman (or Thunder) to give it a try. Since is a public API I'm not going to need an environmental variable, so I just put it within a service (a good practice) for consuming the API.

The next thing after consuming the API and making sure the service created (getPresidents) was fetching the data correctly, I needed to sort each president by their political party, so I did know I needed an accumulator which meant using reduce (an array method). Then I realized there was this differentiation between a capitalized party so I made some changes so they would be the same when classified.

### Documentation

#### Step-by-Step Guide to Deploy and Start

1. **Clone the Repository**

   Clone the Repository:
   Use Git to clone the repository from GitHub to your local machine. Replace `<repository-url>` with the URL of the GitHub repository.

   ```bash
   git clone <repository-url>
   ```

   Navigate to the Project Directory:
   Change into the project directory created by the clone command.

   ```bash
   cd <repository-name>
   ```

2. **Install Project Dependencies**
   Install Dependencies:
   Use npm to install the necessary dependencies listed in package.json.
   ```bash
   npm install
   ```
3. **Build the Project for Production**
   Build the Project:
   Create a production-ready version of the project. This command generates the build files in the dist directory.

   ```bash
   npm run build
   ```

   The dist folder will now contain the optimized assets for deployment.

4. **Serve the Production Build Locally**
   To test the production build locally, you need to serve it using a static file server.

   -  **Using serve**
      Install serve Globally (if not already installed):

      ```bash
      npm install -g serve
      ```

      Serve the Production Build:
      Navigate to the project directory and serve the dist folder.

      ```bash
      serve -s dist
      ```

      Access the Project:
      Open your web browser and go to http://localhost:5000 (or the port specified) to view the locally served production build.

   -  **Using http-server**
      Install http-server Globally (if not already installed):

      ```bash
      npm install -g http-server
      ```

      Serve the Production Build:
      Navigate to the project directory and serve the dist folder.

      ```bash
      http-server dist
      ```

      Access the Project:
      Open your web browser and go to http://localhost:8080 (or the port specified) to view the locally served production build.

5. **Run the Development Server (optional)**
   For development purposes, you might want to run the development server which provides hot reloading and other development features.
   Start the Development Server:
   Run the development server provided by Vite.
   ```bash
   npm run dev
   ```
   Access the Project:
   Open your web browser and go to http://localhost:5173 (default port for Vite) to see the development build.
