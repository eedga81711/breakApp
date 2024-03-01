import { Novu } from "@novu/node";

const novu = new Novu("<API_KEY>");

novu.trigger("breakapp", {
  to: {
    subscriberId: "<REPLACE_WITH_DATA>",
  },
  payload: {},
});
