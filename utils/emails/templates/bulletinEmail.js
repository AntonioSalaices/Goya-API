'use strict';
const translate = require('./i18n.json');
const components = require('../components');
const { DATA_CATEGORIES, OFFICIAL_WEBSITE_URL, SUPPORT_EMAIL, CONTACT_ADDRESS, RIGHTS, GCP } = require('../../../utils/constants');
const formatter = require('../../formatter');


const html = (data = {}, isConfigured, language = 'en') => `
  <html>
    <head>
      ${components.Head()}
    </head>

    <body>
      <div style="background-color: rgb(250,247,247); padding-top: 25px; padding-bottom: 55px;">
        <center>
          <p style="color: #000; text-align: right;max-width: 600px; margin-bottom: 8px; font-size: 14px;">
            Add
            <a class="responsive-text" style="color: #95b8d4" href="mailto:${GCP.user}">
              ${GCP.user}
            </a>
            ${translate.bulletin.emailText[language]}
          </p>
          <div style="background-color: white; max-width: 600px; border-radius: 1px; box-shadow: 0px 0px 10px rgb(230,230,230); margin-bottom: 40px; overflow: hidden;">
            ${components.BulletinMenuHeader(language)}

            <div class="responsive-padding" style="border: 1px solid rgb(230,230,230);">
              <div style="text-align: center; margin-top: 20px;">
                <p style="fontFamily: 'bebas-neue'; font-size: 26px; color: #000;">
                  <b>
                    <span style="color: #BF0A30; font-size: 36px; display: inline-block;">
                      ${translate.bulletin.watchListText[language].slice(0, 1)}
                    </span>${translate.bulletin.watchListText[language].substring(1)}
                  </b>
                </p>
              </div>

              <div style="text-align: left; margin-top: 30px; width: 95%">
                <span class="responsive-text" style="color: black;">
                  ${isConfigured ? translate.bulletin.bulletinSubmitText[language] : translate.bulletin.bulletinText[language]}
                </span>
              </div>

              <div style="text-align: center; margin-top: 30px; font-size: 20px; ">
                <a class="responsive-text" style="color: #95b8d4" href="${OFFICIAL_WEBSITE_URL}/dashboard/personalization?view=bulletin">
                  ${translate.bulletin.customizeText[language]}
                </a>
              </div>

              <div style="margin-top: 40px;">
                <center>
                  ${printTables(data, language)}

                  <div style="text-align: center;">
                    <span class="responsive-text" style="color: black;">
                      ${translate.bulletin.bulletinBottomText[language]}
                    </span>
                  </div>

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
                        <a class="responsive-text" style="color: white;" href="${OFFICIAL_WEBSITE_URL}/dashboard/tables">
                          ${translate.bulletin.bulletinButtonText[language]}
                        </a>
                      </div>
                    </center>
                  </div>
                </center>
              </div>

              <!-- Blue Link Container -->
              <div>
                <center>
                  <div
                    style="
                      -webkit-border-radius: 6;
                      -moz-border-radius: 6;
                      border-radius: 6px;
                      font-family: Arial;
                      color: #FFFFFF;
                      background: #f0f5f9;
                      border: solid #f0f5f9 3px;
                      text-decoration: none;
                      padding-bottom: 25px;
                      width: 70%;
                    "
                  >
                    <p style="color: black; margin-bottom: 3px;">
                        Button not working? Copy and paste this URL into your Browser:
                    </p>
                    <a class="responsive-text" style="color: #95b8d4;" href="${OFFICIAL_WEBSITE_URL}/dashboard/tables">
                      ${OFFICIAL_WEBSITE_URL}/dashboard/tables
                    </a>
                  </div>
                </center>
              </div>
              <!-- Blue Link Container -->

              <!-- Customize text -->
              <div>
                <center>
                  <div
                    style="
                      -webkit-border-radius: 6;
                      -moz-border-radius: 6;
                      border-radius: 6px;
                      font-family: Arial;
                      color: #FFFFFF;
                      padding: 0;
                      margin-top: 30px;
                      width: 80%;
                    "
                  >
                    <a class="responsive-text" style="color: #95b8d4;" href="${OFFICIAL_WEBSITE_URL}/dashboard/personalization?view=bulletin">
                      ${translate.bulletin.CustomizePricing[language]}
                    </a>
                  </div>
                </center>
              </div>
              <!-- Customize text -->

              <!-- Update text -->
              <div>
                <center>
                  <div
                    style="
                      -webkit-border-radius: 6;
                      -moz-border-radius: 6;
                      border-radius: 6px;
                      font-family: Arial;
                      color: #FFFFFF;
                      padding: 0;
                      margin-top: 10px;
                      width: 80%;
                    "
                  >
                    <a class="responsive-text" style="color: #95b8d4;" href="${OFFICIAL_WEBSITE_URL}/dashboard/personalization?view=settings">
                      ${translate.bulletin.emailPreference[language]}
                    </a>
                  </div>
                </center>
              </div>
              <!-- Update text -->

              <!-- Contact text -->
              <div>
                <center>
                  <div
                    style="
                      padding: 0;
                      border-top: solid #dcdcdc 1px;
                      margin-top: 30px;
                      font-family: Arial;
                      font-size: 14px;
                      width: 90%;
                    "
                  >
                    <p class="responsive-text" style="color: black; margin-top: 10px; text-align: center;">
                      Please do not reply to this email, if you have any questions you can reach us at
                      <a class="responsive-text" style="color: #95b8d4; text-decoration: none;" href="mailto:${SUPPORT_EMAIL}">
                        ${SUPPORT_EMAIL}
                      </a>
                    </p>
                  </div>
                </center>
              </div>
              <!-- Contact text -->

              <!-- Rights text -->
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
                    "
                  >
                    <p class="responsive-text" style="margin-top: 10px; text-align: center; font-style: italic;">
                      ${RIGHTS}
                    </p>
                    <p class="responsive-text" style="margin-top: 10px; text-align: center;">
                      ${CONTACT_ADDRESS}
                    </p>

                    <a class="responsive-text" style="color: #95b8d4; text-decoration: none;" href="${OFFICIAL_WEBSITE_URL}/terms-of-service">
                      ${translate.bulletin.terms[language]}
                    </a>
                    &
                    <a class="responsive-text" style="color: #95b8d4; text-decoration: none;" href="${OFFICIAL_WEBSITE_URL}/privacy-policy">
                      ${translate.bulletin.policy[language]}
                    </a>
                  </div>
                </center>
              </div>
              <!-- Rights text -->
            </div>
          </div>
        </center>
      </div>
    </body>
  </html>
`;


