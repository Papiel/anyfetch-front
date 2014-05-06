anyFetch.com website
==============

Welcome @ anyFetch

## Requirements

* node.js
* compass
* [yeoman](http://yeoman.io/)


## Installation
Setup npm and bower:

```sh
npm install -g bower grunt-cli
npm install
gem install compass
```

## How to use

 Before running any of these commands you need to install all the requirements. To load all the dependents packages you will need to run:
 ```sh
 gem install compass
 npm install -g grunt bower bower-cli
 npm install
 bower install
 ```

```sh
grunt serve				# launch the developement server
grunt test				# start the tests
grunt build				# create standalone application in the /build directory
```

## Deployment
 
```sh
grunt deploy
```
 
This require push access to this repo.
