import pool from "./db.js";

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