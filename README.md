# Frontend code challenge

## Cryptocurrency Single Page App

For the Bondify code challenge we ask you to create a crypto overview and search application. If you’re not familiar with crypto currencies have a look at https://coinmarketcap.com/.

You are going to build the following pages:

1. An overview (main) page with the list/table of 25 coins sorted by the highest market cap

- We want you to make the page with exactly the same column headers
- This page also contains a search box (search icon can be found in ui-examples folder) that enables users to search based on coin name. Search results will replace the default data
- We would like the average price of each coin pair to USD
- You're not required to show the coin icons
- Search only based on coin name is sufficient

Example:

![step 1:](./ui-examples/step1.png?raw=true&width=100)

2. A page showing the coin pairs per exhange in the detail card view

- This page should contains cards of coin pairs and the info like the example
- This page data is based on one of the 25 coins that we are showing in step 1
- Showing icons is not required
- If it's not clear, this might help: https://coinmarketcap.com/currencies/bitcoin/markets

Example:

![step 2:](./ui-examples/step3.png?raw=true)

**How to get started**

You will be using React, Typescript and [Apollo Client](https://www.apollographql.com/docs/react/v3.0-beta/).
We have set up the Apollo Client for you.
The API that you will be using is from bloktap.io.
The GraphQL explorer can be accessed via this link https://api.blocktap.io/graphiql.

This example query will shows you all the data that you will be needing:

You can check Blocktap documentation for more help: https://www.blocktap.io/docs

**We will judge your code based on the following criteria:**

- Knowledge of routing and navigation
- ES6 and React Hooks
- Typescript Typing
- Modularity and reusability of your code (think about components)
- Mobile first responsive implementation of the pages
- Search
- Your explanation if you diverted from the assignment, because you had a nicer way of doing things or if something was impossible to achieve
- _Bonus (optional):_ Theme toggle for dark mode

**Time to spend**

We expect you to spend 4-6 hours to complete this challenge. However you can do the assignment whenever you want within a 24 hour window after you *cloned* the repository. When you're finished send us the url of the *cloned* repository with your code.

---
#### How to run
As this project is a complex one, I've changed the way it should be run. 
If you are running it for the FIRST time, you must do the following steps:
1. yarn/npm install
2. yarn/npm run develop

Second step is not the regular one: yarn/npm start, as I'm doing a copy of crypto icons in the public's folder, so I can use then on the fly when I need them

- After that you can continue using the regular command (yarn/npm start) if needed or same command as shown in step 2 above

- Markets with no ticker information are shown, but did not participate in the average last price calculations. Also their detailed page is not accessible (Step/Screen 2).

- Site is responsive (used biuld in options from Material UI)

- Dark theme option is available


#### Known issues
The GraphQL server provided from: https://coinmarketcap.com/ has some limits restrictions about the queries. This causes some issues in the way I'd structured my queries. The downside is that the 'All' link in the table's footer is not working. I didnt spent too much time to look for a workaround. So the only available options there are '25' and '50' records per page. One possible solution of this issue is to create a lazy loading of the records. 

Every screen in my implementation is independent. This means that you can directly open/refresh a known page and the data will be loaded (if there is a response) - either from the Apollo's cache or fetch from the GraphQL's server. The downside is that I have multiple queries, which I've tried to batch in one, but the server does not support this option, so there are a couple of Network calls.



