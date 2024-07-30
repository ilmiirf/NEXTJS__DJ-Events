"use strict";

/**
 * event service
 */

// module.exports = {
//   me: async (ctx) => {
//     const authUser = ctx.state.user;
//     if (!authUser) {
//       return ctx.unauthorized();
//     }
//     try {
//       const entries = await strapi.entityService.findMany("api::event.event", {
//         fields: [
//           "name",
//           "slug",
//           "venue",
//           "date",
//           "performers",
//           "time",
//           "description",
//           "address",
//           "createdAt",
//           "updatedAt",
//           "publishedAt",
//           "img",
//         ],
//         populate: {
//           user: authUser.id,
//         },
//       });
//       let entriesReduced;
//       if (entries && Array.isArray(entries)) {
//         entriesReduced = entries.reduce((acc, item) => {
//           acc = acc || [];
//           acc.push({
//             id: item.id,
//             attributes: {
//               name: item.name,
//               slug: item.slug,
//               venue: item.venue,
//               date: item.date,
//               performers: item.performers,
//               time: item.time,
//               description: item.description,
//               address: item.address,
//               createdAt: item.createdAt,
//               updatedAt: item.updatedAt,
//               publishedAt: item.publishedAt,
//               img: item.img,
//             },
//           });
//           return acc;
//         }, []);
//       }
//       return entries;
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::event.event");

// module.exports = createCoreService("api::event.event", ({ strapi }) => ({
//   me: async (ctx) => {
//     try {
//       // Fetch events for the current user
//       const events = await strapi.entityService.findMany("api::event.event", {
//         filters: {
//           user: ctx.state.user.id,
//         },
//       });

//       // Return the events
//       return events;
//     } catch (err) {
//       return err;
//     }
//   },
// }));