const setTitleDrop = (data) => {
  let text = '';

  if (data.type_sale_delivery_period && typeof data.type_sale_delivery_period === 'object') {
    const value = data.type_sale_delivery_period;
    const daysPeriod = value.start || value.end ? `${value.start}-${value.end} Days` : '';
    text = `${formatter.capitalize(data.type_sale_delivery_period.type)} Sales ${daysPeriod}`;
  }

  return text;
};


const printCells = (cells = []) => {
  let cell = '';
  let alert_text = '';
  cells.forEach((cl) => {
    const {
      primal,
      sub_primal,
      grade,
      type_cattle,
      fob_plant,
      data_category,
      weighted_average,
      last_weighted_average,
      price_change
    } = cl;

    let prior = '-';
    let average = '-';
    let averageWithoutCurrency = 0;
    let arrow = '';
    let showImg = true;
    let changePrior = 0;
    let valueChangePrice = 0;
    if (weighted_average) {
      average = `$${(weighted_average / 100).toFixed(2)}`;
      averageWithoutCurrency = (weighted_average / 100).toFixed(2);
    }

    if (weighted_average && last_weighted_average) {
      const lastAverage = last_weighted_average / 100;
      const value = averageWithoutCurrency - lastAverage;
      valueChangePrice = value;

      if (Math.abs((value)).toFixed(2) === '0.00') {
        showImg = false;
      }

      arrow = value > 0 ? 'greenArrow' : 'redArrow';
      prior = `$${Math.abs((value).toFixed(2))}`;
      changePrior = Math.abs((value).toFixed(2));
    }

    const cattleFunction = (cattle) => {
      if (cattle.indexOf('and') === -1) {
        const cattleCut = cattle.split('/');

        if (!cattleCut[1]) {
          return cattle;
        }

        return `${cattleCut[0].slice(0, 1)}/${cattleCut[1].slice(0, 1)}`;
      }

      return cattle;
    };

    let alert_price = '';
    //'<p style="text-align: center; border: 1px solid #ddd;padding: 8px;">${primal}</p>';
    if (price_change) {
      if (changePrior >= price_change) {
        alert_text = `<p style="text-align: left; padding-left: 2px; padding-top: 5px; margin: 0; font-size: 10px"><img style="width: 11px;" src="${OFFICIAL_WEBSITE_URL}/price_alert_icon_gray.png" />The price of the Subprimal/Item you have set an alert for has risen above the tolerance range you\'ve set.</p>`;
        if (valueChangePrice > 0) {
          alert_price = `<img style="width: 8px;" src="${OFFICIAL_WEBSITE_URL}/price_alert_icon_green.png" />`;
        } else {
          alert_price = `<img style="width: 8px;" src="${OFFICIAL_WEBSITE_URL}/price_alert_icon_red.png" />`;
        }
      }
    }
    if (data_category === DATA_CATEGORIES.BOXED_BEEF_PRICES) {
      cell += `
        <tr>
          <td style="text-align: left; border-bottom: 1px solid #ddd;border-left: 1px solid #ddd; padding: 8px;">${primal}</td>
          <td style="text-align: left; border-bottom: 1px solid #ddd;padding: 8px 8px 8px 0px">${sub_primal || '-'}</td>
          <td style="text-align: center; border-bottom: 1px solid #ddd;padding: 8px 8px 8px 0px">${grade ? grade.slice(0, 1).toUpperCase() : '-'}</td>
          <td style="text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${average}</td>
          <td style="text-align: right; border-bottom: 1px solid #ddd;border-right: 1px solid #ddd; padding: 8px;">
            <div style="display: inline-flex;">
              <div>
                ${showImg ? `<img style="width: 10px; margin-left: 10px;" src="${OFFICIAL_WEBSITE_URL}/${arrow}.png" />&nbsp;` : ''}
              </div>
              <div>
                ${prior}
              </div>
              <div style="display: inline-grid">
                ${alert_price}
              </div>
            </div>
          </td>
        </tr>
      `;
    }

    if (data_category === DATA_CATEGORIES.BOXED_COW_BEEF_PRICES) {
      cell += `
        <tr>
          <td style="text-align: left; border-bottom: 1px solid #ddd;border-left: 1px solid #ddd;padding: 8px;">${cattleFunction(type_cattle || '')}</td>
          <td style="text-align: left; border-bottom: 1px solid #ddd;padding: 8px 8px 8px 0px;">${primal}</td>
          <td style="text-align: left; border-bottom: 1px solid #ddd;padding: 8px 8px 8px 0px;">${sub_primal || '-'}</td>
          <td style="text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${average}</td>
          <td style="text-align: right; border-bottom: 1px solid #ddd;border-right: 1px solid #ddd;padding: 8px;">
            <div style="display: inline-flex;">
              <div>
                ${showImg ? `<img style="width: 10px; margin-left: 10px;" src="${OFFICIAL_WEBSITE_URL}/${arrow}.png" />` : ''}
              </div>
              <div>
                ${prior}
              </div>
              <div style="display: inline-grid">
                ${alert_price}
              </div>
            </div>
          </td>
        </tr>
      `;
    }

    if (data_category === DATA_CATEGORIES.BEEF_TRIMMINGS) {
      cell += `
        <tr>
          <td style="text-align: left; border-bottom: 1px solid #ddd;border-left: 1px solid #ddd;padding: 8px;">${fob_plant || ''}</td>
          <td style="text-align: left; border-bottom: 1px solid #ddd;padding: 8px 8px 8px 0px;">${primal}</td>
          <td style="text-align: left; border-bottom: 1px solid #ddd;padding: 8px 8px 8px 0px;">${sub_primal || '-'}</td>
          <td style="text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${average}</td>
          <td style="text-align: right; border-bottom: 1px solid #ddd;border-right: 1px solid #ddd;padding: 8px;">
            <div style="display: flex; justify-content: flex-end">
              <div>
                ${showImg ? `<img style="width: 10px; margin-left: 10px;" src="${OFFICIAL_WEBSITE_URL}/${arrow}.png" />&nbsp;` : ''}
              </div>
              <div>
                ${prior}
              </div>
              <div style="display: inline-grid">
                ${alert_price}
              </div>
            </div>
          </td>
        </tr>
      `;
    }

    if (data_category === DATA_CATEGORIES.PORK_CUTS_AND_OTHERS) {
      cell += `
        <tr>
          <td style="text-align: left; border-bottom: 1px solid #ddd;border-left: 1px solid #ddd;padding: 8px;">${fob_plant || ''}</td>
          <td style="text-align: left; border-bottom: 1px solid #ddd;padding: 8px 8px 8px 0px;">${primal}</td>
          <td style="text-align: left; border-bottom: 1px solid #ddd;padding: 8px 8px 8px 0px;">${sub_primal || '-'}</td>
          <td style="text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${average}</td>
          <td style="text-align: right; border-bottom: 1px solid #ddd;border-right: 1px solid #ddd; padding: 8px;">
            <div style="display: inline-flex;">
              <div>
                ${showImg ? `<img style="width: 10px; margin-left: 10px;" src="${OFFICIAL_WEBSITE_URL}/${arrow}.png" />&nbsp;` : ''}
              </div>
              <div>
                ${prior}
              </div>
              <div style="display: inline-grid">
                ${alert_price}
              </div>
            </div>
          </td>
        </tr>
      `;
    }
  });

  return { cells: cell, alerts: alert_text };
};


