import { Injectable } from '@nestjs/common';
import * as Cheerio from 'cheerio';
import puppeteer from 'puppeteer';

@Injectable()
export class DarazScrapperService {
    async scrapeData() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        try {
            console.log('::start::1::');
            await page.goto(
                'https://www.daraz.pk/catalog/?spm=a2a0e.tm80335159.search.d_go&q=opler',
                { waitUntil: 'load', timeout: 0 },
            );
            const bodyHandle = await page.$('body');
            const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
            await browser.close();
            const $ = Cheerio.load(html);
            var doc = $(html);

            const links = $('div.Bm3ON', doc);
            const pagination = $('.ant-pagination', doc);

            

            console.log('pagination', pagination);
            

            const values = [];
            await links.each((i, elem) => {
                values[i] = {
                    url: $(elem)._findBySelector('a', 100).attr('href'),
                    name: $(elem)._findBySelector('a', 100).text(),
                    imgUrl: $(elem)._findBySelector('img', 100).attr('src'),
                };
            });

            return {values, totalPages: pagination?.children()?.eq(-2)?.text()}
        } catch (error) {
            console.error('Error while scraping job listings:', error);
        } finally {
            //   await browser.close();
        }
    }
}
