/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: Matching and compatibility endpoints
 */

/**
 * @swagger
 * /api/matches/admin:
 *   get:
 *     summary: Admin - Get all match results
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All matches retrieved
 *       401:
 *         description: Unauthorized or not admin
 */

/**
 * @swagger
 * /api/matches/admin/{id}:
 *   get:
 *     summary: Admin - Get specific match result by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Match ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match result retrieved
 *       404:
 *         description: Match not found
 */

/**
 * @swagger
 * /api/matches:
 *   post:
 *     summary: Match users based on compatibility criteria
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               preferences:
 *                 type: object
 *             required:
 *               - userId
 *     responses:
 *       200:
 *         description: Matching complete
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/matches/{userId}:
 *   get:
 *     summary: Get a specific user's match results
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID to fetch match results for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match results retrieved
 *       404:
 *         description: User or results not found
 */
