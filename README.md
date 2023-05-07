Similarity Check
================

Similarity Check is a full-stack web application built with NextJS 13, TypeScript, TailwindCSS, and Planetscale database. It is a complete API service website that allows users to create and revoke API keys, and use them to access sensitive routes that are rate-limited for security purposes.

Features
--------

*   NextJS 13 Client & Server Components
*   Rate limiation for API routes
*   Middleware protection of sensitive routes
*   light / dark mode
*   Authentication using JWT from NextAuth
*   TailwindCSS
*   A complete API key system to create & revoke user keys

Installation
------------

To install Similarity Check, follow these steps:

1.  Clone the repository to your local machine using the following command:
    
	`git clone https://github.com/richardgnwan/similarity-check.git`
    
2.  Install the dependencies using the following command:
    
	`npm install` or `yarn install`
    
3.  Create a `.env` based on `.env.example` file in the root directory of the project
    
4.  Start the application using the following command:
    
	arduinoCopy code
    
	`npm run dev` or `yarn dev`
    
5.  Access the application by visiting [http://localhost:3000](http://localhost:3000) in your web browser.
    

Usage
-----

To use Similarity Check, follow these steps:

1.  Sign in to the website using Google Account.
2.  Log in to your account using your email address and password.
3.  Create an API key by clicking on the "Create Key" button and providing a name for your key.
4.  Copy the API key and use it to access the API routes.
5.  To revoke an API key, click on the "Revoke" button next to the key.