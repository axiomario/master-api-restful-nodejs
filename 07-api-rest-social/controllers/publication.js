const Publication = require('../models/publication');
const Follow = require('../models/follow');

const save = async (req, res) => {
    const params = req.body;

    try {
        const file = req.file ? req.file.path.replace(/\\/g, '/') : undefined;
        const publication = new Publication({
            user: req.user.id,
            text: params.text,
            file
        });

        const publicationStored = await publication.save();
        return res.status(200).send({ status: 'success', publication: publicationStored });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', message: 'Error saving the publication' });
    }
};

const detail = async (req, res) => {
    const publicationId = req.params.id;

    try {
        const publication = await Publication.findById(publicationId).populate('user', '-password -__v -role -email');
        if (!publication) {
            return res.status(404).send({ status: 'error', message: 'Publication not found' });
        }
        return res.status(200).send({ status: 'success', publication });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', message: 'Error fetching the publication' });
    }
};

const remove = async (req, res) => {
    const publicationId = req.params.id;

    try {
        const publication = await Publication.findByIdAndDelete(publicationId);
        if (!publication) {
            return res.status(404).send({ status: 'error', message: 'Publication not found' });
        }
        return res.status(200).send({ status: 'success', message: 'Publication deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', message: 'Error deleting the publication' });
    }
};

const list = async (req, res) => {
    const userId = req.user.id;
    try {
        const publications = await Publication.find({ user: userId })
            .sort('-createdAt')
            .populate('user', '-password -__v -role -email');

        if (!publications || publications.length === 0) {
            return res.status(404).send({ status: 'error', message: 'No publications found' });
        }
        return res.status(200).send({ status: 'success', publications });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', message: 'Error fetching publications' });
    }
};

const feed = async (req, res) => {
    const userId = req.user.id;
    try {
        const following = (await Follow.find({ user: userId })).map(follow => follow.followed);
        const publications = await Publication.find({ user: { $in: following } })
            .sort('-createdAt')
            .populate('user', '-password -__v -role -email');

        if (!publications || publications.length === 0) {
            return res.status(404).send({ status: 'error', message: 'No publications found' });
        }
        return res.status(200).send({ status: 'success', publications });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', message: 'Error fetching publications' });
    }
};

module.exports = {
    save,
    detail,
    remove,
    list,
    feed
};