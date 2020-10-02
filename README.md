# GSAPI - Feed By Google Sheet

Often we need an API to query and test a prototype quickly, or perhaps to think about the structure of a database, but we always end up spending to much time in this process.

This API was created to aid in the prototyping of Apps and Database Structures in a simple and fast way.

## Config
- First of all, you will need to create a Google Sheet.
- Then you will create how many tabs you need, considering each tab will pretend a table.
- in each tab the first cell of each column will be the column name and the below data will be the register's data

If you have some issue visit this [DemoSheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vSuW-ikgJP4hp8fBL3aTvFLURuRirO0hMFp6y6S0n0zymKVoO5_PikciEjFyvjqM7IE-w_6u4H64ZhF/pubhtml) for getting an example

After these steps will need to publish the Google Sheet on the Web.
Click in File > Publish to the web... > click Publish button, like the image below
![Publish on the web](pub_web_eg.jpg)

## Usage

> https://gsapi.kelvins.cc/sheet/{GOOGLE_SHEET_ID}/{TABLE_NAME}/{ROW_INDEX}

- GOOGLE_SHEET_ID: The last path of Google Sheet Link, something like this -> 1aVGHEZk0C4lv_hJOTYI_OOFWKuqgTH2pcScXEio6XuQ/
- TABLE_NAME: name of the table like users, posts, news
- ROW_INDEX: Index of the row you want to return

Examples:

Get all data
> https://gsapi.kelvins.cc/sheet/1GduheATo_uATu0uPgYzcfF5Toa1hGTwezZP7GYhmYbc

Get only users table
> https://gsapi.kelvins.cc/sheet/1GduheATo_uATu0uPgYzcfF5Toa1hGTwezZP7GYhmYbc/users

Get only the second user
> https://gsapi.kelvins.cc/sheet/1GduheATo_uATu0uPgYzcfF5Toa1hGTwezZP7GYhmYbc/users/1

Obs.: Remember you can use whatever Google Sheet if it was published on the web with the correct structure

## TODO
- Search
- Pagination

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.