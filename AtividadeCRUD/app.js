import express from "express";
import {v4 as uuidv4} from 'uuid';

const app = express();
app.use(express.json());

const animes = [
    {
        id: uuidv4(),
        name: 'Dragon Ball Daima',
        genre: "Ação, aventura e artes marciais",
        studio: "Toei Animation",
    },
    {
        id: uuidv4(),
        name: 'Naruto Shippuden',
        genre: "Aventura, comédia dramática, fantasia",
        studio: " Studio Pierrot",
    },
    {
        id: uuidv4(),
        name: 'Shingeki no Kyojin',
        genre: "Ação, fantasia sombria, horror e drama",
        studio: "MAPPA Studios",
    },
    {
        id: uuidv4(),
        name: 'Chainsaw Man ',
        genre: "Ação, terror e sobrenatura",
        studio: "MAPPA Studios",
    },
]



app.post("/animes", (req, res) => {
    const {name, genre, studio} = req.body;

    if (!name || !genre || !studio) {
        return res.status(400).json({error: "Todos os campos precisam ser preenchidos obrigatoriamente."});
    }
    const anime = {
        id: uuidv4(),
        name,
        genre,
        studio,
    }
    animes.push(anime);
    res.status(201).json(anime);
});

app.patch("/update/animes/:id", (req, res) => {
    const {id} = req.params;
    const {name, genre, studio} = req.body;

    if(!name || !genre || !studio) {
        return res.status(400).json({error: "Todos os campos precisam ser preenchidos."});
    }
    
    const animeFindId = animes.findIndex((animes) => animes.id === id);

    if (animeFindId === -1) {
        return res.status(404).json({error: "Anime não encontrado."});
    }

    animes[animeFindId] = {
        ...animes[animeFindId],
        name,
        genre,
        studio,
    }
    res.status(200).json(animes[animeFindId]);
});

app.delete("/animes/:id", (req, res) => {
    const [id] = req.params;
    const animeId = animes.findIndex(animes => animes.id === id);
    if (animeId !== -1){
     animes.splice(animeId, 1);
     return res.status(200).json({message: "Anime deletado com sucesso."});
    }
     return res.status(404).json({error: "Anime não encontrado."});
 });

app.get("/animes", (req, res) => {
    res.status(200).json(animes);
});

app.get("/animes/:id", (req, res) => {
    const {id} = req.params;
    const animeId = animes.findIndex((animes) => animes.id === id);

    if (animeId === -1){
        return res.status(404).json({error: "Anime não encontrado"});
    }
    return res.status(200).json(animes.find((anime) => anime.id === id));
});

export default app;