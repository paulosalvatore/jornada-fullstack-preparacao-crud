export const Api = {
  baseUrl: "http://localhost:3000/",

  item: {
    endpoint: () => Api.baseUrl + "item",
    create: function () {
      return this.endpoint() + "/";
    },
    readAll: function () {
      return this.endpoint() + "/";
    },
    readById: function (id) {
      return this.endpoint() + "/" + id;
    },
    update: function (id) {
      return this.endpoint() + "/" + id;
    },
    delete: function (id) {
      return this.endpoint() + "/" + id;
    },
  },

  // GET
  buildApiGetRequest: (url) => {
    return fetch(url, {
      method: "GET",
    });
  },

  // POST
  buildApiPostRequest: (url, body) => {
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(body),
    });
  },

  // PUT
  buildApiPutRequest: (url, body) => {
    return fetch(url, {
      method: "PUT",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(body),
    });
  },

  // DELETE
  buildApiDeleteRequest: (url) => {
    return fetch(url, {
      method: "DELETE",
    });
  },
};
