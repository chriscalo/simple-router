// Tests for router.js
// Author: chris.calo@gmail.com (Chris Calo)

import Router from "./router";

describe("router", () => {
  
  describe(".init()", () => {
    
    it("should trigger route matching when .init() called (no params)", () => {
      const routes = {
        "*": (context) => {
        },
      };
      spyOn(routes, "*");
      Router.create(routes).init();
      expect(routes["*"].calls.count()).toBe(1);
    });
    
    it("should not trigger route matching if .init(false) called", () => {
      const routes = {
        "*": (context) => {
        },
      };
      spyOn(routes, "*");
      Router.create(routes).init(false);
      expect(routes["*"].calls.count()).toBe(0);
    });

    it("should return router instance to enable chaining", () => {
      const routes = {
        "*": (context) => {
        },
      };
      const router = Router.create(routes);
      expect(router.init()).toEqual(router);
    });

  });
  
  describe(".push()", () => {
    
    it("should trigger matching if the URL is updated", () => {
      const routes = {
        "*": (context) => {
        },
      };
      spyOn(routes, "*");
      const router = Router.create(routes).init(false);
      router.push("/foo");
      expect(routes["*"].calls.count()).toBe(1);
    });
    
  });

});
