const showCategoriesPage = async (req, res) => {
    const title = 'Service Project Categories';
    const categories = [];

    res.render('categories', { title, categories });
};

export { showCategoriesPage };