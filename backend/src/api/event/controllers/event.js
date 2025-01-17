// @ts-nocheck
"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * event controller
 */

// module.exports = {
//   async me(ctx) {
//     try {
//       const data = await strapi.service("api::event.event").me(ctx);
//       console.log(data, "data");

//       ctx.body = data;
//     } catch (err) {
//       ctx.badRequest("Post report controller error", { moreDetails: err });
//     }
//   },
// };

// module.exports = {
//   async me(ctx) {
//     const user = ctx.state.user;

//     if (!user) {
//       return ctx.badRequest(null, [
//         { messages: [{ id: "No authorization header was found" }] },
//       ]);
//     }

//     const data = await strapi.services.events.find({ user: user.id });

//     if (!data) {
//       return ctx.notFound();
//     }

//     return sanitizeEntity(data, { model: strapi.models.events });
//   },
// };

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  // Create event with linked user
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services.events.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.events.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.events });
  },
  // Update user event
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [events] = await strapi.services.events.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!events) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.events.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.events.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.events });
  },
  // Delete a user event
  async delete(ctx) {
    const { id } = ctx.params;

    const [events] = await strapi.services.events.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!events) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const entity = await strapi.services.events.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.events });
  },
  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const data = await strapi.services.events.find({ user: user.id });

    if (!data) {
      return ctx.notFound();
    }

    return sanitizeEntity(data, { model: strapi.models.events });
  },
}));

// module.exports = createCoreController("api::event.event", ({ strapi }) => ({
//   me: async (ctx) => {
//     const user = ctx.state.user;
//     console.log(user);

//     if (!user) {
//       return ctx.badRequest(null, [
//         { messages: [{ id: "No authorization header was found" }] },
//       ]);
//     }

//     try {
//       // Call the service method
//       const events = await strapi.service("api::event.event").me(ctx);
//       console.log("pass");

//       // Return the events as JSON
//       return ctx.send(events);
//     } catch (err) {
//       return ctx.throw(500, err);
//     }
//   },
// }));
