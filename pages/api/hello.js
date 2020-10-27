import cheerio from 'cheerio';


export default async function Hello (req, res){
    console.log(req.query);

    let url = 'https://' + req.query.host + '/' + req.query.topic + '/page/' + req.query.page + '/?filter=' + req.query.filter;

    res.status(200).json({data: await fetch(url).then((response) => {
            return response.text();
        }).then((text) => {
            const $ = cheerio.load(text);

            let itemCount = $('.b-content__inline_items').children('.b-content__inline_item').length;
            let fetchLimit  = itemCount;

            let mediaItemsResponse = [];


            let itemType = 'films';

            for(let i=1; i<=fetchLimit; i++){
                let itemObject = {
                    id: $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').attr('data-id'),
                    type: itemType,
                    source: 'hdrezka',
                    host: 'rezka.ag',

                    url: $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').attr('data-url'),

                    description: {
                        name: $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').children('.b-content__inline_item-link').children('a').text().trim(),
                        nameOriginal: null,
                        subtext: $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').children('.b-content__inline_item-link').children('div').text().trim(),
                        about: null,

                        actors: null,
                        directors: null,

                        ratings: null,

                        elements: null,
                    },

                    data: null,

                    poster: null,
                }

                let poster = $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').children('.b-content__inline_item-cover').children('a').children('img').attr('src');
                if(poster.includes('http')){
                    itemObject.poster = poster;
                }else{
                    itemObject.poster = 'https://rezka.ag' + $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').children('.b-content__inline_item-cover').children('a').children('img').attr('src');
                }

                mediaItemsResponse.push(itemObject);

                //console.log('Media Object: ' + JSON.stringify(itemObject));
                //console.log('--------------------------------------------');
            }
            return mediaItemsResponse
        })});
}