const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

const save = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newArtist = new Artist({ name, description });
        
        await newArtist.save();
        res.status(201).json({ message: 'Artist created successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getDetails = async (req, res) => {
    try {
        const artistId = req.params.id;
        const artist = await Artist.findById(artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const list = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const edit = async (req, res) => {
    try {
        const artistId = req.params.id;
        const { name, description } = req.body;
        const updatedArtist = await Artist.findByIdAndUpdate(artistId, { name, description }, { new: true });
        if (!updatedArtist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.status(200).json(updatedArtist);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const remove = async (req, res) => {
    try {
        const artistId = req.params.id;
        const albumsToDelete = await Album.find({ artist: artistId });
        albumsToDelete.forEach(async (album) => {
            await Song.deleteMany({ album: album._id });
            album.remove();
        });
        const deletedArtist = await Artist.findByIdAndDelete(artistId);

        if (!deletedArtist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    save,
    getDetails,
    list,
    edit,
    remove
};