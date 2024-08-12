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

Once I had the reduce method working for grouping the presidents, I started working on the next two functions which were firstly the one that accumulated the accounting for each party, which was essentially taking the length of every value from each political party. And finally a general function for having in a block the rest of them so they could be executed in the useEffect.

The missing function here was the one that was going to make use of the rest and would gives the sorted data to be displayed according to what was expected and done with the other three functions. I was testing each function worked so I used a state to test each one of them and see the returning value but at the end I ended up using just the final state of the sorted data.

I was finished with the first task (2.a), so I realized the following ones would be probably a copy of what was already working for the presidents with some variations, so I needed this to be in its own component for presidents so the code would be cleaner.

Once I passed this to a component I copied the file and started consuming the endpoint for touristic attraction (2.b), then I repeated some of the process: I created the second service, duplicated the file and made changes as needed. Then I saw that most of the touristic attractions had "null" as department but still had its id, so I decided to created a service to get the department by the id and now we have the actual depas' names.

The third exercise (2.c) seemed to be a bit of the same as in the second, but that is going to substantially depend on the way the API is structuring data for airports. For this one I recycled some code from PresidentsByParty, it had to do with the groupByParty function, at the end it was a mixture from both the first and second components.

For the final one I need to add the region based on the id (since most are "null") and also the type to the component mentioned in the preceding paragraph. So I'm going to duplicate that file and use it as foundation too. This exercise (2.d) was a mixture of all the others. Here I used useMemo to prevent unnecessary re-renders and for optimization. Here's something I really want to highlight **and is the fact that as the API doesn't bring the actual data for Region Names (in Airport) and Department Name (in Attraction) but the API only bring their IDs I had to make more than one request to fulfill that data and for the sake of the UI in detriment of the UX something that shows up as a time consuming operation.** I highly recommend to use the build for production since in the dev server React usually executes extra calls of a render function as well as effect hooks in StrictMode.

After all this I needed to make the tabular UI, which for me is where the magic happens because it's the moment when logic seems to mix with art. So I started creating another component for the logic that would handle every tab and its content. Once it was done, I had to fix some bugs that came with the modularization of components. But now every time you click on the label of each entity there'll be the data as it corresponds.

Now that I'm fully immersed in CSS I needed to remake the hierarchy of the titles for them to be more intuitive. I wanted to get an image of a snowy forest to match the color palette I've chosen for the background.I started using CSS variables so I could keep the same padding along the whole project. I created some columns for displaying the whole info in a better way, but as I needed it to be displayed as a table I had to get rid of that. I believe the accordion could have been done in a way better way, but by the time I was running out of time.

Now it was time to show the counting of the data. So what I had in mind was calling the length of the entities.

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
   In any version, you will likely need to use `sudo`

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
