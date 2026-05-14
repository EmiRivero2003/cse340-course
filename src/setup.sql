DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS organization;

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
-- Verify inserted organizations
-- =====================================

SELECT * FROM organization;

-- =====================================
-- Project Table
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
-- Verify inserted projects
-- =====================================

SELECT * FROM projects;