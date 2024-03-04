const Reddit: object = {
  getAccessToken: async (userName: string, password: string) => {
    try {
      const response = await fetch(
        "https://www.reddit.com/api/v1/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              `${userName}:${password}`,
            )
              }`,
          },
          body: `grant_type=password&username=${userName}&password=${password}`,
        },
      );
      const jsonResponse = await response.json();
      return jsonResponse.accessToken;
    } catch(e) {
      console.error(e)
    }
  },
};

export default Reddit;
