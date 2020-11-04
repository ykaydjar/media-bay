import cheerio from 'cheerio';

export default async function GetPosterHD(req, res){
    res.status(200).json(await fetch(req.query.url).then((response) => {
        return response.text();
    }).then((text) => {
       const $ = cheerio.load(text);

       const posterHDUrl = $('.b-sidecover').children('a').attr('href');

       return({posterHD: posterHDUrl});
    }))
}