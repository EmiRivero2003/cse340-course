import pool from './db.js';

export async function getAllProjects() {
    const sql = `
        SELECT
            projects.project_id,
            projects.title,
            projects.description,
            projects.location,
            projects.date,
            projects.organization_id,
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

export async function getUpcomingProjects(numberOfProjects) {
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
        JOIN organization
            ON projects.organization_id = organization.organization_id
        WHERE projects.date >= CURRENT_DATE
        ORDER BY projects.date ASC
        LIMIT $1;
    `;

    const queryParams = [numberOfProjects];

    const result = await pool.query(sql, queryParams);

    return result.rows;
}

export async function getProjectDetails(projectId) {
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
        JOIN organization
            ON projects.organization_id = organization.organization_id
        WHERE projects.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await pool.query(sql, queryParams);

    return result.rows.length > 0
        ? result.rows[0]
        : null;
}

export async function createProject(title, description, location, date, organizationId) {
    const sql = `
        INSERT INTO projects (title, description, location, date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];

    const result = await pool.query(sql, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    return result.rows[0].project_id;
}

export async function updateProject(projectId, projectData) {
    const sql = `
        UPDATE projects
        SET
            title = $1,
            description = $2,
            date = $3,
            location = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING *;
    `;

    const queryParams = [
        projectData.title,
        projectData.description,
        projectData.date,
        projectData.location,
        projectData.organization_id,
        projectId
    ];

    const result = await pool.query(sql, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found or update failed.');
    }

    return result.rows[0];
}