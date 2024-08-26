
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const axios = require('axios');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use('/images/heroes', express.static('heroes'));
app.use('/images/movies', express.static('movies'));
app.use('/images/musicians', express.static('musicians'));
app.use('/images/videogames', express.static('videogames'));


const heroes = 'HEROES';
const movies = 'MOVIES';
const videogames = 'VIDEOGAMES';
const musicians = 'MUSICIANS';

const THEME_TYPE = {
    HEROES: heroes,
    MOVIES: movies,
    VIDEOGAMES: videogames,
    MUSICIANS: musicians,
};



//const heroesImages = ['/images/heroes/TM01-001.png', '/images/heroes/TM01-002.png', '/images/heroes/TM01-003.png', '/images/heroes/TM01-004.png', '/images/heroes/TM01-005.png', '/images/heroes/TM01-006.png', '/images/heroes/TM01-007.png', '/images/heroes/TM01-008.png', '/images/heroes/TM01-009.png', '/images/heroes/TM01-010.png', '/images/heroes/TM01-011.png', '/images/heroes/TM01-012.png', '/images/heroes/TM01-013.png', '/images/heroes/TM01-014.png', '/images/heroes/TM01-015.png', '/images/heroes/TM01-016.png', '/images/heroes/TM01-017.png', '/images/heroes/TM01-018.png', '/images/heroes/TM01-019.png', '/images/heroes/TM01-020.png', '/images/heroes/TM01-021.png', '/images/heroes/TM01-022.png', '/images/heroes/TM01-023.png', '/images/heroes/TM01-024.png', '/images/heroes/TM01-025.png', '/images/heroes/TM01-026.png', '/images/heroes/TM01-027.png', '/images/heroes/TM01-028.png', '/images/heroes/TM01-029.png', '/images/heroes/TM01-030.png'];
const heroesImages = ['TM01-001.png', 'TM01-002.png', 'TM01-003.png', 'TM01-004.png', 'TM01-005.png', 'TM01-006.png', 'TM01-007.png', 'TM01-008.png', 'TM01-009.png', 'TM01-010.png', 'TM01-011.png', 'TM01-012.png', 'TM01-013.png', 'TM01-014.png', 'TM01-015.png', 'TM01-016.png', 'TM01-017.png', 'TM01-018.png', 'TM01-019.png', 'TM01-020.png', 'TM01-021.png', 'TM01-022.png', 'TM01-023.png', 'TM01-024.png', 'TM01-025.png', 'TM01-026.png', 'TM01-027.png', 'TM01-028.png', 'TM01-029.png', 'TM01-030.png'];

const moviesImages = ['TM02-001.png', 'TM02-002.png', 'TM02-003.png', 'TM02-004.png', 'TM02-005.png', 'TM02-006.png', 'TM02-007.png', 'TM02-008.png', 'TM02-009.png', 'TM02-010.png', 'TM02-011.png', 'TM02-012.png', 'TM02-013.png', 'TM02-014.png', 'TM02-015.png', 'TM02-016.png', 'TM02-017.png', 'TM02-018.png', 'TM02-019.png', 'TM02-020.png', 'TM02-021.png', 'TM02-022.png', 'TM02-023.png', 'TM02-024.png'];
const musiciansImages = ['TM03-001.png', 'TM03-002.png', 'TM03-003.png', 'TM03-004.png', 'TM03-005.png', 'TM03-006.png', 'TM03-007.png', 'TM03-008.png', 'TM03-009.png', 'TM03-010.png', 'TM03-011.png', 'TM03-012.png', 'TM03-013.png', 'TM03-014.png', 'TM03-015.png', 'TM03-016.png', 'TM03-017.png', 'TM03-018.png', 'TM03-019.png', 'TM03-020.png', 'TM03-021.png', 'TM03-022.png', 'TM03-023.png', 'TM03-024.png', 'TM03-025.png', 'TM03-026.png', 'TM03-027.png', 'TM03-028.png', 'TM03-029.png', 'TM03-030.png'];
const videogamesImages = ['TM04-001.png', 'TM04-002.png', 'TM04-003.png', 'TM04-004.png', 'TM04-005.png', 'TM04-006.png', 'TM04-007.png', 'TM04-008.png', 'TM04-009.png', 'TM04-010.png', 'TM04-011.png', 'TM04-012.png', 'TM04-013.png', 'TM04-014.png', 'TM04-015.png', 'TM04-016.png', 'TM04-017.png', 'TM04-018.png', 'TM04-019.png', 'TM04-020.png', 'TM04-021.png', 'TM04-022.png', 'TM04-023.png', 'TM04-024.png', 'TM04-025.png', 'TM04-026.png', 'TM04-027.png', 'TM04-028.png', 'TM04-029.png', 'TM04-030.png', 'TM04-031.png', 'TM04-032.png', 'TM04-033.png', 'TM04-034.png', 'TM04-035.png', 'TM04-036.png'];



