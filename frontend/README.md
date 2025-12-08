# Slideshow narrowcasting front-end
This code represents the front-end/client view of the application.  
### Setting up
Clone this repository and run the obligatory `npm install`.
After this you will need to create an `.env` file, create this at the root of your project.
The `.env` contains configuration for the project, and allows us to setup multiple files for different run/build "modes", say one for developing (the normal `.env`), one for staging (an `.env.staging` file) and one for live (you guessed it, a `.env.live` file). During the build npm will automatically use the `.env` contents of the targeted "mode" and thus allows us to have multiple configs at once.  
Your `.env` files should always containt a `VITE_API_URL=<server-location>` variable. Where the `<server-location>` is the target machine the back-end server is running on. An example of this:
```dotenv
#.env
VITE_API_URL=http://localhost:8080/
```  
After this you can run `npm run dev` with no further issues.

### Icon Pack
We use react-icons for our icons, we do this through their extension.  
A list of the icons and names can be found here:  
https://react-icons.github.io/react-icons/icons/