// src/routes.js

import express from 'express';

// Home controller

import { showHomePage } from './controllers/index.js';

// Organization-related controllers

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

// Project-related controllers

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

// Category-related controllers

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

// User-related controllers

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    showUsersPage
} from './controllers/users.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// =====================================
// Home Routes
// =====================================

router.get('/', showHomePage);

// =====================================
// Organization Routes
// =====================================

router.get('/organizations', showOrganizationsPage);

router.get('/organization/:id', showOrganizationDetailsPage);

router.get(
    '/new-organization',
    requireRole('admin'),
    showNewOrganizationForm
);

router.post(
    '/new-organization',
    requireRole('admin'),
    organizationValidation,
    processNewOrganizationForm
);

router.get(
    '/edit-organization/:id',
    requireRole('admin'),
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    requireRole('admin'),
    processEditOrganizationForm
);

// =====================================
// Project Routes
// =====================================

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get(
    '/new-project',
    requireRole('admin'),
    showNewProjectForm
);

router.post(
    '/new-project',
    requireRole('admin'),
    projectValidation,
    processNewProjectForm
);

router.get(
    '/edit-project/:id',
    requireRole('admin'),
    showEditProjectForm
);

router.post(
    '/edit-project/:id',
    requireRole('admin'),
    projectValidation,
    processEditProjectForm
);

// =====================================
// Category Routes
// =====================================

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

router.get(
    '/new-category',
    requireRole('admin'),
    showNewCategoryForm
);

router.post(
    '/new-category',
    requireRole('admin'),
    categoryValidation,
    processNewCategoryForm
);

router.get(
    '/edit-category/:id',
    requireRole('admin'),
    showEditCategoryForm
);

router.post(
    '/edit-category/:id',
    requireRole('admin'),
    categoryValidation,
    processEditCategoryForm
);

router.get(
    '/project/:projectId/assign-categories',
    requireRole('admin'),
    showAssignCategoriesForm
);

router.post(
    '/project/:projectId/assign-categories',
    requireRole('admin'),
    processAssignCategoriesForm
);

// =====================================
// User Routes
// =====================================

router.get('/register', showUserRegistrationForm);

router.post('/register', processUserRegistrationForm);

router.get('/login', showLoginForm);

router.post('/login', processLoginForm);

router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);

router.get('/users', requireRole('admin'), showUsersPage);

// =====================================
// Error Testing Routes
// =====================================

router.get('/test-error', testErrorPage);

export default router;