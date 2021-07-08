'use strict';

const components = require('../components');
const translate = require('./i18n.json');

const html = (token, language) => `
  <html>
    <head>
      ${components.Head()}
    </head> 

    <body>
      <div style="background-color: rgb(245,245,245); padding-top: 25px; padding-bottom: 55px;">
        <center>
          <div style="background-color: white; max-width: 600px;">
            ${components.MenuHeader()}

            <center>
              <div style="background-color: white; margin: 40px">
                <div style="text-align: left;">
                  <p style="font-size: 25px; color: rgb(80,80,80); margin-top: 0px;">
                    <strong>${translate.recovery.title[language]}</strong>
                  </p>
                </div>

                <div style="text-align: left; margin-top: 30px;">
                  <p style="font-size: 20px; color: rgb(80,80,80); margin-top: 0px;">
                  Please use the verification code below to reset the password for your client account at 
                      <b style="color: #BF0A30;">E</b><b style="font-size: 23px;">M</b><b>EAT</b>. 
                      If you did not request a new password, you can safely delete this email. 
                  </p>
                  <div style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
                    <a
                      style="
                        font-family: Arial;
                        color: #000000;
                        font-size: 25px;
                        text-decoration: none;
                        letter-spacing: 10px;
                      "
                    >
                        ${token}
                    </a>
                  </div>
                </div>
              </div>
            </center>
            <!-- Contact text -->
            ${components.ContactUs()}
            <!-- Contact text -->

            <!-- Rights text -->
            ${components.TermsAndService('en')}
            <!-- Rights text -->
          </div>
        </center>
      </div>
    </body>
  </html>
`;


module.exports = html;
