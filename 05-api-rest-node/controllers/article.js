const validator = require('validator');
const Article = require('../models/article');

const getArticles = (req, res) => {
    Article.find({}).sort({date: -1}).limit(3).then((articles) => {
        if (!articles || articles.length === 0) {
            return res.status(404).send({
                message: 'No articles found'
            });
        }

        return res.status(200).send({
            message: 'Articles retrieved successfully',
            articles: articles
        });
    }).catch((error) => {
        return res.status(500).send({
            message: 'Error retrieving articles',
            error: error.message
        });
    });
};

const getArticle = (req, res) => {
    const articleId = req.params.id;

    if (!validator.isMongoId(articleId)) {
        return res.status(400).send({
            message: 'Invalid article ID'
        });
    }

    Article.findById(articleId).then((article) => {
        if (!article) {
            return res.status(404).send({
                message: 'Article not found'
            });
        }

        return res.status(200).send({
            message: 'Article retrieved successfully',
            article: article
        });
    }).catch((error) => {
        return res.status(500).send({
            message: 'Error retrieving article',
            error: error.message
        });
    });
};

const save = (req, res) => {
    const { title, content } = req.body;

    try {
        // Validate title
        if (!title || !validator.isLength(title, { min: 3 })) {
            return res.status(400).send({
                message: 'Title is required and must be at least 3 characters long'
            });
        }

        // Validate content
        if (!content || !validator.isLength(content, { min: 5 })) {
            return res.status(400).send({
                message: 'Content is required and must be at least 5 characters long'
            });
        }

        // Create new article
        const article = new Article(req.body);

        article.save().then((articleStored) => {
            if (!articleStored) {
                return res.status(404).send({
                    message: 'Article not saved'
                });
            }

            return res.status(200).send({
                message: 'Save article',
                article: articleStored
            });
        }).catch((error) => {
            throw error;
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Error saving article',
            error: error.message
        });
    }
};

const updateArticle = (req, res) => {
    const articleId = req.params.id;
    const updateData = req.body;

    if (!validator.isMongoId(articleId)) {
        return res.status(400).send({
            message: 'Invalid article ID'
        });
    }

    Article.findByIdAndUpdate(articleId, updateData, { new: true }).then((articleUpdated) => {
        if (!articleUpdated) {
            return res.status(404).send({
                message: 'Article not found'
            });
        }

        return res.status(200).send({
            message: 'Article updated successfully',
            article: articleUpdated
        });
    }).catch((error) => {
        return res.status(500).send({
            message: 'Error updating article',
            error: error.message
        });
    });
};

const deleteArticle = (req, res) => {
    const articleId = req.params.id;

    if (!validator.isMongoId(articleId)) {
        return res.status(400).send({
            message: 'Invalid article ID'
        });
    }

    Article.findByIdAndDelete(articleId).then((articleDeleted) => {
        if (!articleDeleted) {
            return res.status(404).send({
                message: 'Article not found'
            });
        }

        return res.status(200).send({
            message: 'Article deleted successfully',
            article: articleDeleted
        });
    }).catch((error) => {
        return res.status(500).send({
            message: 'Error deleting article',
            error: error.message
        });
    });
}

const searchArticles = (req, res) => {
    const searchQuery = req.params.search;

    if (!searchQuery || !validator.isLength(searchQuery, { min: 1 })) {
        return res.status(400).send({
            message: 'Search query is required'
        });
    }

    Article.find({ title: new RegExp(searchQuery, 'i') }).then((articles) => {
        if (!articles || articles.length === 0) {
            return res.status(404).send({
                message: 'No articles found matching the search query'
            });
        }

        return res.status(200).send({
            message: 'Articles found',
            articles: articles
        });
    }).catch((error) => {
        return res.status(500).send({
            message: 'Error searching articles',
            error: error.message
        });
    });
}

module.exports = {
    getArticles,
    getArticle,
    save,
    updateArticle,
    deleteArticle,
    searchArticles
};