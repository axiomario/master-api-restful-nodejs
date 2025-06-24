const Song = require('../models/song');

const save = async (req, res) => {
    try {
        const { album, track, name, duration } = req.body;
        const newSong = new Song({ album, track, name, duration });
        
        await newSong.save();
        res.status(201).json({ message: 'Song created successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const details = async (req, res) => {
    try {
        const songId = req.params.id;
        const song = await Song.findById(songId).populate('album');
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const songsByAlbum = async (req, res) => {
    try {
        const albumId = req.params.albumId;
        const songs = await Song.find({ album: albumId }).sort('track');
        if (!songs || songs.length === 0) {
            return res.status(404).json({ message: 'No songs found for this album' });
        }
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const update = async (req, res) => {
    try {
        const songId = req.params.id;
        const updatedSong = await Song.findByIdAndUpdate(songId, req.body, { new: true });
        if (!updatedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json({ message: 'Song updated successfully', song: updatedSong });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const remove = async (req, res) => {
    try {
        const songId = req.params.id;
        const deletedSong = await Song.findByIdAndDelete(songId);
        if (!deletedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    save,
    details,
    songsByAlbum,
    update,
    remove
};