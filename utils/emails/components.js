'use strict';

const moment = require('moment-timezone');
const { OFFICIAL_WEBSITE_URL, CONTACT_ADDRESS, RIGHTS, SUPPORT_EMAIL } = require('../constants');
const formatter = require('../formatter');
const translate = require('./i18n.json');

const { monthOfYear } = formatter;

module.exports = {
  Head: () => `
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
    <title>GO-YA</title>

    <style>
      body {
        background-color: #fafafa;
      }

      p, h3 {
        font-size: 22px;
      }

      /* responsive style */
      .responsive-padding {
        padding: 0;
      }

      .responsive-text {
        font-size: 14px;
      }

      /* desktop style */
      @media (min-width: 768px) {
        .responsive-padding {
          padding: 10px;
        }

        .responsive-text {
          font-size: 15px;
        }
      }
    </style>
  `,

  MenuHeader: () => `
    <div style="background: black; padding-top: 10px; padding-bottom: 10px; text-align: left;">

    </div>
  `,

  WelcomeHeader: () => `
    <div>

    </div>

    <div>

    </div>

    <div>

    </div>
  `,

  Footer: (language) => `
    <div style="background-color: #fafafa; padding-top: 10px; padding-bottom: 10px; padding-right: 10px;">
      <p style="font-size: 15px; text-align: center; color: rgb(80,80,80);">
        ${translate.footer[language]}
      </p>
    </div>
  `,

  ContactUs: () => `
    <div>
      <center>
        <div
          style="
            padding: 0;
            border-top: solid #dcdcdc 1px;
            margin-top: 30px;
            font-family: Arial;
            font-size: 19px;
            width: 90%;
          "
        >
          <p class="responsive-text" style="color: black; margin-top: 10px; text-align: center;">
            Por favor, no responda este email, cualquier duda comunicarse a
            <a class="responsive-text" style="color: #95b8d4; text-decoration: none;" href="mailto:goya.envio@gmail.com">
              goya.envio@gmail.com
            </a>
          </p>
        </div>
      </center>
    </div>
  `,

  TermsAndService: (language) => `
    <div>
      <center>
        <div
          style="
            font-family: Arial;
            color: #aaabaa;
            background: #fafafa;
            padding: 10px 20px 10px 20px;
            border: solid #fafafa 3px;
            text-decoration: none;
            padding-top: 40px;
            padding-bottom: 40px;
            width: 92%;
            font-size: 18px;
          "
        >
          <p class="responsive-text" style="margin-top: 10px; text-align: center; font-style: italic;">
            ${RIGHTS}
          </p>
          <p class="responsive-text" style="margin-top: 10px; text-align: center;">
            ${CONTACT_ADDRESS}
          </p>

          <a class="responsive-text" style="color: #95b8d4; text-decoration: none;" href="${OFFICIAL_WEBSITE_URL}/terms-of-service">
            ${translate.terms[language]}
          </a>
          &
          <a class="responsive-text" style="color: #95b8d4; text-decoration: none;" href="${OFFICIAL_WEBSITE_URL}/privacy-policy">
            ${translate.policy[language]}
          </a>
        </div>
      </center>
    </div>
  `,

  FooterAccount: (language) => `
    <div style="padding-top: 10px; padding-bottom: 10px; padding-right: 10px;">
      <p style="font-size: 14px; text-align: center;">
        ${translate.footerAccount[language]}
      </p>
    </div>
  `,

  Divider: () => `
    <hr style="
      border: 0;
      height: 1px;
      background-image: -webkit-linear-gradient(left, #f0f0f0, #dee0e2, #f0f0f0);
      background-image: -moz-linear-gradient(left, #f0f0f0, #dee0e2, #f0f0f0);
      background-image: -ms-linear-gradient(left, #f0f0f0, #dee0e2, #f0f0f0);
      background-image: -o-linear-gradient(left, #f0f0f0, #dee0e2, #f0f0f0); "
    />
  `,

  BulletinMenuHeader: (language) => {
    const title = translate.bulletinEmailTitle[language];
    const first = title.slice(0, 1);
    const dt = moment().tz('America/Mazatlan')._d;
    const date = `${monthOfYear(dt.getMonth()).slice(0, 3)} ${dt.getDate()}. ${dt.getFullYear()}`;

    return `
      <div style="background: black; padding-top: 10px; padding-bottom: 10px;">
        <table style="width: 100%;">
          <tr>
            <td>
              <img style="width: 110px; margin-left: 5px;" src="${OFFICIAL_WEBSITE_URL}/text-logo.png" />
            </td>

            <td>
              <div style="text-align: right;">
                <p style="fontFamily: 'bebas-neue'; font-size: 16px; color: white; margin-right: 5%;">
                  <b>
                    <span style="color: #BF0A30">${first}</span>${title.substring(1)} <span style="color: white">- USDA PM - ${date}</span>
                  </b>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;
  },
};
