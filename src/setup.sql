DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS organization CASCADE;

-- =====================================
-- Organization Table
-- =====================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- =====================================
-- Roles Table
-- =====================================

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

-- =====================================
-- Users Table
-- =====================================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- Projects Table
-- =====================================

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- =====================================
-- Categories Table
-- =====================================

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- =====================================
-- Project Categories Table
-- =====================================

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);

-- =====================================
-- Insert sample data: Organizations
-- =====================================

INSERT INTO organization
(name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

-- =====================================
-- Insert sample data: Roles
-- =====================================

INSERT INTO roles (role_name, role_description)
VALUES
(
    'user',
    'Standard user with basic access'
),
(
    'admin',
    'Administrator with full system access'
);

-- =====================================
-- Insert sample data: Projects
-- =====================================

INSERT INTO projects
(organization_id, title, description, location, date)
VALUES
(
    1,
    'Beach Cleanup',
    'Cleaning the beach area',
    'Miami',
    '2026-05-20'
),
(
    1,
    'Food Drive',
    'Collecting food donations',
    'Orlando',
    '2026-06-10'
),
(
    2,
    'Tree Planting',
    'Planting trees in parks',
    'Dallas',
    '2026-07-15'
),
(
    2,
    'School Support',
    'Helping local schools',
    'Austin',
    '2026-08-01'
),
(
    3,
    'Animal Rescue',
    'Helping abandoned pets',
    'Denver',
    '2026-09-05'
);

-- =====================================
-- Insert sample data: Categories
-- =====================================

INSERT INTO categories (name)
VALUES
('Environment'),
('Education'),
('Community Support');

-- =====================================
-- Associate projects with categories
-- =====================================

INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 1),
(2, 3),
(3, 1),
(4, 2),
(5, 3);

-- =====================================
-- Verify inserted data
-- =====================================

SELECT * FROM organization;
SELECT * FROM roles;
SELECT * FROM users;
SELECT * FROM projects;
SELECT * FROM categories;

SELECT
    projects.title,
    categories.name AS category_name
FROM project_categories
JOIN projects
    ON project_categories.project_id = projects.project_id
JOIN categories
    ON project_categories.category_id = categories.category_id;