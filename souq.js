
const puppeteer = require('puppeteer');



const souq = async (searchQuery) => {
  
    const browser = await puppeteer.launch({headless: true});  
  const page = await browser.newPage();

  await page.goto(`https://egypt.souq.com/eg-ar/${searchQuery}/s/?as=2&section=2&page=1`);

  //wait page.waitForTimeout(5000)
  await autoScroll(page)

  //await page.screenshot({ path: 'example.png' });
  
  const wholeItems = await page.evaluate(()=>(Array.from(document.querySelector('.row.collapse.content').querySelectorAll('.single-item')))
  .map(item => (
    {
        title: item.attributes['data-name'].nodeValue.trim(),
        img: item.querySelector('img').src,
        price: item.querySelector('.itemPrice').textContent,
        rating: item.querySelector('.star-rating-svg')?  5-((100-item.querySelector('.star-rating-svg').childNodes[0].attributes[0].nodeValue.substr(6,2)*1) /20 ) : 'not rated yet',  // 'width:92%'
        link: item.querySelector('a').href,
    }
  )))
  //console.log(wholeItems)
  
  await browser.close();
  return wholeItems


};

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 5); // the speed of scroller
        });
    });
}
// https://stackoverflow.com/questions/51529332/puppeteer-scroll-down-until-you-cant-anymore


module.exports = {souq} 