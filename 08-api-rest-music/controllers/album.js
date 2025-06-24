const Album = require('../models/album');
const Song = require('../models/song');

const save = async (req, res) => {
    try {
        const { artist, title, description, year } = req.body;
        const newAlbum = new Album({ artist, title, description, year });
        
        await newAlbum.save();
        res.status(201).json({ message: 'Album created successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const details = async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findById(albumId).populate('artist');
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const albumsByArtist = async (req, res) => {
    try {
        const artistId = req.params.artistId;
        const albums = await Album.find({ artist: artistId });
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const update = async (req, res) => {
    try {
        const albumId = req.params.id;
        const updatedAlbum = await Album.findByIdAndUpdate(albumId, req.body, { new: true });
        if (!updatedAlbum) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.status(200).json(updatedAlbum);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const remove = async (req, res) => {
    try {
        const albumId = req.params.id;
        const deletedSongs = Song.deleteMany({ album: albumId });
        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        await album.remove();
        res.status(200).json({ message: 'Album deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    save,
    details,
    albumsByArtist,
    update,
    remove
};