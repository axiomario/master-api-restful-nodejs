const Follow = require('../models/follow');

const save = async (req, res) => {
    const params = req.body;

    try {
        // Create a new follow instance
        const follow = new Follow({
            user: req.user.id,
            followed: params.id
        });

        // Save the follow to the database
        const followStored = await follow.save();

        if (!followStored) {
            return res.status(404).send({ message: 'Follow not saved' });
        }

        return res.status(200).send({ follow: followStored });
    } catch (error) {
        return res.status(500).send({ message: 'Error saving follow', error });
    }
};

const unfollow = async (req, res) => {
    const userId = req.user.id;
    const followedId = req.body.id;
    try {
        // Remove the follow from the database
        const followRemoved = await Follow.findOneAndDelete({ user: userId, followed: followedId });

        if (!followRemoved) {
            return res.status(404).send({ message: 'Follow not found' });
        }

        return res.status(200).send({ follow: followRemoved });
    } catch (error) {
        return res.status(500).send({ message: 'Error unfollowing', error });
    }
};

const following = async (req, res) => {
    const userId = req.params.id;
    try {
        // Find all follows where the user is following
        const follows = await Follow.find({ user: userId }).populate('followed', 'name lastname image');

        if (!follows || follows.length === 0) {
            return res.status(404).send({ message: 'No follows found' });
        }

        return res.status(200).send({ follows });
    } catch (error) {
        return res.status(500).send({ message: 'Error fetching follows', error });
    }
};

const getFollowers = async (req, res) => {
    const followedId = req.params.id;
    try {
        // Find all follows where the user is followed
        const followers = await Follow.find({ followed: followedId }).populate('user', 'name lastname image');

        if (!followers || followers.length === 0) {
            return res.status(404).send({ message: 'No followers found' });
        }

        return res.status(200).send({ followers });
    } catch (error) {
        return res.status(500).send({ message: 'Error fetching followers', error });
    }
};

module.exports = {
    save,
    unfollow,
    following,
    getFollowers
};