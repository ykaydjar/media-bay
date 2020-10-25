import React, {Component} from 'react';
import cheerio from 'cheerio';

export async function getMediaItems(host='rezka.ag', topic='films', page='1', filter='watching', limit='max'){
    let url = 'https://' + host + '/' + topic + '/page/' + page + '/?filter=' + filter;
    let mediaItemsResponse = [];

    try{
        await fetch(url).then((response) => {
            return response.text();
        }).then((text) => {
            const $ = cheerio.load(text);

            let itemCount = $('.b-content__inline_items').children('.b-content__inline_item').length;
            let fetchLimit  = null;

            if(limit === 'max'){
                fetchLimit = itemCount
            }else if(limit > itemCount){
                fetchLimit = itemCount;
            }else{
                fetchLimit = limit;
            }

            let itemType = null;
            if(topic.includes('films')){
                itemType = 'films';
            }else if(topic.includes('series')){
                itemType = 'series';
            }else if(topic.includes('cartoons')){
                itemType = 'cartoons';
            }else if(topic.includes('animation')){
                itemType = 'animation'
            }

            for(let i=1; i<=fetchLimit; i++){
                let itemObject = {
                    id: $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').attr('data-id'),
                    type: itemType,
                    source: 'hdrezka',
                    host: host,

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
                    itemObject.poster = 'https://'+ host + $('.b-content__inline_items').children('.b-content__inline_item:nth-child('+ i +')').children('.b-content__inline_item-cover').children('a').children('img').attr('src');
                }

                mediaItemsResponse.push(itemObject);

                //console.log('Media Object: ' + JSON.stringify(itemObject));
                //console.log('--------------------------------------------');
            }
        });
        return mediaItemsResponse;
    }catch (e) {
        console.log(e);
    }
}

export default async (req, res) =>{
    res.status(200).json({data: await getMediaItems});
}

