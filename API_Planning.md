documentation_url: GITHUB
base_url:https://peaceful-taiga-87399.herokuapp.com/
endpints: {
  - {
      method: "GET",
      path: "/api",
      description: "Describes all available endpoints"
    },
  - {
      method: "GET",
      path: "/api/profile",
      description: "Who I am, Where I'm from"
    },
  - {
      method: "GET",
      path: "/api/places",
      description: "Where I've been"
    },
  - {
      method: "GET",
      path: "/api/places/:id",
      description: "once of the places i've been"
    },
  - {
      method: "POST",
      path: "/api/places",
      description: "create new place i've been"
    },
  - {
      method: "DELETE",
      path: "/api/places/:id",
      description: "delete a place i've been"
    },

}
