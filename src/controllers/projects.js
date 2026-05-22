const showProjectsPage = async (req, res) => {
    const title = 'Service Projects';
    const projects = [];

    res.render('projects', { title, projects });
};

export { showProjectsPage };