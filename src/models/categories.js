import pool from './db.js';

export async function getAllCategories() {
    const sql = `
        SELECT
            category_id,
            name
        FROM categories
        ORDER BY name;
    `;

    const result = await pool.query(sql);

    return result.rows;
}

export async function getCategoryDetails(categoryId) {
    const sql = `
        SELECT
            category_id,
            name
        FROM categories
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];

    const result = await pool.query(sql, queryParams);

    return result.rows.length > 0
        ? result.rows[0]
        : null;
}

export async function getProjectsByCategoryId(categoryId) {
    const sql = `
        SELECT
            projects.project_id,
            projects.title,
            projects.description,
            projects.date,
            projects.location,
            projects.organization_id,
            organization.name AS organization_name
        FROM projects
        JOIN project_categories
            ON projects.project_id = project_categories.project_id
        JOIN organization
            ON projects.organization_id = organization.organization_id
        WHERE project_categories.category_id = $1
        ORDER BY projects.date;
    `;

    const queryParams = [categoryId];

    const result = await pool.query(sql, queryParams);

    return result.rows;
}

export async function getCategoriesByProjectId(projectId) {
    const sql = `
        SELECT
            categories.category_id,
            categories.name
        FROM categories
        JOIN project_categories
            ON categories.category_id = project_categories.category_id
        WHERE project_categories.project_id = $1
        ORDER BY categories.name;
    `;

    const queryParams = [projectId];

    const result = await pool.query(sql, queryParams);

    return result.rows;
}