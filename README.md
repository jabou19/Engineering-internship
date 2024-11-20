# retireditems
The application for Make It Good Again’s exchange stations

# Native React expo: Setup guide
This will be a guide on how to start the application on your system, I’ll start the same for every system and change it later on.

## Start (every system)
To start with, it doesn’t matter what system you have, all the first steps are the same, which is to say...

Start by downloading node.js [here](https://nodejs.org/en/download/).
It’s what’ll help your system run the JavaScript code that the application is using.
You must install the latest version from the LST part, not the Current part.
If you’re running Windows or Mac it’ll come up with an installer, in said installer remember to check off the button that more or less says “install extra programs that aren’t already in the system”. This will leave you with less of a headache later on. 
For you linux users, I’d recommend installing node.js through the package manager of your choice.
When that is done, then we’ll have to install the expo cli, which differs from system to system.

## For Windows
Firstly install the project from GitHub and place it somewhere easily accessible from your driver, for example if your drive is named C:, then the location should be something like:
```
C:\MobileApps\
```
Open up your preferred Shell, if you don’t have any or don’t know what that is Node.js should have installed PowerShell. In the shell, which should look like a terminal, write:
```
npm install -g expo-cli
```
This should install the tool to run our mobile app after that go to where you placed the app, which can be done by the command:
```
cd ~
```
followed by:
```
cd <LOCATION>
```
for example
``` 
cd /MobileApps/retireditems
```
Remember to go into the folder that the app is in. Then to start the mobile app run the commands:
```
npm install
npx expo start
```
If it nags about, “now allowing unsigned scripts” run the command:
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
When that is said and done, that should be it on the computer side, there’ll be a last section for how to run the application on your phone.

## For Linux
You’ll probably install npm at the same time but if not, remember to do that. When that is done, run the command:
```
npm install -g expo-cli
```
After that, go where the app is with cd, and if you don’t know how to do that run the commands:
```
cd ~
cd <Location>
```
e.g.
```
cd \MobileApps\retireditems
```
Remember to go into the folder that the app is in, after that run the commands:
```
npm install
npx expo start
```
And pray with all your might to your lord and saviour Richard “Milos” Stallman that it worked. That should be it on the computer side, there’ll be a last section for how to run the application on your phone.

## For Mac OS
Then open up your terminal which is located in “Utilities” where your applications are, or use Spotlight to find the terminal, after opening up the terminal, if everything is good and well, run the command:
```
npm install -g expo-cli
```
This should install the tool that’ll let you run the app. Then go to the place where you have the app in your terminal, by using the commands:
```
cd ~
cd <path to the folder>
```
Remember to go into the folder where the app is, and then start the system that’ll let you run the mobile app, run the command:
```
npm install
npx expo start
```
And that should be it on the computer side, there’ll be a last section for how to run the application on your phone.

## To run the app on the phone
To run our application, after you’ve run the command “npx expo start” successfully, you’ll have to download the app ”expo go”, and also connect to the same internet as your computer, in it I’ll have a QR code reader, scan your given QR code and presto, the app now runs (after an initial installation).


# Code editor: prerequisites
Firstly you'll need to install git while installing there'll be lots of options, that most of you don't need to touch except for: "choose default editor for git" which should be set to "visual studio code", "adjust the name of the initial branch" which should be set to "override the default" and the name should be changed to "main".

Secondly, you'll install Visual Studio code, or vscode, this will be the editor we'll be using. Just install it from their website and that's it.

Thirdly, delete the content of the project you previously installed, just to make the process easier later on.

## Vscode
When all is installed, open up vscode, then choose a theme, any theme. Then click this icon [image 1](https://puu.sh/IbJeB/8232082d98.png)<br /> 
to access extensions, where you'll want to install the extensions "ES7 React/Redux/...", "React Native Tools" and "ESLint".

Then go into the folder where the project once was, and that should be the first part.

## Git (and Github)
Start by opening up git bash and typing the commands:
```
git config --global user.name "<your name here>"
git config --global user.email "<your email here>"
```
Then go back to vscode and press the Source Control button 
[image 2](https://puu.sh/IbJFi/7e3cf406aa.png)<br />
From here, when inside the folder you'd want the project to press the "..." button and choose "clone". 

After that go back into Source Control press the "..." button choose "remote" and "add remote" then again input the GitHub URL of the project, then give it the name "origin" for ease of use later.

Then for fun and to test if it works, add something to "App.js" maybe a comment with "// "or something, in Source Control type something in the message box, usually what you've done, then press the "+" on the files you've changed and then press the tick to commit.

After that press this button: [image 1](https://puu.sh/IbKni/d82e20185b.png)<br />
choose terminal and input this command:
```
git push --set-upstream origin main
```
to set where your commits go, after that when you want to push your commits to the GitHub just go to Source Control and press ... and choose push.


## And that's it
And that should be it, I hope, just remember to "pull" every time you open up the project, just to make sure there are no problems.

## How to use Loading on screens

import { LoaderContext } from "../components/LoaderContext";
import LoadingScreen from "../components/LoadingScreen";
import useContext
Create a const to access to the global loading state and its associated setter.
 const { isLoading, setIsLoading } = useContext(LoaderContext);
 setIsLoading(true); for where to start the loading
 setIsLoading(false); where to stop the loading
 {isLoading && <LoadingScreen isLoaderShow={isLoading} />} in return for bring in LoadingScreen

# Databases and you
## How to Use Firebase Functions in React Native

Welcome to the guide on effectively using Firebase functions in your React Native app. Below, you'll find a comprehensive list of functions available in the repository, along with examples of how to use them. Let's dive in!

### Function Descriptions

Each function's purpose is briefly described to help you understand its role in your app.

```javascript
// Import functions from the repo
import {
  // ... (all imports)
} from './repo';
```

#### Retrieve Data

Retrieve data from the database using functions like `getAllCategories()` or `getCategoryById(categoryId)`.

```javascript
// Retrieve all categories
const allCategories = await getAllCategories();

// Retrieve a specific category by its ID
const category = await getCategoryById('categoryId');
```

#### Create Data

Create new records in the database using functions like `createUptainer(data)`. Refer to the function comments or documentation for parameter details.

```javascript
// Example data for a new uptainer
const newUptainerData = {
  // ... (uptainer properties)
};

// Create a new uptainer
await createUptainer(newUptainerData);
```

#### Delete Data

Remove records from the database using delete functions like `deleteCategoryById(categoryId)`.

```javascript
// Delete a category by its ID
await deleteCategoryById('categoryId');
```

#### Update Data

Modify existing data using update functions such as `updateModelById(modelId, newData)`.

```javascript
// Example updated model data
const updatedModelData = {
  // ... (updated model properties)
};

// Update a model by its ID
await updateModelById('modelId', updatedModelData);
```

#### Async Operations

Firebase operations are asynchronous. Handle async operations properly using `async/await` or `.then()` as shown in the examples above. Ensure you handle errors that might occur during these operations.

### All functions that can be called

Find more examples below on how to use various functions:

```javascript
/Create
createUptainer(data) 
createCategory(name)
createBrand(name)
createProduct(data)
createUser(email, password, name = "John Doe") //if there is no name, the name is John Doe

//Get
getAllCategories()
getCategoryById(categoryId)
getAllBrands()
getBrandById(brandId)
getAllUptainers()
getUptainerById(uptainerId)
getAllModels()
getModelById(modelId)
getAllProducts()
getAllItems()
getItemById(itemId)
getCurrentUser()

//Delete
deleteCategoryById(categoryId)
deleteBrandById(brandId)
deleteUptainerById(uptainerId)
deleteItemById(itemId)
deleteModelById(modelId)
deleteUserById //working on it

//Update
updateModelById(modelId, newData)
updateUptainerById(uptainerId, newData)
updateItemById(itemId, newData)
updateBrandById(brandId, newData)
updateCategoryById(categoryId, newData)
updateProductById(productId, newData)
updateUserData//working on it

```

### Common Mistakes and Tips

Avoid common mistakes and improve your experience with these tips:

- Double-check function parameters using provided examples and comments.
- Always handle async operations using proper error-handling mechanisms.
- Import might be wrong with another address or function that's being called.
- Calling after the wrong ID, troubleshoot by console.log it
- Collaborate and provide feedback on this guide to enhance its usefulness.


# Branching and you: the best way to avoid errors in code when lots of people code
Something important that I grievously forgot is to talk about branches, a very practical system that helps avoid code errors that might occur when more than one person is working on code and they're not coordinating.

To start a new branch and check it out you can use the following command:
```
git checkout -b <name here>
```
which is the same as:
```
git branch <name here>
git checkout <name here>
```
or just click "..." in source control press the "branch" option and choose "new branch".
To switch between branches use the code
```
git checkout <name here> 
```
and to do it in vscode click "checkout to..." and choose the branch you want.
Just a heads up, you can't branch if you have uncommitted changes, so either stash it away or commit it.

This is another important point to remember: when you switch branches, Git resets your working directory to look like it did the last time you committed to that branch. It adds, removes, and modifies files automatically to make sure your working copy is what the branch looked like on your last commit to it.

## Github merging
GitHub has a more formal way of merging branches, in "pull requests" you can create a formal merge between two branches where you'll be able to see what changes will happen. This is more used when there's a head programmer or somebody who has to check that nothing goes wrong when the merge happens. It'll probably not be very important for us now, but you can test it out if you will.


press "pull request" -> press "compare and pull request" -> choose which way it should merge (branch you want to merge into <- branch with changes you want into the first branch) -> write a comment on what's happening -> check there are no conflicts -> press "create pull request" -> and done

To merge the branches you need to press "confirm pull request" which should come up after your pull request is created. But yeah that's about it for GitHub merging.

## Manual merging
When you're done working on the branch and want to put your new changes into the main branch, or want to get some of the new features from the main branch into your branch use the following command:
```
git checkout <branch you want to merge into>
git merge <branch with changes you want into the first branch>
```
Or by pressing "merge branch..." in the source control
When that is done, if you're done with the branch use the command, to delete your old branch:
```
git branch -d <name here>
```
or in source control. And that should be it, if there are any merge conflicts then it should be easy to see what to keep and what not to keep if using vscode.
          
## General documentation
Git practices to follow: https://docs.google.com/document/d/12mwrght5QEvpEBXpcRvna5ymurbfKNVBtF0zebospcY/edit?usp=sharing
App documentation https://docs.google.com/document/d/1VijC9MfpXDLzrSM3ON6yELCc7WYxizAtOBS9lLsdJr4/edit#heading=h.c16o28oukuj

# Troubleshooting 

On Mac when running the application (using Expo start), you might receive the error: 
```
Error: EMFILE: too many open files, watch
```
To solve this, you need to install watchman:
```
brew update
brew install watchman
```

If running the app using Expo Go gives you this error: 
```
Uncaught Error: java.net.SocketTimeoutException: failed to connect to...
```
It means that you are not accessing the same IP address as your computer. 


