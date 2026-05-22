import pool from './db.js';

export async function getAllProjects() {

    const sql = `
        SELECT
            projects.project_id,
            projects.title,
            projects.description,
            projects.location,
            projects.date,
            organization.name AS organization_name
        FROM projects
        JOIN organization
            ON projects.organization_id = organization.organization_id
        ORDER BY projects.date;
    `;

    const result = await pool.query(sql);

    return result.rows;
}

export async function getProjectsByOrganizationId(organizationId) {

    const sql = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM projects
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const queryParams = [organizationId];

    const result = await pool.query(sql, queryParams);

    return result.rows;
}