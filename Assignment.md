# Evaluation Assignment

Create a web based SPA (single page application) for displaying users and their vehicles, and mapping the vehicle locations on a map.

### The app consists of two main sections:
* List view displays user data and vehicle data
* Map view plots selected vehicles on a map

### The application works with the following two methods:
* Get list - retrieves a list of users and their vehicles
    ```
    GET http://mobi.connectedcar360.net/api/?op=list
    ```
* Get vehicle locations gets the current position of user vehicles
    ```
    GET http://mobi.connectedcar360.net/api/?op=getlocations&userid={userid}
    ```

### The application should support the following workflow:
* When the application is opened, it should display the list of users in the list view.
    * The list item should also include the number of user vehicles and may contain other available
information that makes it easier to work with the data.

*  When a user item from the list is selected:
    * The list of user vehicles is displayed and
    * The user vehicles are plotted on the map.
*  The map should pan and zoom to display the selected vehicles, if necessary
*  The color of the marker should match the color returned in the vehicle.color attribute
    * There should be a way to go back and choose another user from a list
*  When a vehicle is selected on the map:
    * The map view should highlight the selected vehicle
    * a custom callout (tooltip / overlay) should be displayed that shows vehicle image, vehicle name,
current address (not present in data; needs to be retrieved by lat, long, i.e. reverse geocoding)

*  When a vehicle item is selected on the list:
    * The map view should pan to center on the selected vehicle
    * The map should highlight the selected item and display the information callout as when selecting
the item on the map

## Additional requirements:
*  Ignore the HTTP cache headers returned by the API. The user and vehicle data should be cached for 5
minutes, the vehicle location data should be cached for 30 seconds, i.e. when quickly switching between
items the data should not be retrieved again if the cache is not expired.
*  Automatically reload vehicle positions for the plotted vehicles every minute
*  Display a human-readable error message if any occur

## Remarks
* Use a modern JavaScript development environment.
* For many projects, Scope relies on Angular with TypeScript, and uses OpenLayers for mapping, but you may
use other frameworks
* The application should run on all major modern browsers: Chrome, Firefox, Edge, Safari, IE 11, etc. Recent of the
browsers need to be supported, i.e. IE9 and IE10 support is not a requirement
* Use browser facilities for persistent data storage, e.g. local storage
* You may use public OpenStreetMaps map tiles sources, and publicly available OpenStreetMaps services for
reverse geocoding (http://wiki.openstreetmap.org/wiki/Nominatim)
Desired non-functional attributes
* Clean code and logic will be highly valued
* Well-considered project structure, consistent with chosen framework conventions will be highly valued
* Attention paid to UI will be appreciated

## Submitting the assignment
The completed project should be made available in a public git repository - Github, Bitbucket, or other.