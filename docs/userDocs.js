/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication endpoints
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               type:
 *                 type: string
 *               prompt:
 *                 type: string
 *             required:
 *               - text
 *               - type
 *               - prompt
 *     responses:
 *       201:
 *         description: Registered successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get your own profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile retrieved
 *       404:
 *         description: Profile not found
 */

/**
 * @swagger
 * /api/users/admin:
 *   get:
 *     summary: Admin - Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users retrieved
 *       401:
 *         description: Unauthorized or not admin
 */

/**
 * @swagger
 * /api/users/admin/{id}:
 *   get:
 *     summary: Admin - Get specific user profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       404:
 *         description: User not found
 */
