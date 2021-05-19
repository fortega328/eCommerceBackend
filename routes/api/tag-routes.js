const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: { model: Product }
    });

    const tags = tagData.map(tag => tag.get({ plain: true }));

    res.status(200).json(tags);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: { model: Product }
    });

    if (!tagData) {
      res.status(404).json({ message: "Tag not founds" });
      return;
    }

    const tag = tagData.get({ plain: true });

    res.status(200).json(tag);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', (req, res) => {
  Tag.create({ tag_name: req.body.tag_name })
    .then((tag) => res.status(201).json(tag))
    .catch((err) => res.status(400).json(err))
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update({ tag_name: req.body.tag_name }, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(updatedTag);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', (req, res) => {
  Tag.destroy({ where: { id: req.params.id } })
    .then(destroyedTag => res.status(200).json({ message: "Successfully delete tag" }))
    .catch(err => res.status(500).json(err))
});

module.exports = router;