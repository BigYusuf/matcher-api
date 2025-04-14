/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics-related endpoints
 */

/**
 * @swagger
 * /api/analytics/match:
 *   get:
 *     summary: Admin - Get all match analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Match analytics retrieved
 *       401:
 *         description: Unauthorized or not admin
 */

/**
 * @swagger
 * /api/analytics/match/{id}:
 *   get:
 *     summary: Admin - Get specific match analytics by ID
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Match analytics ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match analytics retrieved
 *       404:
 *         description: Match analytics not found
 */

/**
 * @swagger
 * /api/analytics/match/{userId}:
 *   get:
 *     summary: Admin - Get match analytics for a specific user by userId
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID for match analytics
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match analytics for user retrieved
 *       404:
 *         description: User or match analytics not found
 */

/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Admin - Get all registration analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registration analytics retrieved
 *       401:
 *         description: Unauthorized or not admin
 */

/**
 * @swagger
 * /api/analytics/{id}:
 *   get:
 *     summary: Admin - Get registration analytics by ID
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Registration analytics ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration analytics retrieved
 *       404:
 *         description: Registration analytics not found
 */
