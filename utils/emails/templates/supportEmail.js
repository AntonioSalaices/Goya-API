const components = require('../components');


const html = (name, email, message, type_user) => `
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
              <p>
                <strong>Support message from ${type_user}</strong>
              </p>

              <p style="font-size: 15px; color: rgb(80,80,80); margin-top: 0px;">
                <strong>Name:</strong> ${name}
              </p>

              <p style="font-size: 15px; color: rgb(80,80,80); margin-top: 0px;">
                <strong>Email:</strong> ${email}
              </p>
            </div>

            <div style="text-align: left; margin-top: 30px;">
              <p>
                <strong>Message:</strong>
              </p>

              <p style="font-size: 15px; color: rgb(80,80,80); margin-top: 0px;">
                ${message}
              </p>
            </div>
          </div>
        </center>

        ${components.Footer('en')}
      </div>
    </body>
  </html>
`;


module.exports = (name, email, message, type_user) => html(name, email, message, type_user);
