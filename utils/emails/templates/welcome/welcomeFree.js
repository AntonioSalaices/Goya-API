const components = require('../../components');
const { OFFICIAL_WEBSITE_URL, OFFICIAL_LINKEDIN_URL } = require('../../../constants');

const html = (name, language = 'en') => `
  <html>
    <head>
      ${components.Head()}
    </head>

    <body>
      <div style="background-color: rgb(245,245,245); padding-top: 25px; padding-bottom: 55px;">
        <center>
          <div style="background-color: rgb(245,245,245);">
            <div style="background-color: white; max-width: 600px;">
              ${components.WelcomeHeader()}

              <center>
                <div style="background-color: white; margin: 40px">
                  <div style="text-align: left;">
                    <p style="font-size: 25px; color: rgb(80,80,80); margin-top: 0px;">
                      <strong>Hi ${name}, </strong>
                    </p>
                  </div>

                  <div style="text-align: left; margin-top: 30px;">
                    <p style="font-size: 20px; color: rgb(80,80,80); margin-top: 0px;">
                      Thank you for subscribing to
                        <b style="color: #BF0A30;">E</b><b style="font-size: 23px;">M</b><b>EAT</b>.

                      You have officially started your free plan, this membership never expires.
                    </p>
                    <p style="font-size: 20px; color: rgb(80,80,80); margin-top: 0px;">
                    Your plan includes:
                    </p>

                    <div style="display: flex;">
                      <img style="width: 30px; height: 30px; vertical-align:middle;" src="${OFFICIAL_WEBSITE_URL}/bulletin-icon.png"/>
                      <span style="margin-left: 10px; font-size: 20px; color: rgb(80,80,80);">Daily Pricing Bulletin with meat prices for all proteins<sup>*</sup>.</span>
                    </div>

                    <!--
                    <p style="color: rgb(80,80,80);">
                      <img style="width: 30px; height: 30px; vertical-align:middle;" src="${OFFICIAL_WEBSITE_URL}/bulletin-icon.png"/>
                      <span style="margin-left: 10px; font-size: 20px; color: rgb(80,80,80);">Daily Pricing Bulletin with meat prices for all proteins<sup>*</sup>.</span>
                    </p> -->
                    <div style="display: flex; color: rgb(80,80,80); margin-top: 20px;">
                      <img style="width: 30px; height: 30px; vertical-align:middle;" src="${OFFICIAL_WEBSITE_URL}/tables-icon.png"/>
                      <span style="margin-left: 10px; font-size: 20px; color: rgb(80,80,80);">Tables with daily and weekly meat prices in web and mobile apps for all proteins<sup>*</sup>.</span>
                    </div>
                    <p style="font-size= 15px;"><sup>*</sup>Currently beef and pork.</p>
                    <p style="font-size: 20px; color: rgb(80,80,80);">
                      <strong>Click the button below to get started using
                        <b style="color: #BF0A30;">E</b><b style="font-size: 23px;">M</b><b>EAT</b>
                      right way.</strong>
                    </p>
                    <div style="text-align: center; margin-top: 10px; margin-bottom: 25px;">
                      <center>
                        <div
                          style="
                            -webkit-border-radius: 6;
                            -moz-border-radius: 6;
                            border-radius: 6px;
                            font-family: Arial;
                            color: #FFFFFF;
                            background: #BF0A30;
                            padding: 10px 20px 10px 20px;
                            border: solid #BF0A30 3px;
                            text-decoration: none;
                            width: 150px;
                          "
                        >
                          <a class="responsive-text" style="color: white;" href="${OFFICIAL_WEBSITE_URL}">
                            Go To EMEAT
                          </a>
                        </div>
                      </center>
                    </div>

                    <p style="font-size: 20px; color: rgb(80,80,80);">
                      <strong>
                        We're excited to have you on board and love receiving feedback.
                        Reach out to us at contact@emeat.io to let us know how we're doing or how we can help.
                      </strong>
                    </p>
                    <i style="font-size: 20px; color: rgb(80,80,80); margin-top: 0px;">
                      Want to be more engaged with
                      <b style="color: #BF0A30;">E</b><b style="font-size: 23px;">M</b><b>EAT</b>
                      community? Connect with us on <a href="${OFFICIAL_LINKEDIN_URL}">LinkedIn</a> for more tips and tricks of the trade.
                    </i>

                  </div>
                </div>
              </center>
              <!-- Contact text -->
              ${components.ContactUs()}
              <!-- Contact text -->

              <!-- Rights text -->
              ${components.TermsAndService(language)}
              <!-- Rights text -->
            </div>
          </div>
        </center>
      </div>
    </body>
  </html>
`;


module.exports = (name) => html(name);
