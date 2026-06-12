import pool from './db.js';

export async function addVolunteerToProject(userId, projectId) {
    const sql = `
        INSERT INTO project_volunteers (
            user_id,
            project_id
        )
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING;
    `;

    const queryParams = [userId, projectId];

    await pool.query(sql, queryParams);
}

export async function removeVolunteerFromProject(userId, projectId) {
    const sql = `
        DELETE FROM project_volunteers
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const queryParams = [userId, projectId];

    await pool.query(sql, queryParams);
}

export async function getVolunteerProjectsByUserId(userId) {
    const sql = `
        SELECT
            projects.project_id,
            projects.title,
            projects.description,
            projects.location,
            projects.date,
            organization.organization_id,
            organization.name AS organization_name
        FROM project_volunteers
        JOIN projects
            ON project_volunteers.project_id = projects.project_id
        JOIN organization
            ON projects.organization_id = organization.organization_id
        WHERE project_volunteers.user_id = $1
        ORDER BY projects.date ASC;
    `;

    const queryParams = [userId];

    const result = await pool.query(sql, queryParams);

    return result.rows;
}

export async function isUserVolunteeringForProject(userId, projectId) {
    const sql = `
        SELECT
            user_id,
            project_id
        FROM project_volunteers
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const queryParams = [userId, projectId];

    const result = await pool.query(sql, queryParams);

    return result.rows.length > 0;
}