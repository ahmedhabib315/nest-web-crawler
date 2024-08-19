import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

@Injectable()
export class ScrapperService {
  async scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      console.log('::start::1::');
      await page.goto('https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0', { waitUntil: 'load', timeout: 0 });
      const bodyHandle = await page.$('body');
      const html = await page.evaluate(body => body.innerHTML, bodyHandle);
      await browser.close();
      const $ = cheerio.load(html);
      var doc = $(html);
      var links = $('.jobs-search__results-list > li > div > a > span', doc);
      const values = []
      await links.each((i, elem) => {
        // console.log(`elem ${i}`,elem, $(elem).attr('href'))
            // products[i] = $(elem).attr('href')?.replace('//','https://') || ''
            console.log(':::::asdasda::::::',  $(elem).text())
            values[i] = $(elem).text()
            // if (products[i].split("//")[0]!=='https:'){
            //   products[i]= 'https://www.daraz.pk/'+products[i]
            // }
            // else{
            //   products[i]=products[i]
            // }
          })


      // Get the titles of the first 10 job listings
      //   const jobTitles = await page.$$eval('.jobtitle', (elements) => {
      //     return elements.slice(0, 10).map((element) => {
      //       return element.textContent;
      //     });
      //   });

      return values
    } catch (error) {
      console.error('Error while scraping job listings:', error);
    } finally {
      //   await browser.close();
    }
  }
}
