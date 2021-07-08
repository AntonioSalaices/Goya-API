const request = require('request');
const { google } = require('googleapis');
const { GCP } = require('./constants');

const getAccessToken = async () => {
  const OAuth2 = google.auth.OAuth2;
  const oauth2Client = new OAuth2(GCP.client_id, GCP.secret_key, GCP.redirect_url);

  oauth2Client.setCredentials({
    refresh_token: GCP.refresh_token
  });

  const tokens = await oauth2Client.refreshAccessToken();
  const accessToken = tokens.credentials.access_token;

  return accessToken;
};

const getFacebookData = (accessToken) => (
  new Promise((resolve, reject) => {
    const fields = 'id,email,name,picture.type(large)';
    const url = `https://graph.facebook.com/me?fields=${fields}&access_token=${accessToken}`;

    request.get(url, (error, response) => {
      if (error) {
        reject(JSON.stringify(error));
      } else if (response.statusCode === 200) {
        if (response.body.failure) {
          reject(JSON.stringify(response.body));
        } else {
          const rawResponse = response.toJSON();
          resolve(JSON.parse(rawResponse.body));
        }
      } else {
        reject(JSON.stringify(error));
      }
    });
  })
);


module.exports = {
  getAccessToken,
  getFacebookData,
  getSettings: async () => ({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: GCP.user,
      clientId: GCP.client_id,
      clientSecret: GCP.secret_key,
      refreshToken: GCP.refresh_token,
      accessToken: await getAccessToken(),
    }
  })
};
