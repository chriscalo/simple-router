// Main router module.
// Author: Chris Calo (chris.calo@gmail.com)

import UrlPattern from "url-pattern";
import R from "ramda";

// Given a router intstance and a location (URL), this function calls all
// matching route handler functions.
function testAllRoutes(router, location) {
  const localhref = location.href.toString().replace(location.origin, "");
  return router.routes
    .map(route => {
      const match = route.pattern.match(localhref);
      if (match) {
        route.handler.call(router, {
          href: location.href,
          localhref: localhref,
          params: match,
        }, router);
      }
      return !!match;
    })
    // reduce to boolean whether match was found
    .reduce(R.or);
}

// Takes a string pattern and handler function and returns an object containing
// a matching object
function createRoute(pattern, handler) {
  return {
    // TODO: retain original textual representation of pattern
    pattern: new UrlPattern(pattern),
    handler,
  };
}

export default {
  // takes an object of routes and handlers and returns a router object
  create: function (input) {
    const router = {
      routes: Object.keys(input).map(key => {
        return createRoute(key, input[key]);
      }),
      
      // add a new route pattern and handler
      add(pattern, handler) {
        router.routes.push(createRoute(pattern, handler))
      },
      
      // updates the URL and adds a new history entry
      push(location, tryMatch = true) {
        history.pushState({}, null, location);
        if (!!tryMatch) {
          router.match();
        }
        return router;
      },
      
      // updates the URL by replacing the current history entry
      replace(location, tryMatch = true) {
        history.replaceState({}, null, location);
        if (!!tryMatch) {
          router.match();
        }
        return router;
      },
      
      // attach to the window.popstate event
      init(tryMatch = true) {
        // FIXME: deal with multiple calls to init()
        window.addEventListener("popstate", router.match, false);
        if (!!tryMatch) {
          router.match();
        }
        return router;
      },
      
      // test current URL against all registered routes
      match() {
        return testAllRoutes(router, window.location);
      },
      
      // detach from window.popstate event
      detach() {
        window.removeEventListener("popstate", router.match, false);
        return router;
      },
    }
    
    return router;
  }
};
