export default defineEventHandler(async (event) => {
  try {
    // Basic health check - verify the application is running
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0'
    }

    // Set appropriate headers
    setHeader(event, 'Content-Type', 'application/json')
    setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')
    
    return healthStatus
  } catch (error) {
    // If there's any error, return unhealthy status
    setResponseStatus(event, 503)
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    }
  }
})