'use strict';

const components = require('../components');
const translate = require('./i18n.json');


const html = (token, name, application, language) => `
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
                <strong>Bienvenido ${name}!</strong>
              </p>
            </div>

            <div style="text-align: left; margin-top: 30px;">
              <p style="font-size: 20px; color: rgb(80,80,80); margin-top: 0px;">
                Para activar tu cuenta en GOYA,
                por favor usar el código de verificación que se encuentra debajo para verificar tu dirección de correo electrónico.
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
            <div style="text-align: left; margin-top: 30px;">
              <p style="font-size: 20px; color: rgb(80,80,80); margin-top: 0px;">

              </p>
            </div>
          </div>
        </center>
      </div>
    </center>
  </div>
    </body>
  </html>
`;


module.exports = html;
