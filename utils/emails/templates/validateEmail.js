const components = require('../components');
const { OFFICIAL_WEBSITE_URL } = require('../../../utils/constants');


const html = (token, name, application) => `
  <html>
    <head>
      ${components.Head()}
    </head>

    <body>
      <div style="background-color: rgb(245,245,245); margin-bottom: 35px;">
        ${components.MenuHeader()}

        <div style="background-color: white; padding-top: 20px; padding-bottom: 20px; margin-top: 45px; margin-bottom: 15px;">
          <div style="text-align: center;">
            <h1 style="color: grey; font-size: 30px;">Verificación de correo electrónico</h1>
          </div>

          <div style="text-align: center;">
            <p style="color: grey;font-size: 22px; margin-top: 50px;">
              <strong>¡Hola!,</strong> ${name}
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: grey;font-size: 20px">
              Haz clic en el siguiente botón para verificar su dirección de correo electrónico
            </p>
          </div>

          <div style="text-align: center; margin-top: 80px; margin-bottom: 40px;">
            <a
              style="
                -webkit-border-radius: 6;
                -moz-border-radius: 6;
                border-radius: 6px;
                font-family: Arial;
                color: #fff;
                font-size: 18px;
                background: #010000;
                padding: 10px 20px 10px 20px;
                border: solid #010000 3px;
                text-decoration: none;
              "
              href="${OFFICIAL_WEBSITE_URL}/verificacion-correo/${application}/${token}" class="btn btn-danger btn-lg"
            >
              Verificar correo
            </a>
          </div>
        </div>

        ${components.Footer()}
      </div>
    </body>
  </html>
`;


module.exports = (token, name, application) => html(token, name, application);
