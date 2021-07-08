const components = require('../components');

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
              ${components.MenuHeader()}

              <center>
                <div style="background-color: white; margin: 40px">
                  <div style="text-align: left;">
                    <p style="font-size: 25px; color: rgb(80,80,80); margin-top: 0px;">
                      <strong>Hi ${name}, </strong>
                    </p>
                  </div>

                  <div style="text-align: left; margin-top: 30px;">
                    <p style="font-size: 20px; color: rgb(80,80,80); margin-top: 0px;">
                      We don't want you to miss out on anything that is happening in the market, but your Premium 14-Day
                      Free Trial expires tomorrow!
                    </p>

                    <p style="font-size: 20px; color: rgb(80,80,80); margin-top: 0px;">
                      To continue enjoying all the features of
                      <b style="color: #BF0A30;">E</b><b style="font-size: 23px;">M</b><b>EAT</b>, add
                      your payment information before your 14-Day Free Trial is over.
                    </p>
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
