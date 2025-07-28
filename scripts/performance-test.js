#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

/**
 * Performance Testing Script for Shadcn Integration
 * Measures build time, bundle size, and runtime performance
 */

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function measureBuildTime() {
  console.log('⏱️  Measuring build time...')
  
  const startTime = Date.now()
  
  try {
    // Clean previous build
    execSync('rm -rf .nuxt/dist', { stdio: 'pipe' })
    
    // Run build and capture output
    execSync('npm run build', { stdio: 'pipe' })
    
    const buildTime = Date.now() - startTime
    console.log(`✅ Build completed in ${buildTime}ms (${(buildTime / 1000).toFixed(2)}s)`)
    
    return buildTime
  } catch (error) {
    console.error('❌ Build failed:', error.message)
    return -1
  }
}

function analyzeBundleSize() {
  console.log('📦 Analyzing bundle size...')
  
  const distPath = '.nuxt/dist/client/_nuxt'
  
  if (!existsSync(distPath)) {
    console.error('❌ Build output not found')
    return null
  }
  
  const files = readdirSync(distPath)
  let totalSize = 0
  let jsSize = 0
  let cssSize = 0
  const chunks = []
  
  for (const file of files) {
    const filePath = join(distPath, file)
    const stats = statSync(filePath)
    const size = stats.size
    
    totalSize += size
    
    if (file.endsWith('.js')) {
      jsSize += size
      chunks.push({
        name: file,
        size: size,
        type: 'js'
      })
    } else if (file.endsWith('.css')) {
      cssSize += size
      chunks.push({
        name: file,
        size: size,
        type: 'css'
      })
    }
  }
  
  // Sort chunks by size
  chunks.sort((a, b) => b.size - a.size)
  
  console.log(`📊 Bundle Analysis:`)
  console.log(`   Total Size: ${formatBytes(totalSize)}`)
  console.log(`   JavaScript: ${formatBytes(jsSize)} (${((jsSize / totalSize) * 100).toFixed(1)}%)`)
  console.log(`   CSS: ${formatBytes(cssSize)} (${((cssSize / totalSize) * 100).toFixed(1)}%)`)
  console.log(`   Total Files: ${files.length}`)
  
  // Show largest chunks
  console.log(`\n🔍 Largest Chunks:`)
  chunks.slice(0, 5).forEach((chunk, index) => {
    console.log(`   ${index + 1}. ${formatBytes(chunk.size)} - ${chunk.name} [${chunk.type.toUpperCase()}]`)
  })
  
  return {
    totalSize,
    jsSize,
    cssSize,
    fileCount: files.length,
    chunks: chunks.slice(0, 10)
  }
}

function checkTreeShaking() {
  console.log('🌳 Checking tree-shaking effectiveness...')
  
  const distPath = '.nuxt/dist/client/_nuxt'
  
  if (!existsSync(distPath)) {
    console.error('❌ Build output not found')
    return null
  }
  
  const files = readdirSync(distPath).filter(f => f.endsWith('.js'))
  let unusedCode = 0
  let totalCode = 0
  
  // Simple heuristic: look for common unused patterns
  const unusedPatterns = [
    /console\.(log|info|debug|warn)/g,
    /\/\*[\s\S]*?\*\//g, // Block comments
    /\/\/.*$/gm, // Line comments
  ]
  
  for (const file of files) {
    try {
      const content = readFileSync(join(distPath, file), 'utf-8')
      totalCode += content.length
      
      for (const pattern of unusedPatterns) {
        const matches = content.match(pattern)
        if (matches) {
          unusedCode += matches.join('').length
        }
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  const treeShakingEffectiveness = ((totalCode - unusedCode) / totalCode * 100).toFixed(1)
  
  console.log(`   Tree-shaking effectiveness: ${treeShakingEffectiveness}%`)
  console.log(`   Removed code: ${formatBytes(unusedCode)}`)
  console.log(`   Remaining code: ${formatBytes(totalCode - unusedCode)}`)
  
  return {
    effectiveness: parseFloat(treeShakingEffectiveness),
    removedSize: unusedCode,
    remainingSize: totalCode - unusedCode
  }
}

function generatePerformanceReport(buildTime, bundleAnalysis, treeShaking) {
  console.log('\n📋 Performance Report')
  console.log('=' .repeat(50))
  
  // Build Performance
  console.log('\n🏗️  Build Performance:')
  if (buildTime > 0) {
    console.log(`   Build Time: ${buildTime}ms`)
    console.log(`   Status: ${buildTime < 30000 ? '✅ Good' : buildTime < 60000 ? '⚠️  Acceptable' : '❌ Slow'}`)
  }
  
  // Bundle Size Performance
  if (bundleAnalysis) {
    console.log('\n📦 Bundle Performance:')
    console.log(`   Total Size: ${formatBytes(bundleAnalysis.totalSize)}`)
    console.log(`   JS Size: ${formatBytes(bundleAnalysis.jsSize)}`)
    console.log(`   CSS Size: ${formatBytes(bundleAnalysis.cssSize)}`)
    
    const sizeStatus = bundleAnalysis.totalSize < 1024 * 1024 ? '✅ Good' : 
                      bundleAnalysis.totalSize < 2 * 1024 * 1024 ? '⚠️  Acceptable' : '❌ Large'
    console.log(`   Size Status: ${sizeStatus}`)
  }
  
  // Tree-shaking Performance
  if (treeShaking) {
    console.log('\n🌳 Tree-shaking Performance:')
    console.log(`   Effectiveness: ${treeShaking.effectiveness}%`)
    console.log(`   Removed Code: ${formatBytes(treeShaking.removedSize)}`)
    
    const shakingStatus = treeShaking.effectiveness > 80 ? '✅ Excellent' :
                         treeShaking.effectiveness > 60 ? '⚠️  Good' : '❌ Poor'
    console.log(`   Status: ${shakingStatus}`)
  }
  
  // Recommendations
  console.log('\n💡 Optimization Recommendations:')
  
  if (buildTime > 60000) {
    console.log('   • Consider enabling build caching')
    console.log('   • Review large dependencies')
  }
  
  if (bundleAnalysis && bundleAnalysis.totalSize > 2 * 1024 * 1024) {
    console.log('   • Implement code splitting for large chunks')
    console.log('   • Consider lazy loading for non-critical components')
  }
  
  if (treeShaking && treeShaking.effectiveness < 70) {
    console.log('   • Review unused imports and exports')
    console.log('   • Enable more aggressive minification')
  }
  
  console.log('   • Monitor bundle size in CI/CD pipeline')
  console.log('   • Consider implementing bundle analysis in development')
  
  console.log('\n✨ Performance testing completed!')
}

async function runPerformanceTest() {
  console.log('🚀 Starting Performance Test for Shadcn Integration\n')
  
  // Measure build time
  const buildTime = measureBuildTime()
  
  // Analyze bundle size
  const bundleAnalysis = analyzeBundleSize()
  
  // Check tree-shaking effectiveness
  const treeShaking = checkTreeShaking()
  
  // Generate comprehensive report
  generatePerformanceReport(buildTime, bundleAnalysis, treeShaking)
}

// Run the performance test
runPerformanceTest().catch(console.error)