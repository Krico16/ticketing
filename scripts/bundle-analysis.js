#!/usr/bin/env node

import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

/**
 * Bundle Analysis Script for Shadcn Integration Performance Optimization
 * Analyzes the build output to identify bundle size impact and optimization opportunities
 */

const DIST_PATH = '.nuxt/dist/client/_nuxt'

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function analyzeBundle() {
  console.log('🔍 Bundle Analysis for Shadcn Integration\n')
  
  if (!existsSync(DIST_PATH)) {
    console.error('❌ Build output not found. Please run "npm run build" first.')
    process.exit(1)
  }

  try {
    const files = readdirSync(DIST_PATH)
    const chunks = []
    let totalSize = 0
    
    // Analyze all JS files in the build output
    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = join(DIST_PATH, file)
        const stats = statSync(filePath)
        const size = stats.size
        totalSize += size
        
        chunks.push({
          name: file.replace('.js', ''),
          file: file,
          size: size,
          formattedSize: formatBytes(size),
          isShadcn: file.includes('button') || file.includes('card') || 
                   file.includes('input') || file.includes('ui'),
          isVendor: file.includes('vendor') || file.includes('node_modules') ||
                   file.length > 8, // Likely vendor chunks have hash names
          isNuxtUI: file.includes('nuxt') || file.includes('Nuxt'),
          isLarge: size > 50000 // > 50KB
        })
      }
    }
    
    // Sort by size (largest first)
    chunks.sort((a, b) => b.size - a.size)
    
    console.log(`📊 Total Bundle Size: ${formatBytes(totalSize)}\n`)
    
    // Categorize chunks
    const shadcnChunks = chunks.filter(c => c.isShadcn)
    const vendorChunks = chunks.filter(c => c.isVendor && !c.isShadcn)
    const nuxtUIChunks = chunks.filter(c => c.isNuxtUI)
    const appChunks = chunks.filter(c => !c.isShadcn && !c.isVendor && !c.isNuxtUI)
    const largeChunks = chunks.filter(c => c.isLarge)
    
    console.log('📦 Chunk Categories:')
    console.log(`   Shadcn Components: ${shadcnChunks.length} chunks, ${formatBytes(shadcnChunks.reduce((sum, c) => sum + c.size, 0))}`)
    console.log(`   Vendor Libraries: ${vendorChunks.length} chunks, ${formatBytes(vendorChunks.reduce((sum, c) => sum + c.size, 0))}`)
    console.log(`   Nuxt UI Components: ${nuxtUIChunks.length} chunks, ${formatBytes(nuxtUIChunks.reduce((sum, c) => sum + c.size, 0))}`)
    console.log(`   Application Code: ${appChunks.length} chunks, ${formatBytes(appChunks.reduce((sum, c) => sum + c.size, 0))}`)
    console.log(`   Large Chunks (>50KB): ${largeChunks.length} chunks, ${formatBytes(largeChunks.reduce((sum, c) => sum + c.size, 0))}\n`)
    
    // Show largest chunks
    console.log('🔍 Largest Chunks (Top 10):')
    chunks.slice(0, 10).forEach((chunk, index) => {
      const category = chunk.isShadcn ? '[Shadcn]' : 
                      chunk.isVendor ? '[Vendor]' : 
                      chunk.isNuxtUI ? '[NuxtUI]' : '[App]'
      console.log(`   ${index + 1}. ${chunk.formattedSize} - ${chunk.file} ${category}`)
    })
    
    // Show Shadcn specific chunks
    if (shadcnChunks.length > 0) {
      console.log('\n🎨 Shadcn Component Chunks:')
      shadcnChunks.forEach((chunk, index) => {
        console.log(`   ${index + 1}. ${chunk.formattedSize} - ${chunk.file}`)
      })
    }
    
    console.log('\n💡 Optimization Recommendations:')
    
    // Check for potential optimizations
    if (largeChunks.length > 0) {
      console.log(`   • Consider code splitting for ${largeChunks.length} large chunks (>50KB)`)
      largeChunks.slice(0, 3).forEach(chunk => {
        console.log(`     - ${chunk.file} (${chunk.formattedSize})`)
      })
    }
    
    if (shadcnChunks.length > 3) {
      console.log(`   • Consider lazy loading for ${shadcnChunks.length} Shadcn components`)
    }
    
    const potentialDuplicates = chunks.filter(c => 
      c.file.includes('vue') || c.file.includes('tailwind') || c.file.includes('headless')
    )
    if (potentialDuplicates.length > 1) {
      console.log(`   • Check for duplicate dependencies: ${potentialDuplicates.length} potential duplicates`)
    }
    
    console.log('   • Enable tree-shaking for unused component variants')
    console.log('   • Implement dynamic imports for complex components')
    console.log('   • Consider component-level lazy loading')
    
    // Calculate percentage impact
    const shadcnSize = shadcnChunks.reduce((sum, c) => sum + c.size, 0)
    const shadcnPercentage = ((shadcnSize / totalSize) * 100).toFixed(1)
    console.log(`   • Shadcn components account for ${shadcnPercentage}% of total bundle size\n`)
    
  } catch (error) {
    console.error('❌ Error analyzing bundle:', error.message)
    process.exit(1)
  }
}

analyzeBundle()