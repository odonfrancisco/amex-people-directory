## Hi!

This directory can run with or without a connection to a mongodb. Having a connection to mongodb ensures this can work offline.

I acknowledge I could've styled this much better. Not my forte though I'd enjoy taking a deep dive into properly styling a page.

I actually went through a few phases in developing this. At first I had all my pages inside the app folder until I began working on pagination and realized I needed to access the url query for the page number. To prevent using javascript on the client I switched everything over to a pages folder.

You won't believe me when I say that I actually attempted to use cookies to store the people array for each page for this to work offline... 🤦
Embarrasing, yes, and so I switched over to using a db to store all found people and display if saved.

When access to the DB is present, navigating to the person details page will query them in the DB. However, if for whatever reason there is no mongodb cnx present (simple demo purposes), the entire user object is sent via url query params. Ugly.

There's a lot of room left for desire with the styling of everything, particularly in the person details page and the pagination arrows which need to not move around every time you change pages.

I enjoyed working on this project and I'm eager for what's to come!
