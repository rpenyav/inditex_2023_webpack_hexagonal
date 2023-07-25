# Podcast Project Test (Webpack init version)

This project was created by https://www.github.com/@rpenyav
We used webpack init.


## Steps

- Clone project.
- Install project

     ```npm install```

- Start project

     ```npm run start``` //for dev

     ```npm run build```  //for prod


- Run unit test

    ```npx test```


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