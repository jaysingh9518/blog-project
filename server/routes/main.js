const express = require('express');
const router = express.Router();
const Post = require('../models/post');

/**
 * GET
 * HOME
 */
router.get('', async (req, res) => {
    try {
        const locals = {
            title: 'Blog Project',
            description: 'This is my first blogging page',
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
        
        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        
        
        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });

    } catch (error) {
        console.log(error);
    }

});

/**
 * GET
 * Post :id
 */
router.get('/post/:id', async (req, res) => {
    try {

        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: 'This is the blogging page description',
        }

        res.render('post', { locals, data, currentRoute: '/post/$(slug)' });
    } catch (error) {
        console.log(error);
    }

});

/**
 * POST
 * Post = searchTerm
 */

router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: 'Search',
            description: 'This is my first blogging page',
        }

        let searchTerm = req.body.searchTerm;
        let searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const data = await Post.find({
             $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                { body: { $regex: new RegExp(searchNoSpecialChar, "i") } }
            ]
        });

        res.render("search", { data, locals, currentRoute: '/' });
        
    } catch (error) {
        console.log(error);
    }

});



// router.get('', async (req, res) => {

//     const locals = {
//         title: 'Blog Project',
//         description: 'This is my first blogging page',
//     }

//     try {
//         const data = await Post.find();
//         res.render('index', { locals, data });
//     } catch (error) {
//         console.log(error);
//     }

// });




router.get('/about', (req, res) => {
    res.render('about', {
        currentRoute: '/about'
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        currentRoute: '/contact'
    });
});


// function insertPostData () {
//     Post.insertMany([
//         {
//             title: "Exploring the Serene Beauty of Bali",
//             body: "Bali is not just a destination; it's an experience. From tranquil beaches to vibrant cultural sites, Bali offers a perfect blend of relaxation and adventure. Visit the iconic Tanah Lot Temple and enjoy breathtaking sunsets, or explore the lush rice terraces in Ubud for a true Balinese experience.",
//         },
//         {
//             title: "The Magical Landscapes of Iceland",
//             body: "Iceland is a land of fire and ice, where majestic glaciers meet active volcanoes. Take a dip in the Blue Lagoon's geothermal waters, chase the Northern Lights, or explore the otherworldly landscapes of the Golden Circle. Iceland is a dream destination for nature lovers and adventurers alike.",
//         },
//         {
//             title: "Discovering the Charm of Santorini, Greece",
//             body: "Santorini, with its iconic white-washed buildings and blue-domed churches, is a picturesque escape in the Aegean Sea. Stroll through the charming villages of Oia and Fira, savor delicious Mediterranean cuisine, and watch the sun set over the caldera for an unforgettable experience.",
//         },
//         {
//             title: "Adventures in New Zealand's South Island",
//             body: "New Zealand's South Island is a haven for outdoor enthusiasts. From hiking the rugged peaks of the Southern Alps to exploring the fjords of Milford Sound, this island offers endless opportunities for adventure. Don't miss the chance to bungee jump in Queenstown, the adventure capital of the world!",
//         },
//         {
//             title: "The Exotic Wonders of Dubai",
//             body: "Dubai is a city of superlatives, where modern skyscrapers meet traditional markets. Visit the world's tallest building, the Burj Khalifa, shop in luxury at the Dubai Mall, and experience the desert's beauty with a thrilling dune bashing adventure. Dubai offers a unique blend of luxury and culture.",
//         },
//         {
//             title: "The Enchanting Streets of Kyoto, Japan",
//             body: "Kyoto is the heart of Japan's cultural heritage, where ancient temples and serene gardens transport you to another era. Explore the famous Fushimi Inari Shrine, wander through the Arashiyama Bamboo Grove, and experience a traditional tea ceremony for a taste of Japan's rich history.",
//         },
//         {
//             title: "Vibrant Nights in Bangkok, Thailand",
//             body: "Bangkok is a city that never sleeps, offering a mix of traditional and modern experiences. Explore the ornate Grand Palace, take a boat ride along the Chao Phraya River, and indulge in the city's famous street food. The bustling markets and vibrant nightlife make Bangkok a must-visit destination.",
//         },
//         {
//             title: "Wildlife Safari in Serengeti, Tanzania",
//             body: "The Serengeti is synonymous with African wildlife and is home to one of the most spectacular natural events—the Great Migration. Witness millions of wildebeests, zebras, and gazelles traverse the plains, while keeping an eye out for the Big Five. A Serengeti safari is an unforgettable adventure.",
//         },
//         {
//             title: "Cultural Immersion in Cusco, Peru",
//             body: "Cusco, the gateway to Machu Picchu, is a city rich in history and culture. Explore the ancient Incan ruins, stroll through the vibrant San Pedro Market, and take in the colonial architecture. Cusco is a perfect blend of the old and new, offering a unique cultural experience in the Andes.",
//         },
//         {
//             title: "Exploring the Fjords of Norway",
//             body: "Norway's fjords are among the most stunning natural landscapes in the world. Cruise through the deep blue waters of Geirangerfjord, hike the dramatic cliffs of Preikestolen, and explore the charming coastal towns. Norway's fjords offer a serene escape into nature's wonders.",
//         },        
//     ])
// }

// insertPostData();


module.exports = router;