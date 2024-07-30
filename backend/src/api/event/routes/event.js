"use strict";

/**
 * event router
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/events",
      handler: "event.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/events/me",
      handler: "event.me",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::event.event");