const databaseURL = 'https://funkomemorygame-default-rtdb.firebaseio.com/.json';

app.post('/score', (request, response) => {
	let body = [];
	request.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		const jsonData = Buffer.concat(body).toString();
		if (jsonData !== undefined) {
			const score = JSON.parse(jsonData);
			if (score !== undefined &&
				score.clicks !== undefined &&
				score.time !== undefined &&
				score.score !== undefined &&
				score.username !== undefined &&
				score.difficulty !== undefined) {

				axios.post(databaseURL, score).then(function (result) {
					response.send('Score saved!');
				}).catch(function (error) {
					response.send(error);
				});

			} else {
				response.send('Some data in score undefined or null!');
			}
		} else {
			response.send('request.body undefined or null!');
		}
	});
});


app.get('/scores', (request, response) => {
	axios.get(databaseURL)
		.then(function (res) {
			response.send(res.data);
		})
		.catch(function (error) {
			response.send(JSON.stringify({ error: 'Error requestion scores' }));
		})
		.finally(function () {
			// always executed
		});
});

app.get('/cards/:difficulty/:theme', (request, response) => {
    console.log('difficulty', request.params.difficulty);  
    console.log('theme', request.params.theme);
    
    let cards = [];
    
    if (request?.params?.theme && request?.params?.difficulty) {
        const difficulty = parseInt(request.params.difficulty);
        

        switch (request.params.theme) {
            case THEME_TYPE.HEROES:
                cards = getCardsFromIconsList(heroesImages, difficulty);
                break;
            case THEME_TYPE.MOVIES:
                cards = getCardsFromIconsList(moviesImages, difficulty);
                break;
            case THEME_TYPE.MUSICIANS:
                cards = getCardsFromIconsList(musiciansImages, difficulty);
                break;
            case THEME_TYPE.VIDEOGAMES:
                cards = getCardsFromIconsList(videogamesImages, difficulty);
                break;
            default: 
                response.status(400).json({ error: 'Invalid theme type' });
                return;
        }

        shuffle(cards);

        console.log(cards);
    } else {
        response.status(400).json({ error: 'Invalid parameters' });
        return;
    }

    response.send(JSON.stringify({ 'cards': cards }));
});


function getCardsFromIconsList(list, quantity) {

    let iconIndexes = [];
    for (let i = 0; i < quantity; i++) {
        let iconIndex = getUniqueIndex(0, list.length, iconIndexes);
        iconIndexes.push(iconIndex);
    }

    let cards = [];
    for (let i = 0; i < iconIndexes.length; i++) {
        let icon = list[iconIndexes[i]];
        let card = {
            isDiscovered: false,
            icon: icon,
            id: i
        };

        cards.push(card);
    }

    let cardsDuplicate = cards.slice();
    cards = cards.concat(cardsDuplicate);

    return cards;
}

function getUniqueIndex(min, max, iconIndexes) {
    const newIndex = generateRandomIndex(min, max);

    for (let i = 0; i < iconIndexes.length; i++){
        if (newIndex === iconIndexes[i]) {
            return getUniqueIndex(min, max, iconIndexes);
        }
    }

    return newIndex;
}

function generateRandomIndex(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}



function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}


app.listen(port, () => {
    console.log(`Memory game running `);
});


