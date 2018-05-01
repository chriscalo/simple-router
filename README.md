A simple router built on top of the History API.

Because all the other routers out there either were too complicated or were too
ingrained as components in the view layer. This is a plain JavaScript object you
can use however you want.

# Router usage

``` JavaScript
import Router from "./router";

Router.create({
  "*": function (context) {
    // will be called for all URL changes
  },
  "/": function (context) {
    // "this" is a reference back to the router object
    this.replace("/#/"); // calls history.replaceState()
    this.push("/#/"); // calls history.pushState()
  },
  "/#/:id": function (context) {
    console.log(context.params.id);
  },
  "/#/": function (context) {
    // do something
  },
}).init();
```