const printCellsHeader = (frequency, dataCategory, language) => {
  const {
    primal,
    sub_primal,
    average,
    prior,
    grade,
    type_cattle,
    fob_plant
  } = translate.bulletin.bulletinTable;

  let cellHeader = '';

  if (dataCategory === DATA_CATEGORIES.BOXED_BEEF_PRICES) {
    cellHeader = `
      <th style="padding-top: 15px; padding-left: 6px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${primal[language]}</th>
      <th style="padding-top: 15px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${sub_primal[language]}</th>
      <th style="padding-top: 15px; background-color: #7798bf; color: white; text-align: center; border-bottom: 1px solid #ddd;">${grade[language]}</th>
      <th style="padding-top: 12px; padding-bottom: 12px; background-color: #7798bf; color: white; text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${average[language]}</th>
      <th style="padding-top: 12px; padding-bottom: 12px; background-color: #7798bf; color: white; text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${prior[language]}</th>
    `;
  }

  if (dataCategory === DATA_CATEGORIES.BOXED_COW_BEEF_PRICES) {
    cellHeader = `
      <th style="padding-top: 15px; padding-left: 6px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${type_cattle[language]}</th>
      <th style="padding-top: 15px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${primal[language]}</th>
      <th style="padding-top: 15px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${sub_primal[language]}</th>
      <th style="padding-top: 12px; padding-bottom: 12px; background-color: #7798bf; color: white; text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${average[language]}</th>
      <th style="padding-top: 12px; padding-bottom: 12px; background-color: #7798bf; color: white; text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${prior[language]}</th>
    `;
  }

  if (dataCategory === DATA_CATEGORIES.BEEF_TRIMMINGS) {
    cellHeader = `
      <th style="padding-top: 15px; padding-left: 6px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${fob_plant[language]}</th>
      <th style="padding-top: 15px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${primal[language]}</th>
      <th style="padding-top: 15px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${sub_primal[language]}</th>
      <th style="padding-top: 12px; padding-bottom: 12px; background-color: #7798bf; color: white; text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${average[language]}</th>
      <th style="padding-top: 12px; padding-bottom: 12px; background-color: #7798bf; color: white; text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${prior[language]}</th>
    `;
  }

  if (dataCategory === DATA_CATEGORIES.PORK_CUTS_AND_OTHERS) {
    cellHeader = `
      <th style="padding-top: 15px; padding-left: 6px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${fob_plant[language]}</th>
      <th style="padding-top: 15px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${primal[language]}</th>
      <th style="padding-top: 15px; background-color: #7798bf; color: white; text-align: left; border-bottom: 1px solid #ddd;">${sub_primal[language]}</th>
      <th style="padding-top: 12px; padding-bottom: 12px; background-color: #7798bf; color: white; text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${average[language]}</th>
      <th style="padding-top: 12px; padding-bottom: 12px; background-color: #7798bf; color: white; text-align: right; border-bottom: 1px solid #ddd;padding: 8px;">${prior[language]}</th>
    `;
  }

  return cellHeader;
};


const printTables = (data = {}, language) => {
  let tables = [];

  data.forEach((dt) => {
    const dataCategory = dt.items[0] ? dt.items[0].data_category : '';
    const frequency = dt.items[0] ? dt.items[0].frequency : '';
    const items = printCells(dt.items);
    tables += `
      <div style="text-align: left;">
        <span style="font-size: 20px; color: black; font-weight: bold;margin-left: 14px;">
          ${translate.bulletin.bulletinCategoriesText[dataCategory][language]}, ${setTitleDrop(dt.items[0])}.
        </span>
      </div>

      <div style="width: 95%; display: grid; justify-content: center; align-items: center; text-align: center; margin-top: 8px; margin-bottom: 40px;">
        <table class="responsive-text" style="border-collapse: collapse; border-radius: 2px; overflow: hidden; font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              ${printCellsHeader(frequency, dataCategory, language)}
            </tr>
          </thead>

          <tbody>
            ${items.cells}
          </tbody>
        </table>
        <span style="color: #8e8e8e;">
          ${items.alerts}
        </span>
      </div>
    `;
  });

  return tables;
};


module.exports = html;
