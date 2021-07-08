'use strict';

const components = require('../components');
const { OFFICIAL_WEBSITE_URL } = require('../../../utils/constants');
// const translate = require('./i18n.json');

const html = (id, name, language) => `

  <html>
    <head>
      ${components.Head()}
    </head>

    <body>
      <div style="background-color: rgb(245,245,245);">
        ${components.MenuHeader()}

        <center>
          <div style="background-color: white; padding: 10px; margin-top: 45px; margin-bottom: 45px; max-width: 500px;">

            <div style="text-align: left;">
              <span style="font-size: 20px; color: black; font-weight: bold;">

                WELCOME TO
                <label style="font-family: sans-serif; font-weight: bold; font-size: 20px; zoom: 1.0;">
                    <span style="color: rgb(191, 10, 48);">E</span><span style="font-size: 30px;">M</span>EAT
                </label>

              </span>
            </div>

            <div style="text-align: left;">
              <p style="font-size: 15px; color: rgb(80,80,80); margin-top: 0px;">
                ${name} has invited you to join
                <label style="color: black; font-family: sans-serif; font-weight: bold; font-size: 20px; zoom: 0.7;">
                    <span style="color: rgb(191, 10, 48);">E</span><span style="font-size: 30px;">M</span>EAT
                </label>
                . Please click on the link below to access your account.
                <br/>
              </p>
            </div>

            <div style="text-align: center; margin-top: 40px; margin-bottom: 40px;">
              <center>
                <a
                  style="
                    -webkit-border-radius: 6;
                    -moz-border-radius: 6;
                    border-radius: 6px;
                    font-family: Arial;
                    color: #fff;
                    font-size: 18px;
                    background: #BF0A30;
                    padding: 10px 20px 10px 20px;
                    border: solid #BF0A30 3px;
                    text-decoration: none;
                    width: 150px;
                  "
                  href="${OFFICIAL_WEBSITE_URL}/assign-password/${id}" class="btn btn-danger btn-lg"
                >
                  Activate Account
                </a>
              <center>
            </div>

            <div style="text-align: left; margin-top: 30px;">
              <p style="font-size: 15px; color: rgb(80,80,80);">
                If you believe you received this email by mistake, please simply ignore it.
              </p>
            </div>

          </div>
        </center>

        ${components.Footer(language)}

      </div>
    </body>
  </html>
`;


module.exports = html;
