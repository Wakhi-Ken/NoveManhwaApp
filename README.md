Ken's Book Finder { wakhi-ken.tech }
Description
Ken's Book Finder is a simple web app to help you search for books by title or author. It fetches book information from the Open Library and shows details like the title, author, publication year, cover image, and more.

Features
Search books by title or author
View book details, including authors, publication year, and a description
Responsive design for mobile and desktop

How to Use
Open the app in your web browser.
Type a book title or author name into the search box.
Click the "Search" button.
Browse the list of books and click on a book to see more details.

Technologies Used
HTML
CSS
JavaScript
Open Library API

Deployment Steps

Access Web Servers
-Log in to Web01 and Web02 using SSH.
Clone the Project:
On both Web01 and Web02, clone your project from GitHub.
Create Application Directory
-Make a new directory for your app (e.g., /var/www/bookfinder).
Move Files
-Move all files from the cloned project to the new directory.
Install Dependencies
-Install any necessary software (Nginx) on both servers, but as we installed Nginx in mine, I did not need to install it again.
Configure Nginx
-Set up Nginx to serve your application from the directory you created.
Test Nginx Configuration
-Check the Nginx configuration for errors.
Restart Nginx
-Restart the Nginx service to apply changes.
Access Load Balancer
-Log in to the load balancer server (Lb01).
Install Load Balancer Software
-Install Nginx on the load balancer.
Configure Load Balancer
-Set up Nginx to distribute traffic between Web01 and Web02.
Test Load Balancer Configuration
-Check the load balancer configuration for errors.
Restart Load Balancer
-Restart Nginx on the load balancer.
Test the Application
-Open a web browser and access the app through the load balancer's IP address.. e.g. (_____.tech)
Verify Load Balancing
-Refresh the page multiple times to ensure requests are balanced between servers.
