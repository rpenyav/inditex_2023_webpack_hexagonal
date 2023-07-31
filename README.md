# Podcast Project Test (Webpack init version)

This project was created by https://www.github.com/@rpenyav
We used webpack init.


## Steps

- Clone project.
- Install project

     ```npm install```

- Start project

     ```npm run start``` //for dev

     ```npm run build```  //for prod (IMPORTANT, execute this to create /dist)


- Run unit test

    ```npm test```


## Description and technical guide: redux stored states explanation

We use the global Redux store for the application.

UseDispatch hook allows us to access the Redux global store dispatch from functional components and send the action to the store.
The rootReducer is the main reducer that combines all the individual reducers into one.


> export type AppDispatch = typeof store.dispatch;

Exports a new AppDispatch type, which is equal to the global store dispatch type.
This will allow us to use this type to type specific dispatches in the application.



> export const useAppDispatch = () => useDispatch<AppDispatch>();

Exports a custom useAppDispatch hook, which uses the "react-redux" useDispatch hook but with type AppDispatch.
This will allow us to use this hook instead of useDispatch in components to get the typed dispatch.


### Action REDUX (principal list)

The action **musicAlbumsActions** file defines two functions related to managing asynchronous actions in the application: **fetch and update.**

**fetchMusicAlbum**
This is the asynchronous action created using the Redux Toolkit's **createAsyncThunk**. Represents the process of getting data from podcasts. When this action is called, it checks if more than 24 hours have passed since the data was last updated. If this time has elapsed, the action makes a request to the API specified by apiUrl, which is expected to return a dataset in JSON format. The received data is transformed into a more manageable format and is stored both in the previously configured IndexedDB and in the Redux state using the **updateMusicAlbums** action.

Function **setupIndexedDB** takes care of setting up and opening an IndexedDB database called 'podcastDatabase'. This is an in-browser database that allows you to store large amounts of structured data, and is especially useful when you need to store data locally. If the database does not yet exist, the upgrade method is called to create a store object named 'podcasts' in the database. We use it for data persistence, in this project it may be excessive but I need to capture the idea.

### Reducer REDUX (principal list)

This file defines the "slice" in Redux and represents a part of the application state and contains both the initial state and the actions and reducers associated with that state and allows to manage information related to podcasts in a centralized and predictable way.

The state contains three properties:

**list**: A list of objects of type Podcast, representing the available podcasts.

**last24Hours**: A number that stores the time of the last podcast request. This is used to determine if podcasts need to be re-requested or if they can be loaded from the current state without making an API request.

**isLoading**: A boolean value indicating whether or not podcast data is being loaded.

The slice also defines the updateMusicAlbums reducer, which is responsible for updating the state when new podcast data is received. This reducer is called when the updateMusicAlbums action is fired with the new podcast data and the time of the last request. This reducer also exports the updateMusicAlbums action so that it can be used elsewhere in the application.

### List Page View

The **ListView** component is a page that displays a list of podcasts with the option to filter them by title or author. It also includes a pagination to navigate between the different results pages.

It is made up of hooks, effects, and states, rendering the content for the view.

The component uses various states to store information, such as the filter text, the current page number, the number of records per page, and whether or not the data is loaded. It also gets the list of podcasts from the global Redux state using the useSelector hook.

The useEffect hook is used to load the podcast data when the component is mounted. To do this, it dispatches the fetchMusicAlbum action. It also uses useEffect to update the state of thisLoaded when the component is initially mounted.

Various functions that handle events such as search filter changes and paging actions are also defined. These functions update component states to reflect changes in the user interface.

Renders the filtered and paginated list of podcasts. Use the **filteredAlbums** function to get the podcasts that match the search filter. It then uses currentRecords to get the podcasts to display on the current page and renders the UI using JSX.

Displays a search box where the user can filter podcasts by title or author.
Then, it shows the list of podcasts with their title, author and image in the form of cards. It also shows the pagination to allow the user to navigate between the different pages of results.

## Documentation

The project use the **REDUX** state pattern in the most updated version, that is, the **Redux Toolkit**.
 
   - Redux uses a root-reducer where all the reducers used are grouped.
   - All the states layer is abstracted in a */redux* directory, from my point of view it is more practical.

The routing has been created with **React Router Dom v6**.

We have been used **Bootstrap** library to apply the responsive grid and also **Sass** as a preprocessor, although no variables have been applied because the project did not require too much focus on appearance.

A layout file has been created to implement it in all the pages with the common elements and components.

Environment files have been created for local and production.

An **.eslintrc** file has been created that controls whether the build fails if the code doesn't match that **SOLID** part. However, disable has been applied to the *"any"* application rule out of prevailing necessity.

Modified **tsconfig.json** file to include **/test** directory

The tests have been carried out using **Jest** and the **mock redux toolkit**.
The most basic and primary tests have been written about the flow of the application without taking into account the coverage, the existing tests give good information about the operation.


There exist some tags into repo.

## Contact

For queries, please contact to rafa@rafapenya.com

The code of this project was tested by esLint and supervised under SOLID